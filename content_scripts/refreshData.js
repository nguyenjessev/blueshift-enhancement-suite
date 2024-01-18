(() => {
  if (window.BESRefreshDataHasRun) {
    return;
  }

  window.BESRefreshDataHasRun = true;

  const refreshData = async () => {
    const templateDataResponse = await fetch(
      'https://app.getblueshift.com/api/v1/personalizations/template.json',
      {
        method: 'POST',
      }
    );

    const templateData = await templateDataResponse.json();

    browser.runtime.sendMessage({
      command: 'loadData',
      payload: templateData,
    });
  };

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'refreshData') {
      refreshData();
    }
  });
})();
