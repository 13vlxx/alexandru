const en = {
	hero: {
		subtitle: "Software Architect & Developer",
		description:
			"Building scalable systems and crafting thoughtful software — from architecture to production.",
		cta_work: "View work",
		cta_contact: "Contact",
	},
	about: {
		section_label: "01 / About",
		heading_1: "Software",
		heading_2: "Architect.",
		profile_label: "Profile",
		profile_bio_1:
			"Software architect and developer building scalable, maintainable systems. From database design to user interfaces — always with a focus on clarity and craft.",
		profile_bio_2: "I care about doing it well — not just fast.",
		expertise_label: "Expertise",
		expertise: [
			"System Architecture",
			"API & Backend Design",
			"Frontend Engineering",
			"Team Leadership",
			"Performance Optimization",
		],
		connect_label: "Connect",
		currently_label: "Currently",
		currently_text:
			"Building this portfolio & exploring new frontend patterns.",
	},
	projects: {
		section_label: "02 / Projects",
		heading_1: "Selected",
		heading_2: "work.",
		items: {
			oreus: {
				role: "Backend Developer",
				description:
					"AI-powered platform built to automate and scale intelligent workflows. Designed and maintained the backend infrastructure, APIs, and data pipelines that power the core product.",
			},
			airbus: {
				role: "Full Stack",
				description:
					"Internal tool for Airbus to analyse engine component samples. Digitised and streamlined a critical inspection workflow, replacing manual processes with a structured data pipeline and reporting interface.",
			},
			monaco: {
				role: "Full Stack",
				description:
					"Web presence for a Marignane-based aesthetic salon — booking system, service showcase, and admin panel. Focused on a refined UI that matches the brand's high-end positioning.",
			},
		},
	},
	services: {
		section_label: "03 / Services",
		heading_1: "What I",
		heading_2: "build.",
		items: {
			frontend: {
				title: "Frontend",
				subtitle: "Development",
				description:
					"Pixel-perfect interfaces built with React and TypeScript. Design systems, animations, and performance optimisation that users actually feel.",
			},
			backend: {
				title: "Backend",
				subtitle: "& APIs",
				description:
					"REST & GraphQL APIs, event-driven architectures, microservices. Clean, tested, and built to scale.",
			},
			mobile: {
				title: "Mobile",
				subtitle: "Apps",
				description:
					"Cross-platform iOS & Android apps with a native feel. Integrated with your existing APIs.",
			},
			infra: {
				title: "Infrastructure",
				subtitle: "& Kubernetes",
				description:
					"Server config, Kubernetes clusters, networking, and security. Infrastructure as code for fully reproducible environments.",
			},
			deployment: {
				title: "Deployment",
				subtitle: "& CI/CD",
				description:
					"End-to-end pipelines, monitoring, and release management. From commit to production with confidence.",
			},
		},
	},
	footer: {
		available: "Available for new projects",
		heading_1: "Let's build",
		heading_2: "something.",
		rights: "All rights reserved",
	},
} as const;

export default en;
