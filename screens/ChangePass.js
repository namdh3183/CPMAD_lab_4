import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, IconButton } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"
export default function ChangePass({ navigation, route }) {
    const { userLogin } = route.params
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const cUSERS = firestore().collection("USERS")

    const checkPassword = () => userLogin.password === password && password !== ""
    const checkConfirmPassword = () => newPassword === confirmPassword && newPassword !== "" && confirmPassword !== ""
    const checkChangePass = () => checkPassword() && checkConfirmPassword()

    const handleUpdate = async () => {
        try {
            await auth().currentUser.updatePassword(newPassword);

            await cUSERS.doc(userLogin.email).update({ password: newPassword });

            alert("Password updated successfully!");
            navigation.navigate("Settings");
        } catch (error) {
            console.error("Error updating password: ", error);
            alert("Failed to update password.")
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                label={"Password"}
                mode="outlined"
                placeholder="Enter your old password..."
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={styles.input}
                secureTextEntry={!showPassword}
                right={
                    <TextInput.Icon 
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <TextInput
                label={"New Password"}
                mode="outlined"
                placeholder="Enter your new password..."
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}
                style={styles.input}
                secureTextEntry={!showNewPassword}
                right={
                    <TextInput.Icon 
                        icon={showNewPassword ? "eye-off" : "eye"}
                        onPress={() => setShowNewPassword(!showNewPassword)}
                    />
                }
            />
            <TextInput
                label={"Confirm New Password"}
                mode="outlined"
                placeholder="Re-enter your new password..."
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                right={
                    <TextInput.Icon 
                        icon={showConfirmPassword ? "eye-off" : "eye"}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                }
            />
            <Button
                mode="contained"
                onPress={handleUpdate}
                style={{ width: 100, alignSelf: "center", marginTop: 20}}
                disabled={!checkChangePass()}
            >
                Update
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        margin: 10,
        marginHorizontal: 20
    }
})
