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
		rowArray.push({ u: 0, d: 0, l: 0, r: 0, v: 0 });
	}
	grid.push(rowArray);
}

const directions = ["u", "d", "l", "r"];
const directionModifier = {
	u: { y: -1, x: 0, o: "d" },
	d: { y: 1, x: 0, o: "u" },
	l: { y: 0, x: -1, o: "r" },
	r: { y: 0, x: 1, o: "l" }
};

function generateSides() {
	const maxSides = mazeHeight / step;
	const section1Height = Math.floor(Math.random() * maxSides) * step;
	const section2Height = mazeHeight - step - section1Height;

	const leftBar1 = document.createElement("div");
	leftBar1.style.top = step + "px";
	leftBar1.style.left = step + "px";
	leftBar1.style.height = section1Height + "px";

	const leftBar2 = document.createElement("div");
	leftBar2.style.top = section1Height + step * 2 + "px";
	leftBar2.style.left = step + "px";
	leftBar2.style.height = section2Height + "px";

	const rightBar1 = document.createElement("div");
	rightBar1.style.top = step + "px";
	rightBar1.style.left = mazeWidth + step + "px";
	rightBar1.style.height = section2Height + "px";

	const rightBar2 = document.createElement("div");
	rightBar2.style.top = section2Height + step * 2 + "px";
	rightBar2.style.left = mazeWidth + step + "px";
	rightBar2.style.height = section1Height + "px";
}

function generateMaze(currentX, currentY, s) {
	const shuffledDirections = limitedShuffle(directions, s);

	for (let i = 0; i < shuffledDirections.length; i++) {
		let nextX = currentX + directionModifier[shuffledDirections[i]].x;
		let nextY = currentY + directionModifier[shuffledDirections[i]].y;
		grid[currentY][currentX].v = 1;

		if (nextX >= 0 && nextX < mx && nextY >= 0 && nextY < my && grid[nextY][nextX].v === 0) {
			grid[currentY][currentX][shuffledDirections[i]] = 1;
			grid[nextY][nextX][directionModifier[shuffledDirections[i]].o] = 1;
			genMaze(nextX, nextY, i);
		}
	}
}

function limitedShuffle(array, limit) {
	let constrained = array.slice(0, limit);
	let remaining = array.slice(limit, array.length);

	for (let i = remaining.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[remaining[i], remaining[j]] = [remaining[j], remaining[i]];
	}
	let combined = constrained.concat(remaining);
	return combined;
}