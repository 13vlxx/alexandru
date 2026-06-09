import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { FuzzyText } from "#/components/ui/fuzzy-text";
import { GrainientBackground } from "../backgrounds/grainient.background";

export const NotFound = () => {
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
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center w-screen">
				<FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
					404
				</FuzzyText>
				<FuzzyText
					fontSize={28}
					baseIntensity={0.2}
					hoverIntensity={0.5}
					enableHover
				>
					Page not found.
				</FuzzyText>
				<Link to="/">
					<Button variant={"ghost"}>Go back home.</Button>
				</Link>
			</div>
		</section>
	);
};
