import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Text, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { LabelValue } from '../../components/label-value';

const {width, height} = Dimensions.get('screen')
export const Description = (props) => {
    const reducerData = useSelector((state)=>state.dataTab);

    const {Description, ProductCategory,ManufacturerName, ImageFilePath, ProductNumber, DataCategory} = reducerData.entity.descriptionCatalogData;
    const {descriptionID}=reducerData.entity;
    return (
        <View style={styles.container}>
            {/* <KeyboardAvoidingView>
                <ScrollView>
                    <LabelValue label={"Description ID"} value={descriptionID ? descriptionID: null} />
                    <LabelValue label={"Product Category"} value={ProductCategory ? ProductCategory : null} />
                    <LabelValue label={"Description"} value={Description ? Description : null} />
                    <LabelValue label={"Manufacturer"} value={ManufacturerName ? ManufacturerName : null} />
                    <LabelValue label={"Product Number"} value={ProductNumber ? ProductNumber : null} />
                    <LabelValue label={"Data Category"} value={DataCategory ? DataCategory : null} />
                    <Text style={styles.product_label}>Product Image :</Text>
                    <Image 
                        style={{width: width, height: height-600}} source={{uri: `https://assetingenium.blob.core.windows.net/demo/description-catalog/${ImageFilePath}`}}
                    />
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
        color:'#A9A9A9'
    }
})