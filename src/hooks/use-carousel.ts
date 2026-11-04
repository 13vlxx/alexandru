import { type RefObject, useEffect, useState } from "react";

const stepOf = (list: HTMLElement) => {
	const [first, second] = list.children;
	return (
		second.getBoundingClientRect().left - first.getBoundingClientRect().left
	);
};

/**
 * Tracks which card of a horizontal scroll-snap list is resting in place.
 * The swipe itself stays native, so 1:1 tracking, momentum and rubber-banding
 * all come from the browser.
 */
export function useCarousel(listRef: RefObject<HTMLElement | null>) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const list = listRef.current;
		if (!list) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			if (list.scrollWidth <= list.clientWidth) return;
			const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 1;
			setActive(
				atEnd
					? list.children.length - 1
					: Math.round(list.scrollLeft / stepOf(list)),
			);
		};
		const onScroll = () => {
			frame ||= requestAnimationFrame(update);
		};

		// Safari restores the position on reload without firing scroll
		update();
		list.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			list.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, [listRef]);

	const goTo = (index: number) => {
		const list = listRef.current;
		if (!list) return;
		const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
		list.scrollTo({
			left: index * stepOf(list),
			behavior: reduced ? "auto" : "smooth",
		});
	};

	return { active, goTo };
}
