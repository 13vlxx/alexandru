import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import i18n, { LANG_COOKIE, SUPPORTED_LANGUAGES, type SupportedLang } from "#/i18n";

export const LanguageDropdown = () => {
	const { i18n: i18nInstance } = useTranslation();
	const currentLang = i18nInstance.language as SupportedLang;

	const changeLanguage = (code: SupportedLang) => {
		i18n.changeLanguage(code);
		document.cookie = `${LANG_COOKIE}=${code};path=/;max-age=31536000;SameSite=Lax`;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-white/40 outline-none transition-all hover:border-white/10 hover:bg-white/5 hover:text-white/80 data-[state=open]:border-white/10 data-[state=open]:bg-white/5 data-[state=open]:text-white">
				<Languages size={13} />
				<span className="text-[0.65rem] font-semibold uppercase tracking-wider">
					{currentLang}
				</span>
				<ChevronDown
					size={11}
					className="transition-transform duration-200 group-data-[state=open]:rotate-180"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-40 rounded-2xl border-white/10 bg-[#0d0820]/90 p-1.5 shadow-2xl backdrop-blur-md"
			>
				{SUPPORTED_LANGUAGES.map(({ code, label }) => (
					<DropdownMenuItem
						key={code}
						onClick={() => changeLanguage(code)}
						className={`flex cursor-pointer justify-between rounded-xl px-4 py-2.5 text-xs font-medium transition-colors focus:bg-white/5 focus:text-white ${
							currentLang === code ? "text-white" : "text-white/40"
						}`}
					>
						{label}
						{currentLang === code && (
							<span className="h-1.5 w-1.5 rounded-full bg-[#5227FF]" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
