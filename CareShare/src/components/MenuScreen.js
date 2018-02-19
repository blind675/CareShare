import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class MenuScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Menu</Text>
                <Button title='1' onPress={Actions.pop} />
                <Button title='2' onPress={Actions.pop} />
                <Button title='3' onPress={Actions.pop} />
                <Button title='4' onPress={Actions.pop} />
            </View >
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'red',
    },
};

export default MenuScreen;
