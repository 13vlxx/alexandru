import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Plays once per section: `.line-inner` headings slide out of their clip, and
 * each `[data-reveal-group]` staggers its `[data-reveal]` children. Reduced
 * motion keeps headings static and turns the rest into a short cross-fade.
 */
export function useSectionReveal(sectionRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const groups = Array.from(
			section.querySelectorAll<HTMLElement>("[data-reveal-group]"),
		);
		const itemsOf = (group: HTMLElement) =>
			Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"));
		const once = (trigger: Element, start: string) => ({
			trigger,
			start,
			once: true,
		});

		const mm = gsap.matchMedia(section);

		mm.add("(prefers-reduced-motion: no-preference)", () => {
			const heading = section.querySelector("h2");
			if (heading) {
				gsap.fromTo(
					heading.querySelectorAll(".line-inner"),
					{ yPercent: 110 },
					{
						yPercent: 0,
						stagger: 0.08,
						duration: 0.8,
						ease: "power4.out",
						scrollTrigger: once(heading, "top 85%"),
					},
				);
			}

			for (const group of groups) {
				gsap.fromTo(
					itemsOf(group),
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.06,
						duration: 0.5,
						ease: "power3.out",
						clearProps: "transform,opacity",
						scrollTrigger: once(group, "top 88%"),
					},
				);
			}
		});

		mm.add("(prefers-reduced-motion: reduce)", () => {
			for (const group of groups) {
				gsap.fromTo(
					itemsOf(group),
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 0.2,
						ease: "none",
						clearProps: "opacity",
						scrollTrigger: once(group, "top 95%"),
					},
				);
			}
		});

		return () => mm.revert();
	}, [sectionRef]);
}
