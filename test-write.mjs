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

async function testWrite() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log("Attempting write to website/content...");
    await setDoc(doc(db, "website", "content"), { test_write: new Date().toISOString() }, { merge: true });
    console.log("✅ Success! Write completed.");
  } catch (error) {
    console.error("❌ Write failed with error:");
    console.error(error);
  }
}

testWrite();
