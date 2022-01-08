import React, {forwardRef, useImperativeHandle} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {TokenContext} from "../context/context";
import SaviorHome from "../components/SaviorHome";
import GirlHome from "../components/GirlHome";

function HomeScreen(props) {
    const userInfo = React.useContext(TokenContext);
    const navigation = props.navigation

    let ref = props.route.params.ref

    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        goToAlert: () => { navigation.navigate('View Alerts') }
    }))

    return (
        <SafeAreaView style={styles.container}>

            {userInfo.userType === 'savior' ?
                <ScrollView showsVerticalScrollIndicator={false} style={{padding: 5}}>
                <SaviorHome/>
                </ScrollView>
                :
                <GirlHome />
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default forwardRef(HomeScreen);