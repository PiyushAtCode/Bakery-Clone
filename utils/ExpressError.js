class ExpressError extends Error {
    constructor(statusCode, message){
        super(message);  // ⬅️ message pass karo yahan - Error class status bhi set karta hai internally
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;