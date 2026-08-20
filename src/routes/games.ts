import { Router, Request, Response } from 'express';

const router = Router();

router.get('/list', (req: Request, res: Response) => {
    fetch('http://localhost:3009/api/wanaka/game', {
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

router.get('/:gameId', (req: Request, res: Response) => {
    fetch(`http://localhost:3009/api/wanaka/game/${req.params.gameId}`, {
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

router.post('/', (req: Request, res: Response) => {
    console.log('Request body:', req.body); // Log the request body for debugging
    fetch('http://localhost:3009/api/wanaka/game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
        },
        body: JSON.stringify(req.body)
    })
    .then(() => {
        res.status(204).send();
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

export default router;