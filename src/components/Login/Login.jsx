import React, { Component } from 'react';
import {
  Button,
  H5,
  Icon,
  InputGroup,
  Intent,
  Menu,
  MenuItem,
  Popover,
  Position,
  Spinner,
  Switch,
  Tag,
  Tooltip,
  Classes,
  Toaster,
} from '@blueprintjs/core';
import { Redirect } from 'react-router-dom';
import { app, facebookProvider } from '../config/base';

import Aux from '../../hoc/_Aux';
import { AppContext } from '../../Context/UserContext';
import './Login.css';
const { Consumer } = AppContext;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  authWithEmailPassword = (e, context) => {
    e.preventDefault();
    console.table([
      {
        email: this.emailInput.value,
        password: this.passwordInput.value,
      },
    ]);

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length === 0) {
          // Create User
          return app.auth().createUserWithEmailAndPassword(email, password);
        } else if (providers.indexOf('password') === -1) {
          // they used facebook
          this.loginForm.reset();
          this.toaster.show({
            intent: Intent.WARNING,
            message: 'Try an alternative Loging',
          });
        } else {
          // Sign user In
          return app.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
        }
      })
      .then(response => {
        console.log('loggin',response);
        if (response && response.user.email) {
          this.loginForm.reset();
          //context.setUser('Yves');
          
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message });
      });
  };

  authWithFacebook = context => {
    console.log('authed with Facebook');
    app
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER,
            message: 'Unable to sing in with Facebook',
          });
        } else {
          console.log('FB', result)
          context.setUser('Yves');
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        this.toaster.show({
          intent: Intent.DANGER,
          message: error.message,
        });
      });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <Consumer>
        {context => {
          return (
            <div className="login">
              <Toaster
                ref={element => {
                  this.toaster = element;
                }}
              />
              <Button
                style={{ width: '100%' }}
                className={Classes.INTENT_PRIMARY}
                onClick={() => this.authWithFacebook(context)}
              >
                Login with Facebook
              </Button>
              <hr style={{ marginTop: '10px', marginBottom: '10px' }} />

              <form
                onSubmit={event => {
                  this.authWithEmailPassword(event, context);
                }}
                ref={form => {
                  this.loginForm = form;
                }}
              >
                <div
                  style={{ marginBottom: '10px' }}
                  className="bp3-callout bp3-info-sign"
                >
                  <h5>Note</h5>
                  If you don't have an account already, this form will create one
                </div>
                <label className={Classes.LABEL}>
                  EMail
                  <input
                    style={{ width: '100%' }}
                    className={Classes.INPUT}
                    name="email"
                    type="email"
                    ref={input => {
                      this.emailInput = input;
                    }}
                    placeholder="Email"
                  />
                </label>
                <label className={Classes.LABEL}>
                  Password
                  <input
                    style={{ width: '100%' }}
                    className={Classes.INPUT}
                    name="password"
                    type="password"
                    ref={input => {
                      this.passwordInput = input;
                    }}
                    placeholder="Password"
                  />
                </label>
                <input
                  type="submit"
                  style={{ width: '100%' }}
                  className="bp3-button bp3-intent-primary"
                  value="Log In"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Login;
