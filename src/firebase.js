import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCTXrmhbf4bnB9KIeIouxJ-j5OCVrFGEnY",
  authDomain: "ecommerce-next-bdbeb.firebaseapp.com",
  projectId: "ecommerce-next-bdbeb",
  storageBucket: "ecommerce-next-bdbeb.appspot.com",
  messagingSenderId: "187702452595",
  appId: "1:187702452595:web:838d310d68d7841f9ce506"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app