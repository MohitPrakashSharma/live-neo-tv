export const generateSlug = (name: string = '') => name.toLowerCase().replace(/\s+/g, '-');

export const reverseSlug = (slug: string = '') => {
    if (slug !== '') {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return slug;
};