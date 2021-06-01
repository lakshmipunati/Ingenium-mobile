import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { LabelValue } from '../../components/label-value';

export const UDFData = (props) => {

    const reducerData = useSelector((state)=>state.dataTab);
    const {selectedUDFs} = reducerData.entity;
    return (
        <View style={styles.container}>
        {/* <KeyboardAvoidingView>
            <ScrollView>
                {selectedUDFs && selectedUDFs.length>0 ? (
                    selectedUDFs.map((i, k)=>(
                        i.value ? (
                            <LabelValue key={k} label={i.label} value={i.value} />
                        ) : null
                    ))
                ) : null}           
            </ScrollView>
        </KeyboardAvoidingView> */}
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