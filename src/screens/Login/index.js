import React, {useState} from "react";
import { 
    StyleSheet, 
    View, 
    Dimensions, 
    Text, 
    Image, 
    ScrollView, 
    TouchableOpacity 
} from 'react-native';
import { useDispatch } from "react-redux";
import {     
    USerIcon, 
    ContactIcon, 
    LockIcon, 
    HideIcon, 
    VisibleIcon
} from "../../assets";
import { TextInputWithIcon, SharedButton, LogoWithVersion } from '../../components';
import { loginUser } from "../../redux";

const { height, width } = Dimensions.get('window');

export function Login(props){

    const init = {
        companyID:'Alden',
        userName: 'pradyot@nalashaa.com',
        password: 'Testing1#',
    };

    const [state, setState ] = useState(init);
    const [visiblePassword, setVisiblePassword] = useState(false);

    const dispatch = useDispatch();

    const _handleChangeText=(name, value)=>{
        setState((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const _hanldeOnClick=()=>{
        dispatch(loginUser(state)).then(({payload})=>{
            // console.log("===#222data===",payload)
        })
    }

    return(
        <View style={{position: 'relative'}}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>        
                <View style={styles.container} >
                    <View style={styles.componentContainer}>
                        <LogoWithVersion />
                        {/* <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                source={ingeniumLogo}
                                resizeMode="contain"
                            />            
                            <Text style={styles.versionText}>V2.2</Text>        
                        </View> */}
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <TextInputWithIcon
                                    name="companyID"
                                    keyboardType="email-address"
                                    value={state.companyID}
                                    placeholder="Commpany ID"
                                    onChangeText={(name, value)=>_handleChangeText(name, value)}
                                    leftIcon={<ContactIcon height="40px" width="25px" fill="#B5B3B2" />}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInputWithIcon
                                    name="userName"
                                    keyboardType="email-address"
                                    value={state.userName}
                                    placeholder="User ID"
                                    onChangeText={(name, value)=>_handleChangeText(name, value)}
                                    leftIcon={<USerIcon height="40px" width="25px" fill="#B5B3B2" />}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInputWithIcon
                                    name="password"
                                    value={state.password}
                                    placeholder="Password"
                                    secureTextEntry={!visiblePassword}
                                    onChangeText={(name, value)=>_handleChangeText(name, value)}
                                    leftIcon={<LockIcon height="40px" width="25px" fill="#B5B3B2" />}
                                    rightIcon={ 
                                        visiblePassword 
                                        ?(                                         
                                            <TouchableOpacity onPress={()=>setVisiblePassword(!visiblePassword)}>
                                                <HideIcon height="40px" width="25px" fill="#B5B3B2" />
                                            </TouchableOpacity>
                                        )
                                        : (                                      
                                            <TouchableOpacity onPress={()=>setVisiblePassword(!visiblePassword)}>
                                                <VisibleIcon height="40px" width="25px" fill="#B5B3B2" />
                                            </TouchableOpacity>
                                        )
                                    }
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <SharedButton name="LOG IN" onPress={()=>_hanldeOnClick()}/>
                            </View>
                        </View>
                    </View>    
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Copyright © Asset Systems</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20,
        minHeight: height - 120,
    },
    formContainer:{
        marginTop: 25
    },
    inputContainer:{
        marginTop: 20
    },
    footerText: {
        textAlign: 'center'
    }
});