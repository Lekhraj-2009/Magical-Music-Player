music_type = "";

ambient_music = "";
rock_music = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    ambient_music = loadSound("Ambient_Guitar.mp3");
    rock_music = loadSound("Indie_Rock.mp3");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(437.5, 235);
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("p5 Model initialized Successfully!");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist: X = "+leftWristX+", Y = "+leftWristY);
        console.log("Right Wrist: X = "+rightWristX+", Y = "+rightWristY);
    }
}

function rock(){
    ambient_music.stop();
    rock_music.stop();

    music_type = "rock";
    document.getElementById("profile_img").src = "https://c0.wallpaperflare.com/preview/358/994/381/wallpaper-metal-head-musician-music.jpg";
    document.getElementById("music_name").innerHTML = "Indie Rock";
    document.getElementById("type").innerHTML = "Rock";
    document.getElementById("producer").innerHTML = "MaxKo Music";

    console.log("Play Rock Music");

    rock_music.play();
}

function ambient(){
    ambient_music.stop();
    rock_music.stop();

    music_type = "ambient";
    document.getElementById("profile_img").src = "https://i1.sndcdn.com/artworks-LT1xYbsl6xnrMXOf-dkT44A-t500x500.jpg";
    document.getElementById("music_name").innerHTML = "Ambient Guitar";
    document.getElementById("type").innerHTML = "Ambient";
    document.getElementById("producer").innerHTML = "Christopher Willits";

    console.log("Play Ambient Music");

    ambient_music.play();
}

function download(){
    if (music_type == "rock"){
        save("Indie_Rock.mp3");
    } else if (music_type == "ambient"){
        save("Ambient_Guitar.mp3");
    } else {
        alert("Please select a Music!");
    }
}

function draw(){
    image(video, 0, 0, 500, 500);
}