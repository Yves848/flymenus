import React, { Component } from "react";
import { app, base } from "../../components/config/base";
import { Link } from "react-router-dom";
import { EditableText, Dialog, Alert, Intent,Card,H2,Button } from "@blueprintjs/core";

class Utilisateurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilisateur: {
        nom: "",
        id: "",
        mail: "",
        mailConfirmed: false
      }
    };
  }

  componentDidMount() {
    const user = app.auth().currentUser;
    console.log("user", user);
    this.setState({
      utilisateur: {
        id: user.uid,
        nom: user.displayName,
        mail: user.email,
        mailConfirmed: user.emailVerified
      },
      confirmVisible: false,
      oldNom: ""
    });
  }

  handleNameChange = value => {
    const utilisateur = { ...this.state.utilisateur };
    utilisateur.nom = value;
    this.setState({ utilisateur: utilisateur });
  };

  handleNameConfirm = value => {
    console.log(value);
    if (value !== this.state.oldNom) {
      this.toggleConfirm();
    }
  };

  handleAlertClose = (value) => {
    if (value) {
      const user = app.auth().currentUser;
      user.updateProfile({
        displayName: this.state.utilisateur.nom
      })
    } else {
      this.handleNameChange(this.state.oldNom)
    }
    this.toggleConfirm();
  }

  toggleConfirm = () => {
    this.setState({
      confirmVisible: !this.state.confirmVisible
    });
  };

  render() {
    const { utilisateur } = this.state;
    return (
      <div>
        <Alert
          cancelButtonText="Annuler"
          confirmButtonText="Confirmer"
          icon="help"
          intent={Intent.PRIMARY}
          isOpen={this.state.confirmVisible}
          onCancel={() => this.handleAlertClose(false)}
          onConfirm={() => this.handleAlertClose(true)}
        >
          <p>
            Ettes-vous sûr de vouloir renomer l'utilisateur {utilisateur.nom} ?
          </p>
        </Alert>
        <Card className="bp3-elevation-4" style={{marginLeft: "15%", marginRight: "15%", marginTop: "25px"}}>
        <div><H2 className=" bp3-tag bp3-intent-primary">Paramètres utilisateur</H2></div>
        
        <div className="row" style={{ height: "40px" }}>
          <div className="col-lg-2 col-sm-2">Nom</div>
          <div className="col-lg-10 col-sm-10">
            <EditableText
              value={utilisateur.nom}
              onEdit={value => this.setState({ oldNom: value })}
              onChange={value => {
                this.handleNameChange(value);
              }}
              onConfirm={value => this.handleNameConfirm(value)}
            />
          </div>
        </div>
        <div className="row" style={{ height: "40px" }}>
          <div className="col-lg-2 col-sm-2">eMail</div>
          <div className="col-lg-10 col-sm-10">
            <EditableText value={utilisateur.mail} />
          </div>
        </div>

        <div className="row" style={{ height: "40px" }}>
          <div className="col-lg-2 col-sm-2">eMail Confirmé :</div>
          <div className="col-lg-10 col-sm-10">
            <EditableText value={utilisateur.mailConfirmed ? "Oui" : "Non"} disabled />
          </div>
        </div>

        
        <br />
        <Link to="/logout"><Button icon="log-out" className="bp3-intent-danger">Déconnexion</Button></Link>
        </Card>
      </div>
    );
  }
}

export default Utilisateurs;
