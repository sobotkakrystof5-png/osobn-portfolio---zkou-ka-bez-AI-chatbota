// CSS module declarations
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// Side-effect CSS imports (e.g. globals.css)
declare module "*.css" {}
