import React from 'react';
import axios from "axios";
import './App.css';
import {Tooltip} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            query: "",
            result: [],
            error: ""
        };
    }

    searchInput = '';

    updateInputValue(evt) {
        this.searchInput = evt.target.value
    }

    clearData = () => {
        this.setState({query:"", result: [], error: ""})
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onFetchData()
        }
    };

    onFetchData = () => {
        this.setState({searchInput: this.searchInput}, () => {
            axios
                .post("https://quepy-api.herokuapp.com/", {"question":this.state.searchInput})
                .then(response => {
                    console.log(response.data);
                    this.setState(response.data);
                })
        });
    };

    render() {
        return (
            <div className="mt-5 text-center mb-5">
                <h6 style={{fontSize:"60px"}} className="text-white mb-5">
                    Ask something
                </h6>
                <Paper style={{
                    padding: '2px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '400px',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                }}>
                    <InputBase
                        fullWidth
                        placeholder="What is the cast of Friends?"
                        onKeyPress={this.onKeyPress}
                        type="text" onChange={evt => this.updateInputValue(evt)}
                    />
                    <div style={{display: 'flex', position:"relative"}}>
                        <IconButton type="button" onClick={this.onFetchData} aria-label="Search" style={{outline:0}}>
                            <i className="fas fa-search"/>
                        </IconButton>
                        <Divider style={{width: 2, height: 28, margin: 4}}/>
                        <Tooltip title="Clear searches">
                            <IconButton type="button" onClick={this.clearData} aria-label="Search" style={{outline:0}}>
                                <i className="fas fa-eraser"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Paper>
                <button type="button" onClick={this.clearData} className="ml-5">Clear searches</button>

                <div className="mt-5">
                    {(this.state.error === "" && this.state.query !== "") && <div className="mx-auto">
                        <div style={{maxWidth:"500px", margin:"auto"}} className="text-white">
                            <h3>Answer:</h3>
                            {this.state.result.map(result => {
                                return <p>- {result}</p>
                            })}
                        </div>
                        <Divider light style={{width:"100%", height: 4}}/>
                        <div className="ml-5 mt-3 text-left text-white">
                            <h5>SPARQL Query:</h5>
                            <div style={{display:"block", whiteSpace:"pre-wrap"}}>
                                {this.state.query}
                            </div>
                        </div>
                    </div>}

                    {(this.state.error !== "") && <div className="text-center">
                        <div>
                            <div className="text-danger">Error:<p>{this.state.error}</p></div>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default App;
