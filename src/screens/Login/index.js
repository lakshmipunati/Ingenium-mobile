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
import { useDispatch, useSelector } from "react-redux";
import {     
    USerIcon, 
    ContactIcon, 
    LockIcon, 
    HideIcon, 
    VisibleIcon
} from "../../assets";
import { 
        TextInputWithIcon, 
        SharedButton, 
        LogoWithVersion 
    } from '../../components';
import { loginUser } from "../../redux";

const { height } = Dimensions.get('screen');

export function Login(props){

    const init = {
        companyID:'Alden',
        userName: 'pradyot@nalashaa.com',
        password: 'Testing1#',
    };

    const reducer = useSelector((state)=>state.login);
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
        dispatch(loginUser(state))
    }

    return(
            <View style={{position: 'relative'}}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>        
                    <View style={styles.container} >
                        <View style={styles.componentContainer}>
                            <LogoWithVersion />                           
                            <View style={styles.formContainer}>
                                <View style={styles.inputContainer}>
                                    <TextInputWithIcon
                                        name="companyID"
                                        keyboardType="email-address"
                                        value={state.companyID}
                                        placeholder="Commpany ID"
                                        onChangeText={(name, value)=>_handleChangeText(name, value)}
                                        leftIcon={<ContactIcon height="30px" width="25px" fill="#B5B3B2" />}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInputWithIcon
                                        name="userName"
                                        keyboardType="email-address"
                                        value={state.userName}
                                        placeholder="User ID"
                                        onChangeText={(name, value)=>_handleChangeText(name, value)}
                                        leftIcon={<USerIcon height="30px" width="25px" fill="#B5B3B2" />}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInputWithIcon
                                        name="password"
                                        value={state.password}
                                        placeholder="Password"
                                        secureTextEntry={!visiblePassword}
                                        onChangeText={(name, value)=>_handleChangeText(name, value)}
                                        leftIcon={<LockIcon height="30px" width="25px" fill="#B5B3B2" />}
                                        rightIcon={ 
                                            visiblePassword 
                                            ?(                                         
                                                <TouchableOpacity onPress={()=>setVisiblePassword(!visiblePassword)}>
                                                    <HideIcon height="30px" width="25px" fill="#B5B3B2" />
                                                </TouchableOpacity>
                                            )
                                            : (                                      
                                                <TouchableOpacity onPress={()=>setVisiblePassword(!visiblePassword)}>
                                                    <VisibleIcon height="30px" width="25px" fill="#B5B3B2" />
                                                </TouchableOpacity>
                                            )
                                        }
                                    />
                                </View>
                                <View style={[styles.inputContainer,{marginTop: 30}]}>
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
        minHeight: height - 150,
    },
    formContainer:{
        marginTop: 40
    },
    inputContainer:{
        marginTop: 1
    },
    footerText: {
        textAlign: 'center'
    }
});