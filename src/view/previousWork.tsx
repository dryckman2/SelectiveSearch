import React from 'react'
import "../index.css";

import MyDropzone, { filterFiles } from './components/dropzone';

import HeldFile from "../model/heldfile"


let searchString = "";

type Props = {
    updater: () => void,
}

type State = {
    value: string,
    updater: () => void
}

class SearchBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { value: '', updater: props.updater };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        searchString = event.target.value;
        this.setState({ value: event.target.value });
        this.state.updater();
    }

    handleSubmit(event: React.FormEvent) {
        this.state.updater();
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id="SearchBar">
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

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

type PageProps = {

}

type PageState = {
    updater: () => void
}

export default class Page extends React.Component<PageProps, PageState> {

    constructor(props: PageProps) {
        super(props);
        this.state = { updater: () => { this.forceUpdate() } }
    }

    render() {
        return (
            <div className="page">
                <table className="spanningTable">
                    <tbody>
                        <tr>
                            <td colSpan={100}>
                                <MyDropzone updater={this.state.updater} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={100}>
                                <SearchBar updater={this.state.updater} />
                            </td>
                        </tr>
                        <FilesList filter={searchString} />
                    </tbody>
                </table>
            </div >
        );
    }
}
