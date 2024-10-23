import { FlatList, Image, View } from "react-native";
import { IconButton, Text } from "react-native-paper";


export default function Services({navigation}) {
    
    return (
        <View style={{flex: 1}}>
            {/* <Image source={require()} */}
            <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"}} >
                <Text style={{
                    fontSize: 40,
                    fontWeight: "bold",
                }}>Service List</Text>
                <IconButton icon={"plus-circle"} iconColor="red"
                    size={40}
                    onPress={() => navigation.navigate("AddNewService")} />
            </View>
        </View>
    )
}