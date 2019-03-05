import * as React from 'react';
import { Component } from 'react';

import {
  Button,
  Alignment,
  H3,
  Callout,
  Intent,
  Card,
  ProgressBar,
  Colors,
} from '@blueprintjs/core';
import Aux from '../../hoc/_Aux';
import { app, base } from '../config/base';
import * as moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/fr';
import { ROUND, ELEVATION_3 } from '@blueprintjs/core/lib/esm/common/classes';
import * as constante from '../config/constantes';
import Repas from './Repas';
import AjoutProgramme from './AjoutProgramme/AjoutProgramme';

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
const WEEKDAYS_LONG = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];
const WEEKDAYS_SHORT = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

class Programmes extends Component {
  ProgrammesRef = null;
  state = {
    id: 0,
    userName: '',
    Programmes: [],
    Plats: [],
    date: moment(),
    jour: undefined,
    matin: [],
    midi: [],
    gouter: [],
    soir: [],
    loading: false,
    menuProgress: 0,
    controleAjout: {
      isOpen: false,
      Heure: null,
      progrogramme: {},
    },
  };

  componentWillMount() {
    const user = app.auth().currentUser;


    this.platsRef = base.syncState(user.uid + "/Plats", {
      context: this,
      state: "Plats"
    });

    this.setState({
      userId: user.uid,
      userName: user.displayName,
      jour: new Date(),
    });
  }

  addProgramme = (programme, Heure) => {
    const Programmes = [...this.state.Programmes];
    const jour = moment(this.state.jour).format('YYYYMMDD');
    console.log('addProgramme',jour);
    console.log('addProgramme',Heure)
    console.log('addProgramme',programme);
    let ref = base
      .push(this.state.userId + '/Programmes/' + jour + '/' + Heure, {
        data: programme,
      })
      .then(newLocation => {
        let generatedKey = newLocation.key;
        this.renderMenus(jour, Heure).then(menu => {
          switch (Heure) {
            case constante.MATIN.key: {
              this.setState({
                matin: menu,
              });
              break;
            }
            case constante.MIDI.key: {
              this.setState({
                midi: menu,
              });
              break;
            }
            case constante.GOUTER.key: {
              this.setState({
                gouter: menu,
              });
              break;
            }
            case constante.SOIR.key: {
              this.setState({
                soir: menu,
              });
              break;
            }
            default:
              break;
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleDayClick = day => {
    this.setState({ jour: day });
    const user = app.auth().currentUser;
    const jour = moment(day).format('YYYYMMDD');
    this.loadProgram(jour);
  };

  loadProgram = jour => {
    this.setState({
      loading: true,
      menuProgress: 0,
    });

    let midi = [];
    let matin = [];
    let gouter = [];
    let soir = [];
    this.renderMenus(jour, constante.MATIN.key)
      .then(menu => {
        //console.log('menu matin',menu)
        matin = menu;
        this.setState({
          menuProgress: 0.5,
        });
        return this.renderMenus(jour, constante.MIDI.key);
      })
      .then(menu => {
        //console.log('menu midi',menu)
        midi = menu;
        this.setState({
          menuProgress: 0.75,
        });
        return this.renderMenus(jour, constante.GOUTER.key);
      })
      .then(menu => {
        //console.log('menu gouter', menu)
        gouter = menu;
        this.setState({
          menuProgress: 1,
        });
        return this.renderMenus(jour, constante.SOIR.key);
      })
      .then(menu => {
        //console.log('menu soir', menu)
        soir = menu;
        this.setState({
          matin: matin,
          midi: midi,
          gouter: gouter,
          soir: soir,
          menuProgress: 1,
          loading: false,
        });
      });
  };

  ajout = Heure => {
    /* this.addProgramme(
      {
        Nom: 'Test',
        Remarque: '',
        Plats: [0, 3, 4],
      },
      Heure.key
    ); */
    this.setState({
      controleAjout: {
        isOpen: true,
        Heure: Heure,
        programme: {},
      },
    });
  };

  renderMenus = (Jour, Heure) => {
    return new Promise((resolve, reject) => {
      let menus;
      base
        .fetch(this.state.userId + '/Programmes/' + Jour + '/' + Heure, {
          context: this,
          asArray: true,
        })
        .then(data => {
          //console.log(Jour, Heure, data);
          menus = data.map((programme, i) => {
            return <div key={i}>{programme.Nom}</div>;
          });
          //console.log(menus);
          resolve(menus);
        })
        .catch(error => {
          //handle error
          reject(menus);
        });
    });
  };

  handleCloseAjout = () => {
    this.setState({
      controleAjout: {
        isOpen: false,
      },
    });
  };

  handleSaveRepas = (repas) => {
    //console.log(repas)

    this.addProgramme(repas.Programme, repas.Heure.key);
    
    this.setState({
      controleAjout: {
        isOpen: false,
      },
    });
  }

  render() {
    const { jour } = this.state;
    const { Programmes, loading } = this.state;
    let sjour;
    if (jour) {
      sjour = jour.toLocaleDateString();
    } else {
      sjour = '';
    }

    return (
      <Aux>
        <AjoutProgramme
          controleAjout={this.state.controleAjout}
          handleClose={() => this.handleCloseAjout()}
          handleSaveRepas={this.handleSaveRepas}
          plats={this.state.Plats}
        />
        <h5>
          <a href="#">Programmes de {this.state.userName} </a>
        </h5>

        <div className="row">
          <div className="col-sm-3 col-lg-3">
            <DayPicker
              locale="fr"
              onDayClick={this.handleDayClick}
              selectedDays={this.state.jour}
              months={MONTHS}
              weekdaysLong={WEEKDAYS_LONG}
              weekdaysShort={WEEKDAYS_SHORT}
              firstDayOfWeek={1}
            />
          </div>
          <div className="col-sm-9 col-lg-9 center">
            <H3>Menus du {sjour}</H3>
            {loading ? (
              <div
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  top: '25%',
                  left: '25%',
                  width: '50%',
                }}
              >
                <span>
                  <h1
                    style={{
                      color: Colors.WHITE,
                      background: Colors.COBALT4,
                      border: '2px solid gray',
                      borderRadius: '25px',
                      elevation: ELEVATION_3,
                    }}
                  >
                    Chargement du menu
                  </h1>
                </span>
                <ProgressBar value={this.state.menuProgress} intent={Intent.SUCCESS} />
              </div>
            ) : (
              <Aux>
                <Repas
                  Heure={constante.MATIN}
                  ajout={this.ajout}
                  Jour={jour}
                  repas={this.state.matin}
                />
                <Repas
                  Heure={constante.MIDI}
                  ajout={this.ajout}
                  Jour={jour}
                  repas={this.state.midi}
                />
                <Repas
                  Heure={constante.GOUTER}
                  ajout={this.ajout}
                  Jour={jour}
                  repas={this.state.gouter}
                />
                <Repas
                  Heure={constante.SOIR}
                  ajout={this.ajout}
                  Jour={jour}
                  repas={this.state.soir}
                />
              </Aux>
            )}
          </div>
        </div>
      </Aux>
    );
  }
}

export default Programmes;
