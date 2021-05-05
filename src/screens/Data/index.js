import React from 'react';
import { Dimensions, View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Button } from 'react-native';
import { SharedTextInput } from '../../components/text-input';
import { lookup, barcodeCamera, anchorIcon } from "../../assets/images";
import { SharedButton } from '../../components/button';

const { height, width } = Dimensions.get('window');
export const Data = (props) => {
    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                <View>
                    <View>
                        <Text style={styles.textClr}>Asset Number</Text>
                        <View style={styles.componentContainer}>
                            <SharedTextInput
                                placeholder="Asset Number" />
                            <TouchableOpacity style={styles.button} >
                                <Image style={styles.iconStyle} source={lookup} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} >
                                <Image style={styles.iconStyle} source={barcodeCamera} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textClr}>Location</Text>
                        <View style={styles.componentContainer}>
                            <SharedTextInput
                                placeholder="Location" />
                            <TouchableOpacity style={styles.button} >
                                <Image style={styles.iconStyle} source={lookup} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} >
                                <Image style={styles.iconStyle} source={barcodeCamera} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} >
                                <Image style={styles.iconStyle} source={anchorIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textClr}>Condition code</Text>
                        <View style={styles.componentContainer}>
                            <SharedTextInput
                                placeholder="Condition code" />
                            <TouchableOpacity style={styles.button} >
                                <Image style={styles.iconStyle} source={anchorIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textClr}>Unit Cost</Text>
                        <View style={styles.componentContainer}>
                            <SharedTextInput
                                placeholder="Unit cost" />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textClr}>Product Category</Text>
                        <SharedTextInput
                            placeholder="Product Category" />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.name}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.name}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        width: 180,
        marginRight: 10
    },
    name: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18
    },
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: "white",
    },
    textClr: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 6
    },
    iconStyle: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    componentContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        width: 150
    },
})