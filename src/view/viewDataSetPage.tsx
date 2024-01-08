import React from "react";
import { Params, useParams } from "react-router-dom";
import HeldFile from "../model/heldfile";
import {getFileFromId} from "../controller/GetFiles";

type Props = {
    params: Readonly<Params> | undefined
}

type State = {
    datasetId: string
    updater: () => void
}

let changingId = "";

let searchVar = ""

let FILES: Array<HeldFile> = [];

type FilesListProps = {
    filter: string
}

function FilesList(props: FilesListProps) {
    let filtered = filterFiles(props.filter);
    if (filtered.length === 0) {
        return <tr key={0}><td><div>No Active Files</div></td></tr>;
    } else {
        return <>{filtered.map((n: HeldFile) => { return n.toReact(props.filter) })}</>;
    }
}
export function filterFiles(searchString: string) {
    if (!searchString || searchString.length === 0) return FILES;
    return FILES.filter((n) => {
        return n.fileContents.toLowerCase().includes(searchString.toLowerCase())
    });
}
class ViewDataSetPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        let settingId = "none"
        if (this.props.params !== undefined) {
            const { id } = this.props.params;
            if (id !== undefined) { settingId = id }
        }
        this.state = {
            datasetId: settingId,
            updater: () => { this.forceUpdate() },
        }
    }
    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({ datasetId: changingId });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changingId = event.target.value;
        this.state.updater();
    }

    handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(searchVar)
    }

    handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchVar = event.target.value;
        this.state.updater();
    }

    render() {
        const id = this.state.datasetId
        if (id === undefined || id === "none") {
            return (<>
                <form onSubmit={this.handleSubmit} id="idBar">
                    <input type="text" value={changingId} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form></>);
        }

        if(FILES.length === 0){
            getFileFromId(id).then( (n) =>{
                FILES = n;
                this.state.updater()
            }
            );
        }

        return (<>
            <div className="page">
                <table className="spanningTable">
                    <tbody>
                    <tr>
                        <td colSpan={100}>
                            <form onSubmit={this.handleSearchSubmit} id="SearchBar">
                                <input type="text" value={searchVar} onChange={this.handleSearchChange}/>
                                <input type="submit" value="Submit"/>
                            </form>
                        </td>
                    </tr>
                    <FilesList filter={searchVar}/>
                    </tbody>
                </table>
            </div>
        </>);
    }
}

function withParams() {
    return (props: Props) => <ViewDataSetPage {...props} params={useParams()}/>;
}

export default withParams();
