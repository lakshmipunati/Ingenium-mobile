import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { LabelValue } from '../../components/label-value';

export const UDFData = (props) => {

    const {entity} = useSelector((state)=>state.dataTab);
    return (
        <View style={styles.container}>
        <KeyboardAvoidingView>
            <ScrollView>
                {entity && entity.UDFLookupList && entity.UDFLookupList.length>0 ? (
                    entity.UDFLookupList.map((i, k)=>(
                        entity[i.label] ? (
                            <LabelValue key={k} label={i.label ? i.label : ""} value={entity[i.label] !== undefined ? entity[i.label].toString() : ""} />
                        ) : null
                    ))
                ) : null}           
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
    },
    product_label: {
        fontWeight: 'bold', fontSize: 16, paddingTop: 4,
        color: '#A9A9A9'
    }
})