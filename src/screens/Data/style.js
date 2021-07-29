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
        backgroundColor: "#fff",
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
        borderColor: "#059DCC",
        width: 35,
        height: 40,
        marginTop: 0,
        borderRadius: 10,
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -10
    },
    udfTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    noUdf: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: "center"
    }
})