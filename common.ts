import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readFileAsString = async (src: string) => {
  try {
    const filePath = path.join(__dirname, src);

    const fileContent = await fs.readFile(filePath, "utf-8");

    return { data: fileContent, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};