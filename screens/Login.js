import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, HelperText, Text, TextInput } from "react-native-paper"
import { login, useMyContextController } from "../context"
import auth from "@react-native-firebase/auth"

const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller

    const checkEmail = () => {
        return email.includes("@") || email === ""
    }
    const checkPassword = ()=>{
        // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // return regex.test(password) || password === ""
        return password != ""
    }

    const handleLogin = () => {
        setEmail("")
        setPassword("")
        login(dispatch, email, password)
    }

    const handleForgot = () => {
      if (!email) {
          alert("Please enter your email to reset the password.");
          return;
      }
      auth().sendPasswordResetEmail(email)
          .then(() => {
              alert("Password reset email sent!");
          })
          .catch(error => {
              console.error("Error sending password reset email: ", error);
              alert("There was an error sending the password reset email.");
          });
  };

    const handleCreate = () => {
        navigation.navigate("Register")
    }

    useEffect(() => {
      if(userLogin != null) {
        if(userLogin.role == "admin") 
          navigation.navigate("Admin")
        else if(userLogin.role == "customer")
          navigation.navigate("Customer")
      }
    }, [userLogin])

    
    
    return ( 
        <View style={styles.container}>
            <View style={ styles.form }>
            <Text style={styles.header}>Sign in with your account</Text>
            <Text style={styles.text}>Email address</Text>
            <TextInput 
                placeholder="Enter your email..."
                style={styles.txtInput}
                onChangeText={(text) => (setEmail(text))}
                left={<TextInput.Icon icon={"email"}/>}
                value={email}
                mode="outlined"/>
            <HelperText type="error" visible={!checkEmail()} style={styles.helpertext}>
                Please re-enter email !
            </HelperText>
            <Text style={styles.text}>Password</Text>
            <TextInput 
                placeholder="Enter your password..."
                secureTextEntry={!showPass}
                style={styles.txtInput}
                mode="outlined"
                onChangeText={(text) => setPassword(text)}
                left={<TextInput.Icon icon={"key"}/>}
                right={
                <TextInput.Icon 
                    icon={(showPass)?"eye":"eye-off"} 
                    onPress={() => setShowPass(!showPass)} />
                }
                value={password}/>
            
            <Button mode="text" style={styles.forgotBtn} onPress={handleForgot}>Forgot your password ?</Button>
            <Button 
                mode="contained-tonal" 
                style={styles.button}
                onPress={handleLogin}>
                <Text style={styles.txtBtn}>Sign in</Text>
            </Button>
            <Button mode="text" style={styles.createBtn} onPress={handleCreate}>or Create new account</Button>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8893d1"
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
      },
      form: {
        backgroundColor: "white", 
        padding: 30,
        borderRadius: 20
      },
      header: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#243b54",
        marginBottom: 20
      },
    
      text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
      },
    
      txtInput: {
        paddingLeft: 10,
        marginTop: 5,
        width: 300,
        height: 40
      },
    
      button: {
        alignSelf: "center",
        width: 200,
      },
    
      txtBtn: {
        fontSize: 20,
        fontWeight: "700",
      },
      forgotBtn: {
        alignSelf: "flex-end",
      },
      createBtn: {
        alignSelf: "center",
      },
      helpertext: {
        margin: -7
      }
})