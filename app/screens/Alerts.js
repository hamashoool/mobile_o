// import '../utilities/_mockLocation';
import React, {useState, useContext, useEffect, useRef} from 'react';

import {StyleSheet, ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl} from 'react-native';
import {myColors} from "../utilities/colors";
import {TouchableHighlight, TouchableOpacity} from "react-native-gesture-handler";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import MapScreen from "./MapScreen";
import MapView, {Circle, Marker} from "react-native-maps";
import ActionButton from "react-native-action-button";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {AuthContext, TokenContext} from "../context/context";
import * as Animatable from 'react-native-animatable';

const AlertsScreen = (props) => {
    const navigation = props.navigation
    const userInfo = React.useContext(TokenContext);
    const [alertData, setAlertData] = useState(null);
    const [isLoading, setIsloading] = useState(false);


    const getAlerts = () => {
        fetch('https://rescue-girls.online/api/get/alerts/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }
        })
            .then(response => response.json())
            .then(data => setAlertData(data))
            .finally(() => setIsloading(false));
    }

    const Item = ({name, date, live, alertId}) => (
        <TouchableOpacity style={styles.item} onPress={() => [navigation.navigate('Map Screen', {alertId})]}>
            <Text style={[styles.title, {textAlign: 'center', fontWeight: 'bold', paddingBottom: 5,}]}>
                {name}</Text>
            <View style={styleSheet.Inline}>
                {live ?
                    <Animatable.View animation="fadeIn" easing="ease-in-out" iterationCount="infinite">
                        <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color="#22ff00"/>
                    </Animatable.View>
                    :
                    <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={myColors.white}/>
                }
                {live ?
                    <Text style={[styles.title, {color: '#22ff00',}]}>Live Now</Text>
                    :
                    <Text style={[styles.title]}>Offline</Text>
                }
                <Text style={styles.title}>{new Date(Date.parse(date)).toDateString()}</Text>
                <MaterialCommunityIcons name="alert" size={24} color="orange"/>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => (
        <Item
            name={item.alert.girl.first_name + ' ' + item.alert.girl.last_name}
            date={item.alert.date}
            live={item.alert.is_live}
            alertId={item.alert.uuid}
        />
    );

    useEffect(() => {
        setIsloading(true);
        getAlerts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <ActivityIndicator/>
                :
                <FlatList
                    data={alertData}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    keyExtractor={(item, index) => 'item' + index}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={getAlerts}/>
                    }
                />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: myColors.weekColor,
        padding: 20,
        marginHorizontal: 5,
        marginVertical: 3,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        color: myColors.white,
    },
});

export default AlertsScreen;
