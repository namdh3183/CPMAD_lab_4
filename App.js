import { NavigationContainer } from "@react-navigation/native"
import { useEffect } from "react"
import { MyContextControllerProvider } from "./context"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import Router from "./routers/Router"
import { PaperProvider } from "react-native-paper"



export default function App() {
  const USERS = firestore().collection("USERS")
  const admin = {
    name: "Admin",
    phone: "0123456789",
    address: "Binh Duong",
    email: "hoainam3183@gmail.com",
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
        <PaperProvider>
         <Router />
        </PaperProvider>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}