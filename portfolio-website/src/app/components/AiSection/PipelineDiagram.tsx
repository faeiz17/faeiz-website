import {
  Lightning,
  Link as LinkIcon,
  Brain,
  Robot,
  GithubLogo,
  ListChecks,
  SlackLogo,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import {
  pipelineSteps,
  pipelineTools,
  pipelineOutcome,
  type PipelineIcon,
} from "../../lib/content/ai";

/**
 * A left-to-right workflow diagram — trigger, MCP servers, agent, the tools it
 * reaches, the outcome — in the style workflow builders (n8n, Zapier) use for
 * this exact shape of thing: rounded blocks on a spine, sub-nodes hanging off
 * dashed connectors, a dotted canvas underneath.
 *
 * Plain SVG + DOM rather than the WebGL hub-and-spoke this replaced. The old
 * version was a genuine 3D graph, but the shape it drew — one core, three
 * leaves — reads exactly the same in 2D at a fraction of the weight, and this
 * layout can actually show the trigger and the outcome, which a radial graph
 * has no room for.
 *
 * Every coordinate is in a single 1000x430 space (VB_W x VB_H below); the SVG
 * viewBox and every DOM node share it via percentages, so the wires stay
 * soldered to the blocks at any render width as long as the container keeps
 * its aspect ratio.
 *
 * Positioning rule, because it is easy to get subtly wrong: spine blocks
 * (trigger/MCP/agent) are true-centered on their point with translate(-50%,
 * -50%) since the spine line passes through their middle. Sub-nodes (the
 * hanging model/tool nodes) are TOP-anchored at their point instead — the
 * connector terminates at a diamond and the tag/icon/label stack grows
 * downward from it, same as the reference. Centering that stack instead would
 * float the icon away from the point the dashed line and diamond agree on.
 */

const VB_W = 1000;
const VB_H = 430;

const ICONS: Record<PipelineIcon, React.ComponentType<IconProps>> = {
  lightning: Lightning,
  link: LinkIcon,
  brain: Brain,
  robot: Robot,
  github: GithubLogo,
  clickup: ListChecks,
  slack: SlackLogo,
  check: CheckCircle,
};

/**
 * Everything on the spine (trigger/MCP/agent/outcome) is UI chrome, so it
 * stays in the site's accent blue. The tool leaves are real, recognisable
 * brands, so those get their actual colour instead — GitHub's own dark-mode
 * white, Slack's mark in its real four colours below.
 */
const LEAF_TINT: Partial<Record<PipelineIcon, string>> = {
  github: "text-[#f0f6fc]",
  // ClickUp's actual mark is an illustrated wordmark-adjacent glyph I don't
  // have exact path data for, so faking that shape risks shipping something
  // that just isn't their logo. This tints the existing list icon in their
  // real brand purple instead of guessing at the mark — accurate colour,
  // honest about not being their exact symbol.
  clickup: "text-[#7b68ee]",
};

/**
 * Claude's mark is a radial burst of tapered rays, which is regular enough to
 * build procedurally rather than needing exact path data — twelve identical
 * spikes rotated evenly around the centre, in Anthropic's clay/terracotta.
 */
function ClaudeMark({ size }: { size: number }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <g fill="#da7756">
        {rays.map((deg) => (
          <path
            key={deg}
            d="M50 50 Q53 34 50 8 Q47 34 50 50 Z"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Slack's mark is four separate colours, which a single-tone icon font can't
 * represent — so this is the actual mark, not a re-tinted glyph. Path data
 * from Slack's published brand SVG (four rounded bars, each a quarter-turn
 * from the last).
 */
function SlackMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 2447.6 2452.5" aria-hidden>
      <path
        d="M897.4 0C763.1 0 654.5 108.7 654.5 243c0 134.3 108.6 243 242.9 243h243V243C1140.4 108.7 1031.8 0 897.4 0zm0 648.5H243C108.7 648.5 0 757.1 0 891.4c0 134.3 108.7 243 243 243h654.5c134.3 0 243-108.7 243-243 0-134.3-108.7-242.9-243-242.9z"
        fill="#36C5F0"
      />
      <path
        d="M2447.6 891.4c0-134.3-108.7-243-243-243-134.3 0-243 108.7-243 243v243h243c134.3 0 243-108.7 243-243zm-648.6 0V243c0-134.3-108.6-243-242.9-243-134.3 0-243 108.7-243 243v648.4c0 134.3 108.7 243 243 243 134.3 0 242.9-108.7 242.9-243z"
        fill="#2EB67D"
      />
      <path
        d="M1556.1 2452.5c134.3 0 243-108.7 243-243s-108.7-243-243-243h-243v243c0 134.3 108.6 243 243 243zm0-648.5h654.5c134.3 0 243-108.7 243-243s-108.7-243-243-243h-654.5c-134.3 0-243 108.7-243 243s108.7 243 243 243z"
        fill="#ECB22E"
      />
      <path
        d="M0 1561c0 134.3 108.7 243 243 243s243-108.7 243-243v-243H243c-134.3 0-243 108.7-243 243zm648.5 0v648.5c0 134.3 108.6 243 242.9 243 134.3 0 243-108.7 243-243V1561c0-134.3-108.7-243-243-243-134.3 0-242.9 108.7-242.9 243z"
        fill="#E01E5A"
      />
    </svg>
  );
}

/** Renders the real mark where one is built, an accurately-tinted glyph otherwise. */
function BrandIcon({ icon, size }: { icon: PipelineIcon; size: number }) {
  if (icon === "slack") return <SlackMark size={size} />;
  if (icon === "brain") return <ClaudeMark size={size} />;
  const Icon = ICONS[icon];
  return <Icon size={size} weight="bold" className={LEAF_TINT[icon] ?? "text-accent"} />;
}

const TRIGGER = { x: 90, y: 150 };
const MCP = { x: 350, y: 150 };
const MCP_SUB = { x: 350, y: 275 };
const AGENT = { x: 650, y: 150 };
const OUTCOME = { x: 910, y: 150 };
const TOOL_TOP = 275;
const TOOLS = [
  { ...pipelineTools[0], x: 530, top: TOOL_TOP },
  { ...pipelineTools[1], x: 650, top: TOOL_TOP },
  { ...pipelineTools[2], x: 770, top: TOOL_TOP },
];

const pct = (v: number, axis: "x" | "y") => `${(v / (axis === "x" ? VB_W : VB_H)) * 100}%`;
const at = (p: { x: number; y: number }) => ({ left: pct(p.x, "x"), top: pct(p.y, "y") });

function path(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

export default function PipelineDiagram() {
  const [trigger, mcp, agent] = pipelineSteps;
  const spine = path([TRIGGER, MCP, AGENT, OUTCOME]);

  return (
    <div className="relative aspect-[1000/430] w-full">
      {/* Dotted canvas, the workflow-builder tell. */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-card opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgb(255 255 255 / 0.14) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          id="spine"
          d={spine}
          fill="none"
          stroke="rgb(127 178 255 / 0.32)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        <path
          d={path([MCP, MCP_SUB])}
          fill="none"
          stroke="rgb(127 178 255 / 0.28)"
          strokeWidth={1.5}
          strokeDasharray="4 5"
          vectorEffect="non-scaling-stroke"
        />

        {TOOLS.map((tool) => (
          <path
            key={tool.id}
            id={`branch-${tool.id}`}
            d={path([AGENT, { x: AGENT.x, y: tool.top - 20 }, { x: tool.x, y: tool.top }])}
            fill="none"
            stroke="rgb(127 178 255 / 0.28)"
            strokeWidth={1.5}
            strokeDasharray="4 5"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Pulses travelling the spine and each branch, phased so they don't
            all fire together — the "data is flowing" cue this whole thing
            exists to give. */}
        <circle r={4.5} fill="#a8caff">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin="0s">
            <mpath href="#spine" />
          </animateMotion>
        </circle>
        {TOOLS.map((tool, i) => (
          <circle key={tool.id} r={3.5} fill="#a8caff" opacity={0.85}>
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.5}s`}>
              <mpath href={`#branch-${tool.id}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>

      <Diamond point={MCP} />
      <Diamond point={AGENT} />
      <Diamond point={MCP_SUB} />
      {TOOLS.map((tool) => (
        <Diamond key={tool.id} point={{ x: tool.x, y: tool.top }} />
      ))}

      <Block point={TRIGGER} step={trigger} pill />
      <Block point={MCP} step={mcp} />
      <Block point={AGENT} step={agent} large />
      <Sub point={MCP_SUB} icon={mcp.sub!.icon} label={mcp.sub!.label} tag={mcp.sub!.tag} />

      {TOOLS.map((tool) => (
        <Leaf key={tool.id} point={{ x: tool.x, y: tool.top }} icon={tool.icon} label={tool.label} tag="Tool" />
      ))}

      <Outcome point={OUTCOME} />
    </div>
  );
}

/** Marker at a wire junction, true-centered on the point it sits at. */
function Diamond({ point }: { point: { x: number; y: number } }) {
  return (
    <span
      aria-hidden
      className="absolute size-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-accent/50 bg-[#0d0f1a]"
      style={at(point)}
    />
  );
}

function Block({
  point,
  step,
  large = false,
  pill = false,
}: {
  point: { x: number; y: number };
  step: (typeof pipelineSteps)[number];
  large?: boolean;
  pill?: boolean;
}) {
  const Icon = ICONS[step.icon];
  return (
    <>
      {step.caption && (
        <p
          className="absolute w-32 text-center text-[0.6875rem] leading-snug text-ink-muted"
          style={{ ...at(point), transform: "translate(-50%, calc(-100% - 14px))" }}
        >
          {step.caption}
        </p>
      )}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
        style={at(point)}
      >
        <div
          className={`glass flex items-center gap-2 px-4 py-3 ${
            pill ? "rounded-full" : large ? "rounded-xl border-accent/25" : "rounded-xl"
          }`}
        >
          <Icon size={large ? 20 : 17} weight="bold" className="shrink-0 text-accent" />
          <span
            className={`font-display font-bold tracking-[-0.01em] text-ink ${
              large ? "text-[0.9375rem]" : "text-[0.8125rem]"
            }`}
          >
            {step.label}
          </span>
        </div>
      </div>
    </>
  );
}

/** Top-anchored: the tag/icon/label stack grows downward from `point`, which is where the dashed line and diamond terminate. */
function Sub({
  point,
  icon,
  label,
  tag,
}: {
  point: { x: number; y: number };
  icon: PipelineIcon;
  label: string;
  tag: string;
}) {
  return (
    <div
      className="absolute w-max text-center"
      style={{ ...at(point), transform: "translate(-50%, 10px)" }}
    >
      <p className="text-[0.625rem] uppercase tracking-[0.08em] text-ink-muted">{tag}</p>
      <div className="glass mx-auto mt-1.5 flex size-11 items-center justify-center overflow-hidden rounded-full">
        <BrandIcon icon={icon} size={18} />
      </div>
      <p className="mt-1.5 text-[0.6875rem] text-ink-secondary">{label}</p>
    </div>
  );
}

function Leaf({
  point,
  icon,
  label,
  tag,
}: {
  point: { x: number; y: number };
  icon: PipelineIcon;
  label: string;
  tag: string;
}) {
  return (
    <div
      className="absolute w-max text-center"
      style={{ ...at(point), transform: "translate(-50%, 10px)" }}
    >
      <p className="text-[0.625rem] uppercase tracking-[0.08em] text-ink-muted">{tag}</p>
      <div className="glass mx-auto mt-1.5 flex size-12 items-center justify-center overflow-hidden rounded-full">
        <BrandIcon icon={icon} size={20} />
      </div>
      <p className="mt-1.5 text-[0.75rem] font-medium text-ink-secondary">{label}</p>
    </div>
  );
}

function Outcome({ point }: { point: { x: number; y: number } }) {
  const Icon = ICONS[pipelineOutcome.icon];
  return (
    <div className="absolute -translate-x-1/3 -translate-y-1/3 text-center" style={at(point)}>
      <div className="glass mx-auto flex size-10 items-center justify-center rounded-full border-accent/30">
        <Icon size={18} weight="bold" className="text-accent" />
      </div>
      <p className="mt-1.5 w-24 text-[0.6875rem] leading-snug text-ink-muted">{pipelineOutcome.label}</p>
    </div>
  );
}
