/**
 * FISERV CONNECT — HOSTED PAYMENT PAGE (server-side only)
 * ============================================================
 * This module never collects or transmits raw card data. The
 * customer enters their card details on Fiserv's own hosted page;
 * our server only builds a signed redirect and verifies Fiserv's
 * signed return response.
 * ============================================================
 */

import crypto from "crypto";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// ============================================================
// CONNECT HOSTED CHECKOUT (redirect flow)
// ============================================================
interface ConnectRedirectParams {
  orderId: string;
  amount: number;
  currency?: string;
  successUrl: string;
  failUrl: string;
}

/**
 * Builds the signed hidden-field set for Fiserv Connect's hosted
 * checkout. The customer's browser POSTs these fields directly to
 * FISERV_CONNECT_URL — card data never touches our server.
 *
 * Signature = base64(HMAC-SHA1(storeId + checkoutId + chargetotal +
 * currency + sharedSecret)) per Fiserv Connect spec. Field names
 * below follow the standard Connect integration guide; confirm exact
 * field names against the guide for your account if Fiserv support
 * provided custom ones.
 */
export function buildConnectRedirectFields(params: ConnectRedirectParams) {
  const storeId = getEnv("FISERV_STORE_ID");
  const sharedSecret = getEnv("FISERV_CONNECT_SHARED_SECRET");
  const currency = params.currency ?? "036"; // 036 = AUD (ISO 4217 numeric)
  const txndatetime = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .slice(0, 14);
  const chargetotal = params.amount.toFixed(2);
  const checkoutId = params.orderId;

  const signatureSource = `${storeId}${txndatetime}${chargetotal}${currency}${sharedSecret}`;
  const hash_algorithm = "SHA256";
  const hashExtended = crypto.createHash("sha256").update(signatureSource).digest("hex");

  return {
    action: getEnv("FISERV_CONNECT_URL"),
    fields: {
      txntype: "sale",
      timezone: "Australia/Sydney",
      txndatetime,
      hash_algorithm,
      hashExtended,
      storename: storeId,
      mode: "payonly",
      currency,
      chargetotal,
      checkoutid: checkoutId,
      oid: params.orderId,
      responseSuccessURL: params.successUrl,
      responseFailURL: params.failUrl,
    },
  };
}

interface ConnectResponseFields {
  [key: string]: string;
}

/** Verifies Fiserv Connect's response notification signature. */
export function verifyConnectResponse(fields: ConnectResponseFields): boolean {
  const sharedSecret = getEnv("FISERV_CONNECT_SHARED_SECRET");
  const { storename, txndatetime, chargetotal, currency, response_hash } = fields;
  if (!response_hash) return false;
  const source = `${storename}${txndatetime}${chargetotal}${currency}${sharedSecret}`;
  const expected = crypto.createHash("sha256").update(source).digest("hex");
  return expected === response_hash;
}
