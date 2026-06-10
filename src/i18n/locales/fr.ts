const fr = {
	hero: {
		subtitle: "Architecte Logiciel & Développeur",
		description:
			"Concevoir des systèmes robustes et des logiciels soignés — de l'architecture à la production.",
		cta_work: "Voir mes projets",
		cta_contact: "Contact",
	},
	about: {
		section_label: "01 / À propos",
		heading_1: "Architecte",
		heading_2: "Logiciel.",
		profile_label: "Profil",
		profile_bio_1:
			"Architecte logiciel et développeur, je construis des systèmes scalables et maintenables. De la conception de base de données aux interfaces — toujours avec un souci de clarté et de qualité.",
		profile_bio_2: "Ce qui compte, c'est de bien faire — pas seulement vite.",
		expertise_label: "Expertise",
		expertise: [
			"Architecture système",
			"Conception API & Backend",
			"Développement Frontend",
			"Leadership d'équipe",
			"Optimisation des performances",
		],
		connect_label: "Contact",
		currently_label: "En ce moment",
		currently_text:
			"Construction de ce portfolio & exploration de nouvelles approches frontend.",
	},
	projects: {
		section_label: "02 / Projets",
		heading_1: "Projets",
		heading_2: "choisis.",
		items: {
			oreus: {
				role: "Développeur Backend",
				description:
					"Plateforme propulsée par l'IA, conçue pour automatiser et scaler des workflows intelligents. Conception et maintenance de l'infrastructure backend, des APIs et des pipelines de données qui alimentent le produit principal.",
			},
			airbus: {
				role: "Full Stack",
				description:
					"Outil interne pour Airbus permettant d'analyser des échantillons de composants moteurs. Numérisation d'un processus d'inspection critique, remplaçant des démarches manuelles par un pipeline de données structuré et une interface de reporting.",
			},
			monaco: {
				role: "Full Stack",
				description:
					"Présence web pour un salon esthétique de Marignane — système de réservation, vitrine des services et panel d'administration. Accent sur une UI raffinée qui reflète le positionnement haut de gamme de la marque.",
			},
		},
	},
	services: {
		section_label: "03 / Services",
		heading_1: "Ce que je",
		heading_2: "construis.",
		items: {
			frontend: {
				title: "Frontend",
				subtitle: "Développement",
				description:
					"Interfaces pixel-perfect conçues avec React et TypeScript. Design systems, animations et optimisation des performances que les utilisateurs ressentent vraiment.",
			},
			backend: {
				title: "Backend",
				subtitle: "& APIs",
				description:
					"APIs REST & GraphQL, architectures event-driven, microservices. Propre, testé et conçu pour scaler.",
			},
			mobile: {
				title: "Mobile",
				subtitle: "Apps",
				description:
					"Apps iOS & Android cross-platform avec une expérience native. Intégrées à vos APIs existantes.",
			},
			infra: {
				title: "Infrastructure",
				subtitle: "& Kubernetes",
				description:
					"Config serveur, clusters Kubernetes, réseau et sécurité. Infrastructure as code pour des environnements entièrement reproductibles.",
			},
			deployment: {
				title: "Déploiement",
				subtitle: "& CI/CD",
				description:
					"Pipelines end-to-end, monitoring et gestion des releases. Du commit à la production en toute confiance.",
			},
		},
	},
	footer: {
		available: "Disponible pour de nouveaux projets",
		heading_1: "Construisons",
		heading_2: "ensemble.",
		rights: "Tous droits réservés",
	},
} as const;

export default fr;
