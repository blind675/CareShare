import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class MenuScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Menu</Text>
                <Button title='Main' onPress={Actions.mainDrawer} />
                <Button title='Profile' onPress={Actions.pop} />
                <Button title='Market' onPress={Actions.pop} />
                <Button title='Settings' onPress={Actions.pop} />
                <Button title='About' onPress={Actions.pop} />
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
        borderWidth: 1,
        borderColor: 'grey',
    },
};

export default MenuScreen;
