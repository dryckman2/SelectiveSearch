export const ErrorLevel = {
    NONE: "None",
    NOTICE: "Notice",
    WARNING: "Warning",
    ERROR: "Error"
}

export default class Error {
    level: string;
    message: string;
    element: React.ReactElement;
    constructor(level = ErrorLevel.NONE, message = "") {
        this.level = level;
        this.message = message;
        this.element = <>{message}</>;
    }

    forceFormat(element: React.ReactElement) {
        this.element = element;
    }
}