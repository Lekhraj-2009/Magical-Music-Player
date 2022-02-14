music_type = "";

ambient_music = "";
rock_music = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

rock_status = "";
ambient_status = "";

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

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 500, 500);

    rock_status = rock_music.isPlaying();
    ambient_status = ambient_music.isPlaying();

    if (rock_status == false && ambient_status == false){
        music_type = "";
    }

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2){
        rock_music.stop();
        
        music_type = "ambient";
        circle(rightWristX, rightWristY, 20);
        
        if (ambient_status == false){
            document.getElementById("song").innerHTML = "Ambient Guitar";
            document.getElementById("profile_img").src = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqx6mM1snnAt-EEA5lLpMKAMcyp-fKTW2SbSJX2INScs6RyYJh";
            document.getElementById("music_name").innerHTML = "Ambient Guitar";
            document.getElementById("type").innerHTML = "Ambient";
            document.getElementById("producer").innerHTML = "Nikas Music";

            ambient_music.play();
        }
    }

    if (scoreLeftWrist > 0.2){
        ambient_music.stop();
        
        music_type = "rock";
        circle(leftWristX, leftWristY, 20);
        
        if (rock_status == false){
            document.getElementById("song").innerHTML = "Indie Rock";
            document.getElementById("profile_img").src = "https://c0.wallpaperflare.com/preview/358/994/381/wallpaper-metal-head-musician-music.jpg";
            document.getElementById("music_name").innerHTML = "Indie Rock";
            document.getElementById("type").innerHTML = "Rock";
            document.getElementById("producer").innerHTML = "MaxKo Music";

            rock_music.play();
        }
    }
}

function download(){
    if (music_type == "rock"){
        save("Indie_Rock.mp3");
    } else if (music_type == "ambient"){
        save("Ambient_Guitar.mp3");
    } else {
        alert("No music found! Please play a music.");
    }
}