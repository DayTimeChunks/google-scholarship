

// menu = document.getElementById("myDropdown");
//
// menu.addEventListener('click', function(e){
//     drawer.classList.toggle('open');
//     e.stopPropagation();
// });

// var menu = document.querySelector('#menu');

// Function will wait for DOM to load in to do the work...

document.addEventListener("DOMContentLoaded", function(event){
  // Do work afetr loading.
  var menu = document.getElementById('menu');
  var main = document.querySelector('main');
  var drawer = document.querySelector('.nav');

  menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
  });
  if (main) {
    main.addEventListener('click', function() {
      drawer.classList.remove('open');
    });
  }
});
