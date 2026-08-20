import express, { Request, Response, NextFunction } from 'express';
import healthRouter from './routes/health';
import exampleRouter from './routes/example';

const app = express();

app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/example', exampleRouter);

app.use((req: Request, res: Response) => res.status(404).json({ error: 'Not Found' }));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
