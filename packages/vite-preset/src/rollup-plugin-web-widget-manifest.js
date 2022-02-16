export default function webWidgetManifestPlugin({ transform } = {}) {
  const manifest = {}

  let outputCount
  let viteConfig;

  return {
    name: 'web-widget-manifest',

    // vite hoook
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    buildStart() {
      outputCount = 0
    },

    generateBundle({ format }, bundle) {
      for (const file in bundle) {
        const chunk = bundle[file]
        if (chunk.type === 'chunk') {
          if (chunk.isEntry) {
            if (format === 'es' || format === 'esm') {
              manifest.path = chunk.fileName;
            } else if (format === 'system') {
              manifest.fallbackPath = chunk.fileName;
            }
          }
        }
      }

      const emitFile = () => this.emitFile({
        fileName: 'web-widget.json',
        type: 'asset',
        source: JSON.stringify(transform ? transform(manifest) : manifest, null, 2)
      });

      if (viteConfig) {
        outputCount++
        const output = viteConfig.build.rollupOptions?.output
        const outputLength = Array.isArray(output) ? output.length : 1
        if (outputCount >= outputLength) {
          emitFile();
        }
      } else {
        emitFile();
      }
    }
  }
}