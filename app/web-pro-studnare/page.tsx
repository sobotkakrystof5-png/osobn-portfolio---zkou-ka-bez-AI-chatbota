import { IndustryLanding, industryMetadata } from "@/components/industry/IndustryLanding";
import { getIndustryPage } from "@/lib/data/industry-pages";

// Obsah stránky je v lib/data/industry-pages, šablona v components/industry.
const page = getIndustryPage("web-pro-studnare");

export function generateMetadata() {
  return industryMetadata(page);
}

export default function WebProStudnarePage() {
  return <IndustryLanding page={page} />;
}
