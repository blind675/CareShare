import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import * as actions from '../actions';

class MainScreen extends Component {
    componentDidMount() {
        if (_.isEmpty(this.props.homeLocation)) {
            console.log(' - Go To: choose home location screen');
            Actions.chooseHome();
        } else {
            this.props.getRides();
        }
    }

    renderFoundRequests() {
        return `Found ${this.props.rides.length} rides for you`;
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        backgroundColor: '#5B85AA',
                        flex: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => Actions.offerRide()}
                        >
                            <Image
                                source={require('../../resources/plus/plus.png')}
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    margin: 8,
                                }}
                            > {'<- To work'} </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)'
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            height: 30,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16,
                            }}
                        >
                            Found 0 requests for you
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: '#EE4266',
                        flex: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => Actions.offerRide()}
                        >
                            <Image
                                source={require('../../resources/plus/plus.png')}
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    margin: 8,
                                }}
                            > {'From work ->'} </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)'
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            height: 30,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            if (this.props.rides.length > 0) {
                                Actions.selectRide();
                            }
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16,
                            }}
                        >
                            {this.renderFoundRequests()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        homeLocation: state.homeLocation,
        rides: state.rides,
    };
};

export default connect(mapStateToProps, actions)(MainScreen);
