var nameField = document.getElementById('name');
var dateField = document.getElementById('date');
var bkgrndSelect = document.querySelector('select');

function updateName() {
  chrome.storage.sync.set({
    'name': nameField.value
  });
}

function updateDate() {
  chrome.storage.sync.set({
    'date': dateField.value
  });
}

function updateBkgrnd() {
  chrome.storage.sync.set({
    'bkgrnd': bkgrndSelect.value
  }, function() {
    console.log(bkgrndSelect.value);
  });
}

nameField.addEventListener("change", updateName);
dateField.addEventListener("change", updateDate);
bkgrndSelect.addEventListener("change", updateBkgrnd);

chrome.storage.sync.get(['date', 'name', 'bkgrnd'], function(data) {
  nameField.value = data.name;
  dateField.value = data.date;
  if(data.bkgrnd !== undefined) {
    bkgrndSelect.value = data.bkgrnd;
  } else {
    bkgrndSelect.value = 'orange';
  }
});