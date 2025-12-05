import { luhnCheck, normalizeCardNumber, formatCardNumber, validateCardNumber, validateExpiry, validateCVV } from '@/lib/payment-validators';

describe('payment-validators', () => {
  test('luhnCheck valid card', () => {
    expect(luhnCheck('4242424242424242')).toBe(true);
  });

  test('normalizeCardNumber removes non digits', () => {
    expect(normalizeCardNumber('4242 4242-4242 4242')).toBe('4242424242424242');
  });

  test('formatCardNumber spaces groups', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242');
  });

  test('validateCardNumber accepts valid card', () => {
    const r = validateCardNumber('4242424242424242');
    expect(r.valid).toBe(true);
    expect(r.normalized).toBe('4242424242424242');
  });

  test('validateCardNumber rejects letters', () => {
    const r = validateCardNumber('4242abcd4242abcd');
    expect(r.valid).toBe(false);
  });

  test('validateExpiry accepts future mm/yy', () => {
    const future = new Date();
    future.setMonth(future.getMonth() + 6);
    const mm = (future.getMonth() + 1).toString().padStart(2, '0');
    const yy = future.getFullYear().toString().slice(-2);
    expect(validateExpiry(`${mm}/${yy}`).valid).toBe(true);
  });

  test('validateExpiry rejects expired', () => {
    expect(validateExpiry('01/20').valid).toBe(false);
  });

  test('validateCVV valid 3-digit', () => {
    expect(validateCVV('123').valid).toBe(true);
  });

  test('validateCVV valid 4-digit amex', () => {
    expect(validateCVV('1234', 'amex').valid).toBe(true);
  });

  test('validateCVV rejects letters', () => {
    expect(validateCVV('12a').valid).toBe(false);
  });
});
