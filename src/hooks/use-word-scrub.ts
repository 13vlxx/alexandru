import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const UNLIT_OPACITY = 0.22;

/**
 * Lights the `[data-word]` children up 1:1 with the scroll, so scrolling back
 * dims them again. Reduced motion keeps the text fully lit.
 */
export function useWordScrub(containerRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const mm = gsap.matchMedia(container);
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			gsap.fromTo(
				"[data-word]",
				{ opacity: UNLIT_OPACITY },
				{
					opacity: 1,
					ease: "none",
					stagger: 0.05,
					scrollTrigger: {
						trigger: container,
						start: "top 75%",
						end: "bottom 55%",
						scrub: true,
					},
				},
			);
		});

		return () => mm.revert();
	}, [containerRef]);
}
