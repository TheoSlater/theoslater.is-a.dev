import { HomeClient } from "./components/HomeClient";
import { UnderConstruction } from "./components/UnderConstruction";
import GridSection from "./grid/GridSection";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <HomeClient />
      <GridSection component="section" />
      <UnderConstruction />
    </>
  );
}
