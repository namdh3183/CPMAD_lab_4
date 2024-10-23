import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"

export default function UpdateProfile({navigation, route}) {
    const { userLogin } = route.params;
    const [name, setName] = useState(userLogin.name)
    const [address, setAddress] = useState(userLogin.address)
    const [phone, setPhone] = useState(userLogin.phone)

    const cUSERS = firestore().collection("USERS")

    const handleUpdate = () => {
        cUSERS.doc(userLogin.email).update({
            name,
            address,
            phone
        })
        alert("Profile updated successfully!")
        navigation.navigate("Settings")
    };

    return (
        <View>
            <TextInput
                label={"Name"}
                mode="outlined"
                placeholder="Enter your name..."
                onChangeText={(text) => setName(text)} 
                value={name}
                style={styles.input} />

            <TextInput
                label={"Address"}
                mode="outlined"
                placeholder="Enter your address..."
                onChangeText={(text) => setAddress(text)} 
                value={address}
                style={styles.input} />
            
            <TextInput
                label={"Phone"}
                mode="outlined"
                placeholder="Enter your phone..."
                onChangeText={(text) => setPhone(text)} 
                value={phone}
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