import React from 'react';
import axios from "axios";
import './App.css';
import PersonCard from "./components/PersonCard"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person: Object,
      searchInput: ""
    }
  }

  searchInput = '';

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
    const personParams = "&property=foaf%3Adepiction&property=foaf%3Aname&property=dct%3Adescription&property=dbp%3Anationality&property=dbo%3AbirthDate&property=dbo%3AbirthPlace&property=dbo%3AdeathDate&property=dbo%3AdeathPlace&property=dbo%3AalmaMater&property=dbo%3Aresidence&property=dbo%3Aspouse&pretty=NONE&limit=1&offset=0&key=1234&oldVersion=false";

    this.setState({searchInput: this.searchInput}, () => {
      axios
          .get("https://recinfo-dbpedia-api.herokuapp.com/api/1.0.0/values?entities=".concat(this.state.searchInput, personParams),
              {headers: {"Accept":"application/json"}})
          .then(response => {
            const data = response.data.results.bindings[0];
            let person = {};
            for (let param in data) {
              person[param] = data[param].value;
              if (person[param].includes("resource/")) {
                person[param] = person[param].split("resource/")[1].replace(/_/g, " ");
              }
            }
            this.setState({person: person})
          })
          .catch(error => console.log(error));
    });
  };

  render() {
    return (
        <div className="mt-5 text-center">
          <input type="text" onChange={evt => this.updateInputValue(evt)}/>
          <button type="button" onClick={this.onFetchData} className="">
            <i className="fas fa-search"/>
          </button>
          <div >
            { this.state.person.entities != null && <PersonCard {...this.state.person}/> }
          </div>
        </div>
    );
  }
}

export default App;
