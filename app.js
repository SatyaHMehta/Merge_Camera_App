// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger");
// Access the device camera and stream to cameraView
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}
// Download the picture when clicked.

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor
    .toDataURL("image/png")
    .replace("image/jpg", "image/octet-stream");
  cameraOutput.classList.add("taken");

  console.log("hello");
  const download = document.getElementById("download");
  var image = document
    .getElementById("camera--sensor")
    .toDataURL("image/png")
    // .replace("image/jpg", "image/octet-stream");
  download.setAttribute("href", image);
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
