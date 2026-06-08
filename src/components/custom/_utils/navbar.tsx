export const Navbar = () => {
	return (
		<header className="animate-fade-in fixed inset-x-0 top-5 z-50 flex justify-center px-4 sm:px-10">
			<nav className="flex w-full max-w-6xl">
				<a
					href="/"
					className="text-xl font-bold tracking-tight text-white/70 no-underline transition-colors hover:text-white"
					style={{ fontFamily: "Fraunces, Georgia, serif" }}
				>
					Rusescu Alexandru
				</a>
			</nav>
		</header>
	);
};
