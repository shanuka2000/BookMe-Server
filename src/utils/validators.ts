import Joi from "joi";

export const validateRegistration = (data: Record<string, any>) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required().messages({
      "string.min": "First name must be at least 3 characters long.",
      "string.max": "First name must not exceed 50 characters long.",
      "string.empty": "First name is required.",
    }),
    lastName: Joi.string().min(3).max(50).required().messages({
      "string.min": "Last name must be at least 3 characters long.",
      "string.max": "Last name must not exceed 50 characters long.",
      "string.empty": "Last name is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required.",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.empty": "Password is required",
    }),
  });
  return schema.validate(data, { abortEarly: true });
};

export const validateLogin = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required.",
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long.",
    }),
  });
  return schema.validate(data, { abortEarly: true });
};

export const validateResetPassword = (data: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const schema = Joi.object({
    currentPassword: Joi.string().min(8).required().messages({
      "string.empty": "Current password is required",
      "string.min": "Password must be at least 8 characters long.",
    }),
    newPassword: Joi.string().min(8).required().messages({
      "string.empty": "New password is required",
      "string.min": "Password must be at least 8 characters long.",
    }),
    confirmNewPassword: Joi.string()
      .required()
      .valid(Joi.ref("newPassword"))
      .messages({
        "string.empty": "Confirm password is required",
        "any.only": "Confirm password must match the new password.",
      }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validateLocationRequest = (data: {
  placeId: string;
  registeredBy: string;
}) => {
  const schema = Joi.object({
    placeId: Joi.string().required().messages({
      "string.empty": "Place id is requierd.",
    }),
    registeredBy: Joi.string().required().messages({
      "string.empty": "Action creator id required",
    }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validateBusRegister = (data: {
  busNumber: string;
  totalSeatsAvailable: number;
  belongsTo: string;
}) => {
  const schema = Joi.object({
    busNumber: Joi.string().min(3).required().messages({
      "string.empty": "Bus number required",
      "string.min": "Bus number must be at least 3 characters long.",
    }),
    totalSeatsAvailable: Joi.number().integer().min(10).required().messages({
      "string.empty": "Total number of seats in required.",
      "string.min": "Total number of must be at least 10.",
    }),
    belongsTo: Joi.string().required().messages({
      "string.empty": "Bus belonging user required",
    }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validateBusPatch = (data: { totalSeatsAvailable: number }) => {
  const schema = Joi.object({
    totalSeatsAvailable: Joi.number().integer().min(10).required().messages({
      "string.empty": "Total number of seats in required.",
      "string.min": "Total number of must be at least 10.",
    }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validateTripStopRequest = (data: {
  stopId: number;
  tripId: string;
  stopLocation: string;
}) => {
  const schema = Joi.object({
    stopId: Joi.number().integer().min(1).required().messages({
      "number.base": "Stop id must be a number.",
      "number.min": "Stop id must be greater than or equal to 1.",
      "any.required": "Stop id is required.",
    }),
    tripId: Joi.string().required().messages({
      "string.base": "Trip id must be a string.",
      "any.required": "Trip id is required.",
    }),
    stopLocation: Joi.string().required().messages({
      "string.base": "Stop location must be a string.",
      "any.required": "Stop location is required.",
    }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validateDeleteTripStopRequest = (data: { tripStopId: string }) => {
  const schema = Joi.object({
    tripStopId: Joi.string().required().messages({
      "string.base": "Trip stop id must be a string.",
      "any.required": "Trip stop id is required.",
    }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validateBookingCreateRequest = (data: {
  bookedBy: string;
  tripId: string;
  seats: number;
  bookingFrom: string;
  bookingTo: string;
}) => {
  const schema = Joi.object({
    bookedBy: Joi.string().required().messages({
      "string.base": "Booked by must be a string.",
      "any.required": "Booked by is required.",
    }),
    tripId: Joi.string().required().messages({
      "string.base": "Trip id must be a string.",
      "any.required": "Trip id is required.",
    }),
    seats: Joi.number().integer().min(1).max(5).required().messages({
      "number.base": "Seats must be a number.",
      "number.min": "Atleast 1 seat must be booked.",
      "number.max": "Cannot book more than 5 seats.",
      "any.required": "Seats is required.",
    }),
    bookingFrom: Joi.string().required().messages({
      "string.base": "Booking from location must be a string.",
      "any.required": "Booking from location is required.",
    }),
    bookingTo: Joi.string().required().messages({
      "string.base": "Booking to location must be a string.",
      "any.required": "Booking to location is required.",
    }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validatePatchTripRequest = (data: {
  busId: string;
  fullTripSeatPrice: number;
  driver: string;
}) => {
  const schema = Joi.object({
    busId: Joi.string().required().messages({
      "string.base": "Bus id by must be a string.",
      "any.required": "Bus id by is required.",
    }),
    fullTripSeatPrice: Joi.number().integer().required().messages({
      "number.base": "Seat price must be a number.",
      "any.required": "Seat price is required.",
    }),
    driver: Joi.string().required().messages({
      "string.base": "Driver id by must be a string.",
      "any.required": "Driver id by is required.",
    }),
  });

  return schema.validate(data, { abortEarly: true });
};

export const validatePatchTripStatusRequest = (data: {
  status: "not_started" | "on_going" | "completed";
}) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid("not_started", "on_going", "completed")
      .required()
      .messages({
        "string.base": "Status must be a string.",
        "any.only":
          "Status must be one of 'not_started', 'on_going', or 'completed'.",
        "any.required": "Status is required.",
      }),
  });

  return schema.validate(data, { abortEarly: true });
};
