/// <reference types="materialize-css" />

declare module "*.scss" {
  const styles: Record<string, string>;
  export default styles;
}

declare module "*.gif";
