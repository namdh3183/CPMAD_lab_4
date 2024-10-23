import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"

export default function Customers({navigation}) {
    const [users, setUsers] = useState([])
    const cUSERS = firestore().collection("USERS")

    useEffect(() => {
        cUSERS.onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        <View style={{flex: 1}}>
            <View style={styles.appbar}>
                <Text style={styles.header}>Customers</Text>
            </View>
            <View style={{flex: 12}}>
                <Text style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>Users List</Text>

                <FlatList
                    data={users}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.itemBorder} 
                            onPress={() => {}}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.email}</Text>
                        </TouchableOpacity>
                    )} />
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
    itemBorder: {
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
        alignSelf: "start",
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: "600",
        alignSelf: "start"
    },
    appbar: {
        flex: 1, 
        backgroundColor: "#8893d1"
    },
})