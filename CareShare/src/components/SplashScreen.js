import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import _ from 'lodash';
import * as actions from '../actions';

const reactMixin = require('react-mixin');

class SplashScreen extends Component {
    componentDidMount() {
        this.props.loadProfile();
        this.props.loadHomeLocation();
    }

    componentWillReceiveProps(nextProps) {
        this.setTimeout(() => {
            if (!_.isEmpty(nextProps.profile)) {
                if (nextProps.profile.verified === false) {
                    console.log(' - Go To: verify email page');
                    Actions.verifyEmail();
                } else {
                    console.log(' - Go To: main drawer page');
                    Actions.mainDrawer();
                }
            } else {
                console.log(' - Go To: login page');
                Actions.login();
            }
        }, 500);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>
                    Care Share
                </Text>
            </View>
        );
    }
}

reactMixin(SplashScreen.prototype, TimerMixin);

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, actions)(SplashScreen);
