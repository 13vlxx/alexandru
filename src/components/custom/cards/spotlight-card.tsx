import { useRef, useState, useCallback } from "react";

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
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	}, []);

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`service-card relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.14] ${className}`}
		>
			<div
				className="pointer-events-none absolute inset-0 transition-opacity duration-300"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
				}}
			/>
			{children}
		</div>
	);
};
