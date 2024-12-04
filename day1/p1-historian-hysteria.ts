import { readFileAsString } from "../common.js";

(async () => {
  const { data, error } = await readFileAsString("../inputs/input1.txt");

  if (error) throw error;

  let sum = 0;
  const cols = data?.split("\n");
  const [col1, col2] = await Promise.all([
    cols?.map((col) => parseInt(col?.split("   ")[0]))?.sort((a, b) => a - b)!,
    cols?.map((col) => parseInt(col?.split("   ")[1]))?.sort((a, b) => a - b)!,
  ]);

  for (let i = 0; i < col1.length; i++) {
    sum += Math.abs(col1[i] - col2[i]);
  }

  console.log(sum);
})();
