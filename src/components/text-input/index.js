import React, {useState} from "react";
import { Button, StyleSheet, TextInput, View, Text, Image } from "react-native";
import { BarCodeScanner } from "../bar-code-scanner";

export function SharedTextInput(props){
    const [scannerActive, setScannerActive ] = useState(true);

    return(
        <View style={{flex: 1}}>
          
            {scannerActive ?  <BarCodeScanner setScanned={(status)=>setScannerActive(status)} scanned={scannerActive}/> : 
                <View>
                    <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    // onChangeText={text => onChangeText(text)}
                    // value={value}
                    />
                    <Button
                        onPress={()=>setScannerActive(true)}
                        title="Scan"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                  
                </View>
            }
            
        </View>
    )
}

export function TextInputWithIcon(props){
    return(  
        <View>           
            <TextInput 
                keyboardType={props.keyboardType}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                style={styles.inputBox}
                secureTextEntry={props.secureTextEntry}
                onChangeText={(value)=>props.onChangeText(props.name, value)}
            />  
             {props.leftIcon ? ( 
                <View style={{position: 'absolute', left: 5,top: '15%'}}>
                    {props.leftIcon}
                </View>  
             ) : null}
             {props.rightIcon ? ( 
                <View style={{position: 'absolute', right: 5,top: '15%'}}>
                    {props.rightIcon}
                </View>  
             ) : null}
                 
        </View> 
    )
}

const styles = StyleSheet.create({
    inputBox:{
        borderWidth: 1,
        padding: 12,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 8,
        borderColor: '#B5B3B2',
        fontSize: 16
    }, 
})