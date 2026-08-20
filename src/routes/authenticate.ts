import { Router, Request, Response } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => {
    fetch('http://localhost:3001/api/wanaka/accounts/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
        },
        body: JSON.stringify(req.body)
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

router.get('/validate', (req: Request, res: Response) => {
    res.json({ message: 'Hello from validate route' });
});

export default router;