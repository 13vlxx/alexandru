import { Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
	{ label: "GitHub", href: "https://github.com/13vlxx", icon: Github },
	{
		label: "LinkedIn",
		href: "https://fr.linkedin.com/in/arusescu",
		icon: Linkedin,
	},
];

const EMAIL = {
	label: "Email",
	href: "mailto:alexmonac13@gmail.com",
	icon: Mail,
};

export const SocialLinks = ({ withEmail = false }: { withEmail?: boolean }) => {
	return (
		<div className="flex items-center gap-1">
			{(withEmail ? [...LINKS, EMAIL] : LINKS).map(
				({ label, href, icon: Icon }) => (
					<a
						key={label}
						href={href}
						aria-label={label}
						{...(href.startsWith("http") && {
							target: "_blank",
							rel: "noopener noreferrer",
						})}
						className="rounded-full p-3 text-white/90 transition-[color,scale] duration-100 hover:text-white motion-safe:active:scale-90"
					>
						<Icon size={18} />
					</a>
				),
			)}
		</div>
	);
};
