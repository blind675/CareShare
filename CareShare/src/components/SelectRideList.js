import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class SelectRideList extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    onPress={Actions.pop}
                    style={{
                        width: 150,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#3B5998',
                        margin: 50,
                    }}
                >
                    <Text style={{ color: 'white' }}> Inapoi </Text>
                </TouchableOpacity>
                <FlatList
                    style={{
                        margin: 10,
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
        rides: state.rides,
    };
};

export default connect(mapStateToProps, null)(SelectRideList);