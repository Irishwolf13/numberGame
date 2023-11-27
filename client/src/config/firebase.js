import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlkczaNP2p1ixxEP50V7tWTVPfedrimUs",
  authDomain: "monsterlogin-bb5d3.firebaseapp.com",
  projectId: "monsterlogin-bb5d3",
  storageBucket: "monsterlogin-bb5d3.appspot.com",
  messagingSenderId: "679064911199",
  appId: "1:679064911199:web:fd4572d064503de93acaea",
  measurementId: "G-BQPB5M4DX8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();