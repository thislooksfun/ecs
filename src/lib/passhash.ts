import bcrypt from "bcrypt";

// TODO: Adjust the default for security and performance (probably increase it).
export async function hash(pass: string, rounds: number = 10): Promise<string> {
  return await bcrypt.hash(pass, rounds);
}

export async function compare(pass: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(pass, hash);
}
