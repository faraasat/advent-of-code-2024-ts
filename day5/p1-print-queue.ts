import { readFileAsString } from "../common.js";

export const p1PrintQueue = async (shouldReturnIncorrectIndexes = false) => {
  const { data, error } = await readFileAsString("./inputs/input5.txt");

  if (error) throw error;

  const sections = data!.split("\n\n");

  const mappings = sections[0];
  const list = sections[1].split("\n").map((x) => x.split(","));

  const START = 11;
  const END = 99;

  const mappingObject: Map<number, Array<number>> = new Map();

  [...Array(END - START + 1).keys()].forEach((val, i) => {
    const updVal = val + 11;
    const re = new RegExp(`${updVal}[|][0-9]{2}`, "g");

    mappings.match(re)?.forEach((x) => {
      if (!mappingObject.has(updVal))
        mappingObject.set(updVal, [parseInt(x.split("|")[1])]);
      else
        mappingObject.set(updVal, [
          ...mappingObject.get(updVal)!,
          parseInt(x.split("|")[1]),
        ]);
    });
  });

  const searchInDepth = (
    valList: Array<number>,
    valToFind: number,
    depth: number
  ): number => {
    if (depth === 0) return 0;

    for (let i = 0; i < valList.length; i++) {
      if (mappingObject.get(valList[i])?.includes(valToFind)) {
        return valToFind;
      } else {
        const sVal = searchInDepth(
          mappingObject.get(valList[i])!,
          valToFind,
          depth - 1
        );

        if (sVal > -1) return -1;
        return sVal;
      }
    }

    return valToFind;
  };

  const result = list
    .map((l, idx) => {
      const LIST_LENGTH = l.length;

      const tracker: Array<number> = [];

      let first = mappingObject.get(parseInt(l[0]))!;

      tracker.push(parseInt(l[0]));

      for (let i = 1; i < LIST_LENGTH; i++) {
        const val = parseInt(l[i]);

        if (first.includes(val)) {
          tracker.push(val);
          first = mappingObject.get(val)!;
          continue;
        } else {
          const searchRes = searchInDepth(first, val, 1);
          if (searchRes >= 0) {
            tracker.push(val);
            first = mappingObject.get(val)!;
          } else tracker.push(-1);
        }
      }

      if (!shouldReturnIncorrectIndexes) {
        if (tracker.includes(-1)) return undefined;
        else return tracker[Math.floor(tracker.length / 2)];
      } else {
        if (tracker.includes(-1) || typeof tracker == undefined) {
          return idx;
        } else return undefined;
      }
    })
    .filter((x) => x !== undefined);

  if (shouldReturnIncorrectIndexes)
    return {
      result,
      list: list.map((x) => x.map((x) => +x)),
      mappings: mappingObject,
    };

  console.log(result.reduce((acc, val) => (val ? acc + val : acc), 0));
};
