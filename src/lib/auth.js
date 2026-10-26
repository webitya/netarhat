// Admin Authentication Helper

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "netarhat2026!";
export const ADMIN_SECRET = process.env.ADMIN_SECRET || "netarhat-betla-tourism-auth-key-2026";
export const COOKIE_NAME = "netarhat_admin_session";

export function verifyCredentials(username, password) {
  if (!username || !password) return false;
  return username.trim() === ADMIN_USERNAME.trim() && password === ADMIN_PASSWORD;
}

export function generateSessionToken() {
  // Simple deterministic base64 token based on secret
  const data = `admin:${ADMIN_SECRET}:${Date.now()}`;
  return Buffer.from(data).toString("base64");
}

export function validateSessionToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    return decoded.startsWith(`admin:${ADMIN_SECRET}:`);
  } catch {
    return false;
  }
}
