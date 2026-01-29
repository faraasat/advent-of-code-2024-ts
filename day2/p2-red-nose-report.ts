import { readFileAsString } from "../common.js";

const getTrend = (val: number, nextVal: number) => {
  return val > nextVal ? "dec" : val < nextVal ? "inc" : "eq";
};

const isUnsafe = (
  val: number,
  currTrend: "inc" | "dec" | "eq",
  prevTrend?: "inc" | "dec" | "eq"
) => {
  if (!prevTrend) return val === 0 || Math.abs(val) > 3;

  return (
    val === 0 ||
    Math.abs(val) > 3 ||
    (currTrend !== "eq" && currTrend !== prevTrend)
  );
};

const getSplicedRow = (
  row: Array<number>,
  start: number,
  deleteCount: number
) => {
  const newRow = [...row];
  newRow.splice(start, deleteCount);
  return newRow;
};

const checkRow = async (splittedRow: Array<number>, isSafe = true) => {
  let prevTrend: "inc" | "dec" | "eq" | undefined = undefined;

  for (let i = 0; i < splittedRow.length - 1; i++) {
    const currIteration = splittedRow[i + 1] - splittedRow[i];
    const currTrend = getTrend(splittedRow[i], splittedRow[i + 1]);

    if (isUnsafe(currIteration, currTrend, prevTrend)) {
      if (isSafe) {
        const resp = await Promise.all([
          i - 1 >= 0
            ? checkRow(getSplicedRow(splittedRow, i - 1, 1), false)
            : -1,
          checkRow(getSplicedRow(splittedRow, i, 1), false),
          i + 1 <= splittedRow.length - 1
            ? checkRow(getSplicedRow(splittedRow, i + 1, 1), false)
            : -1,
        ]);
        if (resp.some((x) => x === 1)) return 1;
        else return 0;
      } else return 0;
    } else {
      prevTrend = currTrend;
    }
  }

  return 1;
};

export const p2RedNoseReport = async () => {
  const { data, error } = await readFileAsString("./inputs/input2.txt");

  if (error) throw error;

  const rows = data!.split("\n");

  const result: Array<number> = await Promise.all(
    rows.map(async (row: string, idx) => {
      const splittedRow = row.split(" ").map((el) => Number(el));
      return await checkRow(splittedRow, true);
    })
  );

  console.log(result.reduce((acc, curr) => acc + curr, 0));
};
