import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Silk from "#/components/custom/backgrounds/silk.background";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_DEFS = [
	{
		id: "01",
		name: "OreusAI",
		year: "2026",
		key: "oreus" as const,
		stack: ["Node.js", "TypeScript", "MongoDB", "Docker"],
		href: "https://oreus.ai/",
	},
	{
		id: "02",
		name: "Airbus Chips",
		year: "2025",
		key: "airbus" as const,
		stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
		href: "#",
	},
	{
		id: "03",
		name: "Monaco Beauté",
		year: "2025",
		key: "monaco" as const,
		stack: ["React", "TypeScript", "Node.js"],
		href: "https://monaco-beaute.lab.vlxx.fr/",
	},
];

export const ProjectsSection = () => {
	const { t } = useTranslation();
	const projects = PROJECT_DEFS.map((p) => ({
		...p,
		role: t(`projects.items.${p.key}.role`),
		description: t(`projects.items.${p.key}.description`),
	}));
	const sectionRef = useRef<HTMLElement>(null);
	const linesRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				linesRef.current?.querySelectorAll(".line-inner"),
				{ yPercent: 110 },
				{
					yPercent: 0,
					stagger: 0.1,
					duration: 1.1,
					ease: "power4.out",
					scrollTrigger: {
						trigger: linesRef.current,
						start: "top 80%",
					},
				},
			);

			gsap.fromTo(
				listRef.current?.querySelectorAll(".project-row"),
				{ y: 24, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					stagger: 0.08,
					duration: 0.65,
					ease: "power3.out",
					scrollTrigger: {
						trigger: listRef.current,
						start: "top 82%",
					},
				},
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="relative overflow-hidden bg-background"
		>
			{/* Silk background */}
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
			<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 py-28">
				{/* label */}
				<div className="mb-16">
					<span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
						{t("projects.section_label")}
					</span>
				</div>

				{/* heading */}
				<div ref={linesRef} className="mb-20">
					<div className="overflow-hidden pb-3">
						<div className="line-inner">
							<span
								className="block text-[clamp(3.5rem,8.5vw,8rem)] font-bold leading-[1.05] tracking-tight text-white"
								style={{ fontFamily: "Fraunces, Georgia, serif" }}
							>
								{t("projects.heading_1")}
							</span>
						</div>
					</div>
					<div className="overflow-hidden pb-3">
						<div className="line-inner">
							<span
								className="block text-[clamp(3.5rem,8.5vw,8rem)] font-bold leading-[1.05] tracking-tight"
								style={{
									fontFamily: "Fraunces, Georgia, serif",
									color: "#5227FF",
								}}
							>
								{t("projects.heading_2")}
							</span>
						</div>
					</div>
				</div>

				{/* project list */}
				<div ref={listRef} className="flex flex-col gap-px">
					{projects.map((p) => {
						const isExternal = p.href !== "#";
						const Tag = isExternal ? "a" : "div";
						return (
							<Tag
								key={p.id}
								{...(isExternal
									? {
											href: p.href,
											target: "_blank",
											rel: "noopener noreferrer",
										}
									: {})}
								className={`project-row group grid grid-cols-1 gap-4 border-t border-white/[0.07] py-8 transition-colors duration-200 hover:border-white/[0.15] md:grid-cols-[auto_1fr_auto] md:gap-12 ${isExternal ? "cursor-pointer" : "cursor-default"}`}
							>
								{/* number */}
								<span
									className="text-xs font-bold text-white/20 md:w-8 md:pt-1"
									style={{ fontFamily: "Fraunces, Georgia, serif" }}
								>
									{p.id}
								</span>

								{/* name + description + stack */}
								<div className="space-y-3">
									<h3
										className="text-lg font-bold leading-tight text-white/80 transition-colors duration-200 group-hover:text-white md:text-xl"
										style={{ fontFamily: "Fraunces, Georgia, serif" }}
									>
										{p.name}
									</h3>
									<p className="text-sm leading-relaxed text-white/40">
										{p.description}
									</p>
									<div className="flex flex-wrap gap-2 pt-1">
										{p.stack.map((tech) => (
											<span
												key={tech}
												className="rounded-full border border-white/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/30"
											>
												{tech}
											</span>
										))}
									</div>
								</div>

								{/* year + role + arrow */}
								<div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
									<div className="text-right">
										<p className="text-xs font-semibold text-white/25">
											{p.year}
										</p>
										<p className="text-xs text-white/20">{p.role}</p>
									</div>
									{isExternal && (
										<ArrowUpRight
											size={15}
											className="mt-0.5 shrink-0 text-white/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/55 md:mt-auto"
										/>
									)}
								</div>
							</Tag>
						);
					})}

					<div className="border-t border-white/[0.07]" />
				</div>
			</div>
		</section>
	);
};
