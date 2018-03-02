import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ProfileScreen extends Component {
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
                    {JSON.stringify(this.props.profile, null, 2)}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, null)(ProfileScreen);
