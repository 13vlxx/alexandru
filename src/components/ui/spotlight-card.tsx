import { useRef } from "react";
import { cn } from "#/lib/utils";

interface SpotlightCardProps {
	children: React.ReactNode;
	className?: string;
	spotlightColor?: string;
}

export const SpotlightCard = ({
	children,
	className,
	spotlightColor = "rgba(82, 39, 255, 0.12)",
}: SpotlightCardProps) => {
	const divRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!divRef.current) return;
		const rect = divRef.current.getBoundingClientRect();
		divRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
		divRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
		divRef.current.style.setProperty("--opacity", "1");
	};

	const handleMouseLeave = () => {
		divRef.current?.style.setProperty("--opacity", "0");
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: spotlight effect is purely decorative
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={
				{
					"--x": "50%",
					"--y": "50%",
					"--opacity": "0",
					"--color": spotlightColor,
				} as React.CSSProperties
			}
			className={cn(
				"group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 hover:border-white/[0.16]",
				className,
			)}
		>
			<div
				className="pointer-events-none absolute inset-0 transition-opacity duration-300"
				style={{
					opacity: "var(--opacity)",
					background:
						"radial-gradient(500px circle at var(--x) var(--y), var(--color), transparent 60%)",
				}}
			/>
			<div className="relative z-10">{children}</div>
		</div>
	);
};
