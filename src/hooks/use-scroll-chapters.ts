import { type RefObject, useEffect, useState } from "react";

/**
 * Follows a list of equal-height chapters scrolling out from under a sticky
 * stage. The page scroll stays native and free; the position is only read, as
 * `--progress` (fractional chapter index) on the root, so CSS can scrub on it.
 */
export function useScrollChapters(
	rootRef: RefObject<HTMLElement | null>,
	stageRef: RefObject<HTMLElement | null>,
	listRef: RefObject<HTMLElement | null>,
) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const root = rootRef.current;
		const stage = stageRef.current;
		const list = listRef.current;
		if (!root || !stage || !list) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			const first = list.firstElementChild;
			if (!first || !stage.offsetHeight) return;
			const { top, height } = first.getBoundingClientRect();
			const position = (stage.getBoundingClientRect().bottom - top) / height;
			const progress = Math.min(
				Math.max(position, 0),
				list.children.length - 1,
			);
			setActive(Math.round(progress));
			root.style.setProperty("--progress", `${progress}`);
		};
		const schedule = () => {
			frame ||= requestAnimationFrame(update);
		};

		// A reload can land mid-section without any scroll event
		update();
		addEventListener("scroll", schedule, { passive: true });
		addEventListener("resize", schedule);
		return () => {
			removeEventListener("scroll", schedule);
			removeEventListener("resize", schedule);
			cancelAnimationFrame(frame);
		};
	}, [rootRef, stageRef, listRef]);

	return active;
}
