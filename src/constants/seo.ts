import type { SupportedLang } from "#/i18n";

export const SITE_URL = "https://arekkusu.dev";
export const OG_IMAGE = `${SITE_URL}/og.png`;
export const AUTHOR = "Rusescu Alexandru";

/** Profils publics — repris tels quels dans le `sameAs` du JSON-LD. */
export const SOCIALS = [
	"https://github.com/13vlxx",
	"https://fr.linkedin.com/in/arusescu",
] as const;

interface SeoCopy {
	/** Locale au format Open Graph (`fr_FR`), distinct du code i18n. */
	ogLocale: string;
	title: string;
	description: string;
	keywords: string;
	jobTitle: string;
}

export const SEO: Record<SupportedLang, SeoCopy> = {
	fr: {
		ogLocale: "fr_FR",
		title: "Rusescu Alexandru | Architecte Logiciel & Développeur",
		description:
			"Architecte logiciel et développeur full-stack : systèmes backend scalables, interfaces modernes, applications mobiles et infrastructure cloud (Kubernetes, CI/CD).",
		keywords:
			"architecte logiciel, développeur full-stack, React, TypeScript, Node.js, Go, Kubernetes, backend, frontend, mobile, freelance",
		jobTitle: "Architecte Logiciel & Développeur Full-Stack",
	},
	en: {
		ogLocale: "en_GB",
		title: "Rusescu Alexandru | Software Architect & Developer",
		description:
			"Software architect and full-stack developer specialising in scalable backend systems, modern frontend interfaces, mobile apps, and cloud infrastructure (Kubernetes, CI/CD).",
		keywords:
			"software architect, full-stack developer, React, TypeScript, Node.js, Go, Kubernetes, backend, frontend, mobile, freelance",
		jobTitle: "Software Architect & Full-Stack Developer",
	},
	ja: {
		ogLocale: "ja_JP",
		title: "ルセスク・アレクサンドル | ソフトウェアアーキテクト & 開発者",
		description:
			"ソフトウェアアーキテクト兼フルスタック開発者。スケーラブルなバックエンド、モダンなフロントエンド、モバイルアプリ、クラウドインフラ（Kubernetes・CI/CD）を手がけます。",
		keywords:
			"ソフトウェアアーキテクト, フルスタック開発者, React, TypeScript, Node.js, Go, Kubernetes, バックエンド, フロントエンド, モバイル",
		jobTitle: "ソフトウェアアーキテクト / フルスタック開発者",
	},
};

/**
 * Person + WebSite en un seul graphe : Google lit les deux d'un coup et le
 * `@id` permet à WebSite.author de pointer sur le même nœud Person.
 */
export function buildJsonLd(lang: SupportedLang) {
	const copy = SEO[lang];

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": `${SITE_URL}/#person`,
				name: AUTHOR,
				url: SITE_URL,
				image: OG_IMAGE,
				jobTitle: copy.jobTitle,
				description: copy.description,
				email: "mailto:alexmonac13@gmail.com",
				sameAs: [...SOCIALS],
				knowsAbout: [
					"Software Architecture",
					"TypeScript",
					"React",
					"Node.js",
					"Go",
					"Kubernetes",
					"CI/CD",
					"API Design",
					"Mobile Development",
				],
			},
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}/#website`,
				url: SITE_URL,
				name: copy.title,
				description: copy.description,
				inLanguage: lang,
				author: { "@id": `${SITE_URL}/#person` },
				publisher: { "@id": `${SITE_URL}/#person` },
			},
		],
	};
}
