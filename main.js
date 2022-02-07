ambient_music = "";
rock_music = "";

ambient_image = "";
rock_image = "";

music_type = "";

function preload(){
    ambient_music = loadSound("Ambient_Guitar.mp3");
    rock_music = loadSound("Indie_Rock.mp3");
    
    ambient_image = loadImage("https://i1.sndcdn.com/artworks-LT1xYbsl6xnrMXOf-dkT44A-t500x500.jpg");;
    rock_image = loadImage("https://c0.wallpaperflare.com/preview/358/994/381/wallpaper-metal-head-musician-music.jpg");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(437.5, 235);
    
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 500, 500);
}