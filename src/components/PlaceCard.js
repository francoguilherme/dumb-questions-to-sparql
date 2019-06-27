import React from 'react';
import MapComponent from './Map.js';

class PlaceCard extends React.Component {

    city = this.uncamelize(this.props["dbocity"]);
    country = this.uncamelize(this.props["dbocountry"]);
    capital = this.uncamelize(this.props["dbocapital"]);

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
                {
                    this.props.foafdepiction &&
                    <img src={this.props.foafdepiction} alt="Depiction" className="card-img-top bg-white"
                     style={{"objectFit":"cover", "maxHeight":"20rem", "objectPosition":"top"}}/>
                }
                <div className="card-body" style={{"fontSize":"15px"}}>
                    <h5 className="card-title">{this.props.foafname}</h5>
                    {this.props.foafnick && <p className="card-text">Nickname: {this.props.foafnick}</p>}
                    {this.props.dbopopulationTotal && <p className="card-text">Population: {this.props.dbopopulationTotal} habitants</p>}
                    {this.props.dbocity && <p className="card-text">City: {this.city}</p>}
                    {this.props.dbocountry && <p className="card-text">Country: {this.country}</p>}
                    {this.props.dbocapital && <p className="card-text">Capital: {this.capital}</p>}
                    {this.props.dbpestablished && <p className="card-text">Established in: {this.props.dbpestablished}</p>}
                    <div
                        style={{ height: '20rem',
                            width: '100%',
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            justifyContent: 'left',
                            padding: 0 }}>
                        {this.props.georsspoint && <MapComponent
                            style={{
                                width: "100%",
                                marginLeft: 0
                            }}
                            google={this.props.google}
                            name={this.props.foafname}
                            lat={this.props.georsspoint.split(" ")[0]}
                            lng={this.props.georsspoint.split(" ")[1]}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaceCard