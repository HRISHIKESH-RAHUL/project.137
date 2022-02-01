input="";
utterThis="";
utterThis2="";
Status = "";
objects=[];
synth="";
synth_2="";
video="";
SpeechRecognition = window.webkitSpeechRecognition;

function setup(){
canvas = createCanvas(480,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();

}

function start(){
    objectDetector=ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    input= document.getElementById("obj_input").value;
    console.log(input);
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
    console.log(results);
    objects=results;
    }
}

function speak_one(){
    synth = window.speechSynthesis ;
   speak_data = input + "Detected " ;
    utterThis = new SpeechSynthesisUtterance(speak_data) ;
    window.speechSynthesis.speak(utterThis);
    //synth.speak(utterThis);
}

function speak_two(){
    synth_ = window.speechSynthesis ;
   speak_data_2 = input + "Not Detected " ;
    utterThis2 = new SpeechSynthesisUtterance(speak_data_2) ;
    window.speechSynthesis.speak(utterThis2);
    //synth.speak(utterThis2);
}

function draw(){
    image(video , 0 , 0 , 480 , 380);
    if(Status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length ; i++){
            document.getElementById("no_obj").innerHTML="Number Of Objects Detected = "+objects.length;
            r=Math.random()*255;
            g=Math.random()*255;
            b=Math.random()*255;
            fill(r,g,b)
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label == input){
                document.getElementById("status").innerHTML="Status : "+input +" Detected";
                objectDetector.detect(gotResult);
                console.log("Object Detected");
                speak_one();
                }
                else{
                    document.getElementById("status").innerHTML="Status : "+input+" Not Detected";
                    console.log("Object Not Detected");
                    speak_two();  
                }
        }
    }
    }
    

