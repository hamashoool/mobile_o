import React from 'react';

import {Text, View} from 'react-native';
import {myColors} from "../utilities/colors";

const LoadingComponent = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                color: myColors.white,
                fontSize: 44,
                marginTop: "-10%"
            }}>Loading...</Text>
        </View>
    );
};

export default LoadingComponent;
