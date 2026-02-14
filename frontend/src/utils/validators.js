export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhone = (phone) => /^\+?1?\d{9,15}$/.test(phone);
export const isNotEmpty = (value) => value && value.trim().length > 0;
export const isPositiveNumber = (value) => !isNaN(value) && Number(value) > 0;
