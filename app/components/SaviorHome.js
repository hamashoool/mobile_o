import React, {useEffect, useState} from 'react';

import {Dimensions, Text, View} from 'react-native';
import {myColors} from "../utilities/colors";
import {ContributionGraph, LineChart, PieChart, ProgressChart} from "react-native-chart-kit";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {TokenContext} from "../context/context";
import alerts from "../screens/Alerts";
import * as SecureStore from "expo-secure-store";

const SaviorHome = (props) => {
    const userInfo = React.useContext(TokenContext);
    let a;
    if (userInfo.alertCount === null){
        a = [0,0,0,0,0,0,0,0,0,0,0,0]
    } else {
        a = userInfo.alertCount.split(',')
    }

    console.log('sav '+a)
    const screenWidth = Dimensions.get("window").width;
    const data1 = {
        labels: ["Ja", "Fb", "Mr", "Ap", "My", "Jn", "Jl", "Ag", "Sp", "Ot", "Nv", "Dc"],
        datasets: [
            {
                data: a,
                color: (opacity = 1) => `rgba(219, 89, 42, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Total Alerts"] // optional
    };
    const data2 = [
        {
            name: "Alerts",
            population: userInfo.alerts,
            color: myColors.darkerColor,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Contacts",
            population: userInfo.contacts,
            color: myColors.mainColor,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
    const chartConfig1 = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styleSheet.AlertGraphs}>
                <View style={styleSheet.Inline}>
                    <Text style={styleSheet.AlertTitle}>Information</Text>
                    <MaterialCommunityIcons name="information-outline" size={30} color={myColors.secondColor} />
                </View>

                <PieChart
                    data={data2}
                    width={screenWidth}
                    height={100}
                    chartConfig={chartConfig1}
                    accessor={"population"}
                    backgroundColor={'transparent'}
                    paddingLeft={"15"}
                    absolute
                />
            </View>
            <View style={styleSheet.AlertGraphs}>
                <View style={styleSheet.Inline}>
                    <Text style={styleSheet.AlertTitle}>Alerts</Text>
                    <MaterialCommunityIcons name="alert-outline" size={30} color={myColors.secondColor} />
                </View>
                <LineChart
                    data={data1}
                    width={screenWidth} // from react-native
                    height={220}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig1}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 5,
                        // margin: 10
                    }}
                />
            </View>
        </View>
    );
};

export default SaviorHome;
