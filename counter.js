var clock;

chrome.storage.sync.get(['date', 'text'], function(data) {
  if(data.date === undefined) {
    alert('It looks like you\'re missing some information. Click on the icon in the toolbar or navigate to the extension settings page to update your settings.');
  } else {
    document.getElementById('text').textContent = data.text;
    clock = setInterval(function() {
      var birthday = new Date(data.date);
      var today = new Date();
      var ms = today.getTime() - birthday.getTime();
      var age = ms / (1000 * 60 * 60 * 24 * 365.25);
      document.getElementById('age').textContent = age.toFixed(9);
    }, 10);
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    if(key === "text") {
      document.getElementById('text').textContent = storageChange.newValue;
    } else if(key === "date") {
      clearInterval(clock);
      clock = setInterval(function() {
        var birthday = new Date(storageChange.newValue);
        var today = new Date();
        var ms = today.getTime() - birthday.getTime();
        var age = ms / (1000 * 60 * 60 * 24 * 365.25);
        document.getElementById('age').textContent = age.toFixed(9);
      }, 10);
    }
  }
});
