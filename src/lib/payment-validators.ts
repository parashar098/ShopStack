// Minimal, well-tested payment field validators used by unit tests and UI
export function luhnCheck(digits: string): boolean {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function normalizeCardNumber(input: string): string {
  return (input || '').replace(/\D+/g, '');
}

export function formatCardNumber(input: string): string {
  const digits = normalizeCardNumber(input);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

export function validateCardNumber(input: string): { valid: boolean; error?: string; normalized?: string } {
  const digits = normalizeCardNumber(input);
  if (!digits) return { valid: false, error: 'Card number is required' };
  if (!/^\d+$/.test(digits)) return { valid: false, error: 'Invalid characters in card number' };
  if (digits.length < 12 || digits.length > 19) return { valid: false, error: 'Invalid card length' };
  if (!luhnCheck(digits)) return { valid: false, error: 'Invalid card number' };
  return { valid: true, normalized: digits };
}

export function validateExpiry(input: string): { valid: boolean; error?: string } {
  if (!input) return { valid: false, error: 'Expiry date is required' };
  // Accept MM/YY or MM/YYYY
  const m = input.trim();
  const mmYY = /^\s*(\d{1,2})\s*[\/\-]\s*(\d{2,4})\s*$/;
  const match = m.match(mmYY);
  if (!match) return { valid: false, error: 'Expiry must be in MM/YY format' };
  let month = parseInt(match[1], 10);
  let year = parseInt(match[2], 10);
  if (month < 1 || month > 12) return { valid: false, error: 'Invalid expiry month' };
  if (year < 100) {
    // yy -> 20yy (reasonable assumption)
    year += 2000;
  }
  const now = new Date();
  const exp = new Date(year, month, 0, 23, 59, 59, 999); // end of month
  if (exp < now) return { valid: false, error: 'Card expired' };
  return { valid: true };
}

export function validateCVV(input: string, cardType: 'amex' | 'default' = 'default') {
  if (!input) return { valid: false, error: 'CVV is required' };
  if (!/^[0-9]+$/.test(input)) return { valid: false, error: 'Invalid CVV' };
  const len = input.length;
  if (cardType === 'amex') {
    if (len !== 4) return { valid: false, error: 'Invalid CVV length for Amex' };
  } else {
    if (len !== 3) return { valid: false, error: 'Invalid CVV' };
  }
  return { valid: true };
}

export default {
  luhnCheck,
  normalizeCardNumber,
  formatCardNumber,
  validateCardNumber,
  validateExpiry,
  validateCVV,
};
