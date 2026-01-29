import { readFileAsString } from "../common.js";

const rotate45Degree = (array: Array<string>, isA = false) => {
  const twoDArray = array.map((ol) => ol.split(""));

  const maxHeight = twoDArray.length;
  const maxLength = twoDArray[0].length;

  if (maxHeight !== maxLength) throw new Error("Not a square matrix");

  const rotated = twoDArray.map((_, i) => {
    const diagon = [];
    for (let j = 0; j <= i; j++) {
      !isA
        ? diagon.push(twoDArray[i - j][j])
        : diagon.push(twoDArray[i - j][maxLength - j - 1]);
    }

    return diagon;
  });
  const rotated2 = twoDArray.map((_, i) => {
    const diagon = [];
    for (let j = 0; j <= maxLength - i - 2; j++) {
      !isA
        ? diagon.push(twoDArray[maxLength - j - 1][j + i + 1])
        : diagon.push(twoDArray[maxLength - j - 1][maxLength - i - j - 2]);
    }

    return diagon;
  });

  return rotated.concat(rotated2).map((r) => r.join(""));
};

export const p1CeresSearch = async () => {
  const { data, error } = await readFileAsString("./inputs/input4.txt");

  if (error) throw error;

  // const lines = data!.split("\n");

  // const maxLength = lines.length;
  // const maxWidth = lines[0].length;

  // const lineMatches = lines!.map((line) =>
  //   [...line!.matchAll(/X/g)].map((match) => match.index)
  // );

  // const updatedMatches = lineMatches.map((lm, i) => {
  //   return lm.map((l) => {
  //     // [up, down, left, right]
  //     const allowedDirection = [
  //       i - 4 >= 0,
  //       i + 4 <= maxLength,
  //       l - 4 >= 0,
  //       l + 4 <= maxWidth,
  //     ];
  //     if (!allowedDirection.includes(true)) return 0;

  //     const left = allowedDirection[2] ? lines[i].slice(l - 4, l) : "XXXX";
  //     const right = allowedDirection[3] ? lines[i].slice(l, l + 4) : "XXXX";

  //     const upwards = lines.slice(i - 4, i);
  //     const downwards = lines.slice(i, i + 4);
  //     const top = allowedDirection[0]
  //       ? upwards.map((line) => line[l]).join("")
  //       : "XXXX";
  //     const bottom = allowedDirection[1]
  //       ? downwards.map((line) => line[l]).join("")
  //       : "XXXX";
  //     const topLeft =
  //       allowedDirection[0] && allowedDirection[2]
  //         ? upwards.map((line, idx) => line[l - idx]).join("")
  //         : "XXXX";
  //     const topRight =
  //       allowedDirection[0] && allowedDirection[3]
  //         ? upwards.map((line, idx) => line[l + idx]).join("")
  //         : "XXXX";
  //     const bottomLeft =
  //       allowedDirection[1] && allowedDirection[2]
  //         ? downwards.map((line, idx) => line[l - idx]).join("")
  //         : "XXXX";
  //     const bottomRight =
  //       allowedDirection[1] && allowedDirection[3]
  //         ? downwards.map((line, idx) => line[l + idx]).join("")
  //         : "XXXX";

  //     const toFind = ["XMAS"];
  //     let count = 0;
  //     if (toFind.includes(left)) {
  //       count++;
  //     }
  //     if (toFind.includes(right)) {
  //       count++;
  //     }
  //     if (toFind.includes(top)) {
  //       count++;
  //     }
  //     if (toFind.includes(bottom)) {
  //       count++;
  //     }
  //     if (toFind.includes(topLeft)) {
  //       count++;
  //     }
  //     if (toFind.includes(topRight)) {
  //       count++;
  //     }
  //     if (toFind.includes(bottomLeft)) {
  //       count++;
  //     }
  //     if (toFind.includes(bottomRight)) {
  //       count++;
  //     }
  //     return count;
  //   });
  // });

  // const result = updatedMatches.reduce((acc: number, curr: Array<number>) => {
  //   return acc + curr.reduce((a: number, c: number) => a + c, 0);
  // }, 0);

  // //   1636 is too low
  // console.log(result);

  const originalLines = data!.split("\n");

  const re1 = /XMAS/g;
  const re2 = /SAMX/g;

  const [original, transpose, clockwise45Degree, aClockwise45Degree] =
    await Promise.all([
      originalLines.join("\n"),
      originalLines
        .map((ol, rowIndex) =>
          ol.split("").map((_, colIndex) => originalLines[colIndex][rowIndex])
        )
        .map((r) => r.join(""))
        .join("\n"),
      rotate45Degree(originalLines).join("\n"),
      rotate45Degree(originalLines, true).join("\n"),
    ]);

  const [m1, m2, m3, m4] = await Promise.all([
    (original.match(re1)?.length || 0) + (original.match(re2)?.length || 0),
    (transpose.match(re1)?.length || 0) + (transpose.match(re2)?.length || 0),
    (clockwise45Degree.match(re1)?.length || 0) +
      (clockwise45Degree.match(re2)?.length || 0),
    (aClockwise45Degree.match(re1)?.length || 0) +
      (aClockwise45Degree.match(re2)?.length || 0),
  ]);

  console.log(m1 + m2 + m3 + m4);
};
