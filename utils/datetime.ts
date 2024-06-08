import siteData from 'data/siteData';

export const getLocalizedDate = (date?: string): string => {
  return date
    ? new Date(date).toLocaleDateString(siteData.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';
};
