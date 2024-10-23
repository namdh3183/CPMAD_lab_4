import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"

export default function UpdateService({navigation, route}) {
    const { service } = route.params;
    const [name, setName] = useState(service.name)
    const [price, setPrice] = useState(service.price)
    const cSERVICES = firestore().collection("SERVICES")

    const handleUpdate = () => {
        cSERVICES.doc(service.id).update({
            name,
            price
        })
        alert("Service updated successfully!")
        navigation.navigate("Services")
    };

    return (
        <View>
            <TextInput
                label={"Name"}
                mode="outlined"
                placeholder="Enter your service name..."
                onChangeText={(text) => setName(text)} 
                value={name}
                style={styles.input} />

            <TextInput
                label={"Price"}
                mode="outlined"
                placeholder="Enter your service price..."
                onChangeText={(text) => setPrice(text)} 
                value={price}
                style={styles.input} />

            <Button
                mode="contained"
                onPress={handleUpdate}
                style={{width: 100, alignSelf: "center"}}
                >Update</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        marginHorizontal: 20
    }
})