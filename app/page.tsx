import { HomeClient } from "./components/HomeClient";
import GridSection from "./grid/GridSection";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HomeClient />
      <GridSection component="section" />
    </>
  );
}
