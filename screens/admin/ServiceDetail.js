import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"

export default function ServiceDetail({navigation, route}) {
    const {service} = route.params

    const handleUpdate = () => {
        navigation.navigate("UpdateService", {service})
    }

    const cSERVICES = firestore().collection("SERVICES")
    const handleDelete = () => {
        cSERVICES.doc(service.id).delete()
       .then(() => {
            alert("Deleted service!")
            navigation.navigate("Services")
       })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.name}>Name: {service.name}</Text>
            <Text style={styles.price}>Price: {service.price}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleUpdate}>
                        Update</Button>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleDelete}>
                        Delete</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 50,
    },
    button: {
        width: 150,
    }
})