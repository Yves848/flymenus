import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { app } from '../config/base';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    app
      .auth()
      .signOut()
      .then(user => {
        this.setState({ redirect: true });
      });
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
        <h3>Loggin Out</h3>
        <Spinner />
      </div>
    );
  }
}

export default Logout;
