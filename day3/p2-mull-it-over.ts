import { readFileAsString } from "../common.js";

export const p2MullItOver = async () => {
  const { data, error } = await readFileAsString("./inputs/input3.txt");

  if (error) throw error;

  const doDontList = data!.split("do()");

  const doList: Array<string> = doDontList.map((x) => x.split("don't()")[0]);

  const regex = /mul\([0-9]{1,3}[,]{1}[0-9]{1,3}\)/g;

  const matchedList = doList!
    .reduce(
      (acc: Array<string>, curr: string) => acc.concat(curr.match(regex)!),
      []
    )
    ?.map((match) => match.replace(/mul\(|\)/g, ""))
    .reduce((a, b) => (a += +b.split(",")[0] * +b.split(",")[1]), 0);

  console.log(matchedList);
};
