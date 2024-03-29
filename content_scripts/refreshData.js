const refreshData = async () => {
  const templateRegex = /email_template_studio\/(.+)\/edit/;
  const templateId = window.location.href.match(templateRegex)[1];

  const recommendationDataResponse = await fetch(
    `https://app.getblueshift.com/api/v1/email_templates/${templateId}.json`,
    {
      method: 'GET',
    }
  );
  const recommendationData = await recommendationDataResponse.json();
  const recommendationId =
    recommendationData.template_properties[0].account_algorithm_id;

  const userRegex = /customer\/(.+)\/show/;
  const userId = document
    .querySelector('.customer-link-out')
    .href.match(userRegex)[1];

  const templateDataResponse = await fetch(
    'https://app.getblueshift.com/api/v1/personalizations/template.json',
    {
      body: `{"template_properties":{"account_algorithm_id":${recommendationId},"algorithm":"${recommendationId}"},"uuid":"${userId}"}`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
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
