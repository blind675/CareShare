import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import firebase from 'firebase';

class App extends Component {

  state = {
    name: '',
    email: '',
    companies: [],
    expanded: false,
    licencesCount: 50,
    logo: null,
  };

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

  componentDidMount() {
    // make a get company request
    firebase.database()
      .ref('/companies')
      .on('child_added', snapshot => {
        const company = { ...snapshot.val(), uid: snapshot.key };
        const newCompaniesList = [company, ...this.state.companies]
        this.setState({
          companies: newCompaniesList,
          email: '',
          name: ''
        })
      });

    this.setState({
      logo: getRandomProfileURL()
    });
  }

  onPressAddCompany = () => {
    let { name, email, licencesCount, logo } = this.state;

    if (name && email) {
      var messageListRef = firebase.database().ref('/companies');
      var newMessageRef = messageListRef.push();
      newMessageRef.set({
        name,
        email,
        licencesCount,
        logo
      })
    }
  }

  toggleOptionSection = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderOptionsSections() {
    const arrowSign = '<';
    if (this.state.expanded == true) {
      return (<View
        style={{
          flexDirection: 'row',
          width: 180,
        }}>
        <TouchableOpacity
          onPress={this.toggleOptionSection}
          style={{
            width: 30,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text> {arrowSign} </Text>
        </TouchableOpacity>
        <View style={{
          padding: 10,
          borderColor: 'lightgray',
          borderWidth: 1,
          borderRadius: 6,
          marginBottom: 10,
          flex: 1,
        }}
        >
          <TextField
            label='Number of licences'
            value={'' + this.state.licencesCount}
            onChangeText={(licencesCount) => this.setState({ licencesCount })}
          />
          <Image
            source={{ uri: this.state.logo }}
            style={{
              width: 100,
              height: 100,
              padding: 10,
            }}
          />
        </View>
      </View>);
    }

    return (
      <TouchableOpacity
        onPress={this.toggleOptionSection}
        style={{
          width: 30,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text> > </Text>
      </TouchableOpacity>
    );
  }
  render() {

    let { name, email, companies } = this.state;

    return (
      <View style={{
        margin: 10,
        marginTop: 30,
        flex: 1,
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            padding: 10,
            borderColor: 'lightgray',
            borderWidth: 1,
            borderRadius: 6,
            marginBottom: 10,
            flex: 1,
          }}>
            <TextField
              label='Company Name'
              value={name}
              onChangeText={(name) => this.setState({ name })}
            />
            <TextField
              label='Company Email'
              value={email}
              onChangeText={(email) => this.setState({ email })}
            />
            <Button
              onPress={this.onPressAddCompany}
              title="Add"
              color="navy"
              accessibilityLabel="Add new company"
            />
          </View>
          {this.renderOptionsSections()}
        </View>
        <FlatList
          data={this.state.companies}
          renderItem={({ item }) => {
            return <View style={{
              padding: 8,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text>{item.name} - {item.email} - {item.licencesCount} - </Text>
              <Image source={{ uri: item.logo }}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 10
                }} />
            </View>
          }}
          keyExtractor={(item, index) => item.uid}
        />
      </View>
    );
  }
}

const getRandomProfileURL = () => {
  const PROFILE_PICTURES = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTKjb-pRvXpJTbCakYF1VHcWjguRsVQ-FcsTVPDIyqrPfaAlg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsLWEvyBBp-smw7HnpUwGib2Ef4hfIqhbqP_hPqZ9Mf0TS6XBeg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xI2ksgmCa7I066xTL-SH2Cz4YnVl-1CaPReUF7QGpfPVDfYssg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ90ObAeUNNZXWqWeyq7rGeiprE37z1EMjlG58RBKZZ-v_xlm-Qw',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzqI2QjxQA4Ac1miSP0rVZ4EWRAsFRNHQJawFLu5AVYLLDoDBKw',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCAJ9N9tEjGSdwu_HP8uWOlk9aW_aYQvBruwb-oYgVqOhICWn_1g',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-j1EX0fB8zEK1iXdXZtjzG5js0it_TnIsYnzkN1JtOu5r3QFCw',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxCPn646A1lKmGRqagBsqajSQik3l1OcAYLpoBM7TdhZU8UKovg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxCPn646A1lKmGRqagBsqajSQik3l1OcAYLpoBM7TdhZU8UKovg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFoef01nIw9vhyei4gHbjrxqLnmEquedq4GqQ9Gniaw5OEd1UKA',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdvsGulQ4WlOjp1BNI710talx3HWGCizQTWaDzMCu8I5bivTQyaw',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_w7xO2aMabBO6k1DAdJnYJn1zpJAcqFrGJU4lhjvdqX6L9BZv7A'];
  return PROFILE_PICTURES[getRandomInt(0, PROFILE_PICTURES.length)];
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

export default App;