import { useEffect } from "react";
import { logout, useMyContextController } from "../../context";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function Setting({navigation}) {
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller

    const handleLogout = () => {
        logout(dispatch)
    }

    useEffect(() => {
        if(userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Button
                mode="contained"
                onPress={handleLogout}
                style={{width: 200}}>
                Logout
            </Button>
        </View>
    )
}