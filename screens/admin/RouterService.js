import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../../context";
import Services from "./Services";
import AddNewService from "./AddNewService";
import ServiceDetail from "./ServiceDetail";
import UpdateService from "./UpdateService";

const Stack = createStackNavigator()
export default function RouterService({navigation}) {
    const [controller, dispatch] = useMyContextController()
    const { userLogin } = controller

    return (
        <Stack.Navigator>
            <Stack.Screen name="Services" component={Services} 
                options={{
                    title: (userLogin!=null) && (userLogin.name),
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#8893d1"
                    },
                    headerRight: (props) => <IconButton icon={"account"} onPress={() => navigation.navigate("Setting")}/>
                }}/>
            <Stack.Screen name="AddNewService" component={AddNewService}
                options={{
                    title: "Add new Service",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#8893d1"
                    }
                }}/>
            <Stack.Screen name="ServiceDetail" component={ServiceDetail}
                options={{
                    title: "Detail",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#8893d1"
                    }
                }}/>
            <Stack.Screen name="UpdateService" component={UpdateService}
                options={{
                    title: "Update",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#8893d1"
                    }
                }}/>
        </Stack.Navigator>
    )
}