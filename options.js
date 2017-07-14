var nameField = document.getElementById('name');
var dateField = document.getElementById('date');

function updateName() {
  chrome.storage.sync.set({'name': nameField.value}, function() {
    console.log('Saved!');
  });
}

function updateDate() {
  chrome.storage.sync.set({'date': dateField.value}, function() {
    console.log('Saved!');
  });
}

nameField.addEventListener("change", updateName);
dateField.addEventListener("change", updateDate);

chrome.storage.sync.get(['date', 'name'], function(data) {
  nameField.value = data.name;
  dateField.value = data.date;
});