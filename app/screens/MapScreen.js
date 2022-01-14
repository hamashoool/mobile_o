import React, {useEffect, useRef, useState} from 'react';

import {Alert, Text, View} from 'react-native';
import {TokenContext} from "../context/context";
import MapView, {Circle, Marker} from "react-native-maps";
import {myColors} from "../utilities/colors";
import * as Animatable from "react-native-animatable";
import ActionButton from "react-native-action-button";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import LoadingComponent from "../components/Loading";

const MapScreen = (props) => {
    const userInfo = React.useContext(TokenContext);
    const alertId = props.route.params.alertId;
    const navigation = props.navigation
    const [mapRegion, setMapRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const ws = useRef();

    const getLocation = async () => {
        await fetch(`https://rescue-girls.online/api/get/location/${alertId}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }
        })
            .then(response => response.json())
            .then(data => {setMapRegion(data), console.log('data ',data)})
            .catch(err => console.log(err));
        // console.log(mapRegion);
    }

    const connectWS = () => {
        ws.current = new WebSocket(`wss://rescue-girls.online/ws/alert/${alertId}/?token=${userInfo.token}`);

        ws.current.onmessage = async (e) => {
            // a message was received
            const dataObj = JSON.parse(e.data)
            if (dataObj.action){
                await setMapRegion(prevState => ({
                    ...prevState,
                    status: 'false'
                }));
                await console.log('map',mapRegion)
            } else if (dataObj.latitude === null){
                console.log('You got me!')
                Alert.alert(
                    "Error",
                    "This alert is corrupted!",
                    [
                        {
                            text: "Okay",
                            onPress: () => navigation.navigate('Alert Component'),
                        },
                    ]
                );
            } else{
                await setMapRegion(dataObj)
                setIsLoading(false);
            }

            console.log('message', dataObj);

        };
        ws.current.onopen = (e) => {
            // a message was received
            console.log('open', e);
            // ws.send(JSON.stringify({msg: 'From savior'}))
        };
        ws.current.onerror = (e) => {
            // a message was received
            console.log('error', e);
        };
        ws.current.onclose = (e) => {
            // a message was received
            console.log('close', e);
        };
    }

    useEffect(async () => {
        // await getLocation();
        await connectWS();

    }, []);


    if (isLoading){
        return <LoadingComponent/>
    }
    return (
        <View style={{flex: 1}}>
            <MapView
                style={{ flex: 3}}
                region={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                    latitudeDelta: mapRegion.latitudeDelta,
                    longitudeDelta: mapRegion.longitudeDelta
                }}
            >
                <Marker
                    coordinate={{
                        latitude: mapRegion.latitude,
                        longitude: mapRegion.longitude,
                        latitudeDelta: mapRegion.latitudeDelta,
                        longitudeDelta: mapRegion.longitudeDelta
                    }}
                    title='Marker'
                    pinColor={'#ff4b00'}
                />
                <Circle
                    center={{
                        latitude: mapRegion.latitude,
                        longitude: mapRegion.longitude,
                        latitudeDelta: mapRegion.latitudeDelta,
                        longitudeDelta: mapRegion.longitudeDelta
                    }}
                    radius={40}
                    strokeColor={'rgb(0,136,93)'}
                    fillColor={'rgba(0,136,93,0.2)'}
                />
            </MapView>
            <View style={{padding: 10, flex: 1}}>
                <Text style={{fontSize: 30, color:myColors.white}}>{mapRegion.name}</Text>
                <Text style={{fontSize: 20, color:myColors.white}}>{mapRegion.date}</Text>
                { mapRegion.status === 'true' ?
                    <Animatable.Text animation="fadeIn" easing="ease-in-out" iterationCount="infinite"
                                     style={{fontSize: 30, color:'#22ff00'}}>Live</Animatable.Text>
                    :
                    <Text style={{fontSize: 30, color:myColors.white}}>Offline</Text>
                }
            </View>
            <ActionButton
                buttonColor={myColors.secondColor}
                onPress={() => {
                    navigation.navigate('Alert Component');
                    ws.current.close();
                }}
                renderIcon={active => active ? (
                    <MaterialCommunityIcon name="close-thick" color={myColors.white} size={30}/>) : (
                    <MaterialCommunityIcon name="close-thick" color={myColors.white} size={30}/>)}
            >

            </ActionButton>
        </View>
    );
};

export default MapScreen;
