import { Selection } from "@/store/slices/game";

export interface Match {
    id: string;
    startTime: number;
    finishTime: number;
    username: string;
    score: number;
    selections: Selection[];
}

export function getMatches(username?: string): string | Match[] {
    const storedMatches = localStorage.getItem('who-sings-matches');

    if (!storedMatches) {
        return 'No past matches to show.';
    }

    const rawMatches: Match[] = JSON.parse(storedMatches);
    const matches = rawMatches.sort((a, b) => b.finishTime - a.finishTime);

    if (username) {
        return matches.filter(m => m.username === username);
    }

    return matches;
}

interface LeaderboardElement {
    username: string;
    score: number;
    matches: number;
    rounds: number;
    winPercentage: number;
}

interface DataCount {
    [u: string]: number;
}

export function getLeaderboard() {
    const storedMatches = localStorage.getItem('who-sings-matches');

    if (!storedMatches) {
        return 'No players to show.';
    }

    const rawMatches: Match[] = JSON.parse(storedMatches);
    
    let totalScores: DataCount = {};
    let maxScores: DataCount = {};
    let matchCounts: DataCount = {};
    let totalRounds: DataCount = {};

    for (let match of rawMatches) {
        const { username } = match;

        if (!totalScores[username]) {
            totalScores[username] = 0;
            maxScores[username] = 0;
            matchCounts[username] = 0;
            totalRounds[username] = 0;
        }

        totalScores[username] += match.score;
        maxScores[username] += match.selections.length * 100;
        matchCounts[username]++;
        totalRounds[username] += match.selections.length;
    }

    const leaderboard: LeaderboardElement[] = Object.keys(totalScores).map(username => ({
        username,
        score: totalScores[username],
        matches: matchCounts[username],
        rounds: totalRounds[username],
        winPercentage: Math.floor((totalScores[username] / maxScores[username]) * 100)
    }));

    leaderboard.sort((a, b) => {
        if (a.score !== b.score) {
            return b.score - a.score;
        }

        if (a.matches !== b.matches) {
            return a.matches - b.matches;
        }

        if (a.rounds !== b.rounds) {
            return a.rounds - b.rounds;
        }

        return b.winPercentage - a.winPercentage;
    });

    return leaderboard;
}