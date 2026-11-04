import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/** Returns the id of the section crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
	const { pathname } = useLocation();
	const [active, setActive] = useState<string | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: sections remount when leaving the 404 page
	useEffect(() => {
		const sections = ids.flatMap((id) => {
			const section = document.getElementById(id);
			return section ? [section] : [];
		});
		const io = new IntersectionObserver(
			(entries) => {
				for (const { isIntersecting, target } of entries) {
					setActive((current) => {
						if (isIntersecting) return target.id;
						return current === target.id ? null : current;
					});
				}
			},
			{ rootMargin: "-50% 0px -50% 0px" },
		);
		for (const section of sections) io.observe(section);
		return () => {
			io.disconnect();
			setActive(null);
		};
	}, [ids, pathname]);

	return active;
}
