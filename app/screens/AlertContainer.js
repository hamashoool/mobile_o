import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import MapScreen from "./MapScreen";
import Alerts from "./Alerts";

const Stack = createStackNavigator();

const AlertContainerScreen = (props) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*<Stack.Screen name="Alerts" component={Alerts}/>*/}
            <Stack.Screen name="Map Screen" component={MapScreen}/>
        </Stack.Navigator>
    );
};

export default AlertContainerScreen;
