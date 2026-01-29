import { p1HistorianHysteria } from "./day1/p1-historian-hysteria.ts";
import { p2HistorianHysteria } from "./day1/p2-historian-hysteria.ts";
import { p1RedNoseReport } from "./day2/p1-red-nose-report.ts";
import { p2RedNoseReport } from "./day2/p2-red-nose-report.ts";

const logger = (
  day: number,
  part: number,
  name: string,
  start: boolean = true
) => {
  if (start) {
    console.log(
      `\n=================== Starting Day ${day}, part ${part}, ${name} ===================`
    );
  } else {
    console.log(
      `=================== Finished ${day}, part ${part}, ${name} ===================\n`
    );
  }
};

(async () => {
  logger(1, 1, "Historian Hysteria");
  await p1HistorianHysteria();
  logger(1, 1, "Historian Hysteria", false);

  logger(1, 2, "Historian Hysteria");
  await p2HistorianHysteria();
  logger(1, 2, "Historian Hysteria", false);

  logger(2, 1, "Red-Nose Report");
  await p1RedNoseReport();
  logger(2, 1, "Red-Nose Report", false);

  logger(2, 2, "Red-Nose Report");
  await p2RedNoseReport();
  logger(2, 2, "Red-Nose Report", false);
})();
