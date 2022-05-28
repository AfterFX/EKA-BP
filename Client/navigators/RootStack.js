import * as React from 'react';

import { View, Text } from 'react-native';


//colors
import { Colors } from '../components/styles';
const { darkLight, brand, primary, tertiary, secondary } = Colors;

// React Navigation
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';

import Buy from '../screens/Buy';
import BuyHistory from '../screens/BuyHistory';

const Stack = createStackNavigator();

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import {IconButton} from "react-native-paper";



function Feed() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
        </View>
    );
}

function Article() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Article Screen</Text>
        </View>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={Feed} />
            <Drawer.Screen name="Article" component={Article} />
        </Drawer.Navigator>
    );
}





const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer style={{ backgroundColor: 'red' }}>
                    {storedCredentials ? (//if logged in will opens welcome
                        <>
                            <Drawer.Navigator
                                screenOptions={{
                                    headerStyle: {
                                        backgroundColor: 'transparent',
                                    },
                                    headerTintColor: tertiary,
                                    headerTransparent: true,
                                    headerTitle: '',
                                    headerLeftContainerStyle: {
                                        paddingLeft: 0,
                                    },
                                }}
                            >
                                    <>
                                        <Drawer.Screen options={{ headerTintColor: primary, headerRight: () => (
                                                <IconButton icon="alert-outline" onPress={() => alert('You\'re awesome!')} color={DefaultTheme.colors.notification} />
                                            ) }} name="Welcome" component={Welcome}/>
                                        <Drawer.Screen options={{ headerTintColor: tertiary }} name="Buy" component={Buy}/>
                                        <Drawer.Screen options={{ headerTintColor: primary }} name="BuyHistory" component={BuyHistory}/>
                                    </>
                            </Drawer.Navigator>
                        </>
                    ): (//else if not logged in will opens Login & Signup
                        <>
                            <Stack.Navigator
                                screenOptions={{
                                    headerStyle: {
                                        backgroundColor: 'transparent',
                                    },
                                    headerTintColor: tertiary,
                                    headerTransparent: true,
                                    headerTitle: '',
                                    headerLeftContainerStyle: {
                                        paddingLeft: 20,
                                    },
                                }}
                            >
                                    <>
                                        <Stack.Screen name="Login" component={Login} />
                                        <Stack.Screen name="Signup" component={Signup} />
                                    </>
                            </Stack.Navigator>
                        </>
                    )}
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    );
};

export default RootStack;

