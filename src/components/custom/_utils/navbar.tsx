import { NAV_LINKS } from "#/constants/nav";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
	return (
		<header className="fixed inset-x-0 top-5 z-50 flex justify-center sm:px-20 px-4 animate-fade-in">
			<nav className="flex justify-between gap-8 rounded-2xl bg-foreground/10 px-6 py-3 backdrop-blur-xl w-full">
				<Link
					to="/"
					className="text-lg font-bold tracking-tight text-foreground no-underline"
					style={{
						fontFamily: "Fraunces, Georgia, serif",
					}}
				>
					VLXX
				</Link>

				<div className="flex items-center gap-6">
					{NAV_LINKS.map(({ to, label }) => (
						<Link
							key={to}
							to={to}
							className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
							activeProps={{
								className:
									"text-sm font-medium text-foreground no-underline transition-colors",
							}}
						>
							{label}
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
};
