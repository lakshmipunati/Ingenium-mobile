import React from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';

export function LabelValue(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label} : </Text>
            <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.value}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color:'#A9A9A9'
    },
    value: {
        flex: 1,
        fontSize: 18,
        color:'#A9A9A9'
    }
})