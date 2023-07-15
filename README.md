# Who Sings

Who Sings is a quiz game where you choose the artist that sings a specific line of lyrics, winning points for every correct choice.

## How it works

### Game mechanics

When accessing the application for the first time, users are greeted with a prompt to enter a username and specify the desired number of rounds for the game session. Once this initial step is completed, the quiz begins.

In each round, players are presented with a specific line of lyrics and three artists who are supposedly associated with it. To proceed to the next round, users must select the correct singer out of the three options provided within 15 seconds. For every correct selection, players earn points that accumulate throughout the game, culminating in the final round. At the end of the game, a dedicated page showcases the player's final score.

### Technical explanation

Everything is stored locally using browser's local storage. A session based global store provided by Redux keeps track of authenticated user and game data, such as current round, selections and score. After each game, the application saves selections and results, along with username, and using a unique identificator to save multiple matches played by the same user.

## What's included

- Landing screen with username and rounds amount selection, and play button
- Round screen with game information, score, lyrics line and artists to choose
- Results screen with final score, selections review, and button to play again
- Leaderboard screen with scores of all players and their score
- Matches history section with username, final score and selections

## Technologies used

The application is build using React and Vite. The backend is made with Node.js using Express and provides data to the frontend by requesting lyrics, tracks and artists to the Musixmatch API via HTTP. Everything is local and no more than the cloned repository from GitHub is needed.

## About Who Sings

This game is made by Stefano Monolo, and it serves as a test for recruitment purposes for the Frontend Engineer (React) position at Musixmatch.