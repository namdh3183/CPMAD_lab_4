import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"

export default function AddNewService({navigation}) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    const cSERVICES = firestore().collection("SERVICES")
    const addNewService = () => {
        const newServiceRef = cSERVICES.doc();
        const newService = {
            id: newServiceRef.id,
            name,
            price
        };
        newServiceRef.set(newService);
        
        setName("")
        setPrice("")
        alert("Service added successfully!")
        navigation.navigate("Services")
    }

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
                onPress={addNewService}
                style={{width: 100, alignSelf: "center"}}
                >Add</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        marginHorizontal: 20
    }
})