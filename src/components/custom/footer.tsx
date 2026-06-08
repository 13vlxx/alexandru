import { Github, Linkedin, Mail } from "lucide-react";
import { GrainientBackground } from "./backgrounds/grainient.background";

export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer id="contact" className="relative min-h-[600px] overflow-hidden">
			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-background to-transparent" />
			{/* background fills the footer like the hero */}
			<div className="absolute inset-0">
				<GrainientBackground
					color1="#5f395d"
					color2="#5227FF"
					color3="#B497CF"
					timeSpeed={0.6}
					colorBalance={0.1}
					warpStrength={0.8}
					warpFrequency={4}
					warpSpeed={1.5}
					warpAmplitude={60}
					blendAngle={10}
					blendSoftness={0.08}
					rotationAmount={400}
					noiseScale={2}
					grainAmount={0.12}
					grainScale={2}
					grainAnimated={false}
					contrast={1.4}
					gamma={1}
					saturation={0.9}
					centerX={0}
					centerY={0}
					zoom={0.85}
				/>
			</div>

			{/* fade from previous section */}
			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-background to-transparent" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-40">
				{/* main CTA */}
				<div className="mb-20 mt-10 text-center">
					<p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
						Available for new projects
					</p>
					<h2
						className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white"
						style={{ fontFamily: "Fraunces, Georgia, serif" }}
					>
						Let's build
						<br />
						something.
					</h2>
					<a
						href="mailto:alexmonac13@gmail.com"
						className="mt-10 inline-block text-sm font-semibold text-white/60 underline underline-offset-4 transition-colors hover:text-white"
					>
						alexmonac13@gmail.com
					</a>
				</div>

				{/* bottom bar */}
				<div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
					<span
						className="text-sm font-bold text-white/40"
						style={{ fontFamily: "Fraunces, Georgia, serif" }}
					>
						Rusescu Alexandru
					</span>

					<span className="text-xs text-white/25">
						© {year} — All rights reserved
					</span>

					<div className="flex items-center gap-5">
						<a
							href="https://github.com/13vlxx"
							aria-label="GitHub"
							className="text-white/35 transition-colors hover:text-white/80"
						>
							<Github size={17} />
						</a>
						<a
							href="https://linkedin.com/in/arusescu"
							aria-label="LinkedIn"
							className="text-white/35 transition-colors hover:text-white/80"
						>
							<Linkedin size={17} />
						</a>
						<a
							href="mailto:alexmonac13@gmail.com"
							aria-label="Email"
							className="text-white/35 transition-colors hover:text-white/80"
						>
							<Mail size={17} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
