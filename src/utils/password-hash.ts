import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export { hashPassword, comparePassword };
