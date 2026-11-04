type Props = {
	label: string;
	line1: string;
	line2: string;
};

const LINE =
	"line-inner block font-display text-[clamp(3rem,8.5vw,8rem)] font-bold leading-[1.05] tracking-tight";

export const SectionHeading = ({ label, line1, line2 }: Props) => {
	return (
		<>
			<p className="mb-16 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
				{label}
			</p>
			<h2 className="mb-20">
				<span className="block overflow-hidden pb-3">
					<span className={`${LINE} text-white`}>{line1}</span>
				</span>
				<span className="block overflow-hidden pb-3">
					<span className={`${LINE} text-brand-soft`}>{line2}</span>
				</span>
			</h2>
		</>
	);
};
