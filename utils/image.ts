const imageFormats = ['.jpg', '.jpeg', '.png', '.gif'];

export const isImageEndWithFormat = (url: string): boolean => {
  return imageFormats.some(format => url.endsWith(format));
};
