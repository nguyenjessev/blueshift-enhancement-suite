(() => {
  browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then((data) => {
      document
        .querySelector('.refresh-data-btn')
        .addEventListener('click', () => {
          browser.tabs.sendMessage(data[0].id, {
            command: 'refreshData',
          });
        });

      browser.runtime.onMessage.addListener((message) => {
        if (message.command === 'loadData') {
          const dataP = document.createElement('p');
          dataP.textContent = JSON.stringify(message.payload);
          document.querySelector('.sidebar-content').appendChild(dataP);
        }
      });
    });
})();
