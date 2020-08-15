import bcrypt from 'bcrypt';

export async function generateHash(value: string): Promise<string> {
  const hash = await bcrypt.hash(value, 12);

  return hash;
}

export async function compareHash(
  value: string,
  hash: string,
): Promise<boolean> {
  const match = await bcrypt.compare(value, hash);

  return match;
}
