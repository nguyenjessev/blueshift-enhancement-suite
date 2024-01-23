if (typeof browser == 'undefined') {
  globalThis.browser = chrome;
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (message.command === 'insertCSS') {
    await browser.scripting.insertCSS({
      target: {
        tabId: sender.tab.id,
      },
      files: ['content_scripts/recommendationBuilderFix.css'],
    });
  }

  if (message.command === 'removeCSS') {
    await browser.scripting.removeCSS({
      target: {
        tabId: sender.tab.id,
      },
      files: ['content_scripts/recommendationBuilderFix.css'],
    });
  }
});
