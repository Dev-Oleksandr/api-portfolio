export class ApiErrors extends Error{
    constructor(status, message, success) {
        super();
        this.status = status
        this.message = message
        this.success = success
    }

    static badRequest(message) {
        return new ApiErrors(400, message, false)
    }

    static unAuthorized(message) {
        return new ApiErrors(401, message, false)
    }

    static forbidden(message) {
        return new ApiErrors(403, message, false)
    }

    static notFound(message) {
        return new ApiErrors(404, message, false)
    }
}