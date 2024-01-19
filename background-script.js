browser.scripting.registerContentScripts([
  {
    id: 'calculateFilesize',
    matches: '*://*.getblueshift.com/*',
    js: [
      '/content_scripts/refreshData.js',
      '/content_scripts/calculateFilesize.js',
    ],
  },
]);
