export const normalizeText = (text: string) => {
  return text
    .normalize("NFD") // It decomposes accented characters into their base and diacritical components.
    .replace(/[\u0300-\u036f]/g, "") // It eliminates diacritics (accents, virgulillas, etc.).
    .toLowerCase()
    .trim();
};
