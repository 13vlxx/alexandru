import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import fr from "./locales/fr";
import ja from "./locales/ja";

export const SUPPORTED_LANGUAGES = [
	{ code: "fr", label: "Français" },
	{ code: "en", label: "English" },
	{ code: "ja", label: "日本語" },
] as const;

export type SupportedLang = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const LANG_COOKIE = "portfolio-lang";
const SUPPORTED_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

export function parseLangCookie(cookieHeader: string): SupportedLang {
	const match = cookieHeader.match(
		new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=([^;]+)`),
	);
	const val = match?.[1] as SupportedLang | undefined;
	return val && (SUPPORTED_CODES as readonly string[]).includes(val)
		? val
		: "fr";
}

// On the client, read the cookie synchronously so i18n is initialized with
// the correct language before React hydration begins — prevents mismatch errors.
const initialLng: SupportedLang =
	typeof document !== "undefined" ? parseLangCookie(document.cookie) : "fr";

if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources: {
			en: { translation: en },
			fr: { translation: fr },
			ja: { translation: ja },
		},
		lng: initialLng,
		fallbackLng: "fr",
		supportedLngs: ["en", "fr", "ja"],
		interpolation: { escapeValue: false },
	});
}

export default i18n;
