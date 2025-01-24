var textField = document.getElementById('text');
var dateField = document.getElementById('date');

function updateText() {
  try {
    chrome.storage.sync.set({
      'text': textField.value
    });
  } catch (error) {
    console.error("Error saving text: reason unknown.", error);
    alert('The Value for Text cant be set, please contact the developer');
  }
}

function updateDate() {
  try {
  chrome.storage.sync.set({
    'date': dateField.value
  });
  } catch (error) {
  console.error("Error saving text: reason unknown.", error);
  alert('The Value for Date cant be set, please contact the developer');
}
}

textField.addEventListener("change", updateText);
dateField.addEventListener("change", updateDate);

chrome.storage.sync.get(['date', 'text'], function(data) {
  textField.value = data.text || "";
  dateField.value = data.date;
});
