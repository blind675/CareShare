import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        firebase.initializeApp({
          apiKey: 'AIzaSyBqLEy8_EsjR_oYl4lHucKNqUU8bFtNprA',
          authDomain: 'careshare-def69.firebaseapp.com',
          databaseURL: 'https://careshare-def69.firebaseio.com',
          projectId: 'careshare-def69',
          storageBucket: '',
          messagingSenderId: '586379841161'
        });
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

// TODO: investigate this
// Array.prototype.clone = function () {
    // return this.slice(0);
// };

export default App;
