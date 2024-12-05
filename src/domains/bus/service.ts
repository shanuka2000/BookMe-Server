import Bus, { IBus } from "./model.js";

export const createBus = async (
  busNumber: string,
  totalSeatsAvailable: number
): Promise<IBus> => {
  const bus = new Bus({ busNumber, totalSeatsAvailable });
  return await bus.save();
};

export const getAllBuses = async () => {
  return await Bus.find();
};

export const getBus = async (id: string) => {
  return await Bus.findById(id);
};

export const findById = async (id: string): Promise<IBus | null> => {
  return Bus.findById(id);
};

export const deleteBus = async (id: string) => {
  const result = await Bus.findByIdAndDelete({ _id: id });
  return result;
};

export const patchBus = async (id: string, totalSeatsAvailable: number) => {
  const bus = await Bus.findByIdAndUpdate(
    id,
    { totalSeatsAvailable },
    { new: true }
  );

  return bus;
};
