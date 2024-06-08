export const formatHashLink = (slug: string): string => {
  if (typeof window !== 'undefined') {
    return slug.toLowerCase().replace(/ /g, '-');
  }
};
