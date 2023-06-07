# Maze-Game-Project

# Description:
Maze Game is a web-based game where yo navigate through a maze to reach the goal. The objective is to control a character within the maze and find the path to the exit. 

# Features:
Maze Generation: The genMaze() function uses a depth-first search algorithm to generate a random maze by exploring and connecting maze cells.

Barrier Creation: The genSides() function creates the side barriers of the maze, including the vertical barriers on the left and right sides.

Styling Configuration: The confSideEl(el) function configures the styling of the side barriers, setting their width based on a specified value.

Maze Drawing: The drawLines() function draws the maze walls by creating horizontal and vertical lines based on the wall values of each cell.

Character Movement: The checkYboundry(dir) function checks the boundaries in the specified direction to determine if the character can move or not.

Shuffle Function: The limShuffle() function shuffles an array up to a specified index, allowing for limited shuffling of directions in maze generation.

# Instructions:

Use the arrow keys or tilt your device to navigate the character through the maze.
Reach the goal as quickly as possible to achieve a high score.
Enjoy the challenge and have fun!

Screenshot:
![Maze Game](https://github.com/radichenko/Maze-Game-Project/blob/main/screenshot.jpg)

# Installation:

1. Clone the repository or download the source code.
2. Open the index.html file in a web browser.
3. Or play it here: https://6480e4ae3e89423a9dc49c3f--gregarious-crisp-6ffa6c.netlify.app/
