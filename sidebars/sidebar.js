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
          document.querySelector('.sidebar-content').innerHTML = '';

          const data = message.payload;

          for (const [key, value] of Object.entries(data)) {
            if (value) {
              const pair = document.createElement('details');
              const summary = document.createElement('summary');
              summary.textContent = key;
              pair.appendChild(summary);
              pair.append(value);
              document.querySelector('.sidebar-content').appendChild(pair);
            }
          }
        }
      });
    });
})();
