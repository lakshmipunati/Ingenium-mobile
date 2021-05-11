import React, { useEffect, useState } from "react";

import {ActivityIndicator, View, StyleSheet, Text} from "react-native";

export const PageLoader=(props)=>{
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(props.loading)
    },[props, loading]);
    return(
     <View style={styles.container}>
   
          {props.children}
 
        {loading && loading===true? 
            <View style={[styles.horizontal]}>
                <ActivityIndicator size="large" color="black" />
            </View>
        : null}     
      </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
      },
      horizontal: {
          position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor:  '#00000070',
        justifyContent: 'space-around',
        padding: 10,
      },
  });