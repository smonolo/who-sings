# Who Sings

Who Sings is a quiz game where you choose the artist that sings a specific line of lyrics, winning points for every correct choice.

### How it works

When accessing the application for the first time, users are greeted with a prompt to enter a username and specify the desired number of rounds for the game session. Once this initial step is completed, the quiz begins. In each round, players are presented with a specific line of lyrics and three artists who are supposedly associated with it. To proceed to the next round, users must select the correct singer out of the three options provided. For every correct selection, players earn points that accumulate throughout the game, culminating in the final round. At the end of the game, a dedicated page showcases the player's final score.

### Technologies used

The application is build using React and Vite. The backend is made with Node.js and provides data to the frontend by requesting lyrics, tracks and artists to the Musixmatch API via HTTP. Everything is local and no more than the cloned repository from GitHub is needed.

### About Who Sings

This game is made by Stefano Monolo, and it serves as a test for recruitment purposes for the Frontend Engineer (React) position at Musixmatch.