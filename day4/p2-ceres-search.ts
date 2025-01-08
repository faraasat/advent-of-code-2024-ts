import { readFileAsString } from "../common.js";

export const p2CeresSearch = async () => {
  const { data, error } = await readFileAsString("./inputs/input4.txt");

  if (error) throw error;

  const lines = data!.split("\n");

  const MAX_LENGTH = lines.length;

  // const results = await Promise.all(
  //   lines.map((_, i) => {
  //     if (i >= MAX_LENGTH - 2) return 0;

  //     const total = [];

  //     for (let j = 0; j < MAX_LENGTH - 1; j++) {
  //       const MSAMS =
  //         lines[i][j] === "M" &&
  //         lines[i][j + 2] === "S" &&
  //         lines[i + 1][j + 2] === "A" &&
  //         lines[i + 2][j] === "M" &&
  //         lines[i + 2][j + 2] === "S"
  //           ? 1
  //           : 0;
  //       const SMASM =
  //         lines[i][j] === "S" &&
  //         lines[i][j + 2] === "M" &&
  //         lines[i + 1][j + 2] === "A" &&
  //         lines[i + 2][j] === "S" &&
  //         lines[i + 2][j + 2] === "M"
  //           ? 1
  //           : 0;
  //       const MMASS =
  //         lines[i][j] === "M" &&
  //         lines[i][j + 2] === "M" &&
  //         lines[i + 1][j + 2] === "A" &&
  //         lines[i + 2][j] === "S" &&
  //         lines[i + 2][j + 2] === "S"
  //           ? 1
  //           : 0;
  //       const SSAMM =
  //         lines[i][j] === "S" &&
  //         lines[i][j + 2] === "S" &&
  //         lines[i + 1][j + 2] === "A" &&
  //         lines[i + 2][j] === "M" &&
  //         lines[i + 2][j + 2] === "M"
  //           ? 1
  //           : 0;

  //       total.push(MSAMS + SMASM + MMASS + SSAMM);
  //     }

  //     return total.reduce((acc, curr) => acc + curr, 0);
  //   })
  // );

  // // 545 is too low
  // console.log(results.reduce((acc, curr) => acc + curr, 0));

  const aInLines: Array<Array<number>> = lines
    .map((line, i) => {
      if (i === 0 || i === MAX_LENGTH - 1) return;
      const indexes: Array<number> = [];
      let currentIndex = 0;

      for (let i = 0; i < line.length; i++) {
        const idx = line.split("").indexOf("A", currentIndex + 1);
        if (idx > -1) {
          currentIndex = idx;
          indexes.push(idx);
        }
      }

      return indexes;
    })
    .filter((x) => typeof x !== "undefined");

  const resp = await Promise.all(
    aInLines.map((aIdxs, i) => {
      i = i + 1;

      return aIdxs
        .map((aIdx) => {
          const topLeft = lines[i - 1][aIdx - 1];
          const topRight = lines[i - 1][aIdx + 1];
          const bottomLeft = lines[i + 1][aIdx - 1];
          const bottomRight = lines[i + 1][aIdx + 1];

          const consolidated = `${topLeft}${topRight}A${bottomLeft}${bottomRight}`;

          if (
            consolidated === "MSAMS" ||
            consolidated === "MMASS" ||
            consolidated === "SSAMM" ||
            consolidated === "SMASM"
          )
            return 1 as number;

          return 0 as number;
        })
        .reduce((acc, curr) => acc + curr, 0);
    })
  );

  console.log(resp.reduce((acc, curr) => acc + curr, 0));
};
