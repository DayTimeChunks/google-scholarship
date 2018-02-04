// Select color input
// Select size input

$(function() {
  // Table element to append or delete children from
  var table = $('table');

  // Define default color from pallette on load.
  var colorPicker = $('input[type=color]');
  var currentColor = colorPicker.val();
  // I am wondering why the method below did not work...
  // var colorPicker = document.querySelector('input[type=color]');
  // colorPicker.addEventListener("change", watchColorPicker, false);

  /**
  @desc: Color change event listener (convenience method)
  */
  colorPicker.change(function(){
    currentColor = colorPicker.val();
  });

  /**
  @desc: Change table's cell currentColor
  */
  $('table').on('click', 'td', function(event){
    $( event.target ).css( 'background', currentColor );
  });

  // Submit button callBack to makeGrid()
  $('input[type=submit]').on('click', function(e){
    var height = $('#input_height').val();
    var width = $('#input_width').val();
    makeGrid(height, width, e);
    // e.preventDefault(); // return false; prevents page refresh
  });

  /**
  * @desc: Creates grid based on Submit callBack params
  * @param: {number} height
  * @param: {number} width
  */
  var makeGrid = function(height, width, e) {
    e.preventDefault(); // prevents page refresh

    // Clear table (if previously filled)
    // table.html(''); // This worked, but implementing a while loop.
    while (table.children().length > 0){
      table.empty(); // While loop could be avoided here?
    }
    // Other attempts:
    // Error when using table.hasChildNodes(),
    // -> hasChildNodes is not a function (?)

    // Populate the grid
    const row = '<tr></tr>';
    const cell = '<td></td>';
    for (var r = 0; r < height; r++){
      table.append(row);
    };
    for (var c = 0; c < width; c++){
      table.children().append(cell);
    };
  } // Extra semicolon removed.
});
