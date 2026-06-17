import { Hero } from "@/components/sections/Hero";
import { ShipDemo } from "@/components/sections/ShipDemo";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <ShipDemo />
      <About />
      <Stack />
      <Work />
      <Experience />
      <Contact />
    </div>
  );
}
