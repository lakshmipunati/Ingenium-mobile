import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { LabelValue } from '../../components/label-value';

export const Description = (props) => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView>
                    <LabelValue label={"Description ID"} value={'1'} />
                    <LabelValue label={"Product Category"} value={'DELL '} />
                    <LabelValue label={"Description"} value={'DIMENSION, MODEL 6100 ETC.'} />
                    <LabelValue label={"Manufacturer"} value={'DELL'} />
                    <LabelValue label={"Product Number"} value={'PG-123'} />
                    <LabelValue label={"User Code"} value={'123'} />
                    <Text style={styles.product_label}>Product Image :</Text>
                    {/* <ProductImage
                        imageStyle={styles.productImage}
                        resizeMode="contain"
                        imageSource={{ uri: productImageURI }}
                    /> */}
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
        color:'#A9A9A9'
    }
})