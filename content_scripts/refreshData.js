(() => {
  if (window.BESRefreshDataHasRun) {
    return;
  }

  window.BESRefreshDataHasRun = true;

  const refreshData = async () => {
    const regex = /email_template_studio\/(.+)\/edit/;
    const templateId = window.location.href.match(regex)[1];

    const templateDataResponse = await fetch(
      'https://app.getblueshift.com/api/v1/personalizations/template.json',
      {
        method: 'POST',
        body: {},
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
