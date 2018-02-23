import React from 'react';
import { Image } from 'react-native';
import {
    Router,
    Scene,
    Stack,
    Drawer
} from 'react-native-router-flux';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import VerifyEmailScreen from './components/VerifyEmailScreen';
import ChooseHomeScreen from './components/ChooseHomeScreen';
import MainScreen from './components/MainScreen';
import MenuScreen from './components/MenuScreen';
import OfferRide from './components/OfferRide';

const DrawerIcon = () => {
    return (<Image
        style={{
            width: 30,
            height: 30,
            padding: 10,
        }}
        source={require('../resources/menuIcon/menu.png')}
    />);
};

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Stack key="loading" hideNavBar>
                    <Scene key="splash" component={SplashScreen} initial />
                    <Scene key="login" component={LoginScreen} />
                    <Scene key="verifyEmail" component={VerifyEmailScreen} />
                </Stack>
                <Drawer
                    hideNavBar
                    key="mainDrawer"
                    contentComponent={MenuScreen}
                    type='reset'
                    drawerIcon={DrawerIcon}
                    //navBar={NavBar} 
                >
                    <Stack
                        key="main"
                        title="Car App"
                    >
                        <Scene
                            key="mainScreen"
                            component={MainScreen}
                        />
                        <Scene
                            key="offerRide"
                            component={OfferRide}
                        />
                    </Stack>
                </Drawer>
                <Scene key="chooseHome" component={ChooseHomeScreen} />
            </Stack>
        </Router>
    );
};

export default RouterComponent;
