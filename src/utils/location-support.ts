import axios from "axios";
import { GOOGLE_API } from "../config/env-export-config.js";
import { ILocation } from "../domains/location/model.js";
import { generateSlug } from "./slug-generator.js";

export const getPlaceDetails = async (placeId: string) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
    {
      params: {
        place_id: placeId,
        key: GOOGLE_API,
      },
    }
  );

  if (response.data.status !== "OK") {
    return null;
  }

  const placeDetails = response.data.result;

  const optimizedPlaceDetails: Partial<ILocation> = {
    displayName: placeDetails.name,
    slug: await generateSlug(placeDetails.name),
    locationUrl: placeDetails.url,
    locationLongitude: placeDetails.geometry.location.lng,
    locationLatitude: placeDetails.geometry.location.lat,
    locationPlaceId: placeDetails.place_id,
  };

  return optimizedPlaceDetails;
};

export const getDistanceDetails = async (
  startLoc: ILocation,
  endLoc: ILocation
) => {
  const origin = {
    lat: startLoc.locationLatitude,
    lng: startLoc.locationLongitude,
  };
  const destination = {
    lat: endLoc.locationLatitude,
    lng: endLoc.locationLongitude,
  };

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/distancematrix/json",
    {
      params: {
        origins: `${origin.lat},${origin.lng}`,
        destinations: `${destination.lat},${destination.lng}`,
        key: GOOGLE_API,
      },
    }
  );

  return response.data;
};
