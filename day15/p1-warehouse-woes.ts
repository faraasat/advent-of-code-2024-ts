import { readFileAsString } from "../common.js";

const calculateAction = (value: number, act: string, SCREEN_WIDTH: number) => {
  return act === "^"
    ? value - SCREEN_WIDTH
    : act === "v"
    ? value + SCREEN_WIDTH
    : act === "<"
    ? value - 1
    : value + 1;
};

export const p1WarehouseWoes = async () => {
  const { data, error } = await readFileAsString("./inputs/input15.txt");

  if (error) throw error;

  const sections = data!.split("\n\n");
  const screenText = sections[0];
  const screenLines = screenText.split("\n");
  const actions = sections[1].split("\n").join("");

  let robotInitialLocation = screenText.indexOf("@");
  const SCREEN_WIDTH = screenLines[0].length + 1;
  const SCREEN_HEIGHT = screenLines.length;
  let newScreen = [...screenText];
  const robotLocations: Array<number> = [];

  for (const act of actions) {
    let indexes: Array<number> = [];
    let initialLoc = robotInitialLocation;

    while (true) {
      const updLoc = calculateAction(initialLoc, act, SCREEN_WIDTH);

      indexes.push(updLoc);

      if (newScreen[updLoc] === "O") {
        initialLoc = updLoc;
        continue;
      } else if (newScreen[updLoc] === "#") {
        robotLocations.push(robotInitialLocation);
        break;
      } else if (newScreen[updLoc] === ".") {
        const newRoboIdx = indexes[0];

        indexes.reverse().forEach((ele, i) => {
          if (i === indexes.length - 1) return;
          newScreen[ele] = newScreen[indexes[i + 1]];
        });

        newScreen[robotInitialLocation] = ".";
        robotInitialLocation = newRoboIdx;
        robotLocations.push(newRoboIdx);
        newScreen[newRoboIdx] = "@";
        initialLoc = newRoboIdx;

        break;
      }
    }
  }

  const coords = robotLocations.reduce((acc, ele) => {
    console.log(ele);
    const location = {
      x: ele % SCREEN_WIDTH,
      y: Math.floor(ele / SCREEN_HEIGHT) - 1,
    };
    return acc + (location.x + location.y * 100);
  }, 0);

  console.log(coords);

  // 5700 & 5800 & 4611 is too low
  console.log(newScreen.join(""));

  console.log("here");
};
