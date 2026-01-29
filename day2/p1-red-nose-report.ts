import { readFileAsString } from "../common.js";

const checkType = (comparison: number) => {
  return comparison > 0 ? "inc" : comparison < 0 ? "dec" : "eq";
};

export const p1RedNoseReport = async () => {
  const { data, error } = await readFileAsString("./inputs/input2.txt");

  if (error) throw error;

  const cols = data?.split("\n");

  const safeList: Array<number> = await Promise.all(
    cols?.map((col) => {
      const splCol = col.split(" ");

      for (let i = 0; i < splCol.length - 1; i++) {
        const firstComparison = Number(splCol[i]) - Number(splCol[i + 1]);
        const secondComparison = Number(splCol[i + 1]) - Number(splCol[i + 2]);
        if (isNaN(secondComparison)) continue;
        if (firstComparison === 0 || secondComparison === 0) return 0;
        if (checkType(firstComparison) !== checkType(secondComparison))
          return 0;
        if (Math.abs(firstComparison) > 3 || Math.abs(secondComparison) > 3)
          return 0;
      }

      return 1;
    })!
  );

  console.log(safeList.reduce((acc, curr) => acc + curr, 0));
};
