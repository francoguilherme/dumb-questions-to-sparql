import React from 'react';
import axios from "axios";
import './App.css';
import PersonCard from "./components/PersonCard"
import PlaceCard from "./components/PlaceCard"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entity: Object,
            entities: [],
            searchInput: ""
        }
    }

    searchInput = '';

    appendEntity = (entity) => {
        let list = this.state.entities;
        if (!list.includes(entity)){
            list.push(entity);
            this.setState({entities: list});
        }
    };

    updateInputValue(evt) {
        this.searchInput = this.camelize(evt.target.value)
    }

    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (/\s+/.test(match)) return "_";
            return match.toUpperCase();
        });
    }

    onFetchData = () => {
        const genericParams = "&property=dbo%3AbirthDate&property=georss:point&pretty=NONE&limit=1&offset=0&key=1234&oldVersion=false";
        const personParams = "&property=foaf%3Adepiction&property=foaf%3Aname&property=dct%3Adescription&property=dbp%3Anationality&property=dbo%3AbirthDate&property=dbo%3AbirthPlace&property=dbo%3AdeathDate&property=dbo%3AdeathPlace&property=dbo%3AalmaMater&property=dbo%3Aresidence&property=dbo%3Aspouse&pretty=NONE&limit=1&offset=0&key=1234&oldVersion=false";
        const placeParams = "&property=foaf%3Adepiction&property=foaf%3Aname&property=foaf:nick&property=dbo:populationTotal&property=dbo:city&property=dbo:country&property=dbo:capital&property=georss:point&property=dbo:type&property=dbp:established&pretty=NONE&limit=1&offset=0&key=1234&oldVersion=false";

        this.setState({searchInput: this.searchInput}, () => {
            let searchParams = '';
            axios
                .get("https://recinfo-dbpedia-api.herokuapp.com/api/1.0.0/values?entities=".concat(this.state.searchInput, genericParams),
                    {headers: {"Accept":"application/json"}})
                .then(response => {
                    const data = response.data.results.bindings[0];
                    if (data["dbobirthDate"] != null) {
                        searchParams = personParams
                    } else if (data["georsspoint"] != null) {
                        searchParams = placeParams
                    }

                    axios
                        .get("https://recinfo-dbpedia-api.herokuapp.com/api/1.0.0/values?entities=".concat(this.state.searchInput, searchParams),
                            {headers: {"Accept":"application/json"}})
                        .then(response => {
                            const data = response.data.results.bindings[0];
                            let entity = {};
                            for (let param in data) {
                                entity[param] = data[param].value;
                            }
                            this.appendEntity(entity);
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        });
    };

    render() {
        return (
            <div className="mt-5 text-center">
                <input placeholder="Search for someone" type="text" onChange={evt => this.updateInputValue(evt)}/>
                <button type="button" onClick={this.onFetchData} className="">
                    <i className="fas fa-search"/>
                </button>

                <div className="row">
                    {this.state.entities.map(entity => {
                        if (entity.dbobirthDate != null){
                            return <div key={entity.foafname} className="col"><PersonCard appendEntity={this.appendEntity} {...entity}/></div>
                        } else if (entity.georsspoint != null) {
                            return <div key={entity.foafname} className="col"><PlaceCard appendEntity={this.appendEntity} {...entity}/></div>
                        } else {
                            return <i/>
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default App;
