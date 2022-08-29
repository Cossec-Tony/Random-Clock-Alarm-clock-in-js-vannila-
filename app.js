if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js");
} else {
  console.log("Ta le seum");
}
