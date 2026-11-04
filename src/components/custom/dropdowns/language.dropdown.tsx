import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import i18n, {
	LANG_COOKIE,
	SUPPORTED_LANGUAGES,
	type SupportedLang,
} from "#/i18n";

export const LanguageDropdown = () => {
	const { t, i18n: i18nInstance } = useTranslation();
	const currentLang = i18nInstance.language as SupportedLang;

	const changeLanguage = (code: SupportedLang) => {
		i18n.changeLanguage(code);
		document.documentElement.lang = code;
		document.cookie = `${LANG_COOKIE}=${code};path=/;max-age=31536000;SameSite=Lax`;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label={t("nav.language")}
				className="group flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-white/90 transition-[background-color,color,scale] duration-100 hover:bg-white/10 hover:text-white motion-safe:active:scale-[0.97] data-[state=open]:bg-white/10 data-[state=open]:text-white"
			>
				<Languages size={14} />
				<span className="text-xs font-semibold uppercase tracking-wider">
					{currentLang}
				</span>
				<ChevronDown
					size={12}
					className="transition-transform duration-200 group-data-[state=open]:rotate-180"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				sideOffset={10}
				className="material w-40 rounded-2xl p-1.5 shadow-2xl"
			>
				{SUPPORTED_LANGUAGES.map(({ code, label }) => (
					<DropdownMenuItem
						key={code}
						lang={code}
						aria-current={currentLang === code ? "true" : undefined}
						onClick={() => changeLanguage(code)}
						className={`flex cursor-pointer justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus:bg-white/10 focus:text-white ${
							currentLang === code ? "text-white" : "text-white/75"
						}`}
					>
						{label}
						{currentLang === code && (
							<span className="h-1.5 w-1.5 rounded-full bg-brand-soft" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
