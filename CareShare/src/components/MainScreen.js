import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

class MainScreen extends Component {
    componentDidMount() {
        if (_.isEmpty(this.props.homeLocation)) {
            console.log(' - Go To: choose home location screen');
            Actions.chooseHome();
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text> Ecanul prinicipal </Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        homeLocation: state.homeLocation,
    };
};

export default connect(mapStateToProps, null)(MainScreen);
