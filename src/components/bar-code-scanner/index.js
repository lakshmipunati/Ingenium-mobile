import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner as Scanner } from 'expo-barcode-scanner';

export function BarCodeScanner(props) {
    const [hasPermission, setHasPermission] = useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Scanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      props.setScanned(false, data, props.activeTab)
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
            <View style={{position: 'relative', flex: 1}}>
                <Scanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.closeBtn} >
                    <Button title="Close" onPress={() => props.setScanned(false)}/>
                </View>
            </View>
    
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative'
    },
    closeBtn: {
        position: 'absolute',
        top: 30,
        width: 100,
        right:20,
        backgroundColor: '#fff'
    }
  });
