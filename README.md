# Magic Cups Game

Game "Magic Cups" written on PIXI.JS framework with 5 cups, leader board and with growing speed.

## Author

[Armen Zatikyan](https://www.linkedin.com/in/armen-zatikyan/)  
Software Engineer  
armen.zatikyan.1993@gmail.com

## Requirements

To download and start the application you need to have the following software installed on your work machine.

1. Git - [Official website](https://git-scm.com)
2. NPM - [Official website](https://www.npmjs.com)
3. NodeJS - [Official website](https://nodejs.org)
4. Http-Server - [NPM repository](https://www.npmjs.com/package/http-server)
5. Google Chrome - [Official website](https://www.google.com/chrome) (optional)

Follow these steps to install requirements on Ubuntu 16.04 x64

```bash
# Update repositories
sudo apt-get update
sudo apt-get upgrade

# Install required software
sudo apt-get install git
sudo apt-get install npm
sudo npm i -g n
sudo n stable
sudo npm i -g http-server

# Optional steps to install Google Chrome on Ubuntu 16.04 x64
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

```

## Installation and start

Copy these commands to your terminal or cmd to install and start the application.

```bash
git clune git@github.com:Zatikyan/magic-cups-game.git
cd magic-cups-game
npm install
npm run start #or npm start
```

## Build

Copy this command to your terminal or cmd to build the application.

```bash
npm run build # or npm build
```

Static files with production build will be stored in the "build" folder.  
To run the build application copy this command to your terminal or cmd.

```bash
npm run start:build #or npm start:build
```

## Description

"Magic Cups" game with five cups and growing speed.

## Gameplay

### How to play

After starting the game it will show you the ball under one of the cups and will rotate cups. After rotation ended you need to click on the cup under which you think the ball is. If your answer is right, the game will be continued with the grown speed. If your answer is wrong, it will show you a message about fail and text box to add your name to the leader board if your result is leading.

### Leader board

A leader board is containing the best ten results based on the level. To show text input for the leader board it checks is there at least ten results or is your result higher than at least one result in the leader board. Information about leaders saves on the local storage of your web browser and loads on game start.

### Speed

The default speed of rotation is π / 20 and it will grow based on the level. the algorithm of speed growing is:

```math
level * π / 20
```

## License
[MIT](https://choosealicense.com/licenses/mit/)