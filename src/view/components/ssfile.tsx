import React from 'react'


type Props = {
    filename: string,
    preview: string,
    fileContents: string
}
function SSFile(props: Props) {
    return (<tr>
        <td width={"10%"}>{props.filename}</td>
        <td>{props.preview}</td>
    </tr>);

}

export default SSFile;