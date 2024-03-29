const colorizeButton = (size) => {
  const button = document.querySelector('.calculate-filesize-btn');
  button.classList.remove('good-size');
  button.classList.remove('ok-size');
  button.classList.remove('bad-size');

  if (size >= 104) {
    button.classList.add('bad-size');
  } else if (size >= 99) {
    button.classList.add('ok-size');
  } else {
    button.classList.add('good-size');
  }
};

const calculatorMain = () => {
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
    const iframe = document.querySelector('email-canvas iframe');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const content = doc.querySelector('html').innerHTML;
    const templateSize = Math.round(new Blob([content]).size / 100) / 10;

    colorizeButton(templateSize);

    const size = document.querySelector('.size');
    size.textContent = `~${templateSize}KB`;
  });
};

const observeToolbar = (selector) => {
  const observer = new MutationObserver((mutations) => {
    if (
      document.querySelector(selector) &&
      !document.querySelector('.calculate-filesize-btn')
    ) {
      calculatorMain();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

observeToolbar('.TemplateStudio-editor .bsft-tab-theme-box > ul');
