import React, {useState} from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
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

export const TextInputWithIcon=(props)=>{
    return(  
        <View>
            <Text>{props.label}</Text>
            <TextInput 
                name={props.name}
                placeholder={props.placeholder}
                style={styles.inputBox}
            />      
        </View> 
    )
}

const styles = StyleSheet.create({
    inputBox:{
        borderWidth: 1,
        width: '100%',
        padding: 10,
        borderRadius: 10
        
    }
})