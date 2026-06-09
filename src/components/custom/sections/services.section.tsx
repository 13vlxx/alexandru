import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cloud, Monitor, Rocket, Server, Smartphone } from "lucide-react";
import { useEffect, useRef } from "react";
import { SpotlightCard } from "#/components/custom/cards/spotlight-card";
import { useIsMobile } from "#/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

const services = [
	{
		icon: Monitor,
		title: "Frontend",
		subtitle: "Development",
		description:
			"Pixel-perfect interfaces built with React and TypeScript. Design systems, animations, and performance optimisation that users actually feel.",
		tags: ["React", "TypeScript", "Tanstack Start", "Tailwind"],
		size: "large",
	},
	{
		icon: Server,
		title: "Backend",
		subtitle: "& APIs",
		description:
			"REST & GraphQL APIs, event-driven architectures, microservices. Clean, tested, and built to scale.",
		tags: ["Node.js", "MongoDB", "PostgreSQL"],
		size: "large",
	},
	{
		icon: Smartphone,
		title: "Mobile",
		subtitle: "Apps",
		description:
			"Cross-platform iOS & Android apps with a native feel. Integrated with your existing APIs.",
		tags: ["SwiftUI", "JetpackCompose", "Expo"],
		size: "small",
	},
	{
		icon: Cloud,
		title: "Infrastructure",
		subtitle: "& Kubernetes",
		description:
			"Server config, Kubernetes clusters, networking, and security. Infrastructure as code for fully reproducible environments.",
		tags: ["Kubernetes", "Docker"],
		size: "small",
	},
	{
		icon: Rocket,
		title: "Deployment",
		subtitle: "& CI/CD",
		description:
			"End-to-end pipelines, monitoring, and release management. From commit to production with confidence.",
		tags: ["GitHub Actions", "Helm", "ArgoCD", "Grafana"],
		size: "small",
	},
];

export const ServicesSection = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const linesRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

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
				gridRef.current?.querySelectorAll(".service-card"),
				{ y: 28, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					stagger: 0.08,
					duration: 0.7,
					ease: "power3.out",
					scrollTrigger: {
						trigger: gridRef.current,
						start: "top 82%",
					},
				},
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const isMobile = useIsMobile();
	const [large1, large2, ...smalls] = services;

	const SmallCard = ({ s }: { s: (typeof services)[number] }) => {
		const Icon = s.icon;
		return (
			<SpotlightCard className="p-6">
				<div className="mb-5 flex items-center gap-3">
					<div className="rounded-full border border-[#5227FF]/25 bg-[#5227FF]/8 p-2.5">
						<Icon size={16} className="text-[#5227FF]/80" strokeWidth={1.5} />
					</div>
					<h3
						className="text-base font-bold text-white/75"
						style={{ fontFamily: "Fraunces, Georgia, serif" }}
					>
						{s.title} <span className="text-white/30">{s.subtitle}</span>
					</h3>
				</div>
				<p className="mb-5 text-sm leading-relaxed text-white/38">
					{s.description}
				</p>
				<div className="flex flex-wrap gap-1.5">
					{s.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full border border-white/10 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-white/22"
						>
							{tag}
						</span>
					))}
				</div>
			</SpotlightCard>
		);
	};

	return (
		<section
			id="services"
			ref={sectionRef}
			className="relative overflow-hidden bg-background"
		>
			<div className="relative mx-auto max-w-6xl px-6 py-28">
				<div className="mb-16 flex items-end justify-between">
					<span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
						03 / Services
					</span>
				</div>

				<div ref={linesRef} className="mb-20">
					<div className="overflow-hidden">
						<div className="line-inner">
							<span
								className="block text-[clamp(3.5rem,8.5vw,8rem)] font-bold leading-[1.05] tracking-tight text-white"
								style={{ fontFamily: "Fraunces, Georgia, serif" }}
							>
								What I
							</span>
						</div>
					</div>
					<div className="overflow-hidden">
						<div className="line-inner">
							<span
								className="block text-[clamp(3.5rem,8.5vw,8rem)] font-bold leading-[1.05] tracking-tight"
								style={{
									fontFamily: "Fraunces, Georgia, serif",
									color: "#5227FF",
								}}
							>
								build.
							</span>
						</div>
					</div>
				</div>

				<div ref={gridRef} className="flex flex-col gap-3">
					{isMobile ? (
						services.map((s) => <SmallCard key={s.title} s={s} />)
					) : (
						<>
							<div className="grid grid-cols-2 gap-3">
								{[large1, large2].map((s) => {
									const Icon = s.icon;
									return (
										<SpotlightCard key={s.title} className="p-8">
											<div className="flex h-full flex-col justify-between gap-8">
												<div className="flex items-start justify-between">
													<div className="rounded-full border border-[#5227FF]/30 bg-[#5227FF]/10 p-3">
														<Icon
															size={22}
															className="text-[#5227FF]"
															strokeWidth={1.5}
														/>
													</div>
													<div className="flex flex-wrap justify-end gap-1.5">
														{s.tags.map((tag) => (
															<span
																key={tag}
																className="rounded-full border border-white/10 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-white/25"
															>
																{tag}
															</span>
														))}
													</div>
												</div>
												<div>
													<h3
														className="mb-2 text-2xl font-bold text-white/80"
														style={{ fontFamily: "Fraunces, Georgia, serif" }}
													>
														{s.title}{" "}
														<span className="text-white/30">{s.subtitle}</span>
													</h3>
													<p className="text-sm leading-relaxed text-white/40">
														{s.description}
													</p>
												</div>
											</div>
										</SpotlightCard>
									);
								})}
							</div>
							<div className="grid grid-cols-3 gap-3">
								{smalls.map((s) => (
									<SmallCard key={s.title} s={s} />
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};
