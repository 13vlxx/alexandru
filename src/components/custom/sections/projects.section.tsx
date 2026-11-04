import { ArrowUpRight } from "lucide-react";
import { type CSSProperties, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "#/components/custom/_utils/section-heading";
import Silk from "#/components/custom/backgrounds/silk.background";
import { SpotlightCard } from "#/components/custom/cards/spotlight-card";
import { PROJECT_VISUALS } from "#/components/custom/visuals/project.visual";
import { useCardStack } from "#/hooks/use-card-stack";
import { useInViewOnce } from "#/hooks/use-in-view-once";
import { useSectionReveal } from "#/hooks/use-section-reveal";

const PROJECT_DEFS = [
	{
		id: "01",
		name: "OreusAI",
		year: "2026",
		key: "oreus" as const,
		accent: "#8f78ff",
		stack: ["Node.js", "TypeScript", "MongoDB", "Docker"],
		href: "https://oreus.ai/",
	},
	{
		id: "02",
		name: "Raïssa Beauty",
		year: "2026",
		key: "raissa" as const,
		accent: "#d9b873",
		stack: ["React", "TypeScript", "TanStack Start", "Tailwind"],
		href: "https://raissabeauty.fr",
	},
	{
		id: "03",
		name: "Airbus Chips",
		year: "2025",
		key: "airbus" as const,
		accent: "#6cb6ff",
		stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
		href: "#",
	},
	{
		id: "04",
		name: "Monaco Beauté",
		year: "2025",
		key: "monaco" as const,
		accent: "#f0a6b8",
		stack: ["React", "TypeScript", "Node.js"],
		href: "https://monaco-beaute.lab.vlxx.fr/",
	},
];

type Props = {
	project: (typeof PROJECT_DEFS)[number];
	index: number;
};

const ProjectCard = ({ project, index }: Props) => {
	const { t } = useTranslation();
	const stageRef = useRef<HTMLDivElement>(null);
	const seen = useInViewOnce(stageRef);
	const Visual = PROJECT_VISUALS[project.key];
	const isExternal = project.href !== "#";
	const Tag = isExternal ? "a" : "div";

	return (
		<li
			data-reveal-group
			style={
				{ "--stack-index": index, "--accent": project.accent } as CSSProperties
			}
			className="stack:sticky stack:top-[calc(4.75rem+var(--stack-index)*0.5rem)] lg:stack:top-[calc(5.5rem+var(--stack-index)*0.75rem)]"
		>
			<div data-stack-sheet className="relative rounded-[2rem]">
				<Tag
					{...(isExternal
						? {
								href: project.href,
								target: "_blank",
								rel: "noopener noreferrer",
							}
						: {})}
					className={`group block rounded-[2rem] ${isExternal ? "cursor-pointer transition-[scale] duration-500 ease-spring active:scale-[0.985] active:duration-100" : "cursor-default"}`}
				>
					<SpotlightCard
						spotlightColor="color-mix(in oklab, var(--accent) 14%, transparent)"
						className="surface-card grid gap-3 p-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] stack:h-[min(40rem,calc(100svh-7.25rem))] max-lg:stack:grid-rows-[minmax(0,1fr)_auto] lg:stack:h-[min(36rem,calc(100svh-8.5rem))]"
					>
						<div className="relative flex flex-col p-4 pb-5 lg:p-6 max-lg:stack:px-2 max-lg:stack:pt-1 max-lg:stack:pb-1">
							<p className="flex items-center justify-between gap-4 text-xs font-semibold text-white/55">
								<span className="font-display">{project.id}</span>
								<span className="text-right">
									{project.year} · {t(`projects.items.${project.key}.role`)}
								</span>
							</p>

							<h3 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white lg:mt-auto max-lg:stack:mt-3 max-lg:stack:text-[1.75rem]">
								{project.name}
							</h3>
							<p className="mt-4 text-[0.9375rem] leading-relaxed text-white/70 max-lg:stack:mt-2 max-lg:stack:text-sm">
								{t(`projects.items.${project.key}.description`)}
							</p>
							<p className="mt-4 text-xs font-medium leading-relaxed text-white/55 max-lg:stack:mt-2">
								{project.stack.join(" · ")}
							</p>

							<div className="mt-6 flex min-h-11 items-center justify-between gap-4 lg:mt-8 max-lg:stack:mt-2">
								<span className="text-sm font-semibold text-white">
									{t(isExternal ? "projects.visit" : "projects.internal")}
								</span>
								{isExternal && (
									<span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-background">
										<ArrowUpRight
											aria-hidden="true"
											size={18}
											className="transition-[translate] duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
										/>
									</span>
								)}
							</div>
						</div>

						<div
							ref={stageRef}
							className="project-stage relative order-first aspect-[4/3] overflow-hidden rounded-[1.25rem] lg:order-last lg:aspect-auto lg:min-h-[28rem] stack:aspect-auto stack:min-h-0"
						>
							<div
								data-state={seen ? "active" : "after"}
								className="stage-slide absolute inset-0"
							>
								<div className="absolute inset-0 transition-[scale] duration-700 ease-spring group-hover:scale-[1.03]">
									<Visual />
								</div>
							</div>
						</div>
					</SpotlightCard>
				</Tag>
				<div
					data-stack-dim
					className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black opacity-0"
				/>
			</div>
		</li>
	);
};

export const ProjectsSection = () => {
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);
	const listRef = useRef<HTMLOListElement>(null);
	useSectionReveal(sectionRef);
	useCardStack(listRef);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="relative overflow-clip bg-background"
		>
			{/* Silk background: viewport-sized, so the long stack costs no extra pixels */}
			<div className="sticky top-0 -mb-[100svh] h-svh">
				<div className="absolute inset-0">
					<Silk
						speed={5}
						scale={1}
						color="#5227FF"
						noiseIntensity={1.5}
						rotation={0}
					/>
				</div>
				<div className="absolute inset-0 bg-background/80" />
			</div>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 py-28">
				<SectionHeading
					label={t("projects.section_label")}
					line1={t("projects.heading_1")}
					line2={t("projects.heading_2")}
				/>

				<ol ref={listRef} className="flex flex-col gap-5 stack:gap-[14svh]">
					{PROJECT_DEFS.map((project, index) => (
						<ProjectCard key={project.id} project={project} index={index} />
					))}
				</ol>
			</div>
		</section>
	);
};
