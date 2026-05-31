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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultData = {
  website: {
    home: {
      heroTitle: "Work From Home.<br><span class=\"hl\">Simple Tasks.</span><br>Real Income.",
      heroSubtitle: "Complete simple online tasks - data entry, form filling, typing, chat support - through a secure, government-registered platform. Trusted by 1.34 lakh+ users across India.",
    },
    plans: {
      plansTitle: "Plans that work best for you",
      plansSubtitle: "Trusted by thousands of workers across India. Transparent pricing, no hidden fees."
    },
    about: {
      pageTitle: "About WorkDen",
      pageDesc: "India's most trusted online task platform."
    },
    projects: {
      pageTitle: "Active Projects",
      pageDesc: "Browse available projects and start earning."
    },
    blogs: {
      pageTitle: "WorkDen Blogs",
      pageDesc: "Tips and tricks for freelancers."
    }
  },
  testimonials: [
    {
      id: "1",
      name: "Priya Kapoor",
      city: "Pune, India",
      text: "Payouts are consistent and transparent. I started with form filling and the process was exactly as explained during onboarding.",
      initials: "PK",
      gradient: "linear-gradient(135deg,#f59e0b,#ef4444)"
    },
    {
      id: "2",
      name: "Manish Reddy",
      city: "Hyderabad, India",
      text: "Very genuine platform for freelancers. Support team is always responsive when there is any confusion with the task guidelines.",
      initials: "MR",
      gradient: "linear-gradient(135deg,#8b5cf6,#d946ef)"
    },
    {
      id: "3",
      name: "Aditi Desai",
      city: "Ahmedabad, India",
      text: "The best part is no hidden fees or charges. Everything is upfront and the digital tasks actually help me earn a steady side income.",
      initials: "AD",
      gradient: "linear-gradient(135deg,#14b8a6,#3b82f6)"
    }
  ]
};

async function seedData() {
  try {
    await setDoc(doc(db, "website", "content"), defaultData);
    console.log("Seed successful");
    process.exit(0);
  } catch (e) {
    console.error("Seed failed:", e);
    process.exit(1);
  }
}

seedData();
