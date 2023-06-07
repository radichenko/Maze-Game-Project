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
const size = 25;
const borderWidth = 2;
const mazeHeight = 250;
const mazeWidth = 375;
const noGoX = [];
const noGoX2 = [];
const noGoY = [];
const noGoY2 = [];
const prevDist = mazeWidth * 2;

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

generateSides();
generateMaze(0, 0, 0);
drawMaze();

const barriers = document.getElementsByClassName("barrier");
for (let b = 0; b < barriers.length; b++) {
	noGoX.push(barriers[b].offsetLeft);
	noGoX2.push(barriers[b].offsetLeft + barriers[b].clientWidth);
	noGoY.push(barriers[b].offsetTop);
	noGoY2.push(barriers[b].offsetTop + barriers[b].clientHeight);
}

function checkXboundry(direction) {
	const x = player.offsetLeft;
	const y = player.offsetTop;
	const results = [];
	const length = Math.max(noGoX.length, noGoX2.length, noGoY.length, noGoY2.length);
	let check = 0;
	for (let i = 0; i < length; i++) {
		check = 0;
		if (y < noGoY[i] || y > noGoY2[i] - size) {
			check = 1;
		}
		if (direction === "r") {
			if (x < noGoX[i] - size || x > noGoX2[i] - size) {
				check = 1;
			}
		}
		if (direction === "l") {
			if (x < noGoX[i] || x > noGoX2[i]) {
				check = 1;
			}
		}
		results.push(check);
	}
	const res = results.every(function (e) {
		return e > 0;
	});
	return res;
}

function checkYboundry(direction) {
	const x = player.offsetLeft;
	const y = player.offsetTop;
	const results = [];
	const length = Math.max(noGoX.length, noGoX2.length, noGoY.length, noGoY2.length);
	let check = 0;
	for (let i = 0; i < length; i++) {
		check = 0;
		if (x < noGoX[i] || x > noGoX2[i] - size) {
			check = 1;
		}
		if (direction === "u") {
			if (y < noGoY[i] || y > noGoY2[i]) {
				check = 1;
			}
		}
		if (direction === "d") {
			if (y < noGoY[i] - size || y > noGoY2[i] - size) {
				check = 1;
			}
		}
		results.push(check);
	}
	const res = results.every(function (e) {
		return e > 0;
	});
	return res;
}

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

	noGoX.push(0, mazeWidth + 2 * step, 0, 0, mazeWidth + step, mazeWidth + step);
	noGoX2.push(
		0 + borderWidth,
		mazeWidth + 2 * step + borderWidth,
		step,
		step,
		mazeWidth + 2 * step,
		mazeWidth + 2 * step
	);
	noGoY.push(
		section1Height + step,
		section2Height + step,
		section1Height + step,
		section1Height + 2 * step,
		section2Height + step,
		section2Height + 2 * step
	);
	noGoY2.push(
		section1Height + 2 * step,
		section2Height + 2 * step,
		section1Height + step + borderWidth,
		section1Height + 2 * step + borderWidth,
		section2Height + step + borderWidth,
		section2Height + 2 * step + borderWidth
	);

	player.style.top = section1Height + step + "px";
	player.style.left = 0 + "px";

	home.style.top = section2Height + step + "px";
	home.style.left = mazeWidth + step + "px";

	let sideSections = [leftBar1, leftBar2, rightBar1, rightBar2];
	for (let i = 0; i < sideSections.length; i++) {
		configureSideElement(sideSections[i]);
		maze.appendChild(sideSections[i]);
	}
}

function configureSideElement(el) {
	el.setAttribute("class", "barrier");
	el.style.width = borderWidth + "px";
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
			generateMaze(nextX, nextY, i);
		}
	}
}

function drawMaze() {
	for (let x = 0; x < mx; x++) {
		for (let y = 0; y < my; y++) {
			let l = grid[y][x].l;
			let r = grid[y][x].r;
			let u = grid[y][x].u;
			let d = grid[y][x].d;
            drawLines(x, y, l, r, u, d);
		}
	}
}

function drawLines(x, y, l, r, u, d) {
	const top = (y + 1) * step;
	const left = (x + 1) * step;
	if (l === 0 && x > 0) {
		let lineElement = document.createElement("div");
		lineElement.style.left = left + "px";
		lineElement.style.height = step + "px";
		lineElement.style.top = top + "px";
		lineElement.setAttribute("class", "barrier");
		lineElement.style.width = borderWidth + "px";
		maze.appendChild(lineElement);
	}

	if (d === 0 && y < my - 1) {
		let lineElement = document.createElement("div");
		lineElement.style.left = left + "px";
		lineElement.style.height = borderWidth + "px";
		lineElement.style.top = top + step + "px";
		lineElement.setAttribute("class", "barrier");
		lineElement.style.width = step + borderWidth + "px";
		maze.appendChild(lineElement);
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