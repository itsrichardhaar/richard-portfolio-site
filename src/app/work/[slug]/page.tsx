import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/data";
import { CaseStudyView } from "@/components/CaseStudyView";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Richard Haar`,
    description: cs.subhead,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();

  const cs = caseStudies[index];
  const nextCs = caseStudies[(index + 1) % caseStudies.length];

  return <CaseStudyView cs={cs} next={{ slug: nextCs.slug, title: nextCs.title }} />;
}
