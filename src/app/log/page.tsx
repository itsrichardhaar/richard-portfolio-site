import type { Metadata } from "next";
import { LogTable } from "@/components/LogTable";

export const metadata: Metadata = {
  title: "Project Log — Richard Haar",
  description:
    "A running log of shipped client work, internal platforms, and experiments.",
};

export default function LogPage() {
  return <LogTable />;
}
