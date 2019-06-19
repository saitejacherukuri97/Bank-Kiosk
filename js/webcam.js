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

    //---------------------
    // TAKE A SNAPSHOT CODE
    //---------------------
    var a,canvas,ctx;

    function init() {
      // Get the canvas and obtain a context for
      // drawing in it
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext('2d');
    }

    //Snapshot() function
    function snapshot() {
        ctx.drawImage(video, 0,0, canvas.width, canvas.height);
        var img1 = new Image();
        img1.src = canvas.toDataURL();

        datad = "{\r\n    \"image\":\"" + img1.src+ "\",\r\n    \"gallery_name\":\"Sai\"\r\n}"
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.kairos.com/recognize",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "app_id": "ba212ff7",
                "app_key": "03da0f3bf3a640c7573a0adbbed71bd7",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": datad
        }

      $.ajax(settings).done(function (response) {
        var m = response;
        console.log(JSON.stringify(m).indexOf("success"));
        if(JSON.stringify(m).indexOf("success") > -1) {
            Materialize.toast('User Identfied. Name : ' +JSON.stringify(m.images[0].candidates[0].subject_id), 6000);
            console.log(m.images[0].candidates[0].subject_id);
            console.log("successfully sent");
            window.location.href = "welcomeCustomer.html?name="+m.images[0].candidates[0].subject_id;

        }
        else{
            console.log("Not a existing user");
            window.location.href = "newCustomer.html";
            a = document.createElement("a");
            a.href = canvas.toDataURL();
            a.download = m.images[0].candidates[0].subject_id;
            a.click();


        }
      });
      //console.log(img1.src);
    }

    function register() {
      ctx.drawImage(video, 0,0, canvas.width, canvas.height);
      var img2 = new Image();
      img2.src = canvas.toDataURL();
      var ip = document.getElementById('custName').value;
      datad = "{\r\n    \"image\":\"" + img2.src+ "\",\r\n    \"subject_id\":\"" + ip + "\",\r\n    \"gallery_name\":\"Sai\"\r\n}";
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.kairos.com/enroll",
          "method": "POST",
          "headers": {
              "content-type": "application/json",
              "app_id": "ba212ff7",
              "app_key": "03da0f3bf3a640c7573a0adbbed71bd7",
              "cache-control": "no-cache"
          },
          "processData": false,
          "data": datad
      }

      $.ajax(settings).done(function (response) {
        var m = response;
        if((response.images[0].transaction.status) == "success"){
          console.log("SUCCESS");
            // Materialize.toast("Image Trained succesfully by name " +response.images[0].transaction.subject_id+ " in gallery name " +response.images[0].transaction.gallery_name, 4000);
            console.log(response.images[0].transaction.subject_id);
            window.location.href = "welcomeCustomer.html?name="+response.images[0].transaction.subject_id;
        }
        else{
            Materialize.toast("Unable to Train Image", 4000);
            console.log("Error, image not sent");
        }
      });
}
