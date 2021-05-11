import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    btn: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        width: '100%',
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 5
    },
    leftContainer: {
        flex: 1,
        paddingRight: 5
    },
    btnContainer: {
        flexDirection: 'row'
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
    inputContainer: {
        marginTop: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 6
    },
    label: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    iconStyle: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: 45,
        height: 45,
        marginTop: 0,
        borderRadius: 10,
        marginLeft: -5
    },
    udfTitle:{
        fontWeight: 'bold',
        fontSize: 20
    }
})