/**
 * Formats a numeric value into Indian Rupee (INR - ₹) representation
 * using the standard Indian numbering system (Lakhs, Crores).
 *
 * @param {number|string} amount
 * @param {boolean} includeDecimals
 * @returns {string} e.g. "₹1,249" or "₹1,249.50"
 */
export function formatINR(amount, includeDecimals = false) {
  const numeric = typeof amount === 'number' ? amount : parseFloat(amount) || 0;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(numeric);
}

export default formatINR;

