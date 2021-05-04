import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import {ingeniumLogo, USerIcon, ContactIcon, LockIcon} from "../../assets";
import { TextInputWithIcon, SharedButton } from '../../components';

const { height, width } = Dimensions.get('window');
export function Login(props){
    return(
        <View style={{position: 'relative'}}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>        
                <View style={styles.container} >
                    <View style={styles.componentContainer}>
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                source={ingeniumLogo}
                                resizeMode="contain"
                            />            
                            <Text style={styles.versionText}>V2.2</Text>        
                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <TextInputWithIcon
                                    name="user"
                                    keyboardType="email-address"
                                    placeholder="Enter user name"
                                    icon={<ContactIcon height="40px" width="28px" fill="#B5B3B2" />}
                                    maxLength="1"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInputWithIcon
                                    name="user"
                                    keyboardType="email-address"
                                    placeholder="Enter user name"
                                    icon={<USerIcon height="40px" width="30px" fill="#B5B3B2" />}
                                    maxLength="1"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInputWithIcon
                                    name="user"
                                    placeholder="Enter user name"
                                    icon={<LockIcon height="40px" width="30px" fill="#B5B3B2" />}
                                    maxLength="1"
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <SharedButton name="LOG IN"/>
                            </View>
                        </View>
                    </View>    
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Copyright © Asset Systems</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20,
        minHeight: height - 120,
    },
    formContainer:{
        marginTop: 25
    },
    inputContainer:{
        marginTop: 20
    },
    logo: {
        width: width - 150
    },
    logoContainer: {
        alignItems: 'center', 
        position: 'relative'
    },
    versionText: {
        position: 'absolute',
        right: 30,
        bottom: 50, 
        color: 'red', 
        fontWeight: 'bold'
    },
    footerText: {
        textAlign: 'center'
    }
});