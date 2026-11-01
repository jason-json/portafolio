import { Hero } from "../home/Hero";
import { SelectedWork } from "../home/SelectedWork";
import { Expertise } from "../home/Expertise";
import { About } from "../home/About";
import { Footer } from "../layout/Footer";
export function Home({ base }: { base: string }) {
  return (
    <>
      <Hero />
      <SelectedWork base={base} />
      <Expertise />
      <About />
      <Footer />
    </>
  );
}
