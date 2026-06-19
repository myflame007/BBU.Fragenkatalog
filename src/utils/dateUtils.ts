/**
 * Calculates the age based on a birth date string.
 * @param birthDateStr - Date in 'YYYY-MM-DD' or 'DD.MM.YYYY' format.
 * @returns The age in years.
 */
export const calculateAge = (birthDateStr: string): number => {
  if (!birthDateStr) return 0;
  let birthDate: Date;
  if (birthDateStr.includes('.')) {
    const parts = birthDateStr.split('.');
    birthDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  } else {
    birthDate = new Date(birthDateStr);
  }

  if (isNaN(birthDate.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Checks if a person is a minor (under 18) based on a birth date string.
 * @param birthDateStr - Date in 'YYYY-MM-DD' or 'DD.MM.YYYY' format.
 * @returns True if under 18.
 */
export const isMinor = (birthDateStr: string): boolean => {
  return calculateAge(birthDateStr) < 18;
};
