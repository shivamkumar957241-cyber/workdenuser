"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── SVG Icon helper ──────────────────────────────────────────────────────────
const Icon = ({ d, cls = "w-5 h-5" }: { d: string; cls?: string }) => (
  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);
const IHome    = () => <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />;
const IPlans   = () => <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
const IAbout   = () => <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
const IProj    = () => <Icon d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />;
const IBlog    = () => <Icon d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />;
const IDemo    = () => <Icon d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
const IStar    = () => <Icon d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />;
const IHeader  = () => <Icon d="M4 6h16M4 12h16M4 18h7" />;
const IFooter  = () => <Icon d="M4 18h16M4 12h16M4 6h7" />;
const ISave    = () => <Icon d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />;
const IPlus    = () => <Icon d="M12 4v16m8-8H4" />;
const ITrash   = () => <Icon d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />;
const ILogout  = () => <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />;
const ILoad    = () => <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>;

// ─── Schema Configurations ───────────────────────────────────────────────────
type FType = "text" | "textarea" | "richtext" | "url";
type Field = { key: string; label: string; type: FType; hint?: string };
type Section = { title: string; fields: Field[] };
type PageDef = { label: string; icon: React.FC; sections: Section[] };

const PAGES: Record<string, PageDef> = {
  home: {
    label: "Home Page", icon: IHome,
    sections: [
      { title: "Hero Section", fields: [
        { key: "heroTitle",    label: "Hero Title (Main Heading)", type: "richtext", hint: 'HTML allowed: <br> for line break, <span class="hl">text</span> for blue highlight' },
        { key: "heroSubtitle", label: "Hero Description",          type: "textarea" },
        { key: "heroBadge",    label: "Badge Text (above heading)", type: "text" },
        { key: "heroCta1",     label: "Primary Button Text",       type: "text" },
        { key: "heroCta2",     label: "Secondary Button Text",     type: "text" },
        { key: "heroTrust1",   label: "Trust Line 1",              type: "text" },
        { key: "heroTrust2",   label: "Trust Line 2",              type: "text" },
        { key: "heroTrust3",   label: "Trust Line 3",              type: "text" },
      ]},
      { title: "Why WorkDen Header", fields: [
        { key: "whyTitle",    label: "Section Title",   type: "text" },
        { key: "whySubtitle", label: "Section Subtitle", type: "textarea" },
      ]},
      { title: "Work Categories Header", fields: [
        { key: "catTitle",   label: "Section Title",    type: "text" },
        { key: "catSubtitle",label: "Section Subtitle", type: "textarea" },
      ]},
      { title: "How It Works Header", fields: [
        { key: "howTitle",   label: "Section Title",    type: "text" },
        { key: "howSubtitle",label: "Section Subtitle", type: "textarea" },
      ]},
      { title: "CTA Section", fields: [
        { key: "ctaTitle",   label: "CTA Heading",        type: "text" },
        { key: "ctaSubtitle",label: "CTA Subtitle",       type: "textarea" },
        { key: "ctaBtn1",    label: "CTA Button 1 Text",  type: "text" },
        { key: "ctaBtn2",    label: "CTA Button 2 Text",  type: "text" },
      ]},
    ],
  },
  plans: {
    label: "Plans Page", icon: IPlans,
    sections: [
      { title: "Plans Header", fields: [
        { key: "pageHeroTitle",   label: "Page Hero Title",    type: "text", hint: 'e.g. Choose Your <span class="gradient-text">WorkDen Access</span> Plan' },
        { key: "pageHeroDesc",    label: "Page Hero Description", type: "textarea" },
        { key: "plansTitle",      label: "Plans Section Title",    type: "text" },
        { key: "plansSubtitle",   label: "Plans Section Subtitle", type: "textarea" },
        { key: "togglePaidBtn",   label: "Paid Toggle Button Label", type: "text" },
        { key: "toggleFreeBtn",   label: "Free Toggle Button Label", type: "text" },
      ]},
      { title: "Value Proposition Strip Header", fields: [
        { key: "valueTitle",  label: "Value Strip Title",   type: "text" },
        { key: "valueDesc",   label: "Value Strip Description", type: "textarea" },
      ]},
    ],
  },
  about: {
    label: "About Page", icon: IAbout,
    sections: [
      { title: "Page Hero", fields: [
        { key: "pageHeroTitle", label: "Hero Title",    type: "text" },
        { key: "pageHeroDesc",  label: "Hero Description", type: "textarea" },
      ]},
      { title: "Who We Are Section", fields: [
        { key: "whoTitle",  label: "Section Title",    type: "text" },
        { key: "whoP1",     label: "Paragraph 1",      type: "textarea" },
        { key: "whoP2",     label: "Paragraph 2",      type: "textarea" },
        { key: "whoP3",     label: "Paragraph 3",      type: "textarea" },
        { key: "whoQuote",  label: "Blockquote Text",  type: "textarea" },
      ]},
      { title: "Mission & Vision", fields: [
        { key: "missionText", label: "Mission Text", type: "textarea" },
        { key: "visionText",  label: "Vision Text",  type: "textarea" },
      ]},
      { title: "Office & Contact Credentials", fields: [
        { key: "companyName",     label: "Registered Company Name",  type: "text" },
        { key: "establishedYear", label: "Established Year",         type: "text" },
        { key: "office1",         label: "Primary Office Address",   type: "text" },
        { key: "office2",         label: "Secondary Office Address", type: "text" },
        { key: "emailGeneral",    label: "General Email",            type: "text" },
        { key: "emailSupport",    label: "Support Email",            type: "text" },
      ]},
    ],
  },
  projects: {
    label: "Projects Page", icon: IProj,
    sections: [
      { title: "Page Hero", fields: [
        { key: "pageHeroTitle", label: "Page Title",      type: "text" },
        { key: "pageHeroDesc",  label: "Page Subtitle",   type: "textarea" },
      ]},
      { title: "Projects Page CTA", fields: [
        { key: "ctaTitle", label: "Bottom CTA Heading",     type: "text" },
        { key: "ctaDesc",  label: "Bottom CTA Description", type: "textarea" },
      ]},
    ],
  },
  blogs: {
    label: "Blogs Page", icon: IBlog,
    sections: [
      { title: "Page Hero", fields: [
        { key: "pageHeroTitle", label: "Page Title",    type: "text" },
        { key: "pageHeroDesc",  label: "Page Subtitle", type: "textarea" },
      ]},
    ],
  },
  "demo-task": {
    label: "Demo Task Page", icon: IDemo,
    sections: [
      { title: "Demo Task Hero", fields: [
        { key: "pageHeroTitle", label: "Page Title",    type: "text" },
        { key: "pageHeroDesc",  label: "Page Subtitle", type: "textarea" },
        { key: "demoBadge",     label: "Badge Info Text", type: "text" },
      ]},
      { title: "Demo Login Page Branding", fields: [
        { key: "loginHeroTitle",    label: "Login Portal Heading",     type: "text" },
        { key: "loginHeroDesc",     label: "Login Portal Subheading",  type: "textarea" },
        { key: "loginStatusText",   label: "Secure Node Status Text",  type: "text" },
        { key: "loginBadge1",       label: "Secure Badge 1 (Left)",    type: "text" },
        { key: "loginBadge2",       label: "Secure Badge 2 (Right)",   type: "text" },
      ]},
      { title: "Demo Login Features Highlight", fields: [
        { key: "loginFeat1Title",   label: "Feature 1 Heading",        type: "text" },
        { key: "loginFeat1Desc",    label: "Feature 1 Description",    type: "textarea" },
        { key: "loginFeat2Title",   label: "Feature 2 Heading",        type: "text" },
        { key: "loginFeat2Desc",    label: "Feature 2 Description",    type: "textarea" },
        { key: "loginFeat3Title",   label: "Feature 3 Heading",        type: "text" },
        { key: "loginFeat3Desc",    label: "Feature 3 Description",    type: "textarea" },
      ]},
      { title: "Demo Login Form & Compliance", fields: [
        { key: "formCardTitle",     label: "Form Card Title",          type: "text" },
        { key: "formCardEncryption",label: "Form Encryption Pill",     type: "text" },
        { key: "loginCompliance",   label: "Compliance Policy Text",   type: "textarea" },
      ]},
      { title: "Demo Task Disclaimer Banner", fields: [
        { key: "demoPaymentDisclaimer", label: "Demo Payment Disclaimer (Banner on Menu)", type: "textarea" },
        { key: "taskDisclaimerDuringTask", label: "Disclaimer During Active Task (Topbar)", type: "textarea" },
      ]},
      { title: "Demo Task Report Configuration", fields: [
        { key: "reportTitle", label: "Report Modal Title", type: "text" },
        { key: "reportSub", label: "Report Modal Subtitle", type: "textarea" },
        { key: "reportApprovalThreshold", label: "Approval Threshold Accuracy % (e.g. 95)", type: "text" },
        { key: "reportEligibleHeading", label: "Eligible Alert Heading", type: "text" },
        { key: "reportEligibleSub", label: "Eligible Alert Subtitle", type: "textarea" },
        { key: "reportNotEligibleHeading", label: "Not Eligible Alert Heading", type: "text" },
        { key: "reportNotEligibleSub", label: "Not Eligible Alert Subtitle", type: "textarea" },
        { key: "reportStatusApprovedText", label: "Task Approved Status Label", type: "text" },
        { key: "reportStatusRejectedText", label: "Task Rejected Status Label", type: "text" },
        { key: "reportApprovedDesc", label: "Approved Description Text", type: "textarea" },
        { key: "reportRejectedDesc", label: "Rejected Description Text", type: "textarea" },
        { key: "reportStrengthHigh", label: "Strength Text (Accuracy >= 80%)", type: "textarea" },
        { key: "reportImprovementHigh", label: "Improvement Text (Accuracy >= 80%)", type: "textarea" },
        { key: "reportSuggestionHigh", label: "Suggestion Text (Accuracy >= 80%)", type: "textarea" },
        { key: "reportStrengthMedium", label: "Strength Text (60% <= Accuracy < 80%)", type: "textarea" },
        { key: "reportImprovementMedium", label: "Improvement Text (60% <= Accuracy < 80%)", type: "textarea" },
        { key: "reportSuggestionMedium", label: "Suggestion Text (60% <= Accuracy < 80%)", type: "textarea" },
        { key: "reportStrengthLow", label: "Strength Text (Accuracy < 60%)", type: "textarea" },
        { key: "reportImprovementLow", label: "Improvement Text (Accuracy < 60%)", type: "textarea" },
        { key: "reportSuggestionLow", label: "Suggestion Text (Accuracy < 60%)", type: "textarea" },
      ]}
    ],
  },
  header: {
    label: "Header / Nav", icon: IHeader,
    sections: [
      { title: "Navigation Links", fields: [
        { key: "nav_userLoginBtn",     label: "User Login Button Text",      type: "text" },
        { key: "nav_employeeLoginBtn", label: "Employee Login Button Text",  type: "text" },
        { key: "nav_employeeLoginUrl", label: "Employee Login URL",          type: "url" },
      ]},
      { title: "Version Modal", fields: [
        { key: "modal_title",  label: "Modal Title",       type: "text" },
        { key: "modal_desc",   label: "Modal Description", type: "textarea" },
        { key: "v1_label",     label: "Version 1 Label",   type: "text" },
        { key: "v1_url",       label: "Version 1 URL",     type: "url" },
        { key: "v2_label",     label: "Version 2 Label",   type: "text" },
        { key: "v2_url",       label: "Version 2 URL",     type: "url" },
      ]},
    ],
  },
  footer: {
    label: "Footer", icon: IFooter,
    sections: [
      { title: "Footer Brand", fields: [
        { key: "brandDesc", label: "Brand Description Text", type: "textarea" },
        { key: "copyright", label: "Copyright Text",         type: "text" },
        { key: "tagline",   label: "Footer Tagline",         type: "text" },
      ]},
      { title: "Footer Credentials", fields: [
        { key: "gstinNumber",  label: "GSTIN Number Text",  type: "text" },
        { key: "msmeNumber",   label: "MSME Number Text",   type: "text" },
      ]},
      { title: "Footer Contact & Socials", fields: [
        { key: "emailGeneral", label: "General Email (e.g. info@workden.online)", type: "text" },
        { key: "emailSupport", label: "Support Email (e.g. support@workden.online)", type: "text" },
        { key: "address1",     label: "Office Address 1",         type: "text" },
        { key: "address2",     label: "Office Address 2",         type: "text" },
        { key: "facebookUrl",  label: "Facebook URL",             type: "url" },
        { key: "instagramUrl", label: "Instagram URL",            type: "url" },
        { key: "linkedinUrl",  label: "LinkedIn URL",             type: "url" },
        { key: "telegramUrl",  label: "Telegram URL",             type: "url" },
      ]},
    ],
  },
};

// ─── Default Content Array Structures ──────────────────────────────────────────
const DEFAULT_CONTENT: Record<string, any> = {
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
      { title: "Government Registered", desc: "GSTIN & MSME certified business. Fully compliant with Indian regulations.", icon: "fas fa-shield-halved", bg: "#eff6ff", color: "var(--brand)" },
      { title: "Free Demo First", desc: "Try a real demo task before committing anything. See exactly how the platform works.", icon: "fas fa-circle-play", bg: "#f0fdf4", color: "var(--green)" },
      { title: "Multiple Task Types", desc: "Data entry, form filling, typing, captcha, grammar correction, chat support.", icon: "fas fa-layer-group", bg: "#fdf4ff", color: "#9333ea" },
      { title: "Work From Anywhere", desc: "Just a phone or laptop is enough. Flexible hours, no commute, no dress code.", icon: "fas fa-mobile-screen", bg: "#fff7ed", color: "#ea580c" },
      { title: "Dedicated Support", desc: "Recruiter teams assist you through onboarding, task completion, and any doubts.", icon: "fas fa-headset", bg: "#fffbeb", color: "var(--gold)" },
      { title: "Clear Policies", desc: "All terms, payment structure, and review policies are published openly.", icon: "fas fa-file-contract", bg: "#fef2f2", color: "#dc2626" }
    ],
    categories: [
      { title: "Form Filling", desc: "Fill structured forms using given data. Easy, guided, and clearly defined.", icon: "fas fa-file-pen", bg: "#eff6ff", color: "var(--brand)" },
      { title: "Data Entry", desc: "Input data into databases from reference sheets. Simple copy-enter tasks.", icon: "fas fa-table", bg: "#f5f3ff", color: "#7c3aed" },
      { title: "Email Support", desc: "Handle customer emails using predefined templates. Template-based replies.", icon: "fas fa-envelope", bg: "#f0fdf4", color: "var(--green)" },
      { title: "Chat Support", desc: "Respond to live chat queries from the dashboard with guided answer templates.", icon: "fas fa-message", bg: "#fff7ed", color: "#ea580c" },
      { title: "Grammar Correction", desc: "Fix highlighted errors in short text documents. Clear indicators shown.", icon: "fas fa-spell-check", bg: "#fef2f2", color: "#e11d48" },
      { title: "Typing Tasks", desc: "Type the text shown in the dashboard into the input box. Perfect for beginners.", icon: "fas fa-keyboard", bg: "#fffbeb", color: "var(--gold)" }
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
          "No Earning Limit"
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
      { title: "Form Filling", desc: "Fill structured online forms with given instructions. Data is pre-provided — you simply enter it accurately.", icon: "fas fa-file-pen", bg: "#eff6ff", color: "var(--brand)", level: "Easy · No Experience Needed", badges: ["Most Popular", "Beginner"] },
      { title: "Data Entry", desc: "Enter structured spreadsheet data into a secure database. Straightforward copy-and-enter tasks.", icon: "fas fa-table", bg: "#f5f3ff", color: "#7c3aed", level: "Easy · Basic Typing", badges: ["High Volume", "Beginner"] },
      { title: "Email Support", desc: "Handle basic customer email queries using predefined templates. Templates are provided.", icon: "fas fa-envelope", bg: "#f0fdf4", color: "var(--green)", level: "Medium · Template Based", badges: ["Intermediate"] },
      { title: "Chat Support", desc: "Respond to live chat queries from the dashboard using guided templates. Quick responses.", icon: "fas fa-message", bg: "#fff7ed", color: "#ea580c", level: "Medium · Communication", badges: ["Intermediate"] },
      { title: "Grammar Correction", desc: "Edit and correct short text documents for grammatical errors. Clear error indicators shown.", icon: "fas fa-spell-check", bg: "#fef2f2", color: "#dc2626", level: "Medium · Accuracy", badges: ["Intermediate"] },
      { title: "Typing Tasks", desc: "Type the same text shown in the dashboard into the input box. Simple and straightforward.", icon: "fas fa-keyboard", bg: "#fffbeb", color: "var(--gold)", level: "Easy · Basic Typing", badges: ["Beginner"] },
      { title: "Captcha Filling", desc: "Enter captcha codes displayed in the dashboard into the designated input field. Simple, repeatable task.", icon: "fas fa-hashtag", bg: "#eff6ff", color: "var(--brand)", level: "Easy · Repeatable", badges: ["Beginner"] }
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
      { id: "data",    name: "Data Entry",          emoji: "📊", items: 10,  timeMin: 60, desc: "Type given data into fields accurately", color: "#EA580C", num: 1, hcls: "orange", howto: ["Study the reference data card at the top of each item.","Type each value exactly as shown — including spaces and formats.","Pay special attention to Aadhar, PAN, DOB, and PIN formats.","All fields are required — do not leave any blank.","Click Save to check your accuracy for that item."] },
      { id: "form",    name: "Form Filling",        emoji: "🧾", items: 10,  timeMin: 60, desc: "Fill online forms with provided information", color: "#059669", num: 2, hcls: "green", howto: ["Read all reference data in the blue box at the top.","Fill each field exactly as shown in the reference (spelling, spacing, case).","Do not skip any field marked with a red asterisk (*).","Type manually — copy-paste is disabled.","Click Save when all fields are filled to see your score."] },
      { id: "typing",  name: "PDF to Word Typing",  emoji: "⌨️", items: 10,  timeMin: 60, desc: "Type PDF content into text format accurately", color: "#7C3AED", num: 3, hcls: "", howto: ["Read the content shown in the yellow box carefully.","Type the exact same content in the text box below — word for word.","You must type at least 100 words to pass this item.","Do NOT copy-paste — type manually using the keyboard.","Spelling and accuracy matter — type carefully."] },
      { id: "grammar", name: "Grammar Correction",  emoji: "✍️", items: 10,  timeMin: 60, desc: "Correct grammatical errors in given texts", color: "#7C3AED", num: 4, hcls: "", howto: ["Read the incorrect paragraph carefully — error types are shown below.","Identify all grammatical mistakes.","Type the fully corrected paragraph in the text box below.","Do not change the meaning — only fix grammar errors.","Your answer must be at least 13 characters to be accepted."] }
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
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState("home");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [content, setContent] = useState<Record<string, any>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [testiTypeFilter, setTestiTypeFilter] = useState<"video" | "screenshot" | "written">("video");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content/get?t=" + Date.now(), { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.website) setContent(json.data.website);
          if (json.data.testimonials) setTestimonials(json.data.testimonials);
        }
      } catch { showToast("Failed to load data. Check Firebase.", false); }
      finally { setLoading(false); }
    })();
  }, []);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const updateField = (page: string, key: string, val: any) =>
    setContent(p => ({ ...p, [page]: { ...(p[page] || {}), [key]: val } }));

  const handleSave = async () => {
    // 1. Validate testimonials
    for (const t of testimonials) {
      if (t.imageUrl && t.imageUrl.startsWith("data:")) {
        showToast("⚠️ Error: Please paste a Google Drive link or standard image URL instead of direct base64 data.", false);
        return;
      }
      if (t.imageUrl && t.imageUrl.length > 2000) {
        showToast("⚠️ Error: Image URL is too long. Please use a clean Google Drive sharing link.", false);
        return;
      }
    }

    // 2. Generic validation
    for (const pageKey in content) {
      for (const fieldKey in content[pageKey]) {
        const val = content[pageKey][fieldKey];
        if (typeof val === "string") {
          if (val.startsWith("data:")) {
            showToast(`⚠️ Error in ${pageKey}: Base64 data URLs are not allowed. Please use standard URLs/links.`, false);
            return;
          }
          if (val.length > 20000) {
            showToast(`⚠️ Error in ${pageKey}: Content for '${fieldKey}' is too long. Limit is 20,000 characters.`, false);
            return;
          }
        }
      }
    }

    // 3. Size check
    const payloadStr = JSON.stringify({ type: "content", data: { website: content, testimonials } });
    if (payloadStr.length > 800000) {
      showToast("⚠️ Error: Total content size is too large. Please shorten texts or use Drive links.", false);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payloadStr,
      });
      const json = await res.json();
      json.success
        ? showToast("✓ Saved! Website updated live.", true)
        : showToast("Error: " + (json.message || "Unknown"), false);
    } catch { showToast("Network error. Try again.", false); }
    finally { setSaving(false); }
  };

  const handleLogout = async () => {
    try { await fetch("/api/admin/logout", { method: "POST" }); } catch {}
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
    router.refresh();
  };

  // ─── Testimonials Logic ──────────────────────────────────────────────────
  const addTesti = () => {
    const newTesti = {
      id: Date.now().toString(),
      type: testiTypeFilter,
      name: "",
      city: "Pune, India",
      role: "",
      text: testiTypeFilter === "written" ? "Write review here..." : "",
      initials: "AB",
      gradient: "linear-gradient(135deg,#1d4ed8,#2563eb)",
      imageUrl: "",
      videoUrl: ""
    };
    setTestimonials(p => [newTesti, ...p]);
  };

  const removeTesti = (id: string) => setTestimonials(p => p.filter(t => t.id !== id));
  
  const updateTesti = (id: string, k: string, v: any) =>
    setTestimonials(p => p.map(t => t.id === id ? { ...t, [k]: v } : t));

  const convertDriveImageUrl = (url: string): string => {
    if (!url) return "";
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
    return url;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <ILoad />
    </div>
  );

  const currentPage = PAGES[tab];

  // ─── Re-order Helper Functions ─────────────────────────────────────────────
  const moveItem = (pageKey: string, arrayKey: string, index: number, direction: "up" | "down") => {
    const list = [...(content[pageKey]?.[arrayKey] || DEFAULT_CONTENT[pageKey]?.[arrayKey] || [])];
    if (direction === "up" && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    updateField(pageKey, arrayKey, list);
  };

  const deleteItem = (pageKey: string, arrayKey: string, index: number) => {
    const list = [...(content[pageKey]?.[arrayKey] || DEFAULT_CONTENT[pageKey]?.[arrayKey] || [])];
    const filtered = list.filter((_, i) => i !== index);
    updateField(pageKey, arrayKey, filtered);
  };

  const addItem = (pageKey: string, arrayKey: string, templateObj: any) => {
    const list = [...(content[pageKey]?.[arrayKey] || DEFAULT_CONTENT[pageKey]?.[arrayKey] || [])];
    list.push({ ...templateObj, _localId: Date.now().toString() });
    updateField(pageKey, arrayKey, list);
  };

  const updateItemField = (pageKey: string, arrayKey: string, index: number, field: string, val: any) => {
    const list = [...(content[pageKey]?.[arrayKey] || DEFAULT_CONTENT[pageKey]?.[arrayKey] || [])];
    list[index] = { ...list[index], [field]: val };
    updateField(pageKey, arrayKey, list);
  };

  // ─── Sub-string Tag List Editor Helper ────────────────────────────────────
  const renderStringListEditor = (
    label: string,
    list: string[] | undefined,
    onChange: (newList: string[]) => void
  ) => {
    const arr = list || [];
    return (
      <div className="mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
          <button
            type="button"
            onClick={() => onChange([...arr, ""])}
            className="text-[10px] font-black bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 transition-all"
          >
            + Add Line
          </button>
        </div>
        {arr.length === 0 && (
          <p className="text-[11px] text-slate-600 italic">No lines added yet. Click "+ Add Line".</p>
        )}
        {arr.map((val, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              value={val}
              onChange={(e) => {
                const updated = [...arr];
                updated[idx] = e.target.value;
                onChange(updated);
              }}
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white placeholder-slate-600 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Full Access to Tasks"
            />
            <button
              type="button"
              onClick={() => {
                const updated = arr.filter((_, i) => i !== idx);
                onChange(updated);
              }}
              className="text-red-400 hover:text-red-300 text-xs px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside className={`${sidebarOpen ? "w-56" : "w-0"} transition-all duration-200 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden flex-shrink-0`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs flex-shrink-0">W</div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-white truncate">WorkDen Admin</div>
              <div className="text-xs text-slate-500">Content Manager</div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1.5">Pages</p>
          {Object.entries(PAGES).filter(([k]) => k !== "header" && k !== "footer").map(([key, p]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === key ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
              {<p.icon />} <span className="truncate">{p.label}</span>
            </button>
          ))}
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pt-3 pb-1.5">Components</p>
          <button onClick={() => setTab("testimonials")}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === "testimonials" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <IStar /> Testimonials
          </button>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pt-3 pb-1.5">Global Settings</p>
          <button onClick={() => setTab("header")}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === "header" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <IHeader /> Header / Nav
          </button>
          <button onClick={() => setTab("footer")}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === "footer" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <IFooter /> Footer
          </button>
        </nav>

        {/* Sign out */}
        <div className="p-3 border-t border-slate-800 flex-shrink-0">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all">
            <ILogout /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top Actions bar */}
        <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(o => !o)}
              className="text-slate-500 hover:text-white transition-colors p-1">
              <IHeader />
            </button>
            <div>
              <h1 className="text-sm font-bold text-white">
                {tab === "testimonials" ? "Testimonials Page" : currentPage?.label || "Settings"}
              </h1>
              <p className="text-xs text-slate-500">Add, edit, reorder & publish live content instantly.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tab === "testimonials" && (
              <button onClick={addTesti}
                className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                <IPlus /> Add Testimonial
              </button>
            )}
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-900/40">
              {saving ? <ILoad /> : <ISave />}
              {saving ? "Saving…" : "Save & Publish"}
            </button>
          </div>
        </header>

        {/* Live Toast alert */}
        {toast && (
          <div className={`mx-6 mt-3 px-4 py-2.5 rounded-xl text-xs font-semibold flex-shrink-0 ${toast.ok ? "bg-green-900/60 text-green-300 border border-green-700" : "bg-red-900/60 text-red-300 border border-red-700"}`}>
            {toast.msg}
          </div>
        )}

        {/* Editor Main Canvas */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* 1. RENDER FLAT FIELDS (headings, buttons, badge text) */}
            {tab !== "testimonials" && currentPage && currentPage.sections.map(section => (
              <div key={section.title} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{section.title}</h2>
                </div>
                <div className="p-5 space-y-4">
                  {section.fields.map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{field.label}</label>
                      {field.hint && <p className="text-[11px] text-slate-500 mb-1">{field.hint}</p>}
                      {field.type === "text" || field.type === "url" ? (
                        <input type={field.type === "url" ? "url" : "text"}
                          value={content[tab]?.[field.key] ?? DEFAULT_CONTENT[tab]?.[field.key] ?? ""}
                          onChange={e => updateField(tab, field.key, e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder={field.type === "url" ? "https://…" : `Enter ${field.label.toLowerCase()}…`}
                        />
                      ) : (
                        <textarea
                          value={content[tab]?.[field.key] ?? DEFAULT_CONTENT[tab]?.[field.key] ?? ""}
                          onChange={e => updateField(tab, field.key, e.target.value)}
                          rows={field.type === "richtext" ? 3 : 2}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y font-mono"
                          placeholder={`Enter ${field.label.toLowerCase()}…`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 2. RENDER ARRAY EDITORS (ADD, REMOVE, SORT CARD LISTS) */}
            {tab === "home" && (
              <>
                {/* Home features list */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Why WorkDen features list</h2>
                    <button onClick={() => addItem("home", "features", { title: "", desc: "", icon: "fas fa-circle", bg: "#eff6ff", color: "var(--brand)" })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Feature
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.home?.features || DEFAULT_CONTENT.home.features).map((feat: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("home", "features", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("home", "features", idx, "down")} disabled={idx === (content.home?.features || DEFAULT_CONTENT.home.features).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("home", "features", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Feature #{idx + 1}</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Title</label>
                            <input value={feat.title || ""} onChange={e => updateItemField("home", "features", idx, "title", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Icon Class</label>
                            <input value={feat.icon || ""} onChange={e => updateItemField("home", "features", idx, "icon", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="fas fa-shield-halved" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Description</label>
                          <textarea rows={2} value={feat.desc || ""} onChange={e => updateItemField("home", "features", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Bg Color</label>
                            <input value={feat.bg || ""} onChange={e => updateItemField("home", "features", idx, "bg", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="#eff6ff" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Icon Color</label>
                            <input value={feat.color || ""} onChange={e => updateItemField("home", "features", idx, "color", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="var(--brand)" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Categories list */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Work Categories list</h2>
                    <button onClick={() => addItem("home", "categories", { title: "", desc: "", icon: "fas fa-file-pen", bg: "#eff6ff", color: "var(--brand)" })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Category
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.home?.categories || DEFAULT_CONTENT.home.categories).map((cat: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("home", "categories", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("home", "categories", idx, "down")} disabled={idx === (content.home?.categories || DEFAULT_CONTENT.home.categories).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("home", "categories", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Category #{idx + 1}</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Title</label>
                            <input value={cat.title || ""} onChange={e => updateItemField("home", "categories", idx, "title", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Icon Class</label>
                            <input value={cat.icon || ""} onChange={e => updateItemField("home", "categories", idx, "icon", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="fas fa-file-pen" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Description</label>
                          <textarea rows={2} value={cat.desc || ""} onChange={e => updateItemField("home", "categories", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Bg Color</label>
                            <input value={cat.bg || ""} onChange={e => updateItemField("home", "categories", idx, "bg", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Icon Color</label>
                            <input value={cat.color || ""} onChange={e => updateItemField("home", "categories", idx, "color", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Steps list */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">How to Get Started Steps list</h2>
                    <button onClick={() => addItem("home", "steps", { title: "", desc: "" })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Step
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.home?.steps || DEFAULT_CONTENT.home.steps).map((step: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("home", "steps", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("home", "steps", idx, "down")} disabled={idx === (content.home?.steps || DEFAULT_CONTENT.home.steps).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("home", "steps", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Step #{idx + 1}</div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Title</label>
                          <input value={step.title || ""} onChange={e => updateItemField("home", "steps", idx, "title", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Description</label>
                          <textarea rows={2} value={step.desc || ""} onChange={e => updateItemField("home", "steps", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "plans" && (
              <>
                {/* Plans Page - pricing array list */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pricing Plans list</h2>
                    <button onClick={() => addItem("plans", "plansList", { id: "custom", name: "", price: "", desc: "", isPaid: false, isPopular: false, refundNote: "", features: [] })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Plan
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.plans?.plansList || DEFAULT_CONTENT.plans.plansList).map((plan: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("plans", "plansList", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("plans", "plansList", idx, "down")} disabled={idx === (content.plans?.plansList || DEFAULT_CONTENT.plans.plansList).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("plans", "plansList", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Plan #{idx + 1} ({plan.isPaid ? "Paid" : "Free"})</div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Plan ID (slug)</label>
                            <input value={plan.id || ""} onChange={e => updateItemField("plans", "plansList", idx, "id", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="typing" />
                          </div>
                          <div className="col-span-2">
                            <label className="text-[11px] text-slate-400 font-semibold">Plan Name</label>
                            <input value={plan.name || ""} onChange={e => updateItemField("plans", "plansList", idx, "name", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Price (₹ or "Free")</label>
                            <input value={plan.price || ""} onChange={e => updateItemField("plans", "plansList", idx, "price", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div className="flex items-center gap-2 pt-5">
                            <input type="checkbox" id={`paid-${idx}`} checked={!!plan.isPaid} onChange={e => updateItemField("plans", "plansList", idx, "isPaid", e.target.checked)} />
                            <label htmlFor={`paid-${idx}`} className="text-xs text-slate-300 font-semibold cursor-pointer">Paid Plan</label>
                          </div>
                          <div className="flex items-center gap-2 pt-5">
                            <input type="checkbox" id={`pop-${idx}`} checked={!!plan.isPopular} onChange={e => updateItemField("plans", "plansList", idx, "isPopular", e.target.checked)} />
                            <label htmlFor={`pop-${idx}`} className="text-xs text-slate-300 font-semibold cursor-pointer">Popular Card</label>
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Description</label>
                          <textarea rows={2} value={plan.desc || ""} onChange={e => updateItemField("plans", "plansList", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Refund Warning Label (Paid only)</label>
                          <input value={plan.refundNote || ""} onChange={e => updateItemField("plans", "plansList", idx, "refundNote", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="⚠️ Note: Refund is not..." />
                        </div>
                        {/* Plan dynamic features list editor */}
                        {renderStringListEditor("Plan Features List", plan.features, (newList) => {
                          updateItemField("plans", "plansList", idx, "features", newList);
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plans valueProposition strip */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Value proposition cards</h2>
                    <button onClick={() => addItem("plans", "valueCards", { title: "", desc: "", icon: "fas fa-check" })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Card
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.plans?.valueCards || DEFAULT_CONTENT.plans.valueCards).map((card: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("plans", "valueCards", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("plans", "valueCards", idx, "down")} disabled={idx === (content.plans?.valueCards || DEFAULT_CONTENT.plans.valueCards).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("plans", "valueCards", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Card #{idx + 1}</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Title</label>
                            <input value={card.title || ""} onChange={e => updateItemField("plans", "valueCards", idx, "title", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Icon Class</label>
                            <input value={card.icon || ""} onChange={e => updateItemField("plans", "valueCards", idx, "icon", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Description</label>
                          <textarea rows={2} value={card.desc || ""} onChange={e => updateItemField("plans", "valueCards", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "about" && (
              <>
                {/* Team Leadership List */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leadership Team list</h2>
                    <button onClick={() => addItem("about", "teamList", { name: "", role: "", imageUrl: "" })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Member
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.about?.teamList || DEFAULT_CONTENT.about.teamList).map((member: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("about", "teamList", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("about", "teamList", idx, "down")} disabled={idx === (content.about?.teamList || DEFAULT_CONTENT.about.teamList).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("about", "teamList", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Member #{idx + 1}</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Name</label>
                            <input value={member.name || ""} onChange={e => updateItemField("about", "teamList", idx, "name", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Role / Title</label>
                            <input value={member.role || ""} onChange={e => updateItemField("about", "teamList", idx, "role", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">📎 Photo Link (Google Drive share link — optional)</label>
                          <input value={member.imageUrl || ""} onChange={e => updateItemField("about", "teamList", idx, "imageUrl", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="https://drive.google.com/file/d/..." />
                          {member.imageUrl && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-[10px] text-slate-500">Live Preview:</span>
                              <img src={convertDriveImageUrl(member.imageUrl)} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" onError={(e: any) => { e.target.style.display="none"; }} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "projects" && (
              <>
                {/* Projects Grid List */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Projects list</h2>
                    <button onClick={() => addItem("projects", "projectsList", { title: "", desc: "", icon: "fas fa-check", bg: "#eff6ff", color: "var(--brand)", level: "Easy", badges: [] })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Project
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.projects?.projectsList || DEFAULT_CONTENT.projects.projectsList).map((proj: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("projects", "projectsList", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("projects", "projectsList", idx, "down")} disabled={idx === (content.projects?.projectsList || DEFAULT_CONTENT.projects.projectsList).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("projects", "projectsList", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Project #{idx + 1}</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Title</label>
                            <input value={proj.title || ""} onChange={e => updateItemField("projects", "projectsList", idx, "title", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Icon Class</label>
                            <input value={proj.icon || ""} onChange={e => updateItemField("projects", "projectsList", idx, "icon", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="fas fa-file-pen" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Description</label>
                          <textarea rows={2} value={proj.desc || ""} onChange={e => updateItemField("projects", "projectsList", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Bg Color</label>
                            <input value={proj.bg || ""} onChange={e => updateItemField("projects", "projectsList", idx, "bg", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Icon Color</label>
                            <input value={proj.color || ""} onChange={e => updateItemField("projects", "projectsList", idx, "color", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Work Level</label>
                            <input value={proj.level || ""} onChange={e => updateItemField("projects", "projectsList", idx, "level", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="Easy · Basic Typing" />
                          </div>
                        </div>
                        {/* Dynamic project tags / badges */}
                        {renderStringListEditor("Project Badges / Tags", proj.badges, (newList) => {
                          updateItemField("projects", "projectsList", idx, "badges", newList);
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "blogs" && (
              <>
                {/* Blogs Grid List */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blogs List</h2>
                    <button onClick={() => addItem("blogs", "blogsList", { title: "", desc: "", tag: "New", url: "#", date: "2026" })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Blog
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content.blogs?.blogsList || DEFAULT_CONTENT.blogs.blogsList).map((blog: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("blogs", "blogsList", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("blogs", "blogsList", idx, "down")} disabled={idx === (content.blogs?.blogsList || DEFAULT_CONTENT.blogs.blogsList).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("blogs", "blogsList", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Blog #{idx + 1}</div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Title</label>
                          <input value={blog.title || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "title", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Description / Excerpt</label>
                          <textarea rows={2} value={blog.desc || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Tag</label>
                            <input value={blog.tag || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "tag", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Page Link / URL</label>
                            <input value={blog.url || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "url", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="blogs/my-page.html" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Year / Date</label>
                            <input value={blog.date || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "date", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "demo-task" && (
              <>
                {/* Demo tasksList editor */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Demo Task Levels list</h2>
                    <button onClick={() => addItem("demo-task", "tasksList", { id: "custom", name: "", emoji: "📝", items: 10, timeMin: 60, desc: "", color: "#7C3AED", num: 1, howto: [] })}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1">
                      <IPlus /> Add Task Level
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {(content["demo-task"]?.tasksList || DEFAULT_CONTENT["demo-task"].tasksList).map((task: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative space-y-3">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem("demo-task", "tasksList", idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30">▲</button>
                          <button onClick={() => moveItem("demo-task", "tasksList", idx, "down")} disabled={idx === (content["demo-task"]?.tasksList || DEFAULT_CONTENT["demo-task"].tasksList).length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">▼</button>
                          <button onClick={() => deleteItem("demo-task", "tasksList", idx)} className="text-red-400 hover:text-red-300 ml-1"><ITrash /></button>
                        </div>
                        <div className="pr-20 font-semibold text-slate-300 text-xs">Task #{idx + 1} ({task.id})</div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Task ID</label>
                            <input value={task.id || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "id", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="typing" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Emoji</label>
                            <input value={task.emoji || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "emoji", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Task Number</label>
                            <input type="number" value={task.num || 0} onChange={e => updateItemField("demo-task", "tasksList", idx, "num", parseInt(e.target.value, 10))} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="col-span-2">
                            <label className="text-[11px] text-slate-400 font-semibold">Task Name</label>
                            <input value={task.name || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "name", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Theme Color</label>
                            <input value={task.color || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "color", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="#7C3AED" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Total Items</label>
                            <input type="number" value={task.items || 0} onChange={e => updateItemField("demo-task", "tasksList", idx, "items", parseInt(e.target.value, 10))} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Time Limit (mins)</label>
                            <input type="number" value={task.timeMin || 0} onChange={e => updateItemField("demo-task", "tasksList", idx, "timeMin", parseInt(e.target.value, 10))} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold">Hcls class (blue/green/orange)</label>
                            <input value={task.hcls || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "hcls", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="blue" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-semibold">Short Description</label>
                          <textarea rows={2} value={task.desc || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white resize-y" />
                        </div>
                        {/* Dynamic Task How-to instructions list */}
                        {renderStringListEditor("Task Instructions (HOWTO steps)", task.howto, (newList) => {
                          updateItemField("demo-task", "tasksList", idx, "howto", newList);
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 3. TESTIMONIALS MANAGER VIEW */}
            {tab === "testimonials" && (
              <div className="space-y-4">
                {/* Toggle filters */}
                <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 flex gap-2">
                  <button onClick={() => setTestiTypeFilter("video")} className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all ${testiTypeFilter === "video" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>🎥 Videos Marquee</button>
                  <button onClick={() => setTestiTypeFilter("screenshot")} className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all ${testiTypeFilter === "screenshot" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>📸 Screen Shots Grid</button>
                  <button onClick={() => setTestiTypeFilter("written")} className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all ${testiTypeFilter === "written" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>✍️ Written reviews</button>
                </div>

                {/* Instructions */}
                <div className="bg-blue-900/30 border border-blue-700/50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-blue-300 mb-1">💡 Instructions for {testiTypeFilter} testimonials</p>
                  <p className="text-xs text-blue-400 leading-relaxed">
                    {testiTypeFilter === "video" && (
                      <>
                        1. Upload the video to Google Drive → Share it as "Anyone with link" → Copy link<br/>
                        2. Paste the link into the "Video URL" field below. The system converts it into a responsive iframe embed.<br/>
                        3. Videos loop seamlessly in the marquee track on testimonials.html.
                      </>
                    )}
                    {testiTypeFilter === "screenshot" && (
                      <>
                        1. Upload the screenshot to Google Drive → Share it as "Anyone with link" → Copy link<br/>
                        2. Paste the link into the "Photo URL" field below. The system converts it into an instant thumbnail.<br/>
                        3. Click-to-open lightbox functionality binds automatically.
                      </>
                    )}
                    {testiTypeFilter === "written" && (
                      <>
                        1. Type review text, author name, initials, and gradient avatar falls.<br/>
                        2. Written cards align in a premium responsive masonry grid.
                      </>
                    )}
                  </p>
                </div>

                {testimonials.filter(t => t.type === testiTypeFilter).length === 0 && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-10 text-center text-slate-500 text-sm">
                    No {testiTypeFilter} testimonials. Click "Add Testimonial" to create one.
                  </div>
                )}

                {testimonials.filter(t => t.type === testiTypeFilter).map(t => (
                  <div key={t.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 relative">
                    <button onClick={() => removeTesti(t.id)}
                      className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors">
                      <ITrash />
                    </button>

                    <div className="grid grid-cols-2 gap-3 mb-3 pr-10">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Author Name</label>
                        <input value={t.name} onChange={e => updateTesti(t.id, "name", e.target.value)}
                          placeholder="e.g. Priya Kapoor"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">City / Location</label>
                        <input value={t.city || ""} onChange={e => updateTesti(t.id, "city", e.target.value)}
                          placeholder="e.g. Pune, India"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    </div>

                    {testiTypeFilter === "written" && (
                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Review Text</label>
                        <textarea value={t.text} onChange={e => updateTesti(t.id, "text", e.target.value)}
                          rows={2} placeholder="Write the review here…"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y" />
                      </div>
                    )}

                    {testiTypeFilter === "video" && (
                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-slate-400 mb-1">🎥 Video URL (Google Drive share link)</label>
                        <input value={t.videoUrl || ""} onChange={e => updateTesti(t.id, "videoUrl", e.target.value)}
                          placeholder="https://drive.google.com/file/d/…/view?usp=sharing"
                          className="w-full bg-slate-800 border border-blue-700/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    )}

                    {testiTypeFilter === "screenshot" && (
                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-slate-400 mb-1">📸 Photo URL (Google Drive share link)</label>
                        <input value={t.imageUrl || ""} onChange={e => updateTesti(t.id, "imageUrl", e.target.value)}
                          placeholder="https://drive.google.com/file/d/…/view?usp=sharing"
                          className="w-full bg-slate-800 border border-blue-700/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    )}

                    {testiTypeFilter !== "screenshot" && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Initials (Avatar fallback)</label>
                          <input maxLength={2} value={t.initials || ""} onChange={e => updateTesti(t.id, "initials", e.target.value)}
                            placeholder="PK"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Avatar Color</label>
                          <select value={t.gradient || ""} onChange={e => updateTesti(t.id, "gradient", e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                            <option value="linear-gradient(135deg,#f59e0b,#ef4444)">🟠 Orange-Red</option>
                            <option value="linear-gradient(135deg,#8b5cf6,#d946ef)">🟣 Purple-Pink</option>
                            <option value="linear-gradient(135deg,#14b8a6,#3b82f6)">🔵 Teal-Blue</option>
                            <option value="linear-gradient(135deg,#10b981,#059669)">🟢 Green</option>
                            <option value="linear-gradient(135deg,#f43f5e,#e11d48)">🔴 Red-Rose</option>
                            <option value="linear-gradient(135deg,#1d4ed8,#6366f1)">💙 Blue-Indigo</option>
                            <option value="linear-gradient(135deg,#ec4899,#f97316)">🌸 Pink-Orange</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Preview box */}
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <p className="text-xs font-semibold text-slate-600 mb-2">Live Preview</p>
                      <div className="bg-slate-800 rounded-xl p-3 flex gap-3 items-start overflow-hidden">
                        {testiTypeFilter === "screenshot" ? (
                          t.imageUrl ? (
                            <img
                              src={convertDriveImageUrl(t.imageUrl)}
                              alt={t.name}
                              className="w-16 h-16 rounded object-cover flex-shrink-0"
                              onError={(e: any) => { e.target.style.display = "none"; }}
                            />
                          ) : <div className="text-xs italic text-slate-500">Paste screenshot link above...</div>
                        ) : (
                          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
                            style={{ background: t.gradient }}>
                            {t.initials || "AB"}
                          </div>
                        )}
                        <div>
                          {testiTypeFilter === "written" && <p className="text-slate-300 text-xs mb-1">{t.text || "Write review text..."}</p>}
                          {testiTypeFilter === "video" && (
                            t.videoUrl ? (
                              <p className="text-blue-400 text-xs font-mono truncate max-w-xs">{t.videoUrl}</p>
                            ) : <p className="text-xs italic text-slate-500">Paste video link above...</p>
                          )}
                          <p className="text-slate-400 font-bold text-xs mt-1">
                            {t.name || "Author Name"} — {t.city || "City"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
