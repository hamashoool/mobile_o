import React from 'react';

import {Text, View, ScrollView, StatusBar, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import cardContainer from "@react-navigation/stack/src/views/Stack/CardContainer";
import {myColors} from "../utilities/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
const { width, fontScale } = Dimensions.get("window");
const AboutUs = (props) => {
    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ScrollView>
                <View>
                    <Text style={styles.Title}>
                        <MaterialCommunityIcons name="bullseye-arrow" size={35 / fontScale} color="white" />
                        Rescue Girls
                    </Text>
                    <Text style={styles.text}>
                        As we all know that girls have been facing a lot of sexual
                        harassments in our country and when in danger, girls find it difficult
                        to reach out to their close ones and ask for help.
                    </Text>
                    <Text style={styles.text}>
                        To minimize this difficulty, we are introducing this app where
                        every girl will sign up and add up to 5 contacts of their close ones whom
                        they can trust for immediate help. And just by only pressing “Rescue Me” button,
                        it will immediately send the exact location of the girl, directly to her added contacts.
                    </Text>
                    <Text style={styles.noteText}>
                        This project where created by group of students from Canadian University of Bangladesh
                        department of Computer Science and Engineering.
                    </Text>
                    <Image
                        style={{height: 200, width: "100%",
                            backgroundColor: myColors.white}}
                        source={{
                            uri: 'https://www.musketeersidea.com/images/cub.png',
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.Title}>
                        <MaterialCommunityIcons name="bullseye-arrow" size={35 / fontScale} color="white" />
                        Group Members
                    </Text>
                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://hamashool.com/static/images/profile-1.jpeg' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>Osman Abdiresaq Osman</Title>
                                <Paragraph style={styles.cardText}>18304022</Paragraph>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://scontent.fdac31-1.fna.fbcdn.net/v/t31.18172-8/16423076_754394858058365_3871417198082273466_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_eui2=AeF2YzcaRLiK_2ou1wlWRTjofx-3X2aJnuN_H7dfZome46q755OPX96gloVnp3OrIYGZLn7jFYxWZSZl4ACv5hku&_nc_ohc=xxkdwiDwUvoAX9xAhmM&_nc_ht=scontent.fdac31-1.fna&oh=00_AT-v51EdJH1vuC-76gu2u8Cvll3iyvZob2m6rHCSXeXt_A&oe=62026890' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>Soumitra Datta</Title>
                                <Paragraph style={styles.cardText}>18304029</Paragraph>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/261490512_4510912002350142_117024669688017248_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_eui2=AeEHrwGs9NypqD4TPV_wJ-kUMsmBNPjs7rwyyYE0-OzuvAiFKgWzVeBWeTUWhG4j2x6E5ByfQwhJBdrB3W9Wx1jv&_nc_ohc=m7BEKLaR71wAX8VTAgO&_nc_ht=scontent.fdac31-1.fna&oh=00_AT-WMX5dZs5IYKEyCLEJ6JYOU0ZvP_D2LkTXdxvWUHJ7ow&oe=61E1F4D1' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>MD Rakibul Islam</Title>
                                <Paragraph style={styles.cardText}>18304003</Paragraph>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://scontent-tir2-1.xx.fbcdn.net/v/t39.30808-6/268816441_2753534458125235_910422487667193984_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_eui2=AeGiPQU00mlzSRTohjrCKWia8-JmrBIK3ibz4masEgreJvFWpIVk-f1rfUQD2GM91J7BJlO1T8JzSnXqLMQPL8VN&_nc_ohc=K9JK_OZJAgMAX9oqLMp&_nc_ht=scontent-tir2-1.xx&oh=00_AT81YyE8LDarzzxJRbLGTVQjftsxkYVCsGNDs5Cl2bhGKw&oe=61E33053' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>Sabrina Akhter Jasia</Title>
                                <Paragraph style={styles.cardText}>18304027</Paragraph>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://scontent.fdac31-1.fna.fbcdn.net/v/t1.6435-9/72480959_1819029978241426_7211540438363144192_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_eui2=AeGjVH_zSizlgWXFGAp4i_N7j5px3vM3-4CPmnHe8zf7gM6PwZexSg6kvxhZF4QV56yG1gkAHZHSsqQDMh8FKr02&_nc_ohc=3-cKiB3A5L4AX_HjtzF&_nc_ht=scontent.fdac31-1.fna&oh=00_AT_RlqWK4WPjWagYkkns1G-iswdKMl0o2FSwOyrq4TneuQ&oe=620236CB' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>Ayesha Akhter Lamia</Title>
                                <Paragraph style={styles.cardText}>18304026</Paragraph>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://scontent-tir2-1.xx.fbcdn.net/v/t1.15752-9/271050108_460199762297704_3130086463291443246_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeG6GMcp24YeygySam-TLwp-CCnKm-wM18gIKcqb7AzXyHC0A4glbStOehBOBpcRDipouYFw1lt1PF8GQHUNatQC&_nc_ohc=I-HUBd1K0kwAX8YftOP&_nc_ht=scontent-tir2-1.xx&oh=03_AVK_xU0Dbayu3YLhgl_wZPwTUmVMPjsV0HyXDsamsk4PfQ&oe=620424DF' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>Sharan Rahman Shetul</Title>
                                <Paragraph style={styles.cardText}>18304012</Paragraph>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-9/50230698_2017471024973678_2111130400561561600_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=19026a&_nc_eui2=AeGQ6Gwr3Dey_AKxrl_Q53aG-ofrlxAY17L6h-uXEBjXsjEAgls_IEs2sioeMJrBdTQ_CXyljlVOnUDMtrdvdSvJ&_nc_ohc=K2ADvMa44QEAX8DtJuc&tn=PWX4Tn2EFigTG6Ez&_nc_ht=scontent-sin6-1.xx&oh=00_AT9buFVRdwnNllWMtqWZos5Hunvi4CyJ8xjt2neSvlJv3Q&oe=620685D6' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>Mehrab Ali Mahim</Title>
                                <Paragraph style={styles.cardText}>18304035</Paragraph>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Image style={styles.image}
                                   source={{ uri: 'https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/244650704_4386104124790663_9088256508769768051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHH5VVoKn1-U2ZI2D2c0PYpDAWiID1wpFIMBaIgPXCkUgWEg0dS14U0vqZks1wgW3EcR9fA-FSKbY3KJLxqm-2g&_nc_ohc=tLhQ0cIq9joAX_7vmqC&_nc_ht=scontent.fdac31-1.fna&oh=00_AT_cGmUkxCI_e6_N446ZaELQMvi5xW9VG4N0IlsBWK0QAw&oe=61E2CBFC' }} />
                            <View style={styles.cardBoday}>
                                <Title style={styles.cardTitle}>Asif Rahman Chowdhury</Title>
                                <Paragraph style={styles.cardText}>18304024</Paragraph>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "33%",},
    cardBoday: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignSelf: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cardTitle: {
        color: 'white',
        textAlign: 'center'
    },
    cardText: {
        color: 'white',
        textAlign: 'center'
    },
    image: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius:50,
    },
    noteText: {
        textAlign: 'center',
        padding: 10,
        fontSize: 15 / fontScale,
        backgroundColor: myColors.white,
        color: myColors.darkerColor
    },
    Title: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 35 / fontScale,
        color: myColors.white,
    },
    text: {
        padding: 10,
        fontSize: 16 / fontScale,
        color: myColors.white,
        // marginTop: -10
    },
})

export default AboutUs;
