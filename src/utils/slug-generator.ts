import { Response } from "express";
import { isSlugTaken } from "../domains/location/service.js";

/**
 * Generates a slug from a given string.
 * @param input The input string to convert into a slug.
 * @returns The generated slug.
 */
export const generateSlug = async (input: string) => {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]+/g, "");

  await validateSlug(slug);

  return slug;
};

export const validateSlug = async (slug: string) => {
  if (await isSlugTaken(slug)) {
    throw new Error("Location is already registered.");
  }
};
