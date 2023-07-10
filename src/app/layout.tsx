import "./globals.css";

export const metadata = {
	title: "Avatar Generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body style={{fontFamily: "sans-serif"}}>{children}</body>
		</html>
	);
}
