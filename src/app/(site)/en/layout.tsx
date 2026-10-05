import { EnglishDocumentLanguage } from "./document-language";

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <EnglishDocumentLanguage />
      {children}
    </>
  );
}
