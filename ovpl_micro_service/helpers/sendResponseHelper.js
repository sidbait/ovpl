const sendResponse = (res, status, success, data, message) => {
    res.status(status).send({ success, data, message })
}

module.exports = {
    sendResponse
}