const calculatorContainer = document.createElement('li');
calculatorContainer.classList.add('calculate-filesize-btn');
calculatorContainer.classList.add('tab-item');

const calculatorContents = document.createElement('div');
calculatorContents.classList.add('calculator-contents');
calculatorContents.append('Calculate Filesize:');

const size = document.createElement('span');
size.classList.add('size');
size.textContent = 'N/A';

calculatorContents.appendChild(size);
calculatorContainer.appendChild(calculatorContents);

const toolbar = document.querySelector('.bsft-tab-theme-box > ul');
toolbar.appendChild(calculatorContainer);

calculatorContainer.addEventListener('click', async () => {
  const templateRegex = /email_template_studio\/(.+)\/edit/;
  const templateId = window.location.href.match(templateRegex)[1];

  const templateDataResponse = await fetch(
    `https://app.getblueshift.com/api/v1/email_templates/${templateId}.json`,
    {
      method: 'GET',
    }
  );
  const templateData = await templateDataResponse.json();
  const templateHTML = templateData.resource.content;
  const templateSize = Math.round(new Blob([templateHTML]).size / 100) / 10;

  const size = document.querySelector('.size');
  size.textContent = `~${templateSize}KB`;
});
