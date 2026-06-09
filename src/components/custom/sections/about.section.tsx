import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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

const expertise = [
	"System Architecture",
	"API & Backend Design",
	"Frontend Engineering",
	"Team Leadership",
	"Performance Optimization",
];

export const AboutSection = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const linesRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const marqueeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Heading: clip-path line reveal
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

			// Content stagger
			gsap.fromTo(
				contentRef.current?.querySelectorAll(".anim"),
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					stagger: 0.09,
					duration: 0.7,
					ease: "power3.out",
					scrollTrigger: {
						trigger: contentRef.current,
						start: "top 82%",
					},
				},
			);

			// Infinite marquee
			if (marqueeRef.current) {
				gsap.to(marqueeRef.current, {
					xPercent: -50,
					duration: 30,
					ease: "none",
					repeat: -1,
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="relative overflow-hidden bg-background"
		>
			{/* bridge from hero */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-[#1a0f2e]/70 to-transparent" />

			<div className="relative mx-auto max-w-6xl px-6 pt-28 pb-0">
				{/* top label row */}
				<div className="mb-16 flex items-end justify-between">
					<span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
						01 / About
					</span>
				</div>

				{/* FuzzyText heading */}
				<div ref={linesRef} className="mb-20">
					<div className="overflow-hidden">
						<div className="line-inner">
							<span
								className="block text-[clamp(3.5rem,8.5vw,8rem)] font-bold leading-[1.05] tracking-tight text-white"
								style={{ fontFamily: "Fraunces, Georgia, serif" }}
							>
								Software
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
								Architect.
							</span>
						</div>
					</div>
				</div>

				{/* separator */}
				<div className="mb-16 h-px bg-linear-to-r from-white/12 via-white/5 to-transparent" />

				{/* 3-column content */}
				<div
					ref={contentRef}
					className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-3 md:gap-8"
				>
					{/* bio */}
					<div className="space-y-4">
						<p className="anim text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
							Profile
						</p>
						<p className="anim text-sm leading-relaxed text-white/50">
							Software architect and developer building scalable, maintainable
							systems. From database design to user interfaces — always with a
							focus on clarity and craft.
						</p>
						<p className="anim text-sm leading-relaxed text-white/50">
							I care about doing it well — not just fast.
						</p>
					</div>

					{/* expertise */}
					<div className="space-y-4">
						<p className="anim text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
							Expertise
						</p>
						<ul className="space-y-3">
							{expertise.map((item) => (
								<li
									key={item}
									className="anim flex items-center gap-3 text-sm text-white/45"
								>
									<span className="h-px w-5 shrink-0 bg-white/20" />
									{item}
								</li>
							))}
						</ul>
					</div>

					{/* links */}
					<div className="space-y-4">
						<p className="anim text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
							Connect
						</p>
						<div>
							{links.map(({ label, href }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="anim group flex items-center justify-between border-b border-white/[0.06] py-3 first:pt-0 last:border-0"
								>
									<span className="text-sm font-medium text-white/45 transition-colors duration-200 group-hover:text-white">
										{label}
									</span>
									<ArrowUpRight
										size={13}
										className="text-white/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50"
									/>
								</a>
							))}
						</div>
						<div className="anim pt-3">
							<p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/20">
								Currently
							</p>
							<p className="text-sm leading-relaxed text-white/35">
								Building this portfolio & exploring new frontend patterns.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* marquee */}
			<div className="overflow-hidden border-t border-white/[0.05] py-5">
				<div ref={marqueeRef} className="flex w-max gap-14 whitespace-nowrap">
					{[...stack, ...stack].map((tech, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: marquee duplication
							key={i}
							className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/18"
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</section>
	);
};
