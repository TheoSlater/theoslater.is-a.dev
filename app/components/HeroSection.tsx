import { Background } from "./Background";
import DarkVeil from "./DarkVeil";
import { Foreground } from "./Foreground";
import { HeroContent } from "./HeroContent";

type HeroSectionProps = {
  onReady: () => void;
};

export function HeroSection({ onReady }: HeroSectionProps) {
  return (
    <Background>
      <DarkVeil onReadyAction={onReady} />
      <Foreground>
        <HeroContent />
      </Foreground>
    </Background>
  );
}
