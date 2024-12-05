import { getPlaceDetails } from "../../utils/location-support.js";
import { IAdminAuth } from "../auth/admin-auth/model.js";
import Location from "./model.js";

export const createLocation = async (placeId: string, admin: IAdminAuth) => {
  const location = await Location.findOne({ locationPlaceId: placeId });

  if (location) {
    const response = await Location.updateOne(
      { _id: location._id },
      { $addToSet: { registeredBy: admin._id } },
      { new: true }
    );
    return response;
  } else {
    const placeDetails = await getPlaceDetails(placeId);
    const location = new Location({ ...placeDetails, registeredBy: admin._id });
    return await location.save();
  }
};

export const isSlugTaken = async (slug: string): Promise<boolean> => {
  return !!(await Location.findOne({ slug }));
};

export const updateLocation = async (id: string, placeId: string) => {
  const placeDetails = await getPlaceDetails(placeId);
  const location = await Location.findByIdAndUpdate(
    id,
    { ...placeDetails },
    { new: true }
  );
  return location;
};

export const getAllLocations = async () => {
  return await Location.find();
};

export const getLocation = async (id: string) => {
  return await Location.findById(id);
};
