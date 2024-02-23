var gameArea;
var player;
var objects = new Set();
var score = 0;
var time = 0;
var level = 1;

var stats;
var statBox;
var statBoxHeight = document.querySelector("#statBox").clientHeight;

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const playerWidth = 50;
const playerHeight = 50;
