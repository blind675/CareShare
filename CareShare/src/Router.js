import React from 'react';
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
import MenuIcon from '../resources/menuIcon/menu.png';
import MenuScreen from './components/MenuScreen';


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
                    drawerPosition={'left'}
                    drawerImage={MenuIcon}
                    /* navBar={NavBar} */
                >
                    <Stack
                        key="main"
                        title="Car App"
                    >
                        <Scene
                            key="mainScreen"
                            component={MainScreen}
                        />
                    </Stack>
                </Drawer>
                <Scene key="chooseHome" component={ChooseHomeScreen} />
            </Stack>
        </Router>
    );
};

export default RouterComponent;
