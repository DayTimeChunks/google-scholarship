// console.log("Global this: ", this); -> window object
//
if (navigator.serviceWorker) {

  navigator.serviceWorker
    .register('./service-worker.js', {scope: './'})  //
    .then(registry => {
      console.log("Successful registration: ", registry);
    })
    .catch( err => {
      console.log("Error: ", err); });
}




// let sw;
// let indexController = this;

//
// function IndexController() {
//   this._registerWorker();
//   console.log("IndexController has called to register");
// };
//
// IndexController.prototype._registerWorker = () => {
//   if (!navigator.serviceWorker) return;
//   // let sw;
//   // let indexController = this;
//
//   navigator.serviceWorker
//     .register('./service-worker.js', {scope: './'})  //
//     .then(registry => {
//       console.log("Successful registration: ", registry);
//
//       // To include Toast buttons, use below logic but need to import all Toast functions:
//
//       // Check for controller, if no controller, no SW was used and user
//       // loaded the page from the network, exit early...
//
//       // if (!navigator.serviceWorker.controller) return;
//
//       // if (registry.waiting) {
//       //   sw = registry.waiting;
//       //   this._updateReady(sw);
//       // }
//
//       // Listen for the controlling SW changing, check progress, and reload the page
//
//       // registry.addEventListener("updatefound", () => {
//       //   console.log("Update found");
//       //   registry.installing.addEventListener("statechange", () => {
//       //     if (registry.waiting){
//       //       sw = registry.waiting;
//       //       if (sw.state === "installed"){
//       //         indexController._updateReady(sw);
//       //       }
//       //     }
//       //   })
//       // })
//     })
//     .catch( err => {
//       console.log("Error: ", err); });
// };
//
// IndexController.prototype._updateReady = (worker) => {
//   worker.skipWaiting().then(result => {
//     console.log("Skipwaiting result", result);
//   });
// };



