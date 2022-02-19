// importmap-override
(function() {
  const devImportmapNode = document.querySelector('script[type="importmap:original"]');
  const importmap = JSON.parse(devImportmapNode.text);
  const namespace = 'importmap-override:';
  const override = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(namespace)) {
      override[key.replace(namespace, '')] = localStorage.getItem(key);
    }
  }

  importmap.imports = { ...importmap.imports, ...override };

  const script = document.createElement('script');
  script.type = 'importmap';
  script.text = JSON.stringify(importmap, null, 2);
  devImportmapNode.before(script);
  devImportmapNode.parentNode.removeChild(devImportmapNode);
})();