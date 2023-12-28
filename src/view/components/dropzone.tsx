import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import HeldFile from '../../model/heldfile';

const FILES: Array<HeldFile> = [];

type Props = {
    updater: () => void
}

function MyDropzone(props: Props) {
    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                FILES.push(new HeldFile(FILES.length + 1, file.name, reader.result))
                props.updater()
            }
            reader.readAsText(file)

        }
        )
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='DropZone'>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    );
}
export default MyDropzone;

export function filterFiles(searchString: string) {
    if (!searchString || searchString.length === 0) return FILES;
    return FILES.filter((n) => {
        return n.fileContents.toLowerCase().includes(searchString.toLowerCase())
    });
}