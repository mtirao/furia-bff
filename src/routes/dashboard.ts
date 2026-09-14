import { Router, Request, Response } from 'express';

const router = Router();

type Game = {
    id: number;
    court: string;
    date: number;
    local: string;
    setlocal: number;
    setvisit: number;
    visit: string;
};

type QuickStats = {
    label: string;
    value: string;
    caption: string;
    icon: string;
    iconBg: string;
};

type RecentGame = {
    opponent: string;
    date: string;
    score: number;
    result: string;
    resultBg: string;
};

type NextGame = {
    id: number;
    court: string;
    date: number;
    opponent: string;
}

type Player = {
    block: number;
    defence: number;
    email: string;
    firstname: string;
    id: number;
    lastname: string;
    mobile: string;
    position: string;
    serve: number;
    skills: number;
    spike: number;
    team: string;
    points: number;
};

type PlayerStats = {
    rank: number;
    name: string;
    position: string;
    points: number;
    photo: string;
    initials: string;
}

router.get('/', async (req: Request, res: Response) => {
  try {
        const response = await fetch('http://localhost:3009/api/wanaka/game', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            }
        });
        const games: Game[] = await response.json();

        let wins: number = 0;
        let losses: number = 0;

        for (const game of games) {
            if (game.local === 'CV Furia') {
                if (game.setlocal > game.setvisit) {
                    wins++;
                } else {
                    losses++;
                }
            } else {
                if (game.setvisit > game.setlocal) {
                    wins++;
                } else {
                    losses++;
                }
            }
        }

        const gameResponse = await fetch('http://localhost:3009/api/wanaka/game', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            }
        });
        const gameData: Game[] = await gameResponse.json();
        
        const quickStats: QuickStats[] = [
            { label: 'Wins', value: wins.toString(), caption: 'Total Wins', icon: 'sports_volleyball', iconBg: 'bg-primary-container' },
            { label: 'Losses', value: losses.toString(), caption: 'Total Losses', icon: 'sports_volleyball', iconBg: 'bg-primary-container' },
            { label: 'Total Games', value: games.length.toString(), caption: 'Total Games Played', icon: 'scoreboard', iconBg: 'bg-primary-container' }
        ];

        const recentGames: RecentGame[] = gameData.slice(0, 4).map((game: Game) => {
            return {
                opponent: game.visit === 'CV Furia' ? game.local : game.visit,
                date: new Date(game.date).toLocaleDateString(),
                score: game.setlocal > game.setvisit ? game.setlocal : game.setvisit,
                result: game.setlocal > game.setvisit ? 'WIN' : 'LOSS',
                resultBg: game.setlocal > game.setvisit ? 'bg-surface-container-high text-primary' : 'bg-error-container text-on-error-container'
            };
        });

        const nextGame: NextGame = {
            id: gameData[0]?.id || -1,
            court: gameData[0]?.court || '',
            date: gameData[0]?.date || 0,
            opponent: gameData[0]?.visit === 'CV Furia' ? gameData[0]?.local : gameData[0]?.visit
        };
       
        const playerResponse = await fetch('http://localhost:3010/api/wanaka/player', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            }
        });
        const playerData: Player[] = await playerResponse.json();

        let index = 1;
        const playerStats: PlayerStats[] = playerData.sort((a, b) => b.points - a.points).map((player: Player) => {
            const initials = `${player.firstname.charAt(0)}${player.lastname.charAt(0)}`;
            return {
                rank: index++,
                name: `${player.firstname} ${player.lastname}`,
                position: player.position,
                points: player.points,
                photo: '', // Assuming you have a way to get the player's photo URL
                initials: initials.toUpperCase()
            };
        })

        res.json({nextGame: nextGame, games: recentGames, quickStats, playerStats});

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
