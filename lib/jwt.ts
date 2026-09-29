import { SignJWT, jwtVerify, JWTPayload } from "jose";

// Get secret key encoded for jose HS256
function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET || "cyphertech_default_secure_jwt_token_secret_2026_xyz";
  return new TextEncoder().encode(secret);
}

export interface ReceiptTokenData {
  paymentId: string;
  orderId: string;
  amount: number | string;
  currency?: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  planName: string;
}

export interface AuthSessionData {
  userId: string;
  email: string;
  name?: string;
  role?: string;
}

export interface VerifiedReceiptPayload extends JWTPayload, ReceiptTokenData {}
export interface VerifiedAuthPayload extends JWTPayload, AuthSessionData {}

/**
 * Mint a cryptographically signed, tamper-proof Receipt / Refund JWT.
 * Valid for 30 days (covers statutory refund evaluation window).
 */
export async function signReceiptToken(data: ReceiptTokenData): Promise<string> {
  const secretKey = getJwtSecretKey();

  return await new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("guest_receipt_claim")
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey);
}

/**
 * Cryptographically verify a Receipt / Refund JWT.
 * Returns valid status and decoded payload.
 */
export async function verifyReceiptToken(
  token: string
): Promise<{ valid: boolean; payload?: VerifiedReceiptPayload; error?: string }> {
  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    return { valid: true, payload: payload as unknown as VerifiedReceiptPayload };
  } catch (err: any) {
    return {
      valid: false,
      error: err?.message || "Invalid or expired verification token.",
    };
  }
}

/**
 * Mint an Account Session JWT.
 */
export async function signSessionToken(data: AuthSessionData): Promise<string> {
  const secretKey = getJwtSecretKey();

  return await new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(data.userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verify an Account Session JWT.
 */
export async function verifySessionToken(
  token: string
): Promise<{ valid: boolean; payload?: VerifiedAuthPayload; error?: string }> {
  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    return { valid: true, payload: payload as unknown as VerifiedAuthPayload };
  } catch (err: any) {
    return {
      valid: false,
      error: err?.message || "Invalid or expired session token.",
    };
  }
}
