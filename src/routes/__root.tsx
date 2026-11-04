import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useTranslation } from "react-i18next";
import { Footer } from "#/components/custom/_utils/footer";
import { Navbar } from "#/components/custom/_utils/navbar";
import { NotFound } from "#/components/custom/_utils/not-found";
import { buildJsonLd, OG_IMAGE, SEO, SITE_URL } from "#/constants/seo";
import i18n, { parseLangCookie, type SupportedLang } from "../i18n";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

const FONTS_CSS =
	"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap";

const getInitialLang = createServerFn({ method: "GET" }).handler(async () => {
	const req = getRequest();
	return parseLangCookie(req?.headers.get("cookie") ?? "");
});

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	loader: async () => {
		const initialLang = await getInitialLang();
		await i18n.changeLanguage(initialLang);
		return { initialLang };
	},
	head: ({ loaderData }) => {
		// La langue vient du cookie résolu en SSR : un crawler sans cookie voit
		// donc les métadonnées dans la langue par défaut (fr), cohérentes
		// avec le <html lang> et le contenu rendu.
		const lang: SupportedLang = loaderData?.initialLang ?? "fr";
		const copy = SEO[lang];

		return {
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ title: copy.title },
				{ name: "description", content: copy.description },
				{ name: "author", content: "Rusescu Alexandru" },
				{ name: "keywords", content: copy.keywords },
				// Open Graph
				{ property: "og:site_name", content: "Rusescu Alexandru" },
				{ property: "og:title", content: copy.title },
				{ property: "og:description", content: copy.description },
				{ property: "og:type", content: "website" },
				{ property: "og:url", content: `${SITE_URL}/` },
				{ property: "og:locale", content: copy.ogLocale },
				{ property: "og:image", content: OG_IMAGE },
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ property: "og:image:type", content: "image/jpeg" },
				{ property: "og:image:alt", content: copy.title },
				// Twitter / X
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: copy.title },
				{ name: "twitter:description", content: copy.description },
				{ name: "twitter:image", content: OG_IMAGE },
				{ name: "twitter:image:alt", content: copy.title },
				// Misc
				{ name: "robots", content: "index, follow, max-image-preview:large" },
				{ name: "theme-color", content: "#110732" },
			],
			links: [
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous",
				},
				{ rel: "stylesheet", href: FONTS_CSS },
				{ rel: "stylesheet", href: appCss },
				{ rel: "canonical", href: `${SITE_URL}/` },
				{ rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
				{
					rel: "icon",
					href: "/logo192.png",
					type: "image/png",
					sizes: "192x192",
				},
				{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
				{ rel: "manifest", href: "/manifest.json" },
			],
		};
	},
	component: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument() {
	const { i18n: i18nInstance } = useTranslation();
	const lang = i18nInstance.language as SupportedLang;

	return (
		<html lang={lang}>
			<head>
				<HeadContent />
				{/* Données structurées, rendues côté serveur pour les crawlers. */}
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique, aucune entrée utilisateur
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(buildJsonLd(lang)),
					}}
				/>
			</head>
			<body
				className="bg-background text-foreground antialiased"
				suppressHydrationWarning
			>
				<Navbar />
				<main id="main">
					<Outlet />
				</main>
				<Footer />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
