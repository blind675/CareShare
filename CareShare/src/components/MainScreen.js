import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import * as actions from '../actions';

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
                <TouchableOpacity
                    style={{
                        marginTop: 50,
                        padding: 10,
                        backgroundColor: '#3B5998',
                        width: 150,
                        alignItems: 'center',
                    }}
                    onPress={() => Actions.offerRide()}
                >
                    <Text style={{ color: 'white' }}> Ofera cursa </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: '#3B5998',
                        width: 150,
                        alignItems: 'center',
                    }}
                    onPress={() => this.props.getRides()}
                >
                    <Text style={{ color: 'white' }}> Cauta oferte </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        marginTop: 20,
                    }}
                >
                    {'Oferte de curse: '}
                </Text>
                <FlatList
                    style={{
                        width: 250,
                        marginTop: 20,
                    }}
                    data={this.props.rides}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    padding: 10,
                                    borderBottomColor: 'lightgray',
                                    borderBottomWidth: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={{ uri: item.driver.profileIcon }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginRight: 10
                                    }}
                                />
                                <Text>{item.driver.profileName} - {item.departureTime} - {item.carPlaces} </Text>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.uid}
                />
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
