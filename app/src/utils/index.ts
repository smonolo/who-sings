export function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];

        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

interface ValidateLandingFormResponse {
    username: string;
    rounds: number;
}

export function validateLandingForm(username: string, rounds: string): string | ValidateLandingFormResponse {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
        return 'Username is required.';
    }

    if (trimmedUsername.length < 3) {
        return 'Username is too short, it must be at least 3 characters long.';
    }

    if (trimmedUsername.length > 20) {
        return 'Username is too long, it must be maximum 20 characters long.';
    }

    if (!rounds) {
        return 'Rounds are required.';
    }

    const roundsNumber = parseInt(rounds, 10);

    if (roundsNumber < 1) {
        return 'You must play at least 1 round.';
    }

    if (roundsNumber > 10) {
        return 'You can play maximum 10 rounds.';
    }

    return {
        username: trimmedUsername,
        rounds: roundsNumber
    };
}