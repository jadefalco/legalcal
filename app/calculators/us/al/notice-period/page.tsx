import fs from "fs";
import path from "path";
import NoticePeriodClient from "./NoticePeriodClient";

export const metadata = {
  title: "Alabama Notice Period Calculator",
  description: "Calculate residential lease notice periods for Alabama using official statutes and rules.",
};

export default function Page() {
  const filePath = path.join(
    process.cwd(),
    "datasets",
    "us",
    "al",
    "noticePeriod.json"
  );

  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  return <NoticePeriodClient data={data} />;
}