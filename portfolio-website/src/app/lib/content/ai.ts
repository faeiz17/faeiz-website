/**
 * The AI side of the practice, grouped into capabilities rather than listed as
 * course names. The certifications back each group up; the credential wall in
 * the Certifications section is where the individual titles live.
 */

export interface Capability {
  title: string;
  detail: string;
  /** Certification names from content/certifications.ts that evidence this. */
  backing: string[];
}

export const aiCapabilities: Capability[] = [
  {
    title: "Agent orchestration",
    detail:
      "Designing multi-step agents that plan, call tools, and review their own output instead of answering in one shot.",
    backing: ["Introduction to Subagents", "Introduction to Agent Skills", "Claude Code in Action"],
  },
  {
    title: "MCP integrations",
    detail:
      "Wiring Model Context Protocol servers so an agent can read and write real systems: repositories, trackers, chat.",
    backing: ["Model Context Protocol: Advanced Topics", "Introduction to Model Context Protocol"],
  },
  {
    title: "Building on the API",
    detail:
      "Tool definitions, structured output, streaming, and prompt caching against the Claude API directly.",
    backing: ["Building with the Claude API", "Claude Platform 101"],
  },
  {
    title: "Cloud deployment",
    detail: "Running the same workloads through Amazon Bedrock and Google Cloud rather than a single vendor path.",
    backing: ["Claude with Amazon Bedrock", "Claude on Google Cloud"],
  },
];

/**
 * The pipeline actually shipped at Dubizzle Labs, and the thing the diagram in
 * this section illustrates.
 */
export const pipelineSummary =
  "At Dubizzle Labs I built an agentic pipeline over MCP servers that keeps GitHub, ClickUp, and Slack in sync, and opens and self-reviews pull requests without anyone driving it.";

/**
 * Icon keys rather than components: this file stays plain data, and
 * PipelineDiagram owns the mapping to Phosphor icons.
 */
export type PipelineIcon =
  | "lightning"
  | "link"
  | "brain"
  | "robot"
  | "github"
  | "clickup"
  | "slack"
  | "check";

/** A block on the main left-to-right spine of the pipeline. */
export interface PipelineStep {
  id: string;
  icon: PipelineIcon;
  label: string;
  /** Small text above the block, matching the reference's "When X happens" caption. */
  caption?: string;
  /** A sub-node hanging below this step on a dashed connector, e.g. its model. */
  sub?: { icon: PipelineIcon; label: string; tag: string };
}

/** A leaf the agent's "Tool" slot fans out to. */
export interface PipelineTool {
  id: string;
  icon: PipelineIcon;
  label: string;
}

export const pipelineSteps: PipelineStep[] = [
  {
    id: "trigger",
    icon: "lightning",
    label: "PR opened",
  },
  {
    id: "mcp",
    icon: "link",
    label: "MCP Servers",
    sub: { icon: "brain", label: "Claude", tag: "Model" },
  },
  {
    id: "agent",
    icon: "robot",
    label: "AI Agent",
  },
];

export const pipelineTools: PipelineTool[] = [
  { id: "github", icon: "github", label: "GitHub" },
  { id: "clickup", icon: "clickup", label: "ClickUp" },
  { id: "slack", icon: "slack", label: "Slack" },
];

export const pipelineOutcome = { icon: "check" as PipelineIcon, label: "Reviews & merges" };
