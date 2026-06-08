import { HeroSection } from "#/components/custom/sections/hero.section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<HeroSection />
		</>
	);
}
