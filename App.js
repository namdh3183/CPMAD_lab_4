import { NavigationContainer } from "@react-navigation/native"
import { useEffect } from "react"
import { MyContextControllerProvider } from "./context"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import Router from "./routers/Router"



export default function App() {
  const USERS = firestore().collection("USERS")
  const admin = {
    name: "admin",
    phone: "0123456789",
    address: "Binfh Duong",
    email: "hoainam@gmail.com",
    password: "123456",
    role: "admin"
  }
  useEffect(() => {
    USERS.doc(admin.email)
    .onSnapshot(u => {
      if(!u.exists) {
        auth().createUserWithEmailAndPassword(admin.email, admin.password)
        .then(response => {
          USERS.doc(admin.email).set(admin)
          .then(() => console.log("Add new admin !"))
        })
      }
    })
  }, [])

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}