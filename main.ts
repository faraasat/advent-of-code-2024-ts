import { p1HistorianHysteria } from "./day1/p1-historian-hysteria.ts";
import { p2HistorianHysteria } from "./day1/p2-historian-hysteria.ts";
import { p1RedNoseReport } from "./day2/p1-red-nose-report.ts";
import { p2RedNoseReport } from "./day2/p2-red-nose-report.ts";
import { p1MullItOver } from "./day3/p1-mull-it-over.ts";
import { p2MullItOver } from "./day3/p2-mull-it-over.ts";
import { p1CeresSearch } from "./day4/p1-ceres-search.ts";
import { p2CeresSearch } from "./day4/p2-ceres-search.ts";
import { p1PrintQueue } from "./day5/p1-print-queue.ts";
import { p2PrintQueue } from "./day5/p2-print-queue.ts";
import { p1WarehouseWoes } from "./day15/p1-warehouse-woes.ts";

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

  logger(3, 1, "Mull It Over");
  await p1MullItOver();
  logger(3, 1, "Mull It Over", false);

  logger(3, 2, "Mull It Over");
  await p2MullItOver();
  logger(3, 2, "Mull It Over", false);

  logger(4, 1, "Ceres Search");
  await p1CeresSearch();
  logger(4, 1, "Ceres Search", false);

  logger(4, 2, "Ceres Search");
  await p2CeresSearch();
  logger(4, 2, "Ceres Search", false);

  logger(5, 1, "Print Queue");
  await p1PrintQueue();
  logger(5, 1, "Print Queue", false);

  logger(5, 2, "Print Queue");
  await p2PrintQueue();
  logger(5, 2, "Print Queue", false);

  logger(15, 1, "Warehouse Woes");
  await p1WarehouseWoes();
  logger(15, 1, "Warehouse Woes", false);

  // logger(15, 2, "Warehouse Woes");
  // await p2PrintQueue();
  // logger(15, 2, "Warehouse Woes", false);
})();
