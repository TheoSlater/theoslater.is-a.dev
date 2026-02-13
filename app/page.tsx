import { HomeClient } from "./components/HomeClient";
import { UnderConstruction } from "./components/UnderConstruction";
import GridSection from "./grid/GridSection";
import { ONE_DAY_SECONDS } from "@/lib/cache";

export const revalidate = ONE_DAY_SECONDS;

export default function Home() {
  return (
    <>
      <HomeClient />
      <GridSection component="section" />
      <UnderConstruction />
    </>
  );
}
