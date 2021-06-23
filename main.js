alarm="";
status="";
objects=[];

function preload(){
    alarm=loadSound("alarm.mp3");  
}
function setup() {
     canvas = createCanvas(380,380);
     canvas.center();
     video=createCapture(VIDEO);
     video.size(380,380);
     video.hide();
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML="Status : Detecting Objects";
 }
 function modelLoaded() {
     console.log("Model Loaded!");
      status = true;
  
 }
 function gotResult(error, results) {
      if (error) {
      console.log(error);
 } 
 console.log(results);
  objects = results;
 }

 function draw(){
     image(video,0,0,380,380);
     objectDetector.detect(video, gotResult);
     if(status==true){
        
document.getElementById("status").innerHTML="Status: Objects Detected";
fill("#0A2342");
percent=floor(objects.confidence*100);
text(objects.label+""+percent+"%",objects.x+95,objects.y+20);
noFill()
stroke("#0A2342");
rect(objects.x+95,objects.y+20,objects.width,objects.height);

}
else{
    alarm.play();
}
 }
