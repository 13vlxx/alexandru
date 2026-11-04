import { useTranslation } from "react-i18next";
import { SocialLinks } from "#/components/custom/_utils/social-links";
import { GrainientBackground } from "../backgrounds/grainient.background";

export const Footer = () => {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer id="contact" className="relative min-h-[37.5rem] overflow-hidden">
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
			<div className="absolute inset-0 bg-background/50" />

			{/* fade from previous section */}
			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-background to-transparent" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-40">
				{/* main CTA */}
				<div className="mb-20 mt-10 text-center">
					<p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-white">
						{t("footer.available")}
					</p>
					<h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white">
						{t("footer.heading_1")}
						<br />
						{t("footer.heading_2")}
					</h2>
					<a
						href="mailto:alexmonac13@gmail.com"
						className="mt-8 inline-block p-2 text-sm font-semibold text-white underline underline-offset-4 transition-opacity duration-100 active:opacity-70"
					>
						alexmonac13@gmail.com
					</a>
				</div>

				{/* bottom bar */}
				<div className="flex flex-col items-center justify-between gap-6 border-t border-white/25 pt-8 md:flex-row">
					<span className="font-display text-sm font-bold text-white/90">
						Rusescu Alexandru
					</span>

					<span className="text-xs text-white/90">
						© {year} — {t("footer.rights")}
					</span>

					<div className="-m-3">
						<SocialLinks withEmail />
					</div>
				</div>
			</div>
		</footer>
	);
};
