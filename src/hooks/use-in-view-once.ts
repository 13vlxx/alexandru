import { type RefObject, useEffect, useState } from "react";

export function useInViewOnce(
	ref: RefObject<HTMLElement | null>,
	threshold = 0.4,
) {
	const [seen, setSeen] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setSeen(true);
				io.disconnect();
			},
			{ threshold },
		);
		io.observe(element);
		return () => io.disconnect();
	}, [ref, threshold]);

	return seen;
}
