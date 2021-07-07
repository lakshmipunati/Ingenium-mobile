import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Text, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LabelValue } from '../../components/label-value';
import { getCompanyStoragePath } from '../../redux/actions/data.action';

const {width, height} = Dimensions.get('window')
export const Description = (props) => {

    const [path, setPath] = useState()
    const reducerData = useSelector((state)=>state.dataTab);

    const {Description, ProductCategory,ManufacturerName, ImageFilePath, ProductNumber, DataCategory} = reducerData.entity.descriptionCatalogData;
    const {descriptionID}=reducerData.entity;

const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCompanyStoragePath()).then(({payload})=>{
            // if("COMPANY_STORAGE_PATH")
            if(payload && payload[4] && payload[4][0]==="COMPANY_STORAGE_PATH"){
                if(payload[4][1]!==path){
                    setPath(payload[4][1])
                }
           
            }
         
        })
    });

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView>
                    <LabelValue label={"Description ID"} value={descriptionID ? descriptionID: null} />
                    <LabelValue label={"Product Category"} value={ProductCategory ? ProductCategory : null} />
                    <LabelValue label={"Description"} value={Description ? Description : null} />
                    <LabelValue label={"Manufacturer"} value={ManufacturerName ? ManufacturerName : null} />
                    <LabelValue label={"Product Number"} value={ProductNumber ? ProductNumber : null} />
                    <LabelValue label={"Data Category"} value={DataCategory ? DataCategory : null} />
                    <Text style={styles.product_label}>Product Image :</Text>
                    {path ? (
                        <View style={{width: width - 40,height: 200, marginTop: 10, position: 'relative'}}>
                         <Image 
                             style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}
                              source={{uri: `${path}/description-catalog/${ImageFilePath}`}}
                         />
                         </View>
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
        color:'#A9A9A9'
    }
})