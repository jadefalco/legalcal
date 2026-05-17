import { HeaderImage } from "./HeaderImage";

interface JurisdictionLayoutProps {
  code: string;
  children: React.ReactNode;
}

export default function JurisdictionLayout({
  code,
  children,
}: JurisdictionLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="w-full">
        <HeaderImage code={code} />
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
