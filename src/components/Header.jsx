import React, { Component } from 'react';
import Aux from '../hoc/_Aux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import menu from '../assets/images/menu.png';
import plat from '../assets/images/dish.png';
import menus from '../assets/images/64x64/Order-history-icon.png';
import programme from '../assets/images/64x64/Calendar-selection-day-icon.png';
import loginImg from '../assets/images/64x64/Login.png';
import keysImg from '../assets/images/64x64/Keys.png';
import { AppContext } from '../Context/UserContext';
import 'flexboxgrid';
import {
  Alignment,
  Button,
  Classes,
  Colors,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
} from '@blueprintjs/core';

import {app} from './config/base'

const { Consumer } = AppContext;

const btnPlat = (
  <div className="row middle-sm" style={{ width: 'auto' }}>
    <div className="col-sm-4">
      <img style={{ height: '24px' }} src={plat} />
    </div>
    <div className="col-sm-8">Plats</div>
  </div>
);
const btnMenus = (
  <div className="row middle-sm" style={{ width: 'auto' }}>
    <div className="col-sm-4">
      <img style={{ height: '24px' }} src={menus} />
    </div>
    <div className="col-sm-8">Menus</div>
  </div>
);
const btnProgrammes = (
  <div className="row middle-sm" style={{ width: 'auto' }}>
    <div className="col-sm-4">
      <img style={{ height: '24px' }} src={programme} />
    </div>
    <div className="col-sm-8">Programmes</div>
  </div>
);

class Header extends Component {
  constructor(props) {
    super(props);
  }

  redirect = path => {
    this.context.router.history.push(path);
  };

  logout = () => {
    app.auth().signOut();
  }

  render() {
    const { user } = this.props;

    return (
      <Aux>
        <Consumer>
          {context => {
            //console.log(context);
            const btnLog = context.user ? (
              <Button
                    className={Classes.MINIMAL}
                    onClick={() => this.redirect('users')}>
              <div className="row middle-sm" style={{ width: 'auto' }}>
                <div className="col-sm-4">
                  <img style={{ height: '24px' }} src={keysImg} />
                </div>
                <div className="col-sm-8">Utilisateurs</div>
              </div>
              </Button>
            ) : (
              <Button
                    className={Classes.MINIMAL}
                    onClick={() => this.redirect('login')}
                  >
              <div className="row middle-sm" style={{ width: 'auto' }}>
                <div className="col-sm-4">
                  <img style={{ height: '24px' }} src={loginImg} />
                </div>
                <div className="col-sm-8">Connexion</div>
              </div>
              </Button>
            );
            return (
              <Navbar>
                {context.user ? (
                <NavbarGroup align={Alignment.LEFT}>
                  <NavbarHeading>FlyMenus</NavbarHeading>
                  <NavbarDivider />
                  
                  <Button
                    className={Classes.MINIMAL}
                    onClick={() => this.redirect('/programmes')}
                  >
                    {btnProgrammes}
                  </Button>
                  <Button
                    className={Classes.MINIMAL}
                    onClick={() => this.redirect('/menus')}
                  >
                    {btnMenus}
                  </Button>
                  <Link to="/plats">
                  <Button
                    className={Classes.MINIMAL}
                    //onClick={() => this.redirect('/plats/all')}
                  >
                    {btnPlat}
                  </Button>
                  </Link>
                  
                </NavbarGroup>)
                :
                <NavbarGroup align={Alignment.LEFT}>
                  <NavbarHeading>FlyMenus</NavbarHeading>
                  </NavbarGroup>
              }
                <NavbarGroup align={Alignment.RIGHT}>
                  
                    {btnLog}
                  
                </NavbarGroup>
              </Navbar>
            );
          }}
        </Consumer>
      </Aux>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object,
};

export default Header;
