import express from 'express';
import cors from 'cors';
import { CONFIG } from './config/index';
import projectRoutes from './routes/projectRoutes';
import executeRoutes from './routes/executeRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/projects', projectRoutes);
app.use('/execute', executeRoutes);
app.get('/health', (_req, res) => res.send('OK'));
app.listen(CONFIG.port, () => {
  console.log(`API listening on http://localhost:${CONFIG.port}`);
});