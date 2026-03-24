import 'dotenv/config';
import { validateServerSecrets } from './env.mjs';

validateServerSecrets();
console.log('[config] Required server secrets are present.');
