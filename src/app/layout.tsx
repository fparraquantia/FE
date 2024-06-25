import { Providers } from "@/providers/providers";
import srcLogo from "@/assets/images/tedagua-logo-simple.png";

export const metadata = {
  title: "Tedagua Portal",
  description: "Tedagua Portal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href={"@/assets/images/tedagua-logo-simple.png"} sizes="any" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
