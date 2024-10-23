import { createStackNavigator } from "@react-navigation/stack"
import Login from "../screens/Login"
import Register from "../screens/Register"
import Customer from "../screens/Customer"
import Admin from "../screens/admin/Admin"

const Stack = createStackNavigator()
const Router = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Login">
            
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="Customer" component={Customer} />
        </Stack.Navigator>
    )
}

export default Router