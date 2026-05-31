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
      heroTitle: 'Work From Home.<br><span class="hl">Simple Tasks.</span><br>Real Income.',
      heroSubtitle: "Complete simple online tasks - data entry, form filling, typing, chat support - through a secure, government-registered platform. Trusted by 1.34 lakh+ users across India.",
      heroBadge: "India's Verified WFH Platform",
      heroCta1: "Start Working Now",
      heroCta2: "Try Free Demo",
      heroTrust1: "GSTIN: 10KEJPM6504N1Z7 — Government Verified",
      heroTrust2: "MSME: UDYAM-KR-03-0640514",
      heroTrust3: "Free demo — no commitment, no payment required",
      whyTitle: "Why People Trust WorkDen",
      whySubtitle: "Built for secure, structured, transparent digital task work — from anywhere in India.",
      feat1Title: "Government Registered",
      feat1Desc: "GSTIN & MSME certified business. Fully compliant with Indian regulations. You can verify our credentials independently online.",
      feat2Title: "Free Demo First",
      feat2Desc: "Try a real demo task before committing anything. See exactly how the platform works — zero risk, no payment required.",
      feat3Title: "Multiple Task Types",
      feat3Desc: "Data entry, form filling, typing, captcha, grammar correction, chat support — pick what suits your skills best.",
      feat4Title: "Work From Anywhere",
      feat4Desc: "Just a phone or laptop is enough. Flexible hours, no commute, no dress code — work whenever it suits you.",
      feat5Title: "Dedicated Support",
      feat5Desc: "Recruiter teams assist you through onboarding, task completion, and any doubts. You are never left without help.",
      feat6Title: "Clear Policies",
      feat6Desc: "All terms, payment structure, and review policies are published openly. No hidden surprises or confusing fine print.",
      catTitle: "Available Work Categories",
      catSubtitle: "All tasks have step-by-step instructions inside the portal. Most require no prior experience.",
      cat1Title: "Form Filling",
      cat1Desc: "Fill structured forms using given data. Easy, guided, and clearly defined inside the portal.",
      cat2Title: "Data Entry",
      cat2Desc: "Input data into databases from reference sheets. Simple copy-enter tasks with clear reference material.",
      cat3Title: "Email Support",
      cat3Desc: "Handle customer emails using predefined templates. Template-based, easy to follow responses.",
      cat4Title: "Chat Support",
      cat4Desc: "Respond to live chat queries from the dashboard with guided answer templates.",
      cat5Title: "Grammar Correction",
      cat5Desc: "Fix highlighted errors in short text documents. Clear visual indicators shown in portal.",
      cat6Title: "Typing Tasks",
      cat6Desc: "Type the text shown in the dashboard into the input box. Perfect for beginners with basic typing.",
      howTitle: "How to Get Started",
      howSubtitle: "4 clear steps from demo to earning. No shortcuts, no confusion.",
      step1Title: "Try the Free Demo",
      step1Desc: "Experience the platform firsthand — completely free. No payment, no commitment needed.",
      step2Title: "Register & Verify",
      step2Desc: "Complete a simple registration and verification to access the task portal.",
      step3Title: "Get Tasks Assigned",
      step3Desc: "Tasks are allocated based on project availability and your profile eligibility.",
      step4Title: "Submit & Earn",
      step4Desc: "Submitted work is quality-reviewed. Earnings depend on accuracy and guideline compliance.",
      ctaTitle: "Ready to Start Earning?",
      ctaSubtitle: "Join thousands of users who work from home with WorkDen. Start with a free demo today.",
      ctaBtn1: "Start Working Now",
      ctaBtn2: "Try Free Demo",
    },
    plans: {
      plansTitle: "Plans that work best for you",
      plansSubtitle: "Trusted by thousands of workers across India. Transparent pricing, no hidden fees.",
    },
    about: {
      pageTitle: "About WorkDen",
      pageDesc: "India's most trusted online task platform.",
    },
    projects: {
      pageTitle: "Active Projects",
      pageDesc: "Browse available projects and start earning.",
    },
    blogs: {
      pageTitle: "WorkDen Blogs",
      pageDesc: "Tips and tricks for freelancers.",
    },
    "demo-task": {
      pageTitle: "Try a Free Demo Task",
      pageDesc: "Experience our platform before committing. Completely free, no payment required.",
    },
  },
  testimonials: [
    { id: "1", name: "Rohit Sharma", city: "Delhi, India", text: "The portal interface is simple and structured. Task tracking and submission workflow is easy to understand even as a first-timer.", initials: "RS", gradient: "linear-gradient(135deg,#1d4ed8,#6366f1)" },
    { id: "2", name: "Neha Verma", city: "Mumbai, India", text: "Projects are clearly defined with detailed instructions. Very easy to manage remote digital work from home on this platform.", initials: "NV", gradient: "linear-gradient(135deg,#ec4899,#f97316)" },
    { id: "3", name: "Ankit Singh", city: "Bangalore, India", text: "The dashboard gives a clear overview of all tasks. Managing assignments is very convenient. GSTIN verification gave me confidence.", initials: "AS", gradient: "linear-gradient(135deg,#10b981,#0891b2)" },
    { id: "4", name: "Priya Kapoor", city: "Pune, India", text: "Payouts are consistent and transparent. I started with form filling and the process was exactly as explained during onboarding.", initials: "PK", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
    { id: "5", name: "Manish Reddy", city: "Hyderabad, India", text: "Very genuine platform for freelancers. Support team is always responsive when there is any confusion with the task guidelines.", initials: "MR", gradient: "linear-gradient(135deg,#8b5cf6,#d946ef)" },
    { id: "6", name: "Aditi Desai", city: "Ahmedabad, India", text: "The best part is no hidden fees or charges. Everything is upfront and the digital tasks actually help me earn a steady side income.", initials: "AD", gradient: "linear-gradient(135deg,#14b8a6,#3b82f6)" },
  ],
};

async function seedData() {
  try {
    await setDoc(doc(db, "website", "content"), defaultData);
    console.log("✅ Full seed successful! All page content and testimonials uploaded to Firebase.");
    process.exit(0);
  } catch (e) {
    console.error("❌ Seed failed:", e.message);
    process.exit(1);
  }
}

seedData();
