import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "#/components/ui/button";
import { GrainientBackground } from "../backgrounds/grainient.background";

const scrollToProjects = () => {
	document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToContact = () => {
	document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

export const HeroSection = () => {
	return (
		<section className="relative h-screen overflow-hidden">
			<GrainientBackground
				color1="#5f395d"
				color2="#5227FF"
				color3="#B497CF"
				timeSpeed={1.2}
				colorBalance={0}
				warpStrength={1}
				warpFrequency={5}
				warpSpeed={2}
				warpAmplitude={50}
				blendAngle={0}
				blendSoftness={0.05}
				rotationAmount={500}
				noiseScale={2}
				grainAmount={0.1}
				grainScale={2}
				grainAnimated={false}
				contrast={1.5}
				gamma={1}
				saturation={1}
				centerX={0}
				centerY={0}
				zoom={0.9}
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
				<p
					className="animate-fade-in text-xs font-semibold uppercase tracking-[0.22em] text-white/55"
					style={{ animationDelay: "0ms", animationFillMode: "both" }}
				>
					Software Architect &amp; Developer
				</p>

				<h1
					className="animate-fade-in text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight text-white"
					style={{
						fontFamily: "Fraunces, Georgia, serif",
						animationDelay: "80ms",
						animationFillMode: "both",
					}}
				>
					Rusescu
					<br />
					Alexandru
				</h1>

				<p
					className="animate-fade-in max-w-sm text-[0.95rem] leading-relaxed text-white/60"
					style={{ animationDelay: "180ms", animationFillMode: "both" }}
				>
					Building scalable systems and crafting thoughtful software — from
					architecture to production.
				</p>

				<div
					className="animate-fade-in mt-2 flex items-center gap-3"
					style={{ animationDelay: "280ms", animationFillMode: "both" }}
				>
					<Button
						size="lg"
						onClick={scrollToProjects}
						className="cursor-pointer rounded-full border-0 bg-white px-7 text-sm font-semibold hover:bg-white/90"
					>
						View work
						<ArrowRight className="ml-1 size-4" />
					</Button>
					<Button
						size="lg"
						variant="ghost"
						onClick={scrollToContact}
						className="cursor-pointer rounded-full border border-white/20 px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
					>
						Contact
					</Button>
				</div>

				<div
					className="animate-fade-in flex items-center gap-5"
					style={{ animationDelay: "360ms", animationFillMode: "both" }}
				>
					<a
						href="https://github.com/13vlxx"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white/35 transition-colors hover:text-white/80"
					>
						<Github size={18} />
					</a>
					<a
						href="https://fr.linkedin.com/in/arusescu"
						aria-label="LinkedIn"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white/35 transition-colors hover:text-white/80"
					>
						<Linkedin size={18} />
					</a>
				</div>
			</div>
		</section>
	);
};
