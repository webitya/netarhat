// Admin Authentication Helper

export const COOKIE_NAME = "netarhat_admin_session";

export function verifyCredentials(username, password) {
  if (!username || !password) return false;
  const configuredUser = process.env.ADMIN_USERNAME;
  const configuredPass = process.env.ADMIN_PASSWORD;

  // Fail safe if environment credentials are not configured
  if (!configuredUser || !configuredPass) {
    return false;
  }

  return username.trim() === configuredUser.trim() && password === configuredPass;
}

export function generateSessionToken() {
  const secret = process.env.ADMIN_SECRET || "netarhat-secure-session-seed";
  const data = `admin:${secret}:${Date.now()}`;
  return Buffer.from(data).toString("base64");
}

export function validateSessionToken(token) {
  if (!token) return false;
  try {
    const secret = process.env.ADMIN_SECRET || "netarhat-secure-session-seed";
    const decoded = Buffer.from(token, "base64").toString("utf8");
    return decoded.startsWith(`admin:${secret}:`);
  } catch {
    return false;
  }
}
