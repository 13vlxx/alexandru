import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Silk from "#/components/custom/backgrounds/silk.background";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		id: "01",
		name: "Distributed Task Queue",
		year: "2024",
		role: "Lead Architect",
		description:
			"High-throughput job processing system capable of handling 1M+ events per day with guaranteed delivery, dead letter queuing, and horizontal scaling.",
		stack: ["Go", "Redis", "PostgreSQL", "Docker"],
		href: "#",
	},
	{
		id: "02",
		name: "API Gateway",
		year: "2023",
		role: "Backend Engineer",
		description:
			"Scalable reverse proxy with rate limiting, JWT authentication, and full observability. Reduced average API response time by 40% across all services.",
		stack: ["Node.js", "TypeScript", "AWS", "Nginx"],
		href: "#",
	},
	{
		id: "03",
		name: "Real-time Dashboard",
		year: "2023",
		role: "Full Stack",
		description:
			"Live analytics platform monitoring distributed systems with sub-second latency across 50+ microservices. Built on a WebSocket-first architecture.",
		stack: ["React", "WebSocket", "InfluxDB", "Grafana"],
		href: "#",
	},
	{
		id: "04",
		name: "Auth Service",
		year: "2022",
		role: "Lead Architect",
		description:
			"Zero-trust identity platform with SSO, MFA, and fine-grained RBAC. Serves 100K+ daily active users with 99.99% uptime SLA.",
		stack: ["Go", "PostgreSQL", "Redis"],
		href: "#",
	},
];

export const ProjectsSection = () => {
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
						02 / Projects
					</span>
				</div>

				{/* heading */}
				<div ref={linesRef} className="mb-20">
					<div className="overflow-hidden">
						<div className="line-inner">
							<span
								className="block text-[clamp(3.5rem,8.5vw,8rem)] font-bold leading-[1.05] tracking-tight text-white"
								style={{ fontFamily: "Fraunces, Georgia, serif" }}
							>
								Selected
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
								work.
							</span>
						</div>
					</div>
				</div>

				{/* project list */}
				<div ref={listRef}>
					{projects.map((p) => (
						<a
							key={p.id}
							href={p.href}
							className="project-row group block border-t border-white/[0.07] transition-colors duration-200 hover:border-white/[0.18]"
						>
							{/* header row */}
							<div className="flex items-center gap-4 py-5">
								<span
									className="w-7 shrink-0 text-sm font-bold text-white/20 transition-colors duration-200 group-hover:text-white/40"
									style={{ fontFamily: "Fraunces, Georgia, serif" }}
								>
									{p.id}
								</span>

								<div className="min-w-0 flex-1">
									<span
										className="block text-lg font-bold leading-tight text-white/80 transition-colors duration-200 group-hover:text-white md:text-xl"
										style={{ fontFamily: "Fraunces, Georgia, serif" }}
									>
										{p.name}
									</span>
									{/* role + year visible on mobile only */}
									<span className="mt-0.5 block text-xs text-white/25 md:hidden">
										{p.role} · {p.year}
									</span>
								</div>

								<span className="hidden shrink-0 text-xs text-white/25 md:block">
									{p.role} · {p.year}
								</span>

								<ArrowUpRight
									size={15}
									className="shrink-0 text-white/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
								/>
							</div>

							{/* detail:
                  mobile  → always visible (no grid trick)
                  desktop → collapsed, expands on hover     */}
							<div className="md:grid md:grid-rows-[0fr] md:transition-all md:duration-300 md:ease-in-out md:group-hover:grid-rows-[1fr]">
								<div className="md:overflow-hidden">
									<div className="flex flex-col gap-3 pb-5 pl-11 md:flex-row md:items-start md:gap-12 md:pb-6">
										<p className="text-sm leading-relaxed text-white/45 md:max-w-md md:flex-1">
											{p.description}
										</p>
										<div className="flex flex-wrap gap-2 md:justify-end">
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
								</div>
							</div>
						</a>
					))}

					{/* closing border */}
					<div className="border-t border-white/[0.07]" />
				</div>
			</div>
		</section>
	);
};
