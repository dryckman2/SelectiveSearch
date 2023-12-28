export const ErrorLevel = {
    NONE: "None",
    WARNING: "Warning",
    ERROR: "Error"
}

export default class Error {
    level: string;
    message: string;
    constructor(level = ErrorLevel.NONE, message = "") {
        this.level = level;
        this.message = message;
    }
}