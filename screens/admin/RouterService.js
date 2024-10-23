import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../../context";
import Services from "./Services";
import AddNewService from "./AddNewService";
import ServiceDetail from "./ServiceDetail";

const Stack = createStackNavigator()
export default function RouterService({navigation}) {
    const [controller, dispatch] = useMyContextController()
    const { userLogin } = controller

    return (
        <Stack.Navigator
            screenOptions={{
                title: (userLogin!=null) && (userLogin.name),
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#8893d1"
                },
                headerRight: (props) => <IconButton icon={"account"} onPress={() => navigation.navigate("Setting")}/>
            }}>
                
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="AddNewService" component={AddNewService} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
        </Stack.Navigator>
    )
}