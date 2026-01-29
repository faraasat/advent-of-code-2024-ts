import { p1PrintQueue } from "./p1-print-queue.ts";

export const p2PrintQueue = async () => {
  const { result, list, mappings } = (await p1PrintQueue(true))!;

  const checkOrdering = (arr: Array<number>) => {
    let l = arr;
    let val = l[0];
    let valMapping = mappings.get(val)!;
    let tracker = [val];

    for (let i = 1; i < l.length - 1; i++) {
      const valNext = l[i];

      if (valMapping.includes(valNext)) {
        tracker.push(valNext);
        valMapping = mappings.get(valNext)!;
      } else {
        return [-1];
      }
    }

    return tracker;
  };

  const resp = result.map((res) => {
    let l = list[res];
    let val = l[0];
    let valMapping = mappings.get(val)!;
    let tracker = [val];

    for (let i = 1; i < l.length - 1; i++) {
      const valNext = l[i];

      if (valMapping.includes(valNext)) {
        tracker.push(valNext);
        valMapping = mappings.get(valNext)!;
      } else {
        const updL = l;
        const temp1 = l[i + 1];
        updL[i + 1] = l[i];
        updL[i] = temp1;
        const res = checkOrdering(updL);

        if (res.includes(-1)) {
          return -1;
        } else {
          return res[Math.floor(res.length / 2)];
        }
      }
    }

    return tracker[Math.floor(tracker.length / 2)];
  });
  // .filter((x) => x !== -1);

  // 8747 is too high
  console.log(resp.reduce((acc, val) => acc + val, 0));

  console.log("here", result, mappings);
};
