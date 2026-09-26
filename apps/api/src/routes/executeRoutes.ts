import { Router } from 'express';
import { exec } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { randomBytes } from 'crypto';
import path from 'path';
import os from 'os';

const router = Router();

router.post('/', async (req, res) => {
  const { code, language } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });
  if (language !== 'javascript') return res.status(400).json({ error: 'Only javascript is supported right now' });

  const fileName = `code-${randomBytes(8).toString('hex')}.js`;
  const filePath = path.join(os.tmpdir(), fileName);
  
  try {
    writeFileSync(filePath, code);
    exec(`node ${filePath}`, { timeout: 5000 }, (error, stdout, stderr) => {
      try { unlinkSync(filePath); } catch (e) {}
      if (error && error.killed) {
        return res.json({ output: '', error: 'Execution timed out (5s limit)' });
      }
      res.json({ output: stdout, error: stderr || (error ? error.message : '') });
    });
  } catch (err) {
    try { unlinkSync(filePath); } catch (e) {}
    res.status(500).json({ error: 'Failed to execute code' });
  }
});

export default router;