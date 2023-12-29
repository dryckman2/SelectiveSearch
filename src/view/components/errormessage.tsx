import React from "react";

import Error, { ErrorLevel } from "../../model/error";


type Props = {
    error: Error
}

export function ErrorMessage(props: Props) {
    const error = props.error;

    if (error.level === ErrorLevel.NONE) {
        return (<div />);
    }

    let color = "blue"; // If this comes out as blue something if fucked up
    switch (error.level) {
        case ErrorLevel.WARNING:
            color = "#d2cb82"; // Light Yellow
            break;
        case ErrorLevel.ERROR:
            color = "#d28282"; // Light Red
            break;
        case ErrorLevel.NOTICE:
            color = "#82afd2"; // Light Blue
            break;
        default:
            break;
    }
    return (<div className="errorMsg" style={{ backgroundColor: color }}>{error.level}: {error.element}</div>);

}