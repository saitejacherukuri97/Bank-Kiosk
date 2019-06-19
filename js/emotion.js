//--------------------
// GET USER MEDIA CODE
//--------------------
    navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

var video;
var webcamStream;

function startWebcam() {
  if (navigator.getUserMedia) {
     navigator.getUserMedia (

        // constraints
        {
           video: true,
           audio: false
        },

        // successCallback
        function(localMediaStream) {
          console.log(localMediaStream);
            video = document.querySelector('video');
           // video.src = window.URL.createObjectURL(localMediaStream);
           video.srcObject = localMediaStream;
           webcamStream = localMediaStream;
        },

        // errorCallback
        function(err) {
           console.log("The following error occured: " + err);
        }
     );
  } else {
     console.log("getUserMedia not supported");
  }

}


var fid,a,canvas,ctx;

function init() {
  // Get the canvas and obtain a context for
  // drawing in it
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
}

 //emotion() function
 function emotion()
 {
   ctx.drawImage(video, 0,0, canvas.width, canvas.height);
   var img1 = new Image();
   img1.src = canvas.toDataURL();

   a = document.createElement("a");
   a.href = canvas.toDataURL();
   a.download = "emoji";
   a.click();

            // $.ajax({
            //     type: "POST",
            //     url: "C:/Users/saitejach/Downloads/ATM/emotion.py",
            //     // data: { param: img1.src}
            //   }).done(function( response ) {
            //     var m = response;
            //     console.log(m);
            //     console.log("successfully received emotion resposne");
            //   });

             // pypyjs.execfile("../emotion.py");
  }

    document.getElementById('happy1').style.display = 'none';
    document.getElementById('sad1').style.display = 'none';
    document.getElementById('neutral1').style.display = 'block';  

    document.getElementById('happy1').style.display = 'none';
    document.getElementById('sad1').style.display = 'none';
    document.getElementById('neutral1').style.display = 'block';
    