import { Selection } from "@/store/slices/game";

export interface Match {
    id: string;
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