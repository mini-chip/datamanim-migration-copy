declare module "prismjs" {
  interface PrismStatic {
    highlight: (text: string, grammar: unknown, language: string) => string;
    languages: Record<string, unknown>;
    [key: string]: unknown;
  }
  
  const Prism: PrismStatic;
  export default Prism;
}
