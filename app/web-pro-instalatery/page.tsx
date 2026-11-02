import { IndustryLanding, industryMetadata } from "@/components/industry/IndustryLanding";
import { getIndustryPage } from "@/lib/data/industry-pages";

// Obsah stránky je v lib/data/industry-pages, šablona v components/industry.
const page = getIndustryPage("web-pro-instalatery");

export function generateMetadata() {
  return industryMetadata(page);
}

export default function WebProInstalateryPage() {
  return <IndustryLanding page={page} />;
}
