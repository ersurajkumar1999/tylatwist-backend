export const successResponseMessage = async (res, message, data = []) => {
    return res.status(200).send({ status: true, message, data });
}
export const errorResponseMessage = async (res, message, errorCode = 400) => {
    if (!res.headersSent) {
        return res.status(errorCode).send({ status: false, message });
    }
    return res.status(errorCode).send({ status: false, message });
}

export const paginationResponseMessage = async (res, data) => {
    return res.status(200).send(data);
}
