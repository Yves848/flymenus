import React, { Component } from 'react';
import { Card, Classes, Button, Colors, Intent } from '@blueprintjs/core';
import * as _C from '../config/constantes'

class Repas extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {Heure} = this.props;
    //console.log(Heure)
    return (
      <div
        className="row top-lg top-sm  bp3-elevation-3"
        style={{
          padding: '0px',
          marginBottom: '10px',
          border: '2px solid',
          borderColor: Colors.GRAY3,
          borderRadius: "15px"
          //boxShadow: '5px 5px #888888',
        }}
      >
        <div className="col-sm-2 col-lg-1" style={{ backgroundColor: Heure.couleur, textAlign: "center", borderTopLeftRadius: "13px", borderBottomLeftRadius: "13px" }}>
          <span><h3>{this.props.Heure.nom}</h3></span>
          <Button small intent={Intent.NONE} onClick={() => this.props.ajout(Heure)} icon="add" style={{marginBottom: "5px"}}>
            Ajouter
          </Button>
          
        </div>
        <div className="col">{this.props.repas}</div>
      </div>
    );
  }
}

export default Repas;
