import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO0rqyXTm3CIU5sWRvpmnkyslfFSzbRsY",
  authDomain: "workdenuser.firebaseapp.com",
  projectId: "workdenuser",
  storageBucket: "workdenuser.firebasestorage.app",
  messagingSenderId: "532345150222",
  appId: "1:532345150222:web:b6397bfc4b856be4a5155f",
};

async function checkContent() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, "website", "content");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("SUCCESS: Document retrieved!");
      console.log("Categories exist on home:", !!data.website?.home?.categories);
      console.log("Categories type:", typeof data.website?.home?.categories);
      console.log("Categories length:", data.website?.home?.categories?.length);
      console.log("Categories content:", JSON.stringify(data.website?.home?.categories, null, 2));
    } else {
      console.log("No such document!");
    }
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
}

checkContent();
