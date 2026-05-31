import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO0rqyXTm3CIU5sWRvpmnkyslfFSzbRsY",
  authDomain: "workdenuser.firebaseapp.com",
  projectId: "workdenuser",
  storageBucket: "workdenuser.firebasestorage.app",
  messagingSenderId: "532345150222",
  appId: "1:532345150222:web:b6397bfc4b856be4a5155f",
};

async function testFirebase() {
  try {
    console.log("Initializing Firebase...");
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log("Testing write to Firestore...");
    await setDoc(doc(db, "website", "test_connection"), { test: "success", timestamp: new Date() });
    console.log("Write successful!");
    process.exit(0);
  } catch (error) {
    console.error("Write failed:", error.message);
    process.exit(1);
  }
}

testFirebase();
