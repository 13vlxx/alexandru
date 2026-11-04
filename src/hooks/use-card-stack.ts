import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// Même condition que la variante `stack` dans styles.css
const STACK_QUERY =
	"(min-height: 38rem) and (prefers-reduced-motion: no-preference)";

const DEPTH_SCALE = 0.03;
const MAX_DIM = 0.6;

/**
 * Pushes each `[data-stack-sheet]` back as the cards above it land, tied 1:1
 * to the scroll position. Sticking itself is CSS, so the list stays a plain
 * column wherever the query doesn't match.
 */
export function useCardStack(listRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const list = listRef.current;
		if (!list) return;

		const mm = gsap.matchMedia(list);

		mm.add(STACK_QUERY, () => {
			const cards = Array.from(list.children) as HTMLElement[];
			const last = cards[cards.length - 1];

			cards.slice(0, -1).forEach((card, i) => {
				const depth = cards.length - 1 - i;
				const timeline = gsap.timeline({
					defaults: { ease: "none" },
					scrollTrigger: {
						trigger: cards[i + 1],
						start: "top bottom",
						endTrigger: last,
						end: () => `top ${getComputedStyle(last).top}`,
						scrub: true,
					},
				});

				timeline
					.to(
						card.querySelector("[data-stack-sheet]"),
						{ scale: 1 - depth * DEPTH_SCALE, transformOrigin: "top center" },
						0,
					)
					.to(card.querySelector("[data-stack-dim]"), { opacity: MAX_DIM }, 0);
			});
		});

		return () => mm.revert();
	}, [listRef]);
}
