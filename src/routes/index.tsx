import { AboutSection } from "#/components/custom/sections/about.section";
import { Footer } from "#/components/custom/footer";
import { HeroSection } from "#/components/custom/sections/hero.section";
import { ProjectsSection } from "#/components/custom/sections/projects.section";
import { ServicesSection } from "#/components/custom/sections/services.section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<HeroSection />
			<AboutSection />
			<ProjectsSection />
			<ServicesSection />
			<Footer />
		</>
	);
}
