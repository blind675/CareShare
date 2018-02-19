import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class VerifyEmailScreen extends Component {    
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                }}
            >
                <Text
                    style={{
                        margin: 16,
                    }}
                >
                    A fost trimis un email de verificare. Va rugam sa urmati pasii din email pentru a valida contul dumneavoastra. Va multumim.
                    </Text>
                <TouchableOpacity
                    style={{
                        marginTop: 50,
                        padding: 10,
                        backgroundColor: '#3B5998',
                        width: 120,
                        alignItems: 'center',
                    }}
                    onPress={() => this.props.checkIfAccountVerified()}
                >
                    <Text style={{ color: 'white' }}> CONTINUE </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(null, actions)(VerifyEmailScreen);
