var clock;
var backgrounds = {
  'red': 'linear-gradient(to right, #e52d27, #b31217);',
  'orange': 'linear-gradient(to right, #F0CB35, #C02425);',
  'yellow': 'linear-gradient(to right, #fffc00, #ffffff);',
  'green': 'linear-gradient(to right, #DCE35B, #45B649);',
  'light-blue': 'linear-gradient(to right, #B2FEFA, #0ED2F7);',
  'dark-blue': 'linear-gradient(to right, #0575E6, #021B79);',
  'purple': 'linear-gradient(to right, #7F00FF, #E100FF);',
  'gray': 'linear-gradient(to right, #8e9eab, #eef2f3);',
  'black': 'linear-gradient(to right, #000000, #434343);'
};
var backgroundsArr = ['linear-gradient(to right, #e52d27, #b31217);','linear-gradient(to right, #F0CB35, #C02425);','linear-gradient(to right, #fffc00, #ffffff);','linear-gradient(to right, #DCE35B, #45B649);','linear-gradient(to right, #B2FEFA, #0ED2F7);','linear-gradient(to right, #0575E6, #021B79);','linear-gradient(to right, #7F00FF, #E100FF);','linear-gradient(to right, #8e9eab, #eef2f3);','linear-gradient(to right, #000000, #434343);'];

chrome.storage.sync.get(['date', 'name', 'bkgrnd'], function(data) {
  if(data.date === undefined || data.name === undefined) {
    alert('It looks like you\'re missing some information. Click on the icon in the toolbar or navigate to the extension settings page to update your settings.');
  } else {
    document.getElementById('name').textContent = data.name;
    clock = setInterval(function() {
      var birthday = new Date(data.date);
      var today = new Date();
      var ms = today.getTime() - birthday.getTime();
      var age = ms / (1000 * 60 * 60 * 24 * 365.25);
      document.getElementById('age').textContent = age.toFixed(9);
    }, 10);
  }
  if(data.bkgrnd === 'random' || data.bkgrnd === undefined) {
    document.querySelector('body').setAttribute("style", "background:" + backgroundsArr[Math.floor(Math.random()*backgroundsArr.length)]);
  } else {
    document.querySelector('body').setAttribute("style", "background:" + backgrounds[data.bkgrnd]);
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    if(key === "name") {
      document.getElementById('name').textContent = storageChange.newValue;
    } else if(key === "date") {
      clearInterval(clock);
      clock = setInterval(function() {
        var birthday = new Date(storageChange.newValue);
        var today = new Date();
        var ms = today.getTime() - birthday.getTime();
        var age = ms / (1000 * 60 * 60 * 24 * 365.25);
        document.getElementById('age').textContent = age.toFixed(9);
      }, 10);
    } else if(key === "bkgrnd") {
      document.querySelector('body').setAttribute("style", "background:" + backgrounds[storageChange.newValue]);
    }
  }
});