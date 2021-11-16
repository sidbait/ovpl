const sendResponse = (res, status, success, data, message) => {
    res.status(status).send({ success, message, data })
}

module.exports = {
    sendResponse
}