import { HomeClient } from "./components/HomeClient";
import { UnderConstruction } from "./components/UnderConstruction";
import GridSection from "./grid/GridSection";

export default function Home() {
  return (
    <>
      <HomeClient />
      <GridSection component="section" />
      <UnderConstruction />
    </>
  );
}
