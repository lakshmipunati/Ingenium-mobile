import React from "react";
import { Image, StyleSheet, View, Text, Dimensions } from "react-native";
import { ingeniumLogo } from "../../assets";

const { width } = Dimensions.get('screen')
export const LogoWithVersion = (props) => {
    return (
        <View style={styles.logoContainer}>
            <Image
                style={styles.logo}
                source={ingeniumLogo}
                resizeMode="contain"
            />
            <Text style={styles.versionText}>V3.0.0</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        position: 'relative'
    },
    versionText: {
        position: 'absolute',
        right: 40,
        bottom: 60,
        color: 'red',
        fontWeight: 'bold'
    },
    logo: {
        width: width - 180
    },
})