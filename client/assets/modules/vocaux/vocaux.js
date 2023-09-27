$(document).ready(function () {
    $("#startRecording").on("click", initFunction);
  
    let isRecording = $("#isRecording");
  
    function initFunction() {
      // Display recording
      async function getUserMedia(constraints) {
        if (window.navigator.mediaDevices) {
          return window.navigator.mediaDevices.getUserMedia(constraints);
        }
  
        let legacyApi =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;
  
        if (legacyApi) {
          return new Promise(function (resolve, reject) {
            legacyApi.bind(window.navigator)(constraints, resolve, reject);
          });
        } else {
          alert("user api not supported");
        }
      }
  
      isRecording.text("Recording...");
  
      let audioChunks = [];
      let rec;
  
      function handlerFunction(stream) {
        rec = new MediaRecorder(stream);
        rec.start();
        rec.ondataavailable = (e) => {k 
          audioChunks.push(e.data);
          if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: "audio/mp3" });
            console.log(blob);
            $("#audioElement").attr("src", URL.createObjectURL(blob));
          }
        };
      }
  
      function startusingBrowserMicrophone(boolean) {
        getUserMedia({ audio: boolean }).then((stream) => {
          handlerFunction(stream);
        });
      }
  
      startusingBrowserMicrophone(true);
  
      // Stoping handler
      $("#stopRecording").on("click", function (e) {
        rec.stop();
        isRecording.text("Click play button to start listening");
      });
    }
  });
  