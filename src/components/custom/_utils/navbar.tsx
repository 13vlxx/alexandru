import { useTranslation } from "react-i18next";
import { LanguageDropdown } from "#/components/custom/dropdowns/language.dropdown";
import { NAV_LINKS } from "#/constants/nav";
import { useActiveSection } from "#/hooks/use-active-section";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export const Navbar = () => {
	const { t } = useTranslation();
	const activeSection = useActiveSection(SECTION_IDS);

	return (
		<header className="fixed inset-x-0 top-3 z-50 px-2 sm:top-4">
			<a
				href="#main"
				className="material sr-only rounded-full px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-16 focus:left-2"
			>
				{t("nav.skip")}
			</a>
			<nav className="material animate-fade-in mx-auto flex h-13 w-full max-w-6xl items-center rounded-full pr-2 pl-4 shadow-lg shadow-black/20 sm:pl-6">
				<a
					href="/#top"
					className="font-display text-lg font-bold tracking-tight text-white no-underline sm:text-xl"
				>
					Rusescu Alexandru
				</a>

				<div className="ml-auto flex items-center gap-1">
					<ul className="mr-2 hidden items-center md:flex">
						{NAV_LINKS.map(({ id, label }) => (
							<li key={id}>
								<a
									href={`/#${id}`}
									aria-current={activeSection === id ? "true" : undefined}
									className="rounded-full px-3 py-2 text-sm font-medium text-white/75 transition-colors duration-150 hover:text-white active:text-white/60 aria-[current]:text-white"
								>
									{t(label)}
								</a>
							</li>
						))}
					</ul>
					<LanguageDropdown />
				</div>
			</nav>
		</header>
	);
};
