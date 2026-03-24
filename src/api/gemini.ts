export async function generateWithGemini(prompt: string): Promise<string> {
  const response = await fetch('/api/gemini/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const payload = (await response.json()) as { text?: string; error?: string };

  if (!response.ok) {
    throw new Error(payload.error ?? 'Gemini request failed.');
  }

  return payload.text ?? '';
}
