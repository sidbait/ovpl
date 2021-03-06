const DB_STATUS_MASTER = {
    'FALSE': 0,
    'TRUE': 1,
    'ACTIVE': 2,
    'DE-ACTIVE': 3,
    'PENDING': 4,
    'DELETED': 5
}

const API_STATUS_MASTER = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429
}

module.exports = {
    DB_STATUS_MASTER,
    API_STATUS_MASTER
}