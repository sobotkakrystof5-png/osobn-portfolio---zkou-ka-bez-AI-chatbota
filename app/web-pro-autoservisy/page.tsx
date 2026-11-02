import { IndustryLanding, industryMetadata } from "@/components/industry/IndustryLanding";
import { getIndustryPage } from "@/lib/data/industry-pages";

// Obsah stránky je v lib/data/industry-pages, šablona v components/industry.
const page = getIndustryPage("web-pro-autoservisy");

export function generateMetadata() {
  return industryMetadata(page);
}

export default function WebProAutoservisyPage() {
  return <IndustryLanding page={page} />;
}
