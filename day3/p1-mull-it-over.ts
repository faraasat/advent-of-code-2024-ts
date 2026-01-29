import { readFileAsString } from "../common.js";

export const p1MullItOver = async () => {
  const { data, error } = await readFileAsString("./inputs/input3.txt");

  if (error) throw error;

  const regex = /mul\([0-9]{1,3}[,]{1}[0-9]{1,3}\)/g;

  const matches = data!
    .match(regex)
    ?.map((match) => match.replace(/mul\(|\)/g, ""))
    .reduce((a, b) => (a += +b.split(",")[0] * +b.split(",")[1]), 0);

  console.log(matches);
};
