import React from 'react';

class PersonCard extends React.Component {
    render() {
        return (
            <div className="card text-white text-left bg-secondary mt-5 mx-auto mb-5" style={{width: "25rem"}}>
                <img src={this.props.foafdepiction} alt="Depiction" className="card-img-top bg-white"
                     style={{"objectFit":"cover", "maxHeight":"25rem", "objectPosition":"top"}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.foafname}</h5>
                    <p className="card-text">{this.props.dctdescription}</p>
                    <p className="card-text">{this.props.dbpnationality}</p>
                    <p className="card-text">Birth: {this.props.dbobirthDate}, {this.props.dbobirthPlace}</p>
                    {this.props.dbodeathDate && <p className="card-text">Death: {this.props.dbodeathDate}, {this.props.dbodeathPlace}</p>}
                    <p className="card-text">Alma Mater: {this.props.dboalmaMater}</p>
                    <p className="card-text">Spouse: {this.props.dbospouse}</p>
                </div>
            </div>
        );
    }
}

export default PersonCard