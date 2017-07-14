var clock;

chrome.storage.sync.get(['date', 'name'], function(data) {
  if(data.date === undefined || data.name === undefined) {
    alert('It looks like you\'re missing some information. Click on the icon in the toolbar to update your settings.');
  }

  document.getElementById('name').textContent = data.name;
  
  clock = setInterval(function(){
    var birthday = new Date(data.date);
    var today = new Date();
    var ms = today.getTime() - birthday.getTime();
    var age = ms / (1000 * 60 * 60 * 24 * 365.25);
    document.getElementById('age').textContent = age.toFixed(9);
  }, 10);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    if(key === "name") {
      document.getElementById('name').textContent = storageChange.newValue;
    } else if(key === "date") {
      clearInterval(clock);
      clock = setInterval(function(){
        var birthday = new Date(storageChange.newValue);
        var today = new Date();
        var ms = today.getTime() - birthday.getTime();
        var age = ms / (1000 * 60 * 60 * 24 * 365.25);
        document.getElementById('age').textContent = age.toFixed(9);
      }, 10);
    }
  }
});