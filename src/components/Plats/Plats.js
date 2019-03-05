import React, { Component } from 'react';
import { base, app } from '../config/base';
import { AppContext } from '../../Context/UserContext';
import PropTypes from 'prop-types';
import AddPlat from './AjoutPlat/AddPlat';
import { Link } from 'react-router-dom';
import {
  Card,
  Classes,
  Button,
  Intent,
  Alignment,
  Tag,
  Icon,
  Popover,
  Position,
  Tooltip,
  H1,
} from '@blueprintjs/core';
import Avatar from 'react-avatar';
import 'flexboxgrid';

const { Consumer } = AppContext;

const platsListStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'Center',
};

const platCardStyle = {
  maxWidth: '30%',
  minWidth: '250px',
  flex: '1',
  margin: '5px',
};

class Plats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      Plats: [],
      isAjoutPlatOpened: false,
      Mode: 0,
      index: -1,
      importVisible: false,
    };
  }

  fillDB = () => {
    base
      .fetch('Plats/-LDLPjLrdRXEVqI_Jf-y', {
        context: this,
        asArray: true,
      })
      .then(data => {
        data.forEach(plat => {
          this.addPlats(plat);
        });
      })
      .catch(error => {
        //handle error
      });
  };

  componentWillMount() {
    const user = app.auth().currentUser;

    this.setState({
      userId: user.uid,
      userName: user.displayName,
    });

    this.platsRef = base.syncState(user.uid + '/Plats', {
      context: this,
      state: 'Plats',
    });
  }

  addPlats = plat => {
    const Plats = [...this.state.Plats];
    Plats.push(plat);

    this.setState({
      Plats: Plats,
    });
  };

  redirect = path => {
    this.context.router.history.push(path);
  };

  AjouterPlat = () => {
    this.setState({
      currentPlat: {},
      index: -1,
      Mode: 0,
      isAjoutPlatOpened: true,
    });
  };

  handleClose = () => {
    this.setState({
      isAjoutPlatOpened: false,
    });
  };

  handleAjout = (plat, index) => {
    if (index === -1) {
      this.addPlats({
        Nom: plat.Nom,
        Image: plat.Image,
        Categorie: plat.Categorie,
        ImageSearch: plat.Nom,
        Rating: 0,
      });
    } else {
      // mettre à jour le plat ...
      const plats = this.state.Plats.map((p, i) => {
        if (i === index) {
          return plat;
        }
        return p;
      });
      this.setState({
        Plats: plats,
      });
    }
    this.handleClose();
  };

  handleDelete = i => {
    const Plats = this.state.Plats.filter((plat, index) => {
      return i !== index;
    });

    this.setState({
      Plats: Plats,
    });
  };

  handleEdit = (plat, i) => {
    this.setState({
      currentPlat: plat,
      Mode: 1,
      index: i,
      isAjoutPlatOpened: true,
    });
  };

  render() {
    const { Plats } = this.state;
    let importVisible = false;
    let cards = null;
    let categs = [];
    let iCateg = 0;

    if (Plats && Plats.length > 0) {
      const platsByCateg = Plats.map((plat, i) => {
        iCateg = categs
          .map(categ => {
            return categ.nom;
          })
          .indexOf(plat.Categorie);
        if (iCateg === -1) {
          iCateg =
            categs.push({
              nom: plat.Categorie,
              plats: [],
            }) - 1;
          //console.log(iCateg)
        }
        //console.log('categs',categs[iCateg])
        categs[iCateg].plats.push({ ...plat, key: i });
      });

      console.log(categs);
      cards = categs.map((categ, i) => {
        return (
          <Card key={i} elevation={3} style={{ marginBottom: '15px' }}>
            <div style={{ width: '100%', color: 'white', backgroundColor: 'blue' }}>
              {categ.nom}
            </div>
            {categ.plats.map((plat, i) => {
              const colband = (i%2 === 0 ? '#fcf9ef' : 'white');
              return (
                <div
                  key={i}
                  style={{
                    gridColumn: '1',
                    margin: '2px',
                    backgroundColor: (i%2 === 0 ? '#fcf9ef' : 'white')
                  }}
                >
                  <Popover position={Position.LEFT}>
                    <Tooltip content={<p>Suppression</p>} position={Position.LEFT}>
                      <Button
                        minimal
                        icon="delete"
                        intent={Intent.DANGER}
                        onClick={() => this.handleEdit(plat.key)}
                      />
                    </Tooltip>
                  </Popover>
                  <Popover position={Position.RIGHT}>
                    <Tooltip content={<p>Edition</p>} position={Position.RIGHT}>
                      <Button
                        icon="edit"
                        minimal
                        intent={Intent.PRIMARY}
                        onClick={() => this.handleEdit(plat, plat.key)}
                      />
                    </Tooltip>
                  </Popover>
                  <Avatar src={plat.Image} round size={32} /> {plat.Nom}
                </div>
              );
            })}
          </Card>
        );
      });
      /* 
      cards = Plats.map((plat, i) => {
        return (
          <div
            key={i}
            style={platCardStyle}
            className="bp3-card bp3-elevation-0  bp3-interactive"
          >
            <div />
            <h5>{plat.Nom}</h5>
            <div className="row center-lg center-sm">
              <div className="col middle-lg middle-sm" style={{height: "200px"}}>
                <img
                  className="bp3-elevation-4"
                  src={plat.Image}
                  style={{
                    minWidth: "230px",
                    maxWidth: "90%",
                    maxHeight: "180px",
                    top: "25%"
                  }}
                  alt=""
                />
              </div>
            </div>
            <div
              className="row between-sm between-lg bottom-lg bottom-sm"
              style={{ marginTop: "5px", padding: "5px" }}
            >
              <div className="col">
                <Button
                  icon="edit"
                  intent={Intent.PRIMARY}
                  onClick={() => this.handleEdit(plat, i)}
                />
              </div>
              <div className="col">
                <Button
                  icon="delete"
                  intent={Intent.DANGER}
                  onClick={() => this.handleDelete(i)}
                />
              </div>
            </div>
          </div>
        );
      });*/
    } else {
      cards = null;
      importVisible = true;
    }

    return (
      <div>
        <AddPlat
          isOpen={this.state.isAjoutPlatOpened}
          handleClose={() => this.handleClose()}
          handleAjout={this.handleAjout}
          Plat={this.state.currentPlat}
          index={this.state.index}
          Mode={this.state.Mode}
        />
        <h5>
          <a href="#">Plats de {this.state.userName} </a>
        </h5>
        <div className="row">
          <div className="col-sm-2 col-lg-1">
            <div style={{ marginTop: '10px' }}>
              {importVisible ? (
                <Button
                  icon="import"
                  fill="true"
                  alignText={Alignment.LEFT}
                  onClick={() => this.fillDB()}
                  style={{ marginBottom: '10px' }}
                >
                  Importer
                </Button>
              ) : null}

              <Button
                icon="add"
                fill="true"
                alignText={Alignment.LEFT}
                onClick={() => this.AjouterPlat()}
              >
                Ajouter
              </Button>
            </div>
          </div>

          <div className="col-sm-10 col-lg-11">{cards}</div>
        </div>
      </div>
    );
  }
}

Plats.contextTypes = {
  router: PropTypes.object,
};

export default Plats;
