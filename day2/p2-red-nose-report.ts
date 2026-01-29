import { readFileAsString } from "../common.js";

// const checkType = (comparison: number) => {
//   return comparison > 0 ? "inc" : comparison < 0 ? "dec" : "eq";
// };

// const passingCondition = (
//   firstComparison: number,
//   secondComparison: number
// ) => {
//   return (
//     firstComparison === 0 ||
//     secondComparison === 0 ||
//     checkType(firstComparison) !== checkType(secondComparison) ||
//     Math.abs(firstComparison) > 3 ||
//     Math.abs(secondComparison) > 3
//   );
// };

// const checkComparison = (splCol: Array<number>, isFirstTry: boolean = true) => {
//   for (let i = 0; i < splCol.length - 1; i++) {
//     let firstComparison = splCol[i] - splCol[i + 1];
//     let secondComparison = splCol[i + 1] - splCol[i + 2];
//     if (isNaN(secondComparison)) continue;

//     // console.log(
//     //   splCol,
//     //   [splCol[i], splCol[i + 1], splCol[i + 2]],
//     //   firstComparison,
//     //   secondComparison,
//     //   isFirstTry
//     // );

//     if (isFirstTry && passingCondition(firstComparison, secondComparison)) {
//       // if (firstComparison === 0 || Math.abs(firstComparison) > 3) {
//       // } else
//        if (secondComparison === 0 || Math.abs(secondComparison) > 3) {
//       } else {
//         const isConflict = passingCondition(
//           splCol[i - 1] - splCol[i],
//           splCol[i] - splCol[i + 2]
//         );

//         if (isConflict) return 0;
//       }
//       isFirstTry = true;
//       i++;
//     } else if (
//       !isFirstTry &&
//       passingCondition(firstComparison, secondComparison)
//     ) {
//       return 0;
//     }
//   }
//   return 1;
// };

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
    val === 0 || Math.abs(val) > 3 || (currTrend !== "eq" && currTrend !== prevTrend)
  );
};

export const p2RedNoseReport = async () => {
  const { data, error } = await readFileAsString("./inputs/input2.txt");

  if (error) throw error;

  // const cols = data?.split("\n");

  // const safeList: Array<number> = await Promise.all(
  //   cols?.map((col) => {
  //     const splCol = col.split(" ")!.map((el) => Number(el));

  //     return checkComparison(splCol);
  //     // return checkComparison2(splCol);
  //   })!
  // );

  // console.log(safeList);

  // // 639 is too low
  // // 844 is too high
  // console.log(safeList.reduce((acc, curr) => acc + curr, 0));
  const rows = data!.split("\n");

  const result: Array<number> = await Promise.all(
    rows.map((row: string) => {
      const splittedRow = row.split(" ").map((el) => Number(el));
      let isSafe = true;
      let prevTrend: "inc" | "dec" | "eq" | undefined = undefined;

      for (let i = 0; i < splittedRow.length; i++) {
        const currIteration = splittedRow[i  + 1] - splittedRow[i];
        const currTrend = getTrend(splittedRow[i], splittedRow[i  + 1]);

        if (isUnsafe(currIteration, currTrend, prevTrend)) {
          if (isSafe) isSafe = false;
          else return 0;
        }

        prevTrend = currTrend;
      }

      return 1;
    })
  );

  // 713 is not right
  // 635 is not right
  console.log(result.reduce((acc, curr) => acc + curr, 0));

  console.log("here");
};
