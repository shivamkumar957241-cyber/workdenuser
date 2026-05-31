import fs from "fs";
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

async function testFullWrite() {
  try {
    const jsonPath = "C:\\Users\\mishr\\.gemini\\antigravity\\scratch\\extracted-content.json";
    const website = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const testimonials = [
      { id: "1", name: "Rohit Sharma", city: "Delhi, India", text: "The portal interface is simple and structured. Task tracking and submission workflow is easy to understand even as a first-timer.", initials: "RS", gradient: "linear-gradient(135deg,#1d4ed8,#6366f1)" },
      { id: "2", name: "Neha Verma", city: "Mumbai, India", text: "Projects are clearly defined with detailed instructions. Very easy to manage remote digital work from home on this platform.", initials: "NV", gradient: "linear-gradient(135deg,#ec4899,#f97316)" }
    ];

    const payload = { website, testimonials };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log("Attempting full write of website and testimonials to website/content...");
    await setDoc(doc(db, "website", "content"), payload, { merge: true });
    console.log("✅ Success! Full write completed successfully.");
  } catch (error) {
    console.error("❌ Full write failed with error:");
    console.error(error);
  }
}

testFullWrite();
