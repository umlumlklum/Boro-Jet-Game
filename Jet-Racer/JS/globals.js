var gameArea;
var player;
var obstacles = []; 
var score;
var background;
var statBox;
var stats; 
var time = 0;
var level = 1;
var health = 1;
let statBoxHeight = document.querySelector("#statBox").clientHeight;
let powerUps = [];

//const canvasWidth = 450;
const canvasWidth = window.innerWidth;
//const canvasHeight = 270;
const canvasHeight = window.innerHeight;
const playerWidth = 50;
const playerHeight = 50;
