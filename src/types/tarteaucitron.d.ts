export {};

type TarteaucitronService = {
  key: string;
  type: "analytic" | "ads" | "api";
  name: string;
  uri: string;
  needConsent: boolean;
  cookies: string[];
  js(): void;
  fallback(): void;
};

type TarteaucitronApi = {
  init(options: Record<string, unknown>): void;
  job: string[];
  services: Record<string, TarteaucitronService>;
  state: Record<string, boolean | "wait" | undefined>;
  setConsent(id: string, status: boolean): void;
  userInterface: {
    openPanel(): void;
  };
};

declare global {
  interface Window {
    tarteaucitron?: TarteaucitronApi;
    tarteaucitronForceLanguage?: "fr" | "en";
    tarteaucitronCustomText?: Record<string, string>;
    tac_gtag?: (...args: unknown[]) => void;
  }
}
