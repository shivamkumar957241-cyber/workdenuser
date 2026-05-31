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
      heroBadge: "India's Verified WFH Platform",
      heroCta1: "Start Working Now",
      heroCta2: "Try Free Demo",
      heroTrust1: "GSTIN: 10KEJPM6504N1Z7 — Government Verified",
      heroTrust2: "MSME: UDYAM-KR-03-0640514",
      heroTrust3: "Free demo — no commitment, no payment required",
      whyTitle: "Why People Trust WorkDen",
      whySubtitle: "Built for secure, structured, transparent digital task work — from anywhere in India.",
      catTitle: "Available Work Categories",
      catSubtitle: "All tasks have step-by-step instructions inside the portal. Most require no prior experience.",
      howTitle: "How to Get Started",
      howSubtitle: "4 clear steps from demo to earning. No shortcuts, no confusion.",
      ctaTitle: "Ready to Start Earning from Home?",
      ctaSubtitle: "Join 1.34 lakh+ users already working on WorkDen. Try the free demo first — no payment required.",
      ctaBtn1: "Try Free Demo",
      ctaBtn2: "User Login",
      features: [
        { title: "Government Registered", desc: "GSTIN & MSME certified business. Fully compliant with Indian regulations. You can verify our credentials independently online.", icon: "fas fa-shield-halved", bg: "#eff6ff", color: "var(--brand)" },
        { title: "Free Demo First", desc: "Try a real demo task before committing anything. See exactly how the platform works — zero risk, no payment required.", icon: "fas fa-circle-play", bg: "#f0fdf4", color: "var(--green)" },
        { title: "Multiple Task Types", desc: "Data entry, form filling, typing, captcha, grammar correction, chat support — pick what suits your skills best.", icon: "fas fa-layer-group", bg: "#fdf4ff", color: "#9333ea" },
        { title: "Work From Anywhere", desc: "Just a phone or laptop is enough. Flexible hours, no commute, no dress code — work whenever it suits you.", icon: "fas fa-mobile-screen", bg: "#fff7ed", color: "#ea580c" },
        { title: "Dedicated Support", desc: "Recruiter teams assist you through onboarding, task completion, and any doubts. You are never left without help.", icon: "fas fa-headset", bg: "#fffbeb", color: "var(--gold)" },
        { title: "Clear Policies", desc: "All terms, payment structure, and review policies are published openly. No hidden surprises or confusing fine print.", icon: "fas fa-file-contract", bg: "#fef2f2", color: "#dc2626" }
      ],
      categories: [
        { title: "Form Filling", desc: "Fill structured forms using given data. Easy, guided, and clearly defined inside the portal.", icon: "fas fa-file-pen", bg: "#eff6ff", color: "var(--brand)" },
        { title: "Data Entry", desc: "Input data into databases from reference sheets. Simple copy-enter tasks with clear reference material.", icon: "fas fa-table", bg: "#f5f3ff", color: "#7c3aed" },
        { title: "Email Support", desc: "Handle customer emails using predefined templates. Template-based, easy to follow responses.", icon: "fas fa-envelope", bg: "#f0fdf4", color: "var(--green)" },
        { title: "Chat Support", desc: "Respond to live chat queries from the dashboard with guided answer templates.", icon: "fas fa-message", bg: "#fff7ed", color: "#ea580c" },
        { title: "Grammar Correction", desc: "Fix highlighted errors in short text documents. Clear visual indicators shown in portal.", icon: "fas fa-spell-check", bg: "#fef2f2", color: "#e11d48" },
        { title: "Typing Tasks", desc: "Type the text shown in the dashboard into the input box. Perfect for beginners with basic typing.", icon: "fas fa-keyboard", bg: "#fffbeb", color: "var(--gold)" }
      ],
      steps: [
        { title: "Try the Free Demo", desc: "Experience the platform firsthand — completely free. No payment, no commitment needed." },
        { title: "Register & Verify", desc: "Complete a simple registration and verification to access the task portal." },
        { title: "Get Tasks Assigned", desc: "Tasks are allocated based on project availability and your profile eligibility." },
        { title: "Submit & Earn", desc: "Submitted work is quality-reviewed. Earnings depend on accuracy and guideline compliance." }
      ]
    },
    plans: {
      pageHeroTitle: "Choose Your <span class=\"gradient-text\">WorkDen Access</span> Plan",
      pageHeroDesc: "Online task work start karna ho ya WorkDen ke saath freelance telecalling/affiliate marketing opportunity join karni ho — dono options clear, simple aur professional way me available hain.",
      plansTitle: "Plans that work best for you",
      plansSubtitle: "Trusted by thousands of workers across India. Transparent pricing, no hidden fees.",
      togglePaidBtn: "₹999 Plan",
      toggleFreeBtn: "Free Plan",
      valueTitle: "Why choose WorkDen plans?",
      valueDesc: "Har plan ko clear role ke according design kiya gaya hai — task work ke liye paid access aur freelance marketing/calling ke liye free joining option.",
      plansList: [
        {
          id: "typing",
          name: "Online Typing Work",
          price: "999",
          desc: "Task portal access ke saath training, VIP ID card aur priority support included. Ghar baithe kaam shuru karo.",
          isPaid: true,
          isPopular: true,
          refundNote: "⚠️ <strong>Note:</strong> Refund is not available once the ID is activated. Please read all terms before purchasing.",
          features: [
            "Full Access to All Tasks",
            "Professional VIP ID Card",
            "Complete Training + Live Webinar",
            "Live + Priority Support",
            "Easy & Less Tasks Daily",
            "Fast Task Approval",
            "Min. Withdrawal: ₹500",
            "No Maximum Earning Limit"
          ]
        },
        {
          id: "telecaller",
          name: "Freelance Telecaller",
          price: "Free",
          desc: "Calling, follow-up aur affiliate promotion ke through WorkDen opportunity explain karo. Zero investment required.",
          isPaid: false,
          isPopular: false,
          refundNote: "",
          features: [
            "Free Registration — ₹0",
            "Work From Home Calling",
            "Affiliate Marketing Support",
            "Basic Platform Training",
            "Flexible Working Hours",
            "Performance-Based Growth",
            "Weekly Payout via UPI/Bank",
            "Community Access & Support"
          ]
        },
        {
          id: "affiliate",
          name: "Affiliate Marketer",
          price: "Free",
          desc: "WorkDen ke products promote karo aur har successful referral par commission kamao. No targets, no pressure.",
          isPaid: false,
          isPopular: false,
          refundNote: "",
          features: [
            "Referral Commission on Every Sale",
            "Dedicated Affiliate Dashboard",
            "Marketing Materials Provided",
            "Social Media Promotion Tools",
            "No Target Pressure",
            "Work Anytime, Anywhere",
            "Instant Payout on Approval",
            "Dedicated Affiliate Support"
          ]
        }
      ],
      valueCards: [
        { title: "Structured System", desc: "Portal, tasks, support aur training ek proper flow me available.", icon: "fas fa-layer-group" },
        { title: "Verified Platform", desc: "GSTIN, MSME aur transparent policies ke saath professional setup.", icon: "fas fa-user-shield" },
        { title: "Support Focused", desc: "Training, live support aur guidance se users ko clarity milti hai.", icon: "fas fa-headset" }
      ]
    },
    about: {
      pageHeroTitle: "About WorkDen",
      pageHeroDesc: "Building a transparent, structured, and secure digital task ecosystem across India since 2024.",
      whoTitle: "Who We Are",
      whoP1: "Founded in 2024, WorkDen is a structured digital task facilitation platform designed to connect individuals with skill-based, remote task opportunities across India.",
      whoP2: "Our platform focuses on accuracy, transparency, and responsible digital participation. We provide users with access to a professional task portal where work is assigned based on eligibility, project demand, and performance compliance.",
      whoP3: "WorkDen is fully registered under Indian law — GSTIN and MSME certified — making us one of the few verified WFH platforms in the country.",
      whoQuote: "WorkDen operates on a task-based performance model. The platform does not provide employment contracts or guaranteed income — we connect skilled individuals with digital work opportunities.",
      missionText: "To establish a secure and transparent digital task platform that upholds professional standards, structured workflows, and responsible user participation across India.",
      visionText: "To become a trusted and recognized name in India's digital task ecosystem by enabling skill-based remote participation through structured and ethical operations.",
      companyName: "WorkDen",
      establishedYear: "2024",
      office1: "Ashok Nagar, Bangalore – 560001",
      office2: "Parsuram Pur, Motihari – 845416",
      emailGeneral: "<i class=\"fas fa-envelope\"></i> info@workden.online",
      emailSupport: "<i class=\"fas fa-headset\"></i> support@workden.online",
      teamList: [
        { name: "Shivam Mishra", role: "Managing Director", imageUrl: "" },
        { name: "Rajesh Tripathi", role: "Operations Head", imageUrl: "" },
        { name: "Utsav Tiwari", role: "Recruitment Lead", imageUrl: "" }
      ]
    },
    projects: {
      pageHeroTitle: "Available Projects",
      pageHeroDesc: "All tasks have clear step-by-step instructions inside the portal. No prior experience needed for most categories.",
      ctaTitle: "Not sure where to start?",
      ctaDesc: "Try our free demo task — experience the portal before making any decisions. No payment needed.",
      projectsList: [
        { title: "Form Filling", desc: "Fill structured online forms with given instructions. Data is pre-provided — you simply enter it accurately into the designated fields in the portal.", icon: "fas fa-file-pen", bg: "#eff6ff", color: "var(--brand)", level: "Easy · No Experience Needed", badges: ["Most Popular", "Beginner"] },
        { title: "Data Entry", desc: "Enter structured spreadsheet data into a secure database. Straightforward copy-and-enter tasks with clear reference materials provided in the dashboard.", icon: "fas fa-table", bg: "#f5f3ff", color: "#7c3aed", level: "Easy · Basic Typing", badges: ["High Volume", "Beginner"] },
        { title: "Email Support", desc: "Handle basic customer email queries using predefined templates. Templates are provided — you select and send the appropriate response to each query.", icon: "fas fa-envelope", bg: "#f0fdf4", color: "var(--green)", level: "Medium · Template Based", badges: ["Intermediate"] },
        { title: "Chat Support", desc: "Respond to live chat queries from the dashboard using guided templates. Quick responses with clear guidelines provided for each type of customer query.", icon: "fas fa-message", bg: "#fff7ed", color: "#ea580c", level: "Medium · Communication", badges: ["Intermediate"] },
        { title: "Grammar Correction", desc: "Edit and correct short text documents for grammatical errors. Clear error indicators are shown in the portal — you identify and fix what's highlighted.", icon: "fas fa-spell-check", bg: "#fef2f2", color: "#dc2626", level: "Medium · Accuracy", badges: ["Intermediate"] },
        { title: "Typing Tasks", desc: "Type the same text shown in the dashboard into the input box. Simple and straightforward — perfect for anyone with basic typing skills and a phone or laptop.", icon: "fas fa-keyboard", bg: "#fffbeb", color: "var(--gold)", level: "Easy · Basic Typing", badges: ["Beginner"] },
        { title: "Captcha Filling", desc: "Enter captcha codes displayed in the dashboard into the designated input field. Simple, repeatable task — ideal for those just starting with online work.", icon: "fas fa-hashtag", bg: "#eff6ff", color: "var(--brand)", level: "Easy · Repeatable", badges: ["Beginner"] }
      ]
    },
    blogs: {
      pageHeroTitle: "WorkDen Blog",
      pageHeroDesc: "Work from home, data entry aur online tasks se related genuine guides, safety tips aur real experiences.",
      blogsList: [
        { title: "Work From Home Data Entry Job – Beginner Guide", desc: "Ghar baithe data entry kaise karein? Step by step complete beginner guide with all you need to know.", tag: "Work From Home", url: "blogs/work-from-home.html", date: "2024" },
        { title: "Online Typing Job Real or Fake? – Complete Truth", desc: "Kya online typing jobs genuine hote hain? Real aur fake platforms mein fark kaise pehchanein.", tag: "Typing Jobs", url: "blogs/online-typing-job-real-or-fake.html", date: "2024" },
        { title: "Captcha Work Safe or Not? – Honest Analysis", desc: "Captcha filling jobs safe hain ya nahi? Sabse common sawaal ka honest jawab with real examples.", tag: "Safety Guide", url: "blogs/captcha-work-safe-or-not.html", date: "2024" },
        { title: "Form Filling Job Real or Fake? – What to Look For", desc: "Form filling jobs ke baare mein poori sachai – kya dekhein, kya avoid karein aur safe kaise rahein.", tag: "Form Filling", url: "blogs/form-filling-job-real-or-fake.html", date: "2024" },
        { title: "Work From Home Opportunity on WorkDen Platform", desc: "WorkDen par kaise kaam shuru karein? Registration, tasks aur earning process ki complete guide.", tag: "WorkDen", url: "blogs/work-from-home-opportunity-workden.html", date: "2024" },
        { title: "Work From Home Jobs for Beginners – Start Here", desc: "Beginner hain aur WFH dhundh rahe hain? Yahan se shuru karein apna work-from-home journey.", tag: "Beginners", url: "blogs/work-from-home-jobs-for-beginners.html", date: "2024" },
        { title: "Ghar Baithe Online Paise Kaise Kamaye?", desc: "India mein ghar baithe online paise kamane ke genuine tarike. Scams se bachein aur sahi platform chunein.", tag: "Earning Tips", url: "blogs/ghar-baithe-online-paise-kaise-kamaye.html", date: "2024" },
        { title: "Online Earning Platforms in India – Verified List", desc: "India ke top verified online earning platforms – kaunsa safe hai, kaunsa nahi, poori comparison.", tag: "Platforms", url: "blogs/online-earning-platforms-in-india.html", date: "2024" },
        { title: "How WorkDen Helps Beginners Start Online Work", desc: "WorkDen specifically beginners ke liye kaise design kiya gaya – support, structure aur simplicity.", tag: "WorkDen", url: "blogs/how-workden-helps-beginners-online-work.html", date: "2024" },
        { title: "Part Time Job Work From Home – Complete Guide", desc: "Part time ghar se kaam karna chahte hain? Jaanein kaise balance karein daily routine ke saath.", tag: "Part Time", url: "blogs/part-time-job-work-from-home.html", date: "2024" },
        { title: "Work From Home for Students – Earn While You Study", desc: "College students ke liye best WFH options – flexible timing ke saath pocket money kamao.", tag: "Students", url: "blogs/work-from-home-for-students.html", date: "2024" },
        { title: "Work From Home for Housewives – Best Options 2024", desc: "Grihini mahilao ke liye perfect WFH jobs – family aur work dono manage karein aasani se.", tag: "Housewives", url: "blogs/work-from-home-for-housewives.html", date: "2024" }
      ]
    },
    "demo-task": {
      pageHeroTitle: "WorkDen Demo Tasks",
      pageHeroDesc: "Choose your skill and try a demo task",
      demoBadge: "🔴 LIVE DEMO – Try All Tasks",
      loginHeroTitle: "WorkDen Demo Practice Portal",
      loginHeroDesc: "Create your free demo account or login to practice real-style tasks, check your accuracy, and track your complete performance history.",
      loginStatusText: "Demo Practice Active",
      loginBadge1: "Free Practice Access",
      loginBadge2: "Secure Login",
      loginFeat1Title: "Real-Style Practice Tasks",
      loginFeat1Desc: "Practice Typing, Form Filling, Data Entry, and Grammar tasks in a clean demo workspace designed like the live task portal.",
      loginFeat2Title: "Instant Accuracy Report",
      loginFeat2Desc: "Get your accuracy score, correct entries, wrong entries, and task result instantly after every demo attempt.",
      loginFeat3Title: "Saved Practice History",
      loginFeat3Desc: "Every demo attempt is saved in your account, so you can login anytime and check your progress, approved tasks, and rejected tasks.",
      formCardTitle: "Login to Demo Workspace",
      formCardEncryption: "Secure Access",
      loginCompliance: "Your demo practice data is saved securely to help you track accuracy, improve performance, and review your task",
      demoPaymentDisclaimer: "Demo tasks are only for practice. No payment will be provided for demo tasks. Payment is applicable only for live tasks.",
      taskDisclaimerDuringTask: "This is a demo task. No payout is provided for demo tasks. It is only for practice.",
      reportTitle: "Demo Performance Report",
      reportSub: "Your performance has been evaluated based on real task parameters.",
      reportApprovalThreshold: "95",
      reportEligibleHeading: "You are eligible for this work.",
      reportEligibleSub: "Please purchase a subscription plan to start earning real money!",
      reportNotEligibleHeading: "You are not eligible for this work.",
      reportNotEligibleSub: "Please try again to become eligible. You need 95%+ accuracy.",
      reportStatusApprovedText: "Task Status: Approved",
      reportStatusRejectedText: "Task Status: Rejected",
      reportApprovedDesc: "You are eligible for live tasks! Start real work now and start earning.",
      reportRejectedDesc: "Score 95%+ accuracy to get your task approved for live work.",
      reportStrengthHigh: "Excellent accuracy and attention to detail maintained throughout.",
      reportImprovementHigh: "Minor mistakes in a few items — review before saving next time.",
      reportSuggestionHigh: "You are ready for live tasks. Start real work to earn rewards!",
      reportStrengthMedium: "Good consistency — you completed all items.",
      reportImprovementMedium: "Accuracy needs improvement in some areas. Read data more carefully.",
      reportSuggestionMedium: "Practice 2–3 more demo rounds to reach 95%+ accuracy.",
      reportStrengthLow: "You attempted all items — that's a great start!",
      reportImprovementLow: "Low accuracy. Take time to read reference data before typing.",
      reportSuggestionLow: "Focus on one task type at a time. Practice makes perfect.",
      tasksList: [
        { id: "typing",  name: "PDF to Word Typing",  emoji: "⌨️", items: 10,  timeMin: 60, desc: "Read the 8-10 line content shown on each page and type it exactly in the box below. Minimum 100 words per page required.", color: "#7C3AED", num: 1, hcls: "", howto: ["Read the content shown in the yellow box carefully.","Type the exact same content in the text box below — word for word.","You must type at least 100 words to pass this item.","Do NOT copy-paste — type manually using the keyboard.","Spelling and accuracy matter — type carefully."] },
        { id: "form",    name: "Form Filling",        emoji: "🧾", items: 10,  timeMin: 60, desc: "Complete 10 online forms with the provided reference data carefully and accurately.", color: "#059669", num: 2, hcls: "green", howto: ["Read all reference data in the blue box at the top.","Fill each field exactly as shown in the reference (spelling, spacing, case).","Do not skip any field marked with a red asterisk (*).","Type manually — copy-paste is disabled.","Click Save when all fields are filled to see your score."] },
        { id: "data",    name: "Data Entry",          emoji: "📊", items: 10,  timeMin: 60, desc: "Fill in 10 data entry forms accurately by typing the required information in each field.", color: "#EA580C", num: 3, hcls: "orange", howto: ["Study the reference data card at the top of each item.","Type each value exactly as shown — including spaces and formats.","Pay special attention to Aadhar, PAN, DOB, and PIN formats.","All fields are required — do not leave any blank.","Click Save to check your accuracy for that item."] },
        { id: "grammar", name: "Grammar Correction",  emoji: "✍️", items: 10,  timeMin: 60, desc: "Read 10 paragraphs with grammatical errors and type the fully corrected versions.", color: "#7C3AED", num: 4, hcls: "", howto: ["Read the incorrect paragraph carefully — error types are shown below.","Identify all grammatical mistakes.","Type the fully corrected paragraph in the text box below.","Do not change the meaning — only fix grammar errors.","Your answer must be at least 13 characters to be accepted."] }
      ]
    },
    header: {
      nav_userLoginBtn: "User Login",
      nav_employeeLoginBtn: "Employee Login",
      nav_employeeLoginUrl: "https://workdenteam2.base44.app/",
      modal_title: "Choose Your Login Portal",
      modal_desc: "WorkDen ke do version available hain. Apna version select karein.",
      v1_label: "WorkDen 4.0",
      v1_url: "https://workden-4.base44.app",
      v2_label: "WorkDen 3.0",
      v2_url: "https://workden-3.base44.app"
    },
    footer: {
      brandDesc: "A verified digital task platform delivering structured online work opportunities with transparency, secure workflow, and compliance. GSTIN &amp; MSME registered.",
      copyright: "© 2026 WorkDen. All rights reserved.",
      tagline: "<i class=\"fas fa-circle-check\"></i> Est. 2024",
      gstinNumber: "GSTIN: 10KEJPM6504N1Z7",
      msmeNumber: "MSME: UDYAM-KR-03-0640514",
      emailGeneral: "<i class=\"fas fa-envelope\"></i> info@workden.online",
      emailSupport: "<i class=\"fas fa-headset\"></i> support@workden.online",
      address1: "<i class=\"fas fa-location-dot\"></i> Ashok Nagar, Bangalore – 560001",
      address2: "<i class=\"fas fa-location-dot\"></i> Parsuram Pur, Motihari – 845416",
      facebookUrl: "https://www.facebook.com/people/Workden-India/61583820256534/",
      instagramUrl: "https://www.instagram.com/workden_wfh",
      linkedinUrl: "https://www.linkedin.com/in/workden-india-315391383/",
      telegramUrl: "https://t.me/+f_s3cLM1WwYxNjE1"
    }
  },
  testimonials: [
    // 🎥 Videos Reviews
    { id: "v1", type: "video", name: "Rahul Sharma", city: "Delhi, India", videoUrl: "https://drive.google.com/file/d/1TfgX3JHS3dr-aoNM6MfVNFzdTiqe4zDy/view?usp=sharing", initials: "RS", gradient: "linear-gradient(135deg,#1d4ed8,#6366f1)" },
    { id: "v2", type: "video", name: "Anjali Verma", city: "Mumbai, Maharashtra", videoUrl: "https://drive.google.com/file/d/1WOQP62KcC0EeVufQl4mCDrKK-K7cxNT3/view?usp=sharing", initials: "AV", gradient: "linear-gradient(135deg,#ec4899,#f97316)" },
    { id: "v3", type: "video", name: "Vikas Gupta", city: "Bengaluru, Karnataka", videoUrl: "https://drive.google.com/file/d/1H8ziVfY7GlJMd5SQ3nTwVhNhWx2p2czl/view?usp=sharing", initials: "VG", gradient: "linear-gradient(135deg,#10b981,#0891b2)" },
    { id: "v4", type: "video", name: "Priya Singh", city: "Lucknow, Uttar Pradesh", videoUrl: "https://drive.google.com/file/d/1uSjJiSWYrCn3FMXpJSXpfl4n3Hk3PNch/view?usp=sharing", initials: "PS", gradient: "linear-gradient(135deg,#7c3aed,#ec4899)" },
    { id: "v5", type: "video", name: "Amit Patel", city: "Ahmedabad, Gujarat", videoUrl: "https://drive.google.com/file/d/1gCnbQb8TZetJpcCaXn2i6_r8Jp-_9ciL/view?usp=sharing", initials: "AP", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },

    // 📸 Screenshots Reviews (All 18)
    { id: "s1", type: "screenshot", name: "Aarav Sharma", city: "Delhi, India", imageUrl: "https://drive.google.com/file/d/17FLZiJbzPWndzUbIo4NhRM3M-LghjCaP/view?usp=sharing" },
    { id: "s2", type: "screenshot", name: "Pooja Patel", city: "Ahmedabad, Gujarat", imageUrl: "https://drive.google.com/file/d/1oRyTXN7nOWpuH_Re7clKMq0qjhZnKBHY/view?usp=sharing" },
    { id: "s3", type: "screenshot", name: "Ravi Kumar", city: "Hyderabad, Telangana", imageUrl: "https://drive.google.com/file/d/14w2itsxlNSi_-QwbbhLzD3oIOEWqGHas/view?usp=sharing" },
    { id: "s4", type: "screenshot", name: "Sneha Joshi", city: "Pune, Maharashtra", imageUrl: "https://drive.google.com/file/d/1L0mvZmBgJXzzDESnTCj9z-GDu9WY5Km8/view?usp=sharing" },
    { id: "s5", type: "screenshot", name: "Mohit Yadav", city: "Lucknow, UP", imageUrl: "https://drive.google.com/file/d/1Dp7HowTJWav60reJoNy5aBVoehecO6oJ/view?usp=sharing" },
    { id: "s6", type: "screenshot", name: "Divya Mishra", city: "Bhopal, MP", imageUrl: "https://drive.google.com/file/d/1AzNVMtUka9jUkleIxYWnQwqEOtT1bLNY/view?usp=sharing" },
    { id: "s7", type: "screenshot", name: "Suresh Reddy", city: "Chennai, Tamil Nadu", imageUrl: "https://drive.google.com/file/d/1blG5-vo0px8ke_xR9Zf_6-XW5lF6wbDp/view?usp=sharing" },
    { id: "s8", type: "screenshot", name: "Rohan Verma", city: "Lucknow, Uttar Pradesh", imageUrl: "https://drive.google.com/file/d/18Vx4eqOoi3Pc7FVFo5V9I4MhdYk-bIQL/view?usp=sharing" },
    { id: "s9", type: "screenshot", name: "Priya Sharma", city: "Indore, Madhya Pradesh", imageUrl: "https://drive.google.com/file/d/1fnxNxaj6AQUURCzR-eGIC2VhsVInQGth/view?usp=sharing" },
    { id: "s10", type: "screenshot", name: "Kavya Singh", city: "Jaipur, Rajasthan", imageUrl: "https://drive.google.com/file/d/1gaDk9evdh01Hsv2209gdjDMbsA1mTto0/view?usp=sharing" },
    { id: "s11", type: "screenshot", name: "Aman Raj", city: "Patna, Bihar", imageUrl: "https://drive.google.com/file/d/1tMp-bXz73OOBJ9TRe05AXUUv5z7p5Wvs/view?usp=sharing" },
    { id: "s12", type: "screenshot", name: "Sneha Kapoor", city: "Chandigarh, Punjab", imageUrl: "https://drive.google.com/file/d/1YgAHUs42hl_OyOwB6_OwzrUjxVm6aVbM/view?usp=sharing" },
    { id: "s13", type: "screenshot", name: "Rahul Meena", city: "Kota, Rajasthan", imageUrl: "https://drive.google.com/file/d/132aft4symoWWwKJHEfoE9hpHL87rsRic/view?usp=sharing" },
    { id: "s14", type: "screenshot", name: "Neha Yadav", city: "Bhopal, Madhya Pradesh", imageUrl: "https://drive.google.com/file/d/1LRHWjP5JLcKwCMSf-knbxTop-M4SaKee/view?usp=sharing" },
    { id: "s15", type: "screenshot", name: "Arjun Patel", city: "Surat, Gujarat", imageUrl: "https://drive.google.com/file/d/1zAJJn4FGKxWrIkluVo6ZiWHuS6d_PQ6Z/view?usp=sharing" },
    { id: "s16", type: "screenshot", name: "Pooja Malhotra", city: "Delhi, India", imageUrl: "https://drive.google.com/file/d/1Bzz9hU72or1_XVTL4rsVOqa6IK-jX8jK/view?usp=sharing" },
    { id: "s17", type: "screenshot", name: "Sahanawaz", city: "Kota, Rajasthan", imageUrl: "https://drive.google.com/file/d/162_3CEIZlQPhPPKeRGqbbIeex1KGdc7V/view?usp=sharing" },
    { id: "s18", type: "screenshot", name: "Umesh Nagar", city: "Kota, Rajasthan", imageUrl: "https://drive.google.com/file/d/1WHhZP8vtl5LWeuPhvFAnZwzzPQzaLkQa/view?usp=sharing" },

    // ✍️ Written Reviews
    { id: "w1", type: "written", name: "Rohit Sharma", city: "Delhi, India", text: "The portal interface is simple and structured. Task tracking and submission workflow is easy to understand even as a first-timer.", initials: "RS", gradient: "linear-gradient(135deg,#1d4ed8,#6366f1)" },
    { id: "w2", type: "written", name: "Neha Verma", city: "Mumbai, India", text: "Projects are clearly defined with detailed instructions. Very easy to manage remote digital work from home on this platform.", initials: "NV", gradient: "linear-gradient(135deg,#ec4899,#f97316)" },
    { id: "w3", type: "written", name: "Ankit Singh", city: "Bangalore, India", text: "The dashboard gives a clear overview of all tasks. Managing assignments is very convenient. GSTIN verification gave me confidence.", initials: "AS", gradient: "linear-gradient(135deg,#10b981,#0891b2)" },
    { id: "w4", type: "written", name: "Priya Kapoor", city: "Pune, India", text: "Payouts are consistent and transparent. I started with form filling and the process was exactly as explained during onboarding.", initials: "PK", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
    { id: "w5", type: "written", name: "Manish Reddy", city: "Hyderabad, India", text: "Very genuine platform for freelancers. Support team is always responsive when there is any confusion with the task guidelines.", initials: "MR", gradient: "linear-gradient(135deg,#8b5cf6,#d946ef)" },
    { id: "w6", type: "written", name: "Aditi Desai", city: "Ahmedabad, India", text: "The best part is no hidden fees or charges. Everything is upfront and the digital tasks actually help me earn a steady side income.", initials: "AD", gradient: "linear-gradient(135deg,#14b8a6,#3b82f6)" },
  ],
};

async function seedData() {
  try {
    await setDoc(doc(db, "website", "content"), defaultData);
    console.log("✅ Upgraded array seeder successful! All contents and media testimonials uploaded to Firebase.");
    process.exit(0);
  } catch (e) {
    console.error("❌ Seed failed:", e.message);
    process.exit(1);
  }
}

seedData();
