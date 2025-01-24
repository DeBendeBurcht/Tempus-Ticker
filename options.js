// Existing fields
var nameField = document.getElementById('name');
var dateField = document.getElementById('date');
var bkgrndSelect = document.querySelector('select');

// New fields
var fontSelect = document.getElementById('font');
var customTextField = document.getElementById('customText');

// Functions to update settings
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

// New function to update font
function updateFont() {
  chrome.storage.sync.set({
    'font': fontSelect.value
  }, function() {
    console.log('Font updated:', fontSelect.value);
  });
}

// New function to update custom text
function updateCustomText() {
  chrome.storage.sync.set({
    'customText': customTextField.value
  }, function() {
    console.log('Custom text updated:', customTextField.value);
  });
}

// Event listeners for all fields
nameField.addEventListener("change", updateName);
dateField.addEventListener("change", updateDate);
bkgrndSelect.addEventListener("change", updateBkgrnd);
fontSelect.addEventListener("change", updateFont); // New listener for font selection
customTextField.addEventListener("input", updateCustomText); // New listener for custom text

// Load settings on page load
chrome.storage.sync.get(['date', 'name', 'bkgrnd', 'font', 'customText'], function(data) {
  // Populate existing fields
  nameField.value = data.name || '';
  dateField.value = data.date || '';
  bkgrndSelect.value = data.bkgrnd || 'orange';
  
  // Populate new fields
  fontSelect.value = data.font || 'Arial'; // Default to Arial if not set
  customTextField.value = data.customText || ''; // Default to empty
});
