import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SocialLinks } from "#/components/custom/_utils/social-links";
import { Button } from "#/components/ui/button";
import { GrainientBackground } from "../backgrounds/grainient.background";

export const HeroSection = () => {
	const { t } = useTranslation();

	return (
		<section
			id="top"
			className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-6 py-28 text-center"
		>
			<div className="absolute inset-0">
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
			</div>
			{/* keeps the copy legible over the gradient's lightest zones */}
			<div className="absolute inset-0 bg-background/35" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />

			<p className="animate-fade-in relative text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
				{t("hero.subtitle")}
			</p>

			<h1 className="animate-fade-in relative font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight text-white [animation-delay:80ms]">
				Rusescu
				<br />
				Alexandru
			</h1>

			<p className="animate-fade-in relative max-w-sm text-[0.95rem] leading-relaxed text-white/90 [animation-delay:160ms]">
				{t("hero.description")}
			</p>

			<div className="animate-fade-in relative mt-2 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
				<Button
					asChild
					size="lg"
					className="rounded-full border-0 bg-white px-7 text-sm font-semibold hover:bg-white/90"
				>
					<a href="#projects">
						{t("hero.cta_work")}
						<ArrowRight className="ml-1 size-4" />
					</a>
				</Button>
				<Button
					asChild
					size="lg"
					variant="ghost"
					className="rounded-full border border-white/40 px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
				>
					<a href="#contact">{t("hero.cta_contact")}</a>
				</Button>
			</div>

			<div className="animate-fade-in relative -my-2 [animation-delay:320ms]">
				<SocialLinks />
			</div>
		</section>
	);
};
