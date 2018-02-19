import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';

class ChooseHomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstHomeLocation: null,
            selectedHomeLocation: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const locationObject = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            };

            this.setState({
                firstHomeLocation: locationObject,
                selectedHomeLocation: locationObject
            });
        }, (error) => {
            alert(JSON.stringify(error));
        }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.homeLocation) {
            Actions.pop();
        }
    }

    onMapPress(e) {
        this.setState({
            selectedHomeLocation: {
                longitude: e.nativeEvent.coordinate.longitude,
                latitude: e.nativeEvent.coordinate.latitude
            }
        });
    }

    setLocationsAsHome(position) {
        this.props.saveHomeLocation(position);
    }

    renderMap() {
        if (this.state.selectedHomeLocation) {
            return (
                <MapView
                    initialRegion={{
                        latitude: this.state.selectedHomeLocation.latitude,
                        longitude: this.state.selectedHomeLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{
                        height: 200,
                        width: 300,
                        margin: 10,
                    }}
                    onPress={(e) => this.onMapPress(e)}
                >
                    <Marker
                        key={999}
                        coordinate={{
                            latitude: this.state.selectedHomeLocation.latitude,
                            longitude: this.state.selectedHomeLocation.longitude
                        }}
                        pinColor={'red'}
                    />
                </MapView>
            );
        }

        return (
            <Text> Se cauta pozitia curenta </Text>
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    margin: 16,
                }}
            >
                <Text>
                    Inca un pas.
                    Aplicatia necesita sa stie locatia unde locuiti.
                    Aceste date vor fi pastrate pe telefonul dumneavoastra si nu vor fi publice.
                    </Text>
                <Text> Sunteti acasa acum? </Text>
                <TouchableOpacity
                    style={{
                        height: 40,
                        width: 200,
                        backgroundColor: '#3B5998',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 15,
                    }}
                    onPress={() => this.setLocationsAsHome(this.state.firstHomeLocation)}
                >
                    <Text> DA - alege loactia curenta</Text>
                </TouchableOpacity>
                <Text> NU - Alege de pe harta </Text>
                {this.renderMap()}
                <TouchableOpacity
                    style={{
                        height: 40,
                        width: 250,
                        backgroundColor: '#3B5998',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 15,
                    }}
                    onPress={() => this.setLocationsAsHome(this.state.selectedHomeLocation)}
                >
                    <Text> Continua cu pozitia selectata pe harta </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        homeLocation: state.homeLocation,
    };
};

export default connect(mapStateToProps, actions)(ChooseHomeScreen);
