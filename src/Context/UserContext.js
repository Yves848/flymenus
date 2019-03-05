import React, { Component } from 'react';


export const AppContext = new React.createContext();

export class AppProvider extends Component {
   
    render() { 
        return (<AppContext.AppProvider>
            {this.props.children}
        </AppContext.AppProvider> );
    }
}

