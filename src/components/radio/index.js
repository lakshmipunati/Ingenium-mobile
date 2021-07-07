import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { proportionalSize } from '../../utils';

export const RadioBtn=(props)=>{
 
    return(
        <View style={styles.container}>
            {props.isSelected ? 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.outerCircle} onPress={()=>props.handleClickRadio(props.name, props.value)}>
                        <View style={styles.dot}/>
                    </TouchableOpacity>
                    <Text style={styles.label}>{props.label}</Text>
                </View>
                :  

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.outerCircle2} onPress={()=>props.handleClickRadio(props.name, props.value)}/>
                    <Text style={styles.label}>{props.label}</Text>
                </View>
            }
            
        </View>
    )
}

const styles=StyleSheet.create({
  
    outerCircle: {
        borderWidth: 1.5,
        borderColor: 'black',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
   
        alignItems: 'center',
        justifyContent: 'center',
        width: 20
    },
    outerCircle2: {
        borderWidth: 1.5,
        borderColor: 'black',
        padding: 10,
        borderRadius: 100,
   
        alignItems: 'center',
        justifyContent: 'center',
        width: 20
    },
    label: {
        // fontWeight: 'bold',
        marginLeft: 10,
        fontSize: proportionalSize(50)
    },
    dot:{
        padding: 6,
        borderRadius: 100,
        width: 5,
        backgroundColor: '#059DCC'
    },
    notSelected: {

    }
})