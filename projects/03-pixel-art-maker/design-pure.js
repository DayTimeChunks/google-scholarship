const submitButton = document.querySelector('input[type=submit]');
const colorPicker = document.querySelector('input[type=color]');
const table = document.querySelector('table');

console.log(table);
colorPicker.addEventListener('change', watchColorPicker, false);
table.addEventListener('click', addColor, false);

let currentColor = "#000000";
function watchColorPicker(e){
  currentColor = e.target.value;
  console.log(currentColor);
}

function addColor(e){
  console.log(e.target.nodeName);
  if (e.target.nodeName === 'TD') {
    e.target.style.backgroundColor = currentColor;
  }
}
// Making the gird
submitButton.addEventListener('click', function(e){
  e.preventDefault();
  let height = document.querySelector('#input_height').value;
  let width = document.querySelector('#input_width').value;
  makeGrid(height, width, e);
});

let makeGrid = function(height, width, e) {
  e.preventDefault(); // prevents page refresh
  // Clear table (if previously filled)
  while (table.rows.length > 0) {
    console.log(table.rows.length);
    table.deleteRow(0);
  }
  for (let r = 0; r < height; r++){
    let row = table.insertRow(r);
      for (let c = 0; c < width; c++){
        row.insertCell(c);
      };
  };
};
