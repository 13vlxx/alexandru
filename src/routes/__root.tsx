import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "#/components/custom/_utils/footer";
import { Navbar } from "#/components/custom/_utils/navbar";
import { NotFound } from "#/components/custom/_utils/not-found";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Rusescu Alexandru | Software Architect & Developer" },
			{
				name: "description",
				content:
					"Software architect and full-stack developer specialising in scalable backend systems, modern frontend interfaces, mobile apps, and cloud infrastructure.",
			},
			{ name: "author", content: "Rusescu Alexandru" },
			{
				name: "keywords",
				content:
					"software architect, full-stack developer, React, Node.js, Go, TypeScript, Kubernetes, mobile, backend, frontend",
			},
			// Open Graph
			{
				property: "og:title",
				content: "Rusescu Alexandru | Software Architect & Developer",
			},
			{
				property: "og:description",
				content:
					"Software architect and full-stack developer specialising in scalable backend systems, modern frontend interfaces, mobile apps, and cloud infrastructure.",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:locale", content: "en_GB" },
			// Twitter / X
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content: "Rusescu Alexandru | Software Architect & Developer",
			},
			{
				name: "twitter:description",
				content:
					"Software architect and full-stack developer specialising in scalable backend systems, modern frontend interfaces, mobile apps, and cloud infrastructure.",
			},
			// Misc
			{ name: "robots", content: "index, follow" },
			{ name: "theme-color", content: "#5227FF" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "canonical", href: "https://vlxx.fr" },
		],
	}),
	component: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument() {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<HeadContent />
			</head>
			<body className="bg-[#5227FF]">
				<Navbar />
				<Outlet />
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
