const container = document.getElementById("container");
const maze = document.getElementById("maze");
const player = document.getElementById("player");
const home = document.getElementById("home");
const emotion = document.getElementById("emotion-icon");

const bUp = document.getElementById("button-up");
const bDown = document.getElementById("button-down");
const bLeft = document.getElementById("button-left");
const bRight = document.getElementById("button-right");

const step = 25;
const borderWidth = 2;
const mazeHeight = 200;
const mazeWidth = 300;

const my = mazeHeight / step;
const mx = mazeWidth / step;

const grid = [];
for (let i = 0; i < my; i++) {
	const rowArray = [];
	for (let a = 0; a < mx; a++) {
		sg.push({ u: 0, d: 0, l: 0, r: 0, v: 0 });
	}
	grid.push(rowArray);
}