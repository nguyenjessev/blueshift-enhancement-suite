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
          document.querySelector('.loading').classList.remove('hidden');
          document.querySelector('.sidebar-content').innerHTML = '';
          browser.tabs.sendMessage(data[0].id, {
            command: 'refreshData',
          });
        });

      browser.runtime.onMessage.addListener((message) => {
        if (message.command === 'loadData') {
          document.querySelector('.loading').classList.add('hidden');

          const data = message.payload;

          for (const [key, value] of Object.entries(data)) {
            const pair = createDisclosure(key, value);
            document.querySelector('.sidebar-content').appendChild(pair);
          }
        }
      });

      const createDisclosure = (key, value) => {
        const pair = document.createElement('details');
        const summary = document.createElement('summary');
        const content = document.createElement('div');
        content.classList.add('disclosure-value');
        summary.textContent = key;
        pair.appendChild(summary);

        if (
          value !== null &&
          typeof value === 'object' &&
          Object.keys(value).length > 0
        ) {
          for (const [k, v] of Object.entries(value)) {
            content.appendChild(createDisclosure(k, v));
            pair.appendChild(content);
          }
        } else {
          content.textContent = value ?? 'null';
          pair.appendChild(content);
        }

        return pair;
      };
    });
})();
