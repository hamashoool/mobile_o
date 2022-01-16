import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {TokenContext} from "../context/context";
import SaviorHome from "../components/SaviorHome";
import GirlHome from "../components/GirlHome";
import * as Notifications from "expo-notifications";

function HomeScreen(props) {
    const userInfo = React.useContext(TokenContext);
    const navigation = props.navigation

    const _handleNotificationResponse = response => {
        navigation.navigate('View Alerts')
    };

    useEffect(() => {
        Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
    }, []);


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

export default HomeScreen;