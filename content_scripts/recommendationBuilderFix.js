(() => {
  let currentURL = '';

  const observer = new MutationObserver(async () => {
    if (
      window.location.href !== currentURL &&
      window.location.href.includes('recommendation/detail')
    ) {
      browser.runtime.sendMessage({ command: 'insertCSS' });
    } else if (
      window.location.href !== currentURL &&
      !window.location.href.includes('recommendation/detail')
    ) {
      browser.runtime.sendMessage({ command: 'removeCSS' });
    }

    currentURL = window.location.href;
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
