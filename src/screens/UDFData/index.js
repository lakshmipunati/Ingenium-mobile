import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
// import { LabelValue } from '../../components/label-value';

export const UDFData=(props)=>{
    const reducerData = useSelector((state)=>state.dataTab);

    // const {} = reducerData.entity;

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView>
                    {/* <LabelValue label={"Description ID"} value={descriptionID ? descriptionID: null} />
                    <LabelValue label={"Product Category"} value={manufacturer ? manufacturer : null} />
                    <LabelValue label={"Description"} value={description ? description : null} />
                    <LabelValue label={"Manufacturer"} value={manufacturer ? manufacturer : null} />
                    <LabelValue label={"Product Number"} value={productNumber ? productNumber : null} />
                    <LabelValue label={"User Code"} value={userCode ? userCode : null} /> */}
                    {/* <Text style={styles.product_label}>Product Image :</Text> */}
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