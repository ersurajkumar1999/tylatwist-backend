import slugify from "slugify"
/**
 * Converts a value to a safe string.
 * @param {any} value - The value to convert to a string.
 * @returns {string} - The converted string or an empty string if the value is falsy.
 */
const safeString = (value) => value ? value.toString() : '';

/**
 * Generates a slug from the given components.
 * @param {...string} components - The components to include in the slug.
 * @returns {string} - The generated slug.
 */
export const generateSlug = (...components) => {
    // Join components with hyphens and generate slug
    const slug = slugify(components.map(safeString).join('-'), {
        lower: true,
        strict: true
    });
    return slug;
};


