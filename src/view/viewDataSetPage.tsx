import React from "react";
import { Params, useParams } from "react-router-dom";

type Props = {
    params: Readonly<Params<string>> | undefined
}

type State = {
    datasetId: string
    updater: Function
}

let changingId = "";

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
            updater: () => { this.forceUpdate() }
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

    render() {
        const id = this.state.datasetId
        if (id === undefined || id === "none") {
            return (<>
                <form onSubmit={this.handleSubmit} id="SearchBar">
                    <input type="text" value={changingId} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form></>);
        }

        return (<>Render Dataset From Id: {id}</>);
    }

}

function withParams() {
    return (props: Props) => <ViewDataSetPage {...props} params={useParams()} />;
}
export default withParams();
