import React, {useEffect, useRef, useState} from 'react';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import LoginScreen from "./app/screens/LoginScreen";
import {Playball_400Regular, useFonts} from "@expo-google-fonts/playball";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import RegistrationScreenOne, {RegistrationScreenThree, RegistrationScreenTwo} from "./app/screens/RegistrationScreen";
import {createSharedElementStackNavigator} from "react-navigation-shared-element";
import {CardStyleInterpolators} from '@react-navigation/stack';
import HomeScreen from "./app/screens/HomeScreen";
import {AuthContext, TokenContext, DataContext} from "./app/context/context";
import {createDrawerNavigator} from "@react-navigation/drawer";
import SearchSavior from "./app/screens/SearchSavior";
import ViewContacts from "./app/screens/ViewContacts";
import DrawerContent from "./app/components/DrawerContent";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AlertsScreen from "./app/screens/Alerts";
import {myColors} from "./app/utilities/colors";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {Platform} from "react-native";
import AboutUs from "./app/screens/AboutUs";

const Stack = createSharedElementStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

    // Variables
    const navigateNotification = useRef();
    const urls = {
        registrationUrl: 'https://rescue-girls.online/api/registration/',
        loginUrl: 'https://rescue-girls.online/api/login/',
        apiUrl: 'https://rescue-girls.online/api/',
        tokenUrl: 'https://rescue-girls.online/api/create/notification/token/',
        search: 'https://rescue-girls.online/api/search/?search=osman',
        dashboardUrl: 'https://rescue-girls.online/api/get/savior/dashboard/data/'
    };
    let [fontLoaded, error] = useFonts({Playball_400Regular});
    const [loginValid, setLoginValid] = useState(true);
    const [registrationValid, setRegistrationValid] = useState(true);
    const [regError, setRegError] = useState(null);
    let [userInfo, setUserInfo] = useState({
        name: null, token: null, email: null, userType: null, username: null,
        alerts: 0, contacts: 0,
        alertCount: null,
    });
    const data = {
        LoginCheck: loginValid, RegistrationCheck: registrationValid, RegError: regError,
    };
    const initialLoginState = {
        userToken: null, alertCount: null, alerts: 0, contacts: 0,
    };
    const MyTheme = {
        ...DarkTheme, colors: {
            ...DarkTheme.colors, background: 'rgb(16,28,28)', text: '#ffffff',
        }
    }

    // Functions
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState, userToken: action.token,
                }
            case 'LOGIN':
                return {
                    ...prevState, userToken: action.token,
                }
            case 'LOGOUT':
                return {
                    ...prevState, userToken: null,
                }
            case 'REGISTER':
                return {
                    ...prevState, userToken: action.token,
                }
        }
    };
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const authContext = React.useMemo(() => ({
        signIn: async (username, pass) => {
            let response = fetch(urls.loginUrl, {
                method: 'POST', headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    username: username, password: pass,
                })
            }).then((response) => response.json())
                .then(async (json) => {
                    if (json.error) {
                        setLoginValid(false);
                    }
                    if (json.username) {
                        try {
                            await SecureStore.setItemAsync('userToken', json.token);
                            await SecureStore.setItemAsync('userName', json.username);
                            await SecureStore.setItemAsync('Name', json.name);
                            await SecureStore.setItemAsync('Email', json.email);
                            await SecureStore.setItemAsync('userType', json.user_type);
                            setUserInfo(prevState => {
                                return {
                                    ...prevState,
                                    name: json.name,
                                    token: json.token,
                                    email: json.email,
                                    userType: json.user_type,
                                    username: json.username,
                                };
                            });
                            setLoginValid(true);
                            dispatch({type: 'LOGIN', token: json.token});
                        } catch (error) {}
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        signOut: async () => {
            try {
                await SecureStore.deleteItemAsync('userToken');
            } catch (error) {
                console.log(error);
            }
            dispatch({type: 'LOGOUT'})
        },
        signUp: (PersonalInfo, LoginInfo, UserType) => {
            let is_girl = false;
            let is_savior = false;
            if (UserType === 'girl') {
                is_girl = true;
            }
            if (UserType === 'savior') {
                is_savior = true;
            }
            if (UserType === '') {
                return alert('Choose User Type.')
            }
            if (is_girl !== false || is_savior !== false) {
                fetch(urls.registrationUrl, {
                    method: 'POST', headers: {
                        Accept: 'application/json', 'Content-Type': 'application/json'
                    }, body: JSON.stringify({
                        email: PersonalInfo.email,
                        username: LoginInfo.username,
                        first_name: PersonalInfo.firstName,
                        last_name: PersonalInfo.lastName,
                        password: LoginInfo.password,
                        password2: LoginInfo.password2,
                        is_girl: is_girl,
                        is_savior: is_savior,
                    })
                }).then(response => response.json())
                    .then(async json => {
                        if (!json.response) {
                            setRegistrationValid(false);
                            setRegError(json);
                            console.log(json);
                        }
                        if (json.Token) {
                            try {
                                await SecureStore.setItemAsync('userToken', json.Token);
                                await SecureStore.setItemAsync('userName', json.username);
                                await SecureStore.setItemAsync('Name', json.name);
                                await SecureStore.setItemAsync('Email', json.email);
                                await SecureStore.setItemAsync('userType', json.user_type);
                                setUserInfo(prevState => {
                                    return {
                                        ...prevState,
                                        name: json.name,
                                        token: json.Token,
                                        email: json.email,
                                        userType: json.user_type,
                                        username: json.username,
                                    };
                                });
                                dispatch({type: 'REGISTER', token: json.Token});
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
            }
        },
        closeError: () => {
            setLoginValid(true);
            setRegistrationValid(true);
        },
    }), []);
    const createNotificationToken = async (token) => {
        await fetch(urls.tokenUrl, {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }, body: JSON.stringify({
                token: token,
            })
        });
    }
    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('You won\'n receive notifications!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            await createNotificationToken(token);
            await SecureStore.setItemAsync('notiToken', token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };
    const _handleNotificationResponse = response => {
        navigateNotification.current.goToAlert();
    };
    const getGeneralData = async (token) => {
        await fetch(urls.dashboardUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
            .then(response => response.json())
            .then(async json => {
                // console.log(json.alerts);
                try {
                    await SecureStore.setItemAsync('alerts', json.alerts.toString());
                    await SecureStore.setItemAsync('contacts', json.contacts.toString());
                    await SecureStore.setItemAsync('alertCount', json.alert_count.toString());
                    await setUserInfo( prevState => {
                        return {
                            ...prevState,
                            alerts: json.alerts.toString(),
                            contacts: json.contacts.toString(),
                            alertCount: json.alert_count.toString()
                        };
                    });
                } catch (e) {
                }
            })
    }

    useEffect(async () => {
        let userToken = null; let userName = null; let email = null;
        let Name = null; let userType = null; let notiToken = null;
        let alerts = 0; let contacts = 0; let alertCount = null;

        try {
            userToken = await SecureStore.getItemAsync('userToken');
            userName = await SecureStore.getItemAsync('userName');
            email = await SecureStore.getItemAsync('Email');
            Name = await SecureStore.getItemAsync('Name');
            userType = await SecureStore.getItemAsync('userType');
            notiToken = await SecureStore.getItemAsync('notiToken');
            alerts = await SecureStore.getItemAsync('alerts');
            contacts = await SecureStore.getItemAsync('contacts');
            alertCount = await SecureStore.getItemAsync('alertCount');
            console.log('here '+alertCount)
            if (alertCount !== null) {
                setUserInfo(prevState => {
                    return {
                        ...prevState, name: Name,
                        token: userToken,
                        email: email,
                        username: userName,
                        userType: userType, // girl or savior
                        alerts: alerts,
                        contacts: contacts,
                        alertCount: alertCount,
                    };
                });
            } else {
                setUserInfo(prevState => {
                    return {
                        ...prevState, name: Name,
                        token: userToken,
                        email: email,
                        username: userName,
                        userType: userType, // girl or savior
                    };
                });
            }
        } catch (error) {
            console.log("error");
        }

        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});

        if (userToken !== null){
            await getGeneralData(userToken);
        }

        if (userType === 'girl') {
            await Location.requestForegroundPermissionsAsync();
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: false,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                }),
            });
        }
        if (userType === 'savior') {
            await registerForPushNotificationsAsync();
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });
            Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
        }
    }, [userInfo.token,]);

    if (!fontLoaded) {
        return <AppLoadingPlaceholder/>
    }
    return (// <LocationProvider>
        <AuthContext.Provider value={authContext}>
            {loginState.userToken == null ? (<DataContext.Provider value={data}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>

                            <Stack.Screen options={{
                                headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
                            }} name="Login" component={LoginScreen}/>


                            <Stack.Screen options={{
                                headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
                            }} name="Registration" component={RegistrationScreenOne}/>

                            <Stack.Screen options={{
                                headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }} name="RegistrationTwo" component={RegistrationScreenTwo}/>

                            <Stack.Screen options={{
                                headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }} name="RegistrationThree" component={RegistrationScreenThree}/>

                        </Stack.Navigator>

                    </NavigationContainer>
                </DataContext.Provider>) : <TokenContext.Provider value={userInfo}>
                <NavigationContainer theme={MyTheme}>
                    <Drawer.Navigator
                        initialRouteName="Home"
                        drawerContent={props => <DrawerContent {...props} />}
                        screenOptions={{
                            drawerActiveBackgroundColor: '#09614F',
                            drawerActiveTintColor: '#6CFFDB',
                            drawerInactiveTintColor: '#A9ABAB',
                            drawerLabelStyle: {marginLeft: -25},
                            headerTintColor: myColors.white,
                        }}
                    >

                        <Drawer.Screen options={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            drawerIcon: ({color}) => (<MaterialCommunityIcon
                                    name="home-outline"
                                    color={color}
                                    size={22}/>)
                        }} name="Home" component={HomeScreen} initialParams={{ref:navigateNotification}}/>

                        <Drawer.Screen options={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            drawerIcon: ({color}) => (<MaterialCommunityIcon
                                    name="contacts-outline"
                                    color={color}
                                    size={22}/>)
                        }} name="View Contacts" component={ViewContacts}/>

                        {userInfo.userType == 'savior' ? <Drawer.Screen options={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            drawerIcon: ({color}) => (<MaterialCommunityIcon
                                    name="eye-outline"
                                    color={color}
                                    size={22}/>)
                        }} name="View Alerts" component={AlertsScreen}/> : <Drawer.Screen options={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            drawerIcon: ({color}) => (<MaterialCommunityIcon
                                    name="account-plus-outline"
                                    color={color}
                                    size={22}/>)
                        }} name="Add Savior" component={SearchSavior}/>}

                        <Drawer.Screen options={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            drawerIcon: ({color}) => (<MaterialCommunityIcon
                                name="information-outline"
                                color={color}
                                size={22}/>)
                        }} name="About Us" component={AboutUs}/>

                    </Drawer.Navigator>
                </NavigationContainer>
            </TokenContext.Provider>}
        </AuthContext.Provider>
        // </LocationProvider>
    );
}