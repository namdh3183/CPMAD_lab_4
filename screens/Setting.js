import { useEffect } from "react";
import { logout, useMyContextController } from "../context";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Setting({navigation}) {
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const user = userLogin ? {
        name: userLogin.name,
        address: userLogin.address,
        phone: userLogin.phone,
        email: userLogin.email,
        role: userLogin.role,
    } : {};
    const handleUpdate = () => {
        navigation.navigate("UpdateProfile", {userLogin})
    }

    const handleChangePass = () => {
        navigation.navigate("ChangePass", {userLogin})
    }

    const handleLogout = () => {
        logout(dispatch)
    }

    useEffect(() => {
        if(userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    return (
        <View style={{flex:1}}>
            {/* <View style={styles.appbar}>
                <Text style={styles.header}>Profile</Text>
            </View> */}
            <View style={styles.container}>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.info}>{user.name}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.info}>{user.email}</Text>
                </View>
                

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.info}>{user.address}</Text>
                </View>
                

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.info}>{user.phone}</Text>
                </View>
                

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.label}>Role:</Text>
                    <Text style={styles.info}>{user.role}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 20}}>
                    <Button
                        style={styles.button}
                        mode="outlined"
                        onPress={handleUpdate}>   
                            Update</Button>
                    <Button
                        style={styles.button}
                        mode="outlined"
                        onPress={handleChangePass}>
                            Change password</Button>
                </View>
            </View>
            <View style={{flex: 5,justifyContent: "center", alignItems: "center"}}>
                <Button
                    mode="contained"
                    onPress={handleLogout}
                    style={{width: 200}}>
                    Logout
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    appbar: {
        flex: 1, 
        backgroundColor: "#8893d1"
    },
    container: {
        flex: 7, 
        padding: 20,
    },
    label: {
        alignItems: "center",
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    info: {
        justifyContent: "center",
        fontSize: 24,
        marginLeft: 10,

    },
    button: {
        width: 180,
    }
});