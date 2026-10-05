"use client";

import { useEffect } from "react";

export function EnglishDocumentLanguage() {
  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = "en";

    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, []);

  return null;
}
