import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { LabelValue } from '../../components/label-value';

export const UDFData = (props) => {
    const reducerData = useSelector((state) => state.lookupData);
    const { selectedUDFs } = reducerData.entity;

    const dataRendering = () => {
        if (selectedUDFs.length > 0) {
            return (
                <View>
                    {selectedUDFs &&
                        selectedUDFs.map((field, index) => {
                            return (
                                <ScrollView>
                                    <LabelValue label={field.label} value={null} />
                                </ScrollView>
                            )
                        })
                    }

                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}> UDF data not Available</Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                {dataRendering()}
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