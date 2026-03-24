const requiredServerSecrets = ['GEMINI_API_KEY'];

export function getRequiredSecret(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `[config] Missing required server secret: ${name}. Define it in your backend environment before starting the server.`
    );
  }

  return value;
}

export function validateServerSecrets() {
  const missing = requiredServerSecrets.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(
      `[config] Missing required server secrets: ${missing.join(', ')}. Refusing to start.`
    );
  }
}
