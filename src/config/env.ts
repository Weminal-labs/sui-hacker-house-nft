interface EnvConfig {
  ENOKI_API_KEY: string;
  GOOGLE_CLIENT_ID: string;
  // Add other environment variables here
}

function requireEnvVar(name: keyof EnvConfig): string {
  const value = import.meta.env[`VITE_${name}`];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  ENOKI_API_KEY: requireEnvVar('ENOKI_API_KEY'),
  GOOGLE_CLIENT_ID: requireEnvVar('GOOGLE_CLIENT_ID'),
  // Add other environment variables here
} as const;
