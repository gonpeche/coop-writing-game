# Welcome to your Coop Writing Game

Hi there. During COVID lockdown I decided to create a game to play with my friends. I haven't finished it yet, but most of the main functionality is done. Also, the UI is pretty basic, though my idea is to bring animations and other cools stuff later on.

**IMPORTANT:** The game needs to be played with, at least, 3 players. The code still needs to cover edge cases if less than 3 players are online. If you want to peek around, open the game in 3 different tabs in your browser.

# Tech used

**Frontend:** React, Redux

**Backend:** Node, Express, SocketIO

Project deployment:

- Frontend on **Netlify**: [https://keen-jones-1b313d.netlify.app/](https://keen-jones-1b313d.netlify.app/)
- Backend on **Heroku**: [https://garralapala.herokuapp.com/](https://garralapala.herokuapp.com/)

## Local setup

Steps to run the project locally:

> On **Client** directory, run `yarn`

> On **Server** directory, run `yarn` and then `yarn dev` to start the game

## TODO

These are the things I still need to improve:

1. If you already submitted an answer, show the players who haven't answered.
2. Massively improve the UI, better background color for a soft reading and implement animations.
3. Save the session on LocalStorage, so the data is not lost when the browser is refreshed.
4. Create private rooms and a global score, with the top rated stories.
5. Make it Responsive
