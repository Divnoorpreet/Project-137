objects = [];
status = "";

function setup() {
  canvas = createCanvas(380, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,300);
  video.hide();
}
function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_input = document.getElementById("object_input").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 300);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          fill("#FFFFFF");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FFFFFF");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == object_input)
          {
            objectDetector.detect(gotResult);
            document.getElementById("found_object").innerHTML = object_input + " is found";
            speak = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_input + "is found");
            speak.speak(utterThis);
            speak.stop();
          }
          else
          {
            document.getElementById("found_object").innerHTML = object_input + " is not found";
            speak = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_input + "is not found");
            speak.speak(utterThis);
            speak.stop();
          }          
         }
      }
}