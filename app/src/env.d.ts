/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    IMGKIT_PRIVATE_KEY: string;
    IMGKIT_PUBLIC_KEY: string;
    IMGKIT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}