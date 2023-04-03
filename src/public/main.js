// Get references to the HTML elements we'll need to manipulate
const colorInput = document.getElementById('colorInput');
const pantoneName = document.getElementById('pantoneName');
const colorComparison = document.getElementById('colorComparison');

// Add an event listener to the input field to update the color comparison when the user types a new value
colorInput.addEventListener('input', () => {
    lookupPantone();
});

async function lookupPantone() {
    // Get the hex value from the input field
    const inputColor = colorInput.value.trim();
  
    // Check if the input is valid
    if (!/^([A-Fa-f0-9]{6})$/.test(inputColor)) {
      errorMessage.innerText = 'Please enter a 6-digit RGB hex value';
      return;
    }
  
    // Clear the error message if the input is valid
    errorMessage.innerText = '';
  
    // Send a GET request to the express node application with the hex value in the query parameter
    const response = await fetch(`/pantone?hex=${inputColor}`);
  
    // Parse the JSON response
    const pantoneColor = await response.json();
  
    // Update the HTML elements with the pantone name and color comparison
    //pantoneName.innerText = pantoneColor.name;
    colorComparison.innerHTML = `
      <div style="background-color: #${inputColor}; width: 200px; height: 200px; display: inline-block;">#${inputColor}</div>
      <br />
      <br />
      <div style="background-color: #${pantoneColor.hex}; width: 200px; height: 200px; display: inline-block;">#${pantoneColor.hex} <br /> name: ${pantoneColor.name} <br /> TCX: ${pantoneColor.code}</div>
    `;
  }
  