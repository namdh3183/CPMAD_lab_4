import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../context";
import Setting from "./Setting";
import UpdateProfile from "./UpdateProfile";
import ChangePass from "./ChangePass";

const Stack = createStackNavigator()
export default function RouterProfile({navigation}) {
    const [controller, dispatch] = useMyContextController()
    const { userLogin } = controller

    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Setting} 
                options={{
                    title: (userLogin!=null) && (userLogin.name),
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#8893d1"
                    },
                }}/>
            <Stack.Screen name="UpdateProfile" component={UpdateProfile}
                options={{
                    title: "Update Profile",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#8893d1"
                    }
                }}/>
            <Stack.Screen name="ChangePass" component={ChangePass}
                options={{
                    title: "Change Password",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#8893d1"
                    }
                }}/>
        </Stack.Navigator>
    )
}