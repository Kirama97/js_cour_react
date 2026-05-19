import { loader } from '@monaco-editor/react';

// Point Monaco to locally-hosted workers (served by vite-plugin-monaco-editor)
// This eliminates CDN cross-origin requests that trigger Tracking Prevention in Edge
loader.config({
  paths: {
    vs: '/monacoeditorwork',
  },
});
