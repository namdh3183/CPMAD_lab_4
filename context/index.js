import { createContext, useContext, useMemo, useReducer } from "react"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

const MyContext = createContext()

const reducer = (state, action) => {
	switch(action.type) {
		case "USER_LOGIN":
			return { ...state, userLogin: action.value }
			break
        case "LOGOUT":
            return { ...state, userLogin: null}
		default:
			return new Error("Action not found")
			break
	}
}

// Khoi tao context (store)
const MyContextControllerProvider = ({children}) => {
    const initialState = {
        userLogin: null,
        services: [],
    }

    const [controller, dispatch] = useReducer(reducer, initialState)

    const value = useMemo(() => [controller, dispatch], [controller, dispatch])

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

const useMyContextController = () => {
    const context = useContext(MyContext)

    if(context == null)
        throw new Error("useMyContextController should be used inside the MyContextControllerProvider.")

    return context
}

const cUSERS = firestore().collection("USERS")
const cSERVICES = firestore().collection("SERVICES")

// Action
const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email, password)
    .then(response => {
        cUSERS.doc(email)
        .onSnapshot(
            u => dispatch({type: "USER_LOGIN", value: u.data()})
        )
    })
    .catch(e => alert("Incorrect username or password"))
}

const logout = (dispatch) => {
    auth().signOut()
    .then(() => dispatch({type: "USER_LOGIN", }))
}

const createNewService = (newService) => {
    newService.finalUpdate = firestore.FieldValue.serverTimestamp()
    cSERVICES.add(newService)
    .then(() => {
        alert("Added new service !")
    })
    .catch((e) => alert(e))
}

export { 
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    createNewService
}