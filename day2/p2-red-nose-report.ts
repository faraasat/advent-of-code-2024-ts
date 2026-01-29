import { readFileAsString } from "../common.js";

const checkType = (comparison: number) => {
  return comparison > 0 ? "inc" : comparison < 0 ? "dec" : "eq";
};

const passingCondition = (
  firstComparison: number,
  secondComparison: number
) => {
  return (
    firstComparison === 0 ||
    secondComparison === 0 ||
    checkType(firstComparison) !== checkType(secondComparison) ||
    Math.abs(firstComparison) > 3 ||
    Math.abs(secondComparison) > 3
  );
};

const checkComparison = (splCol: Array<number>, isFirstTry: boolean = true) => {
  for (let i = 0; i < splCol.length - 1; i++) {
    let firstComparison = splCol[i] - splCol[i + 1];
    let secondComparison = splCol[i + 1] - splCol[i + 2];
    if (isNaN(secondComparison)) continue;

    // console.log(
    //   splCol,
    //   [splCol[i], splCol[i + 1], splCol[i + 2]],
    //   firstComparison,
    //   secondComparison,
    //   isFirstTry
    // );

    if (isFirstTry && passingCondition(firstComparison, secondComparison)) {
      // if (firstComparison === 0 || Math.abs(firstComparison) > 3) {
      // } else
       if (secondComparison === 0 || Math.abs(secondComparison) > 3) {
      } else {
        const isConflict = passingCondition(
          splCol[i - 1] - splCol[i],
          splCol[i] - splCol[i + 2]
        );

        if (isConflict) return 0;
      }
      isFirstTry = true;
      i++;
    } else if (
      !isFirstTry &&
      passingCondition(firstComparison, secondComparison)
    ) {
      return 0;
    }
  }
  return 1;
};

export const p2RedNoseReport = async () => {
  const { data, error } = await readFileAsString("./inputs/input2.txt");

  if (error) throw error;

  const cols = data?.split("\n");

  const safeList: Array<number> = await Promise.all(
    cols?.map((col) => {
      const splCol = col.split(" ")!.map((el) => Number(el));

      return checkComparison(splCol);
      // return checkComparison2(splCol);
    })!
  );

  console.log(safeList);

  // 639 is too low
  // 844 is too high
  console.log(safeList.reduce((acc, curr) => acc + curr, 0));
};
