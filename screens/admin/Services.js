import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"

export default function Services({navigation}) {
    const [services, setServices] = useState([])
    const cSERVICES = firestore().collection("SERVICES")

    useEffect(() => {
        cSERVICES.onSnapshot(snapshot => {
            setServices(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        <View style={{flex: 1}}>
            <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"}} >
                <Text style={{
                    fontSize: 28,
                    fontWeight: "bold",
                }}>Service List</Text>
                <IconButton icon={"plus-circle"} iconColor="red"
                    size={30}
                    onPress={() => navigation.navigate("AddNewService")} />
            </View>

            <FlatList
                data={services}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.itemBorder} 
                        onPress={() => navigation.navigate("ServiceDetail", {service: item})}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                    </TouchableOpacity>
                )} />
        </View>
    )
}

const styles = StyleSheet.create({
    itemBorder: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
    },
    itemName: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center"
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: "600",
        alignSelf: "center"
    }
})