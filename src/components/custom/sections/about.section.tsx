import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "#/components/custom/_utils/section-heading";
import { SpotlightCard } from "#/components/custom/cards/spotlight-card";
import { useSectionReveal } from "#/hooks/use-section-reveal";
import { useWordScrub } from "#/hooks/use-word-scrub";

const stack = [
	"TypeScript",
	"React",
	"Node.js",
	"Go",
	"PostgreSQL",
	"Docker",
	"AWS",
	"Redis",
	"Next.js",
	"GraphQL",
	"Kubernetes",
	"Terraform",
];

const links = [
	{ label: "GitHub", href: "https://github.com/13vlxx" },
	{ label: "LinkedIn", href: "https://fr.linkedin.com/in/arusescu" },
	{ label: "Email", href: "mailto:alexmonac13@gmail.com" },
];

// Le japonais n'a pas d'espaces : chaque caractère CJK compte pour un mot
const CJK = "\\u3000-\\u9fff\\uff00-\\uffef";
const WORDS = new RegExp(`[${CJK}]|[^\\s${CJK}]+\\s*|\\s+`, "g");

const Words = ({ text }: { text: string }) => (
	<>
		<span className="sr-only">{text}</span>
		<span aria-hidden="true">
			{text.match(WORDS)?.map((word, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: texte figé, jamais réordonné
				<span key={i} data-word>
					{word}
				</span>
			))}
		</span>
	</>
);

const Statement = ({ bio, motto }: { bio: string; motto: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	useWordScrub(containerRef);

	return (
		<div
			ref={containerRef}
			className="max-w-4xl text-pretty font-display text-[clamp(1.625rem,3.4vw,2.75rem)] font-medium leading-[1.2] tracking-tight"
		>
			<p className="text-white">
				<Words text={bio} />
			</p>
			<p className="mt-[0.6em] text-brand-soft">
				<Words text={motto} />
			</p>
		</div>
	);
};

type PanelProps = {
	label: string;
	className?: string;
	children: ReactNode;
};

const Panel = ({ label, className = "", children }: PanelProps) => (
	<SpotlightCard className={`surface-card p-6 lg:p-8 ${className}`}>
		<div className="relative">
			<h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
				{label}
			</h3>
			{children}
		</div>
	</SpotlightCard>
);

const StackMarquee = () => {
	const trackRef = useRef<HTMLDivElement>(null);
	const tweenRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		const mm = gsap.matchMedia();
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			tweenRef.current = gsap.to(trackRef.current, {
				xPercent: -50,
				duration: 30,
				ease: "none",
				repeat: -1,
			});
			return () => {
				tweenRef.current = null;
			};
		});
		return () => mm.revert();
	}, []);

	// Ramp the speed so pausing and resuming stay continuous
	const setSpeed = (timeScale: number) => {
		if (!tweenRef.current) return;
		gsap.to(tweenRef.current, {
			timeScale,
			duration: 0.4,
			ease: "power2.out",
			overwrite: true,
		});
	};

	return (
		<div
			onPointerEnter={() => setSpeed(0)}
			onPointerLeave={() => setSpeed(1)}
			className="overflow-hidden py-16 motion-safe:mask-x-from-85%"
		>
			<div ref={trackRef} className="flex w-max motion-reduce:w-full">
				{[false, true].map((isDuplicate) => (
					<ul
						key={String(isDuplicate)}
						aria-hidden={isDuplicate || undefined}
						className={`flex shrink-0 whitespace-nowrap motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2 ${isDuplicate ? "motion-reduce:hidden" : ""}`}
					>
						{/* padding, not gap: both copies must be exactly equal for the -50% loop */}
						{stack.map((tech) => (
							<li
								key={tech}
								className="pr-16 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-medium tracking-tight text-white/55"
							>
								{tech}
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
};

export const AboutSection = () => {
	const { t } = useTranslation();
	const expertise = t("about.expertise", { returnObjects: true }) as string[];
	const bio = t("about.profile_bio_1");
	const sectionRef = useRef<HTMLElement>(null);
	useSectionReveal(sectionRef);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="relative overflow-hidden bg-background"
		>
			<div className="relative mx-auto max-w-6xl px-6 pt-28">
				<SectionHeading
					label={t("about.section_label")}
					line1={t("about.heading_1")}
					line2={t("about.heading_2")}
				/>

				{/* key: the words change with the language, the scrub must start over */}
				<Statement key={bio} bio={bio} motto={t("about.profile_bio_2")} />

				<div
					data-reveal-group
					className="mt-20 grid grid-cols-1 gap-3 [--accent:var(--brand-soft)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
				>
					<Panel label={t("about.expertise_label")}>
						<ul className="mt-6">
							{expertise.map((item) => (
								<li
									key={item}
									className="border-t border-white/10 py-4 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-tight tracking-tight text-white last:pb-0"
								>
									{item}
								</li>
							))}
						</ul>
					</Panel>

					<div className="flex flex-col gap-3">
						<Panel label={t("about.connect_label")}>
							<ul className="-mb-3 mt-3">
								{links.map(({ label, href }) => (
									<li
										key={label}
										className="border-b border-white/10 last:border-0"
									>
										<a
											href={href}
											{...(href.startsWith("http")
												? { target: "_blank", rel: "noopener noreferrer" }
												: {})}
											className="group flex min-h-16 cursor-pointer items-center justify-between gap-4 transition-[scale] duration-500 ease-spring active:scale-[0.98] active:duration-100"
										>
											<span className="text-[0.9375rem] font-semibold text-white">
												{label}
											</span>
											<span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white transition-colors duration-200 group-hover:bg-white group-hover:text-background">
												<ArrowUpRight
													aria-hidden="true"
													size={16}
													className="transition-[translate] duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-px"
												/>
											</span>
										</a>
									</li>
								))}
							</ul>
						</Panel>

						<Panel label={t("about.currently_label")} className="grow">
							<p className="mt-4 flex gap-3 text-[0.9375rem] leading-relaxed text-white/70">
								<span
									aria-hidden="true"
									className="mt-[0.55em] size-2 shrink-0 rounded-full bg-brand-soft"
								/>
								{t("about.currently_text")}
							</p>
						</Panel>
					</div>
				</div>
			</div>

			<StackMarquee />
		</section>
	);
};
