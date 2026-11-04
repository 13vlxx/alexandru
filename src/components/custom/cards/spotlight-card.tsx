import { useRef } from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
	spotlightColor?: string;
};

export const SpotlightCard = ({
	children,
	className = "",
	spotlightColor = "rgba(82, 39, 255, 0.15)",
}: Props) => {
	const cardRef = useRef<HTMLDivElement>(null);

	const moveSpotlight = (e: React.PointerEvent<HTMLDivElement>) => {
		const card = cardRef.current;
		if (!card || e.pointerType !== "mouse") return;
		const rect = card.getBoundingClientRect();
		card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
		card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
		card.style.setProperty("--spot-opacity", "1");
	};

	const hideSpotlight = () => {
		cardRef.current?.style.setProperty("--spot-opacity", "0");
	};

	return (
		<div
			ref={cardRef}
			data-reveal
			onPointerEnter={moveSpotlight}
			onPointerMove={moveSpotlight}
			onPointerLeave={hideSpotlight}
			className={`relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.14] ${className}`}
		>
			<div
				className="pointer-events-none absolute inset-0 transition-opacity duration-300"
				style={{
					opacity: "var(--spot-opacity, 0)",
					background: `radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 70%)`,
				}}
			/>
			{children}
		</div>
	);
};
