import React from 'react';
import axios from "axios";
import {Tooltip, Fab} from "@material-ui/core";

class PersonCard extends React.Component {

    birthPlace = this.uncamelize(this.props["dbobirthPlace"]);
    deathPlace = this.uncamelize(this.props["dbodeathPlace"]);
    residence = this.uncamelize(this.props["dboresidence"]);
    almaMater = this.uncamelize(this.props["dboalmaMater"]);
    spouse = this.uncamelize(this.props["dbospouse"]);

    fetchData = (prop) => {
        const genericParams = "&property=dbo%3AbirthDate&property=georss:point&pretty=NONE&limit=1&offset=0&key=1234&oldVersion=false";
        const personParams = "&property=foaf%3Adepiction&property=foaf%3Aname&property=dct%3Adescription&property=dbp%3Anationality&property=dbo%3AbirthDate&property=dbo%3AbirthPlace&property=dbo%3AdeathDate&property=dbo%3AdeathPlace&property=dbo%3AalmaMater&property=dbo%3Aresidence&property=dbo%3Aspouse&pretty=NONE&limit=1&offset=0&key=1234&oldVersion=false";
        const placeParams = "&property=foaf%3Adepiction&property=foaf%3Aname&property=foaf:nick&property=dbo:populationTotal&property=dbo:city&property=dbo:country&property=dbo:capital&property=georss:point&property=dbo:type&property=dbp:established&pretty=NONE&limit=1&offset=0&key=1234&oldVersion=false";

        let searchParams = '';
        axios
            .get("https://recinfo-dbpedia-api.herokuapp.com/api/1.0.0/values?entities=".concat(prop, genericParams),
                {headers: {"Accept":"application/json"}})
            .then(response => {
                const data = response.data.results.bindings[0];
                if (data["dbobirthDate"] != null) {
                    searchParams = personParams
                } else if (data["georsspoint"] != null) {
                    searchParams = placeParams
                }

                axios
                    .get("https://recinfo-dbpedia-api.herokuapp.com/api/1.0.0/values?entities=".concat(prop, searchParams),
                        {headers: {"Accept":"application/json"}})
                    .then(response => {
                        const data = response.data.results.bindings[0];
                        let entity = {};
                        for (let param in data) {
                            entity[param] = data[param].value;
                        }
                        this.props.appendEntity(entity);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    searchRelated = () => {
        console.log(this.props);
        for (let prop in this.props) {
            if (prop === "foafname" || prop === 'entities'){
                continue
            }
            if (String(this.props[prop]).includes("resource/")) {
                let newSearch = String(this.props[prop]).split("resource/")[1];
                this.fetchData(newSearch)
            }
        }
    };

    uncamelize(str) {
        try {
            return str.split("resource/")[1].replace(/_/g, " ");
        } catch (e) {
            return ''
        }
    }

    render() {
        return (
            <div className="card text-white text-left bg-secondary mt-5 mx-auto mb-3" style={{width: "20rem"}}>
                <Tooltip title="Search related">
                    <Fab size="medium" onClick={this.searchRelated} className="bg-info text-white" style={{outline:0, position:"absolute", top:"2px", right:"2px"}}>
                        <i className="fas fa-search-plus mx-auto" style={{'fontSize':'1.5em'}}/>
                    </Fab>
                </Tooltip>
                {
                    this.props.foafdepiction &&
                    <img style={{'text-indent': '-10000px'}} src={this.props.foafdepiction} alt="Depiction" className="card-img-top bg-white"
                     style={{"objectFit":"cover", "maxHeight":"20rem", "objectPosition":"top"}}/>
                }
                <div className="card-body" style={{"fontSize":"15px"}}>
                    <h5 className="card-title">{this.props.foafname}</h5>
                    <p className="card-text">{this.props.dctdescription}</p>
                    <p className="card-text">Birth: {this.props.dbobirthDate}, {this.birthPlace}</p>
                    {this.props.dbodeathDate && <p className="card-text">Death: {this.props.dbodeathDate}, {this.deathPlace}</p>}
                    {this.props.dboresidence && <p className="card-text">Lives in: {this.residence}</p>}
                    {this.props.dboalmaMater && <p className="card-text">Alma Mater: {this.almaMater}</p>}
                    {this.props.dbospouse && <p className="card-text">Spouse: {this.spouse}</p>}
                </div>
            </div>
        );
    }
}

export default PersonCard