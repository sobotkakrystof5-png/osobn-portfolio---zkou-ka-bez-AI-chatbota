"use client";

import { AgentScene } from "@/components/automation/scenes3d/AgentScene";
import { KnowledgeScene } from "@/components/automation/scenes3d/KnowledgeScene";
import { PipelineScene } from "@/components/automation/scenes3d/PipelineScene";
import { VoiceScene } from "@/components/automation/scenes3d/VoiceScene";

// 3D animace v hero podstránky automatizace. Každá služba má vlastní scénu
// s příběhem, ze kterého je vidět, co služba dělá (components/automation/
// scenes3d/). Neznámý slug dostane scénu procesů.
const SCENES: Record<string, () => React.JSX.Element> = {
  "ai-agenti": AgentScene,
  "automatizace-procesu": PipelineScene,
  "chatboti-rag": KnowledgeScene,
  "voice-agenti": VoiceScene,
};

export function ProcessScene3D({ slug }: { slug: string }) {
  const Scene = SCENES[slug] ?? PipelineScene;
  return <Scene />;
}
