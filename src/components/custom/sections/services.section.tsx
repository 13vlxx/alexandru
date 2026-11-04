import { type CSSProperties, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "#/components/custom/_utils/section-heading";
import { SpotlightCard } from "#/components/custom/cards/spotlight-card";
import { SERVICE_VISUALS } from "#/components/custom/visuals/service.visual";
import { useScrollChapters } from "#/hooks/use-scroll-chapters";
import { useSectionReveal } from "#/hooks/use-section-reveal";

const SERVICE_DEFS = [
	{
		key: "frontend" as const,
		tint: 286,
		tags: ["React", "TypeScript", "Tanstack Start", "Tailwind"],
	},
	{
		key: "backend" as const,
		tint: 255,
		tags: ["Node.js", "MongoDB", "PostgreSQL"],
	},
	{
		key: "mobile" as const,
		tint: 325,
		tags: ["SwiftUI", "JetpackCompose", "Expo"],
	},
	{
		key: "infra" as const,
		tint: 215,
		tags: ["Kubernetes", "Docker"],
	},
	{
		key: "deployment" as const,
		tint: 350,
		tags: ["GitHub Actions", "Helm", "ArgoCD", "Grafana"],
	},
];

const slideState = (index: number, active: number) => {
	if (index === active) return "active";
	return index < active ? "before" : "after";
};

type Service = {
	key: (typeof SERVICE_DEFS)[number]["key"];
	tint: number;
	tags: string[];
	title: string;
	subtitle: string;
	description: string;
};

/**
 * Mobile only. The stage stays pinned while the chapters scroll out from under
 * it, so every visual sits next to its text and the page scroll stays free.
 * Text is gone before it reaches the stage, which therefore needs no backdrop.
 */
const ServiceStory = ({ services }: { services: Service[] }) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLOListElement>(null);
	const active = useScrollChapters(rootRef, stageRef, listRef);

	return (
		<div data-reveal-group className="lg:hidden">
			<div ref={rootRef} data-reveal className="service-story relative -mx-6">
				<div
					aria-hidden="true"
					className="service-track pointer-events-none absolute inset-x-0 top-0 bottom-(--chapter)"
				>
					<div ref={stageRef} className="sticky top-(--stage-top) h-(--stage)">
						{services.map(({ key, tint }, i) => {
							const Visual = SERVICE_VISUALS[key];
							return (
								<div
									key={key}
									className="service-scene absolute inset-0"
									style={{ "--i": i, "--tint": tint } as CSSProperties}
								>
									<div
										data-state={slideState(i, active)}
										className="stage-slide absolute inset-0"
									>
										<Visual whole />
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<ol ref={listRef} className="relative pt-(--stage)">
					{services.map((s, i) => (
						<li
							key={s.key}
							className="service-chapter h-(--chapter) px-6 pt-6"
							style={{ "--i": i } as CSSProperties}
						>
							<div className="mx-auto max-w-xl">
								<p className="mb-2 text-xs font-medium tabular-nums tracking-wide text-white/55">
									{String(i + 1).padStart(2, "0")} /{" "}
									{String(services.length).padStart(2, "0")}
								</p>
								<h3 className="font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-white">
									{s.title} <span className="text-white/55">{s.subtitle}</span>
								</h3>
								<p className="mt-3 text-pretty text-sm leading-relaxed text-white/70">
									{s.description}
								</p>
								<ul className="mt-4 flex flex-wrap gap-1.5">
									{s.tags.map((tag) => (
										<li
											key={tag}
											className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-white/70"
										>
											{tag}
										</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export const ServicesSection = () => {
	const { t } = useTranslation();
	const services = SERVICE_DEFS.map((s) => ({
		...s,
		title: t(`services.items.${s.key}.title`),
		subtitle: t(`services.items.${s.key}.subtitle`),
		description: t(`services.items.${s.key}.description`),
	}));
	const [active, setActive] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);
	useSectionReveal(sectionRef);

	return (
		<section
			id="services"
			ref={sectionRef}
			className="relative bg-background max-lg:overflow-clip lg:overflow-hidden"
		>
			<div className="relative mx-auto max-w-6xl px-6 py-28">
				<SectionHeading
					label={t("services.section_label")}
					line1={t("services.heading_1")}
					line2={t("services.heading_2")}
				/>

				<ServiceStory services={services} />

				<div
					data-reveal-group
					className="grid grid-cols-1 gap-6 max-lg:hidden lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16"
				>
					<ul>
						{services.map((s, i) => {
							const isActive = i === active;
							return (
								<li
									key={s.key}
									data-reveal
									className="border-t border-white/10"
								>
									<h3>
										<button
											type="button"
											id={`service-${s.key}`}
											aria-expanded={isActive}
											aria-controls={`service-${s.key}-panel`}
											onPointerDown={(e) => {
												if (e.pointerType === "mouse") setActive(i);
											}}
											onClick={() => setActive(i)}
											className={`group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-2xl font-bold tracking-tight transition-colors duration-200 md:text-[2rem] ${isActive ? "text-white" : "text-white/55 hover:text-white/80"}`}
										>
											<span className="origin-left transition-transform duration-100 ease-out group-active:scale-[0.98]">
												{s.title}{" "}
												<span className={isActive ? "text-white/55" : ""}>
													{s.subtitle}
												</span>
											</span>
											<span
												aria-hidden="true"
												className={`size-2 shrink-0 rounded-full bg-brand-soft transition-[scale,opacity] duration-300 ease-spring motion-reduce:transition-opacity ${isActive ? "opacity-100" : "scale-0 opacity-0"}`}
											/>
										</button>
									</h3>
									<section
										id={`service-${s.key}-panel`}
										aria-labelledby={`service-${s.key}`}
										inert={!isActive}
										className={`grid transition-[grid-template-rows,opacity] duration-500 ease-spring motion-reduce:transition-opacity ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
									>
										<div className="min-h-0 overflow-hidden">
											<p className="mb-4 max-w-[46ch] text-pretty text-sm leading-relaxed text-white/70 md:text-base">
												{s.description}
											</p>
											<ul className="flex flex-wrap gap-1.5 pb-6">
												{s.tags.map((tag) => (
													<li
														key={tag}
														className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-white/70"
													>
														{tag}
													</li>
												))}
											</ul>
										</div>
									</section>
								</li>
							);
						})}
					</ul>

					<SpotlightCard className="order-first aspect-[4/3] lg:order-last lg:aspect-auto lg:min-h-[37rem]">
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,color-mix(in_srgb,var(--brand)_16%,transparent),transparent)]"
						>
							{services.map(({ key }, i) => {
								const Visual = SERVICE_VISUALS[key];
								return (
									<div
										key={key}
										data-state={slideState(i, active)}
										className="stage-slide absolute inset-0"
									>
										<Visual />
									</div>
								);
							})}
						</div>
					</SpotlightCard>
				</div>
			</div>
		</section>
	);
};
