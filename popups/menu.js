(() => {
  browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then((data) => {
      if (!data[0].url.includes('email_template_studio')) {
        document.querySelector('.popup-content').classList.add('hidden');
        document.querySelector('.error-content').classList.remove('hidden');
      }
    });

  document
    .querySelector('.toggle-sidebar-btn')
    .addEventListener('click', () => {
      browser.sidebarAction.toggle();
    });
})();
