import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "./RouterService";
import Transaction from "./Transaction";
import Customers from "./Customers";
import RouterProfile from "../RouterProfile";

const Tab = createMaterialBottomTabNavigator()
export default function Admin() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="RouterService" 
                component={RouterService} 
                options={{
                    title: "Home",
                    tabBarIcon: "home"
                }}/>

            <Tab.Screen 
                name="Transaction" 
                component={Transaction} 
                options={{
                    tabBarIcon: "cash"
                }}/>
            
            <Tab.Screen 
                name="Customers" 
                component={Customers} 
                options={{
                    tabBarIcon: "account"
                }}/>

            <Tab.Screen 
                name="Setting" 
                component={RouterProfile} 
                options={{
                    tabBarIcon: "cog"
                }}/>
        </Tab.Navigator>
    )
}