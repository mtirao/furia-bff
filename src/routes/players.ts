import { Router, Request, Response } from 'express';

const router = Router();

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
    datebirth: string;
    jersey: number;
    height: string;
    ercontact: string;
    erphone: string;
    hand: string;
};

router.get('/list', async (req: Request, res: Response) => {
    console.log("PlayerList");
    try {
        const response = await fetch('http://localhost:3010/api/wanaka/player', {
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

router.get('/:playerId', (req: Request, res: Response) => {
    fetch(`http://localhost:3010/api/wanaka/player/${req.params.playerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
        }
    })
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

async function incrementPoints(playerId: number, point: string, req: Request, res: Response) {
    try {
        const response = await fetch(`http://localhost:3010/api/wanaka/player/${playerId}/${point}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to increment ${point} for player ${playerId}. Status: ${response.status}`);
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

router.post('/:playerId/spike', (req: Request, res: Response) => {
    const playerId = parseInt(req.params.playerId, 10);
    incrementPoints(playerId, 'spike', req, res);
});

router.post('/:playerId/serve', (req: Request, res: Response) => {
    const playerId = parseInt(req.params.playerId, 10);
    incrementPoints(playerId, 'serve', req, res);
});

router.post('/:playerId/block', (req: Request, res: Response) => {
    const playerId = parseInt(req.params.playerId, 10);
    incrementPoints(playerId, 'block', req, res);
});

router.post('/:playerId/defence', (req: Request, res: Response) => {
    const playerId = parseInt(req.params.playerId, 10);
    incrementPoints(playerId, 'defence', req, res);
});

router.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    console.log("PlayerList");
    try {
        const response = await fetch('http://localhost:3010/api/wanaka/player', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;