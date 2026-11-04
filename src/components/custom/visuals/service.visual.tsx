import type { CSSProperties, FC, ReactNode } from "react";

type PieceKind = "rise" | "grow" | "pop" | "draw";

export const piece = (kind: PieceKind, i: number, shift?: number) => ({
	"data-piece": kind,
	style: {
		"--i": i,
		...(shift === undefined ? {} : { "--shift": `${shift}px` }),
	} as CSSProperties,
});

export const Canvas = ({
	children,
	fit = "xMidYMid meet",
	viewBox = "0 0 480 400",
}: {
	children: ReactNode;
	fit?: string;
	viewBox?: string;
}) => (
	<svg
		aria-hidden="true"
		viewBox={viewBox}
		preserveAspectRatio={fit}
		className="absolute inset-0 size-full"
		fill="none"
	>
		{children}
	</svg>
);

const ISO_ORIGIN_X = 204;
const ISO_SIZE = 190;
const isoMatrix = (y: number) =>
	`matrix(0.866 0.5 -0.866 0.5 ${ISO_ORIGIN_X} ${y})`;

const IsoPlane = ({
	y,
	className,
	children,
}: {
	y: number;
	className: string;
	children: ReactNode;
}) => (
	<g transform={isoMatrix(y)}>
		<rect width={ISO_SIZE} height={ISO_SIZE} rx={14} className={className} />
		{children}
	</g>
);

const LAYERS = [
	{ label: "tokens", y: 190, shift: -85 },
	{ label: "components", y: 105, shift: 0 },
	{ label: "page", y: 20, shift: 85 },
];

const SWATCHES = [0, 1, 2, 3].flatMap((row) =>
	[0, 1, 2, 3].map((col) => ({ row, col })),
);

const FrontendVisual = () => (
	<Canvas>
		{/* tokens */}
		<g {...piece("rise", 0, LAYERS[0].shift)}>
			<IsoPlane y={LAYERS[0].y} className="fill-white/[0.03] stroke-white/20">
				{SWATCHES.map(({ row, col }) => (
					<rect
						key={`${row}-${col}`}
						x={19 + col * 40}
						y={19 + row * 40}
						width={32}
						height={32}
						rx={8}
						className="fill-brand-soft"
						opacity={0.12 + (row + col) * 0.11}
					/>
				))}
			</IsoPlane>
		</g>
		{/* components */}
		<g {...piece("rise", 1, LAYERS[1].shift)}>
			<IsoPlane y={LAYERS[1].y} className="fill-background stroke-white/25">
				<rect
					x={19}
					y={19}
					width={152}
					height={72}
					rx={10}
					className="fill-white/10"
				/>
				<rect
					x={19}
					y={103}
					width={70}
					height={68}
					rx={10}
					className="fill-white/10"
				/>
				<rect
					x={101}
					y={103}
					width={70}
					height={30}
					rx={15}
					className="fill-brand"
				/>
				<rect
					x={101}
					y={141}
					width={70}
					height={30}
					rx={15}
					className="stroke-white/40"
				/>
			</IsoPlane>
		</g>
		{/* page */}
		<g {...piece("rise", 2, LAYERS[2].shift)}>
			<IsoPlane y={LAYERS[2].y} className="fill-background stroke-white/40">
				<rect
					x={19}
					y={22}
					width={112}
					height={14}
					rx={7}
					className="fill-white/90"
				/>
				<rect
					x={19}
					y={46}
					width={150}
					height={8}
					rx={4}
					className="fill-white/30"
				/>
				<rect
					x={19}
					y={62}
					width={120}
					height={8}
					rx={4}
					className="fill-white/30"
				/>
				<rect
					x={19}
					y={90}
					width={152}
					height={82}
					rx={12}
					className="fill-brand/30 stroke-brand-soft/60"
				/>
			</IsoPlane>
		</g>
		{LAYERS.map(({ label, y }, i) => (
			<text
				key={label}
				{...piece("rise", 4 + i)}
				x={ISO_ORIGIN_X + ISO_SIZE * 0.866 + 12}
				y={y + ISO_SIZE / 2 + 4}
				fontSize={14}
				className="fill-white/55 font-mono"
			>
				{label}
			</text>
		))}
	</Canvas>
);

const SPANS = [
	{ label: "gateway", start: 0, end: 1, strong: true },
	{ label: "auth", start: 0.03, end: 0.17 },
	{ label: "cache", start: 0.17, end: 0.25 },
	{ label: "postgres", start: 0.25, end: 0.74, strong: true },
	{ label: "events", start: 0.74, end: 0.84 },
	{ label: "serialize", start: 0.84, end: 0.97 },
];

const TRACE_X = 152;
const TRACE_WIDTH = 276;

const BackendVisual = () => (
	<Canvas>
		<g {...piece("rise", 0)}>
			<text x={52} y={82} fontSize={14} className="fill-white/90 font-mono">
				GET /api/projects
			</text>
			<text
				x={TRACE_X + TRACE_WIDTH}
				y={82}
				fontSize={14}
				textAnchor="end"
				className="fill-brand-soft font-mono"
			>
				200
			</text>
		</g>
		{[0, 0.25, 0.5, 0.75, 1].map((tick) => (
			<line
				key={tick}
				x1={TRACE_X + tick * TRACE_WIDTH}
				x2={TRACE_X + tick * TRACE_WIDTH}
				y1={106}
				y2={346}
				className="stroke-white/[0.07]"
			/>
		))}
		{SPANS.map(({ label, start, end, strong }, i) => {
			const y = 122 + i * 38;
			return (
				<g key={label}>
					<text
						{...piece("rise", i + 1)}
						x={52}
						y={y + 11}
						fontSize={13}
						className="fill-white/55 font-mono"
					>
						{label}
					</text>
					<rect
						{...piece("grow", i + 1)}
						x={TRACE_X + start * TRACE_WIDTH}
						y={y}
						width={(end - start) * TRACE_WIDTH}
						height={14}
						rx={7}
						className={strong ? "fill-brand-soft" : "fill-white/30"}
					/>
				</g>
			);
		})}
	</Canvas>
);

const PhoneScreen = ({ x, y }: { x: number; y: number }) => (
	<g transform={`translate(${x} ${y})`}>
		<rect width={72} height={10} rx={5} className="fill-white/90" />
		<rect
			y={26}
			width={130}
			height={96}
			rx={14}
			className="fill-brand/40 stroke-brand-soft/60"
		/>
		{[0, 1, 2].map((row) => (
			<g key={row} transform={`translate(0 ${138 + row * 44})`}>
				<circle cx={14} cy={14} r={14} className="fill-white/10" />
				<rect
					x={38}
					y={5}
					width={92}
					height={7}
					rx={3.5}
					className="fill-white/30"
				/>
				<rect
					x={38}
					y={18}
					width={60}
					height={6}
					rx={3}
					className="fill-white/10"
				/>
			</g>
		))}
	</g>
);

const PHONE_BODY = "fill-background stroke-white/30";

type ServiceVisualProps = { whole?: boolean };

// Les téléphones débordent du cadre sur desktop ; `whole` les montre en entier
const MobileVisual = ({ whole }: ServiceVisualProps) => (
	<Canvas
		fit={whole ? undefined : "xMidYMax slice"}
		viewBox={whole ? "48 48 384 420" : undefined}
	>
		<g {...piece("rise", 1, 56)}>
			<rect
				x={254}
				y={112}
				width={158}
				height={340}
				rx={28}
				className={PHONE_BODY}
				strokeWidth={1.5}
			/>
			<circle cx={333} cy={130} r={5} className="fill-white/30" />
			<PhoneScreen x={268} y={150} />
		</g>
		<g {...piece("rise", 0, 56)}>
			<rect
				x={68}
				y={62}
				width={158}
				height={390}
				rx={34}
				className={PHONE_BODY}
				strokeWidth={1.5}
			/>
			<rect
				x={118}
				y={76}
				width={58}
				height={16}
				rx={8}
				className="fill-white/30"
			/>
			<PhoneScreen x={82} y={110} />
		</g>
	</Canvas>
);

const NODES = [
	{ x: 44, pods: [1, 1, 1, 1, 0, 0] },
	{ x: 180, pods: [1, 1, 1, 1, 1, 0] },
	{ x: 316, pods: [1, 1, 1, 0, 0, 0] },
];

const NODE_WIDTH = 120;

const InfraVisual = () => (
	<Canvas>
		<g {...piece("rise", 0)}>
			<rect
				x={160}
				y={44}
				width={160}
				height={40}
				rx={20}
				className="fill-background stroke-brand-soft/60"
			/>
			<text
				x={240}
				y={69}
				fontSize={13}
				textAnchor="middle"
				className="fill-white/90 font-mono"
			>
				control-plane
			</text>
		</g>
		{NODES.map(({ x }, i) => (
			<path
				key={x}
				{...piece("draw", 1 + i)}
				pathLength={1}
				d={`M240 84 C240 112 ${x + NODE_WIDTH / 2} 104 ${x + NODE_WIDTH / 2} 132`}
				className="stroke-white/30"
			/>
		))}
		{NODES.map(({ x, pods }, nodeIndex) => (
			<g key={x}>
				<g {...piece("rise", 3 + nodeIndex)}>
					<rect
						x={x}
						y={132}
						width={NODE_WIDTH}
						height={224}
						rx={18}
						className="fill-white/[0.03] stroke-white/20"
					/>
					<text
						x={x + NODE_WIDTH / 2}
						y={156}
						fontSize={12}
						textAnchor="middle"
						className="fill-white/55 font-mono"
					>
						{`node-${nodeIndex + 1}`}
					</text>
				</g>
				{pods.map((running, podIndex) => (
					<rect
						// biome-ignore lint/suspicious/noArrayIndexKey: grille fixe, jamais réordonnée
						key={podIndex}
						{...piece("pop", 5 + nodeIndex + podIndex)}
						x={x + 16 + (podIndex % 2) * 46}
						y={172 + Math.floor(podIndex / 2) * 58}
						width={42}
						height={46}
						rx={11}
						className={
							running
								? "fill-brand-soft/80"
								: "stroke-white/20 [stroke-dasharray:4_4]"
						}
					/>
				))}
			</g>
		))}
	</Canvas>
);

const STEPS = [
	{ label: "Build", tool: "GitHub Actions" },
	{ label: "Package", tool: "Helm" },
	{ label: "Sync", tool: "ArgoCD" },
	{ label: "Observe", tool: "Grafana" },
	{ label: "Live", tool: "production" },
];

const STEP_X = 96;
const STEP_TOP = 64;
const STEP_GAP = 68;

const DeploymentVisual = () => (
	<Canvas>
		<path
			{...piece("draw", 0)}
			pathLength={1}
			d={`M${STEP_X} ${STEP_TOP} V${STEP_TOP + STEP_GAP * (STEPS.length - 1)}`}
			className="stroke-brand-soft/60"
			strokeWidth={2}
		/>
		{STEPS.map(({ label, tool }, i) => {
			const y = STEP_TOP + i * STEP_GAP;
			const isLast = i === STEPS.length - 1;
			return (
				<g key={label} {...piece("rise", 1 + i * 2)}>
					<circle
						cx={STEP_X}
						cy={y}
						r={isLast ? 15 : 13}
						className={
							isLast ? "fill-brand-soft" : "fill-background stroke-brand-soft"
						}
					/>
					<path
						d={`M${STEP_X - 5} ${y} l3.5 3.5 l6.5 -7`}
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className={isLast ? "stroke-background" : "stroke-brand-soft"}
					/>
					<text
						x={STEP_X + 34}
						y={y + 6}
						fontSize={18}
						className="fill-white/90 font-semibold"
					>
						{label}
					</text>
					<text
						x={420}
						y={y + 5}
						fontSize={13}
						textAnchor="end"
						className="fill-white/55 font-mono"
					>
						{tool}
					</text>
				</g>
			);
		})}
	</Canvas>
);

export const SERVICE_VISUALS: Record<
	"frontend" | "backend" | "mobile" | "infra" | "deployment",
	FC<ServiceVisualProps>
> = {
	frontend: FrontendVisual,
	backend: BackendVisual,
	mobile: MobileVisual,
	infra: InfraVisual,
	deployment: DeploymentVisual,
};
