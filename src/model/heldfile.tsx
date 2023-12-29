import SSFile from "../view/components/ssfile";
import React from 'react';

class HeldFile {
    key: number;
    filename: string;
    fileContents: string;
    preview: string;

    constructor(key: number, filename: string, fileContents: string | ArrayBuffer | null) {
        this.key = key;
        this.filename = filename;
        if (fileContents != null) {
            this.fileContents = fileContents.toString();
            this.preview = this.firstPreview(fileContents.toString());
        } else {
            this.fileContents = "unset";
            this.preview = "unset";
        }
    }

    firstPreview(fileContents: string) {
        let str = fileContents.split("\n");
        let result = str[0];
        let i = 1;
        while ((i < str.length) && (result.length < 100)) {
            result += str[i];
            i++;
        }
        return result;
    }

    updatePreview(searchString: string) {
        if (!searchString || searchString.length === 0) {
            this.preview = this.firstPreview(this.fileContents)
        } else if (searchString && this.fileContents.toLowerCase().includes(searchString.toLowerCase())) {
            let io = this.fileContents.toLowerCase().indexOf(searchString.toLowerCase());
            this.preview = this.fileContents.substring(io > 10 ? io - 10 : 0, Math.min(io + 50, this.fileContents.length));
        } else {
            this.preview = "Error";
        }
    }

    toReact(filter: string) {
        this.updatePreview(filter);
        return <SSFile key={this.key} filename={this.filename} fileContents={this.fileContents} preview={this.preview} />
    }
}

export default HeldFile;