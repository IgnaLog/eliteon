import ns1 from "../../public/locales/en/translation.json";

export const defaultNS = "ns1";
export const resources = {
  en: {
    ns1,
  },
} as const;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}
