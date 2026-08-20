import { Router, Request, Response } from 'express';

const router = Router();

router.get('/list', (req: Request, res: Response) => {
    fetch('http://localhost:3010/api/wanaka/player', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
        }
    })
    .then(response => response.json())
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/:playerId', (req: Request, res: Response) => {
    fetch(`http://localhost:3010/api/wanaka/player/${req.params.playerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
        }
    })
    .then()
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

export default router;