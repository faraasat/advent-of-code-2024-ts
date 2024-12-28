import { readFileAsString } from "../common.js";

export const p2HistorianHysteria = async () => {
  const { data, error } = await readFileAsString("./inputs/input1.txt");

  if (error) throw error;

  let sum = 0;

  const getRegex = (number: number) => new RegExp(`\\b${number}\\b`, "g");

  const cols = data?.split("\n");
  const [col1, col2] = await Promise.all([
    cols?.map((col) => Number(col?.split("   ")[0]))!,
    cols?.map((col) => col?.split("   ")[1]).join(" ")!,
  ]);

  for (let i = 0; i < col1.length; i++) {
    const currentNumber = col1[i];
    const occurrence = col2.match(getRegex(currentNumber))?.length;

    sum += occurrence ? occurrence * currentNumber : 0;
  }

  console.log(sum);
};
