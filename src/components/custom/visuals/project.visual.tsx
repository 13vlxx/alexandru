import type { FC } from "react";
import { Canvas, piece } from "#/components/custom/visuals/service.visual";

const LINK = "stroke-white/30";
const PILL = "fill-background stroke-white/25";
const LABEL = "fill-white/70 font-mono";

const TOOLS = [
	{ label: "api", y: 64 },
	{ label: "data", y: 178 },
	{ label: "queue", y: 292 },
];

const TOOL_LINKS = [
	"M304 200 C332 200 324 86 352 86",
	"M304 200 H352",
	"M304 200 C332 200 324 314 352 314",
];

const OreusVisual = () => (
	<Canvas>
		<path
			{...piece("draw", 2)}
			pathLength={1}
			d="M120 200 H176"
			className={LINK}
		/>
		{TOOL_LINKS.map((d, i) => (
			<path
				key={d}
				{...piece("draw", 5 + i)}
				pathLength={1}
				d={d}
				className={LINK}
			/>
		))}
		<g {...piece("rise", 0)}>
			<rect x={24} y={178} width={96} height={44} rx={22} className={PILL} />
			<text x={72} y={205} fontSize={15} textAnchor="middle" className={LABEL}>
				input
			</text>
		</g>
		<g {...piece("pop", 3)}>
			<rect
				x={176}
				y={136}
				width={128}
				height={128}
				rx={36}
				className="fill-(--accent)/15 stroke-(--accent)/70"
			/>
			<path
				d="M240 164 C244 188 252 196 276 200 C252 204 244 212 240 236 C236 212 228 204 204 200 C228 196 236 188 240 164Z"
				className="fill-(--accent)"
			/>
		</g>
		{TOOLS.map(({ label, y }, i) => (
			<g key={label} {...piece("rise", 8 + i)}>
				<rect x={352} y={y} width={104} height={44} rx={22} className={PILL} />
				<text
					x={404}
					y={y + 27}
					fontSize={15}
					textAnchor="middle"
					className={LABEL}
				>
					{label}
				</text>
			</g>
		))}
	</Canvas>
);

const PAPER = "#fbf8f1";
const INK = "#2a2118";
const GOLD = "#b8914a";

const TREATMENT_ROWS = [150, 118, 136, 104];
const TABS = [
	{ x: 116, width: 72 },
	{ x: 196, width: 60 },
	{ x: 264, width: 84 },
];

const RaissaVisual = () => (
	<Canvas fit="xMidYMin slice">
		<g {...piece("rise", 0, 48)}>
			<rect x={90} y={52} width={300} height={400} rx={24} fill={PAPER} />
			<text
				x={116}
				y={112}
				fontSize={34}
				fill={INK}
				className="font-display font-bold"
			>
				Raïssa
			</text>
			<text
				x={116}
				y={148}
				fontSize={26}
				fill={GOLD}
				className="font-display italic"
			>
				Beauty
			</text>
		</g>
		<g {...piece("pop", 4)}>
			<circle cx={332} cy={106} r={30} stroke={GOLD} />
			<circle
				cx={332}
				cy={106}
				r={23}
				stroke={GOLD}
				strokeDasharray="2 5"
				strokeLinecap="round"
			/>
			<circle cx={332} cy={106} r={5} fill={GOLD} />
		</g>
		{TABS.map(({ x, width }, i) => (
			<rect
				key={x}
				{...piece("pop", 5 + i)}
				x={x}
				y={176}
				width={width}
				height={26}
				rx={13}
				fill={i === 0 ? GOLD : "#efe6d4"}
			/>
		))}
		{TREATMENT_ROWS.map((width, i) => {
			const y = 232 + i * 42;
			return (
				<g key={y} {...piece("rise", 8 + i)}>
					<rect
						x={116}
						y={y}
						width={width}
						height={9}
						rx={4.5}
						fill={INK}
						opacity={0.75}
					/>
					<line
						x1={116 + width + 10}
						x2={324}
						y1={y + 7}
						y2={y + 7}
						stroke={GOLD}
						strokeDasharray="1 5"
						strokeLinecap="round"
					/>
					<rect x={332} y={y} width={32} height={9} rx={4.5} fill={GOLD} />
				</g>
			);
		})}
	</Canvas>
);

const CENTER = { x: 240, y: 200 };
const BLADE_ANGLES = Array.from({ length: 24 }, (_, i) => i * 15);

const AirbusVisual = () => (
	<Canvas>
		<circle
			{...piece("pop", 0)}
			cx={CENTER.x}
			cy={CENTER.y}
			r={176}
			className="stroke-white/10"
		/>
		<g {...piece("pop", 2)}>
			{/* Un cran vaut 15° : la roue revient sur elle-même, sans saut au repos */}
			<g className="origin-center transition-[rotate] duration-1000 ease-spring [transform-box:fill-box] group-hover:rotate-[15deg] motion-reduce:transition-none">
				<circle
					cx={CENTER.x}
					cy={CENTER.y}
					r={150}
					className="stroke-white/25"
				/>
				{BLADE_ANGLES.map((angle) => (
					<path
						key={angle}
						transform={`rotate(${angle} ${CENTER.x} ${CENTER.y})`}
						d="M240 58 C262 92 262 128 250 166 L232 166 C242 128 244 92 240 58Z"
						className="fill-(--accent)/10 stroke-(--accent)/50"
					/>
				))}
			</g>
		</g>
		<g {...piece("pop", 5)}>
			<circle
				cx={CENTER.x}
				cy={CENTER.y}
				r={36}
				className="fill-background stroke-(--accent)"
			/>
			<circle cx={CENTER.x} cy={CENTER.y} r={7} className="fill-(--accent)" />
		</g>
		<g {...piece("rise", 8)}>
			<circle
				cx={322}
				cy={110}
				r={20}
				className="fill-background/40 stroke-white [stroke-dasharray:4_4]"
			/>
			<path d="M336 96 L368 64 H420" className="stroke-white/60" />
			<text x={372} y={54} fontSize={15} className="fill-white/90 font-mono">
				sample
			</text>
		</g>
	</Canvas>
);

const CELL = 36;
const CELL_STEP = 44;
const CALENDAR = Array.from({ length: 28 }, (_, day) => ({
	day,
	x: 90 + (day % 7) * CELL_STEP,
	y: 96 + Math.floor(day / 7) * CELL_STEP,
}));
const OPEN_DAYS = new Set([3, 4, 8, 12, 15, 19, 20, 24, 26]);
const PICKED_DAY = 17;

const SLOTS = [
	{ label: "10:00", x: 90 },
	{ label: "14:30", x: 194, picked: true },
	{ label: "16:00", x: 298 },
];

const dayClass = (day: number) => {
	if (day === PICKED_DAY) return "fill-(--accent)";
	return OPEN_DAYS.has(day) ? "fill-(--accent)/20" : "fill-white/[0.04]";
};

const MonacoVisual = () => (
	<Canvas>
		<g {...piece("rise", 0)}>
			<rect
				x={64}
				y={36}
				width={352}
				height={328}
				rx={28}
				className="fill-white/[0.03] stroke-white/15"
			/>
			<rect
				x={90}
				y={62}
				width={112}
				height={12}
				rx={6}
				className="fill-white/80"
			/>
		</g>
		{CALENDAR.map(({ day, x, y }) => (
			<rect
				key={day}
				{...piece("pop", 2 + day / 4)}
				x={x}
				y={y}
				width={CELL}
				height={CELL}
				rx={11}
				className={dayClass(day)}
			/>
		))}
		{SLOTS.map(({ label, x, picked }, i) => (
			<g key={label} {...piece("rise", 10 + i)}>
				<rect
					x={x}
					y={296}
					width={92}
					height={40}
					rx={20}
					className={
						picked ? "fill-(--accent)" : "fill-background stroke-white/20"
					}
				/>
				<text
					x={x + 46}
					y={321}
					fontSize={15}
					textAnchor="middle"
					className={picked ? "fill-background font-mono font-semibold" : LABEL}
				>
					{label}
				</text>
			</g>
		))}
	</Canvas>
);

export const PROJECT_VISUALS: Record<
	"oreus" | "raissa" | "airbus" | "monaco",
	FC
> = {
	oreus: OreusVisual,
	raissa: RaissaVisual,
	airbus: AirbusVisual,
	monaco: MonacoVisual,
};
