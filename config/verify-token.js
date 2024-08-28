export const verify = req => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        )
            return req.headers.authorization.split(' ')[1];

        return null;
    } catch (error) {
        // Handle the error here, e.g., log it or return a default value
        console.error('Error in verify function:', error);
        return null; // You can return a default value or handle the error as needed
    }
};