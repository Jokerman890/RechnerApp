import 'dotenv/config';
import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { getRequiredSecret, validateServerSecrets } from './env.mjs';

validateServerSecrets();

const app = express();
const port = Number(process.env.PORT ?? 8787);
const ai = new GoogleGenAI({ apiKey: getRequiredSecret('GEMINI_API_KEY') });

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/gemini/generate', async (req, res) => {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt.' });
  }

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return res.json({ text: result.text ?? '' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Gemini API error';
    return res.status(502).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`[server] API listening on http://localhost:${port}`);
});
