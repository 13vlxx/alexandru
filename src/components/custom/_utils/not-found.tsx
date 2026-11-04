import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "#/components/ui/button";
import { FuzzyText } from "#/components/ui/fuzzy-text";
import { useReducedMotion } from "#/hooks/use-media-query";
import { GrainientBackground } from "../backgrounds/grainient.background";

export const NotFound = () => {
	const { t } = useTranslation();
	const reducedMotion = useReducedMotion();
	const fuzz = {
		baseIntensity: reducedMotion ? 0 : 0.2,
		hoverIntensity: 0.5,
		enableHover: !reducedMotion,
	};

	return (
		<section className="relative flex min-h-dvh flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
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
			<div className="absolute inset-0 bg-background/35" />

			<div aria-hidden className="relative">
				<FuzzyText {...fuzz}>404</FuzzyText>
			</div>
			<h1 className="relative font-display text-3xl font-bold tracking-tight text-white">
				{t("not_found.title")}
			</h1>
			<Button
				asChild
				size="lg"
				variant="ghost"
				className="relative rounded-full border border-white/40 px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
			>
				<Link to="/">{t("not_found.cta")}</Link>
			</Button>
		</section>
	);
};
