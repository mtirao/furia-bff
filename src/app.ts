import express, { Request, Response, NextFunction } from 'express';
import healthRouter from './routes/health';
import exampleRouter from './routes/example';
import authenticateRouter from './routes/authenticate';
import playersRouter from './routes/players';
import gamesRouter from './routes/games';

const app = express();

app.use(express.json());

app.use('/api/players', playersRouter);

app.use('/api/games', gamesRouter);

app.use('/health', healthRouter);
app.use('/api/example', exampleRouter);
app.use('/api/accounts', authenticateRouter);

app.use((req: Request, res: Response) => res.status(404).json({ error: 'Not Found' }));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
