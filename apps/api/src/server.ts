import express from 'express';
import cors from 'cors';
import { CONFIG } from './config/index';
import projectRoutes from './routes/projectRoutes';
import executeRoutes from './routes/executeRoutes';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/projects', projectRoutes);
app.use('/execute', executeRoutes);
app.get('/health', (_req, res) => res.send('OK'));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let ideState = {};

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected for read-only session');
  // Send current state to new viewer
  ws.send(JSON.stringify({ type: 'init', state: ideState }));

  ws.on('message', (message: string) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'update_state') {
        // Only the host should send this
        ideState = data.state;
        // Broadcast to all other clients (viewers)
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'state_update', state: ideState }));
          }
        });
      }
    } catch (e) {
      console.error('Invalid message', e);
    }
  });
});

server.listen(CONFIG.port, () => {
  console.log(`API listening on http://localhost:${CONFIG.port}`);
  console.log(`WebSocket server running on ws://localhost:${CONFIG.port}`);
});