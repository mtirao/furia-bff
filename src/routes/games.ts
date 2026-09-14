import { Router, Request, Response } from 'express';

const router = Router();

type Player = {
    gameid: number;
    playerid: number;
};

router.get('/list', async (req: Request, res: Response) => {
    try {
        const response = await fetch('http://localhost:3009/api/wanaka/game', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            }
        });

        res.json(await response.json());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:gameId/players', async (req: Request, res: Response) => {
    try {
        const response = await fetch(`http://localhost:3009/api/wanaka/player/${req.params.gameId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            }
        });

        res.json(await response.json());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:gameId', async (req: Request, res: Response) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
        };

        const gameResponse = await fetch(`http://localhost:3009/api/wanaka/game/${req.params.gameId}`, {
            method: 'GET',
            headers
        });

        const playersResponse = await fetch(`http://localhost:3009/api/wanaka/player/${req.params.gameId}`, {
            method: 'GET',
            headers
        });

        const game = await gameResponse.json();
        const players: any[] = [];
        const playersData: Player[] = await playersResponse.json();
        const filteredData = new Set(playersData.map(player => player.playerid));

        console.log('Players Data:', filteredData);
        
        for await (const player of filteredData) {
            console.log('Player ID:', player);
            const playerResponse = await fetch(`http://localhost:3010/api/wanaka/player/${player}`, {
                method: 'GET',
                headers
            });
            players.push(await playerResponse.json());
            
        }


        res.json({ game, players });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;