"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

// ─── SVG Icon Helper ──────────────────────────────────────────────────────────
const Icon = ({ d, cls = "w-4 h-4" }: { d: string; cls?: string }) => (
  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);
const IHome    = () => <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />;
const IPlans   = () => <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
const IAbout   = () => <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
const IProj    = () => <Icon d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />;
const IBlog    = () => <Icon d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />;
const IDemo    = () => <Icon d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
const IHeader  = () => <Icon d="M4 6h16M4 12h16M4 18h7" />;
const IFooter  = () => <Icon d="M4 18h16M4 12h16M4 6h7" />;
const ISave    = () => <Icon d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />;
const IPlus    = () => <Icon d="M12 4v16m8-8H4" />;
const ITrash   = () => <Icon d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />;
const ILogout  = () => <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />;
const ILoad    = () => <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>;
const IChevron = () => <Icon d="M19 9l-7 7-7-7" cls="w-3.5 h-3.5" />;
const ISearch  = () => <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" cls="w-3.5 h-3.5" />;

// ─── Schema Configurations ───────────────────────────────────────────────────
type FType = "text" | "textarea" | "richtext" | "url";
type Field = { key: string; label: string; type: FType; hint?: string };
type Section = { title: string; fields: Field[] };
type PageDef = { label: string; icon: React.FC; sections: Section[]; emoji: string };

const PAGES: Record<string, PageDef> = {
  home: {
    label: "Home Page", icon: IHome, emoji: "🏠",
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
    label: "Plans Page", icon: IPlans, emoji: "💳",
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
    label: "About Page", icon: IAbout, emoji: "👤",
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
    label: "Projects Page", icon: IProj, emoji: "📂",
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
    label: "Blogs Page", icon: IBlog, emoji: "📝",
    sections: [
      { title: "Page Hero", fields: [
        { key: "pageHeroTitle", label: "Page Title",    type: "text" },
        { key: "pageHeroDesc",  label: "Page Subtitle", type: "textarea" },
      ]},
    ],
  },
  "demo-task": {
    label: "Demo Task Page", icon: IDemo, emoji: "🎮",
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
      { title: "Demo Login Disclaimer Banners", fields: [
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
    label: "Header / Nav", icon: IHeader, emoji: "🔝",
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
    label: "Footer", icon: IFooter, emoji: "🔻",
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
    valueDesc: "Har plan ko role ke according design kiya gaya hai — task work ke liye paid access aur freelance marketing/calling ke liye free joining option.",
    plansList: [
      { id: "typing", name: "Online Typing Work", price: "999", desc: "Task portal access ke saath training, VIP ID card aur priority support included. Ghar baithe kaam shuru karo.", isPaid: true, isPopular: true, refundNote: "⚠️ <strong>Note:</strong> Refund is not available once the ID is activated. Please read all terms before purchasing.", features: ["Full Access to All Tasks","Professional VIP ID Card","Complete Training + Live Webinar","Live + Priority Support","Easy & Less Tasks Daily","Fast Task Approval","Min. Withdrawal: ₹500","No Earning Limit"] },
      { id: "telecaller", name: "Freelance Telecaller", price: "Free", desc: "Calling, follow-up aur affiliate promotion ke through WorkDen opportunity explain karo. Zero investment required.", isPaid: false, isPopular: false, refundNote: "", features: ["Free Registration — ₹0","Work From Home Calling","Affiliate Marketing Support","Basic Platform Training","Flexible Working Hours","Performance-Based Growth","Weekly Payout via UPI/Bank","Community Access & Support"] },
      { id: "affiliate", name: "Affiliate Marketer", price: "Free", desc: "WorkDen ke products promote karo aur har referral par commission kamao. No targets, no pressure.", isPaid: false, isPopular: false, refundNote: "", features: ["Referral Commission on Every Sale","Dedicated Affiliate Dashboard","Marketing Materials Provided","Social Media Promotion Tools","No Target Pressure","Work Anytime, Anywhere","Instant Payout on Approval","Dedicated Affiliate Support"] }
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
    whoP1: "Founded in 2024, WorkDen is a structured digital task platform designed to connect remote task workers across India.",
    whoP2: "Our platform focuses on accuracy, transparency, and responsible digital participation. We provide users with access to a professional task portal.",
    whoP3: "WorkDen is fully registered under Indian law — GSTIN and MSME certified — making us one of the few verified WFH platforms.",
    whoQuote: "WorkDen operates on a task-based performance model. The platform does not provide employment contracts or guaranteed income.",
    missionText: "To establish a secure and transparent digital task platform that upholds professional standards.",
    visionText: "To become a trusted name in India's digital task ecosystem by enabling remote participation.",
    companyName: "WorkDen",
    establishedYear: "2024",
    office1: "Ashok Nagar, Bangalore – 560001",
    office2: "Parsuram Pur, Motihari – 845416",
    emailGeneral: "info@workden.online",
    emailSupport: "support@workden.online",
    teamList: [
      { name: "Shivam Mishra", role: "Managing Director", imageUrl: "" },
      { name: "Rajesh Tripathi", role: "Operations Head", imageUrl: "" },
      { name: "Utsav Tiwari", role: "Recruitment Lead", imageUrl: "" }
    ]
  },
  projects: {
    pageHeroTitle: "Available Projects",
    pageHeroDesc: "All tasks have clear instructions inside the portal. No experience needed.",
    ctaTitle: "Not sure where to start?",
    ctaDesc: "Try our free demo task — experience the portal before making any decisions.",
    projectsList: [
      { title: "Form Filling", desc: "Fill structured online forms. Data is pre-provided.", icon: "fas fa-file-pen", bg: "#eff6ff", color: "var(--brand)", level: "Easy · No Experience Needed", badges: ["Most Popular", "Beginner"] },
      { title: "Data Entry", desc: "Enter structured data into a secure database. Simple copy-and-enter tasks.", icon: "fas fa-table", bg: "#f5f3ff", color: "#7c3aed", level: "Easy · Basic Typing", badges: ["High Volume", "Beginner"] },
      { title: "Email Support", desc: "Handle customer queries using templates. Templates provided.", icon: "fas fa-envelope", bg: "#f0fdf4", color: "var(--green)", level: "Medium · Template Based", badges: ["Intermediate"] },
      { title: "Chat Support", desc: "Respond to live chat queries using templates. Quick responses.", icon: "fas fa-message", bg: "#fff7ed", color: "#ea580c", level: "Medium · Communication", badges: ["Intermediate"] },
      { title: "Grammar Correction", desc: "Correct short documents for grammatical errors.", icon: "fas fa-spell-check", bg: "#fef2f2", color: "#dc2626", level: "Medium · Accuracy", badges: ["Intermediate"] },
      { title: "Typing Tasks", desc: "Type same text shown in dashboard into input box.", icon: "fas fa-keyboard", bg: "#fffbeb", color: "var(--gold)", level: "Easy · Basic Typing", badges: ["Beginner"] }
    ]
  },
  blogs: {
    pageHeroTitle: "WorkDen Blog",
    pageHeroDesc: "Work from home, data entry aur online tasks se related genuine guides aur safety tips.",
    blogsList: [
      { title: "Work From Home Data Entry Job – Beginner Guide", desc: "Ghar baithe data entry kaise karein? Beginner guide.", tag: "Work From Home", url: "blogs/work-from-home.html", date: "2024" },
      { title: "Online Typing Job Real or Fake? – Complete Truth", desc: "Kya online typing jobs genuine hote hain?", tag: "Typing Jobs", url: "blogs/online-typing-job-real-or-fake.html", date: "2024" },
      { title: "Captcha Work Safe or Not? – Honest Analysis", desc: "Captcha filling jobs safe hain ya nahi?", tag: "Safety Guide", url: "blogs/captcha-work-safe-or-not.html", date: "2024" }
    ]
  },
  "demo-task": {
    pageHeroTitle: "WorkDen Demo Tasks",
    pageHeroDesc: "Choose your skill and try a demo task",
    demoBadge: "🔴 LIVE DEMO – Try All Tasks",
    loginHeroTitle: "WorkDen Demo Practice Portal",
    loginHeroDesc: "Practice real-style tasks, check your accuracy, and track performance.",
    loginStatusText: "Demo Practice Active",
    loginBadge1: "Free Practice Access",
    loginBadge2: "Secure Login",
    loginFeat1Title: "Real-Style Practice Tasks",
    loginFeat1Desc: "Practice Typing, Form Filling, Data Entry in a clean demo workspace.",
    loginFeat2Title: "Instant Accuracy Report",
    loginFeat2Desc: "Get accuracy score, correct entries, and result instantly.",
    loginFeat3Title: "Saved Practice History",
    loginFeat3Desc: "Every demo attempt is saved in your account.",
    formCardTitle: "Login to Demo Workspace",
    formCardEncryption: "Secure Access",
    loginCompliance: "Your demo practice data is saved securely to help you track accuracy.",
    demoPaymentDisclaimer: "Demo tasks are only for practice. No payment will be provided.",
    taskDisclaimerDuringTask: "This is a demo task. It is only for practice.",
    reportTitle: "Demo Performance Report",
    reportSub: "Your performance has been evaluated.",
    reportApprovalThreshold: "95",
    reportEligibleHeading: "You are eligible for this work.",
    reportEligibleSub: "Please purchase a subscription plan to start earning real money!",
    reportNotEligibleHeading: "You are not eligible for this work.",
    reportNotEligibleSub: "Please try again. You need 95%+ accuracy.",
    reportStatusApprovedText: "Task Status: Approved",
    reportStatusRejectedText: "Task Status: Rejected",
    reportApprovedDesc: "You are eligible for live tasks! Start real work now.",
    reportRejectedDesc: "Score 95%+ accuracy to get task approved.",
    reportStrengthHigh: "Excellent accuracy maintained.",
    reportImprovementHigh: "Minor mistakes in a few items.",
    reportSuggestionHigh: "You are ready for live tasks.",
    reportStrengthMedium: "Good consistency.",
    reportImprovementMedium: "Accuracy needs improvement.",
    reportSuggestionMedium: "Practice 2-3 more demo rounds.",
    reportStrengthLow: "You attempted all items.",
    reportImprovementLow: "Low accuracy. Read more carefully.",
    reportSuggestionLow: "Focus on one task type at a time.",
    tasksList: [
      { id: "data",    name: "Data Entry",          emoji: "📊", items: 10,  timeMin: 60, desc: "Type given data into fields accurately", color: "#EA580C", num: 1, hcls: "orange", howto: ["Study the reference data card at the top of each item.","Type each value exactly as shown.","Click Save to check your accuracy."] },
      { id: "form",    name: "Form Filling",        emoji: "🧾", items: 10,  timeMin: 60, desc: "Fill online forms with provided information", color: "#059669", num: 2, hcls: "green", howto: ["Read reference data in the blue box at the top.","Fill each field exactly as shown in reference.","Click Save when done."] },
      { id: "typing",  name: "PDF to Word Typing",  emoji: "⌨️", items: 10,  timeMin: 60, desc: "Type PDF content into text format accurately", color: "#7C3AED", num: 3, hcls: "", howto: ["Read the content shown in yellow box.","Type same content in text box below.","Click Save to check accuracy."] }
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
    brandDesc: "A verified digital task platform delivering remote work. GSTIN & MSME registered.",
    copyright: "© 2026 WorkDen. All rights reserved.",
    tagline: "<i class=\"fas fa-circle-check\"></i> Est. 2024",
    gstinNumber: "GSTIN: 10KEJPM6504N1Z7",
    msmeNumber: "MSME: UDYAM-KR-03-0640514",
    emailGeneral: "info@workden.online",
    emailSupport: "support@workden.online",
    address1: "Ashok Nagar, Bangalore – 560001",
    address2: "Parsuram Pur, Motihari – 845416",
    facebookUrl: "https://www.facebook.com/people/Workden-India/61583820256534/",
    instagramUrl: "https://www.instagram.com/workden_wfh",
    linkedinUrl: "https://www.linkedin.com/in/workden-india-315391383/",
    telegramUrl: "https://t.me/+f_s3cLM1WwYxNjE1"
  }
};

// ─── Collapsible Section Component ────────────────────────────────────────────
function CollapsibleSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between group cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wide">{title}</h2>
        <div className={`transition-transform duration-200 text-gray-450 ${open ? "rotate-180" : ""}`}>
          <IChevron />
        </div>
      </button>
      {open && <div className="p-5 space-y-5 bg-white">{children}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState("home"); // default to edit Home page directly (standard human design)
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [content, setContent] = useState<Record<string, any>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [testiTypeFilter, setTestiTypeFilter] = useState<"video" | "screenshot" | "written">("video");
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [initialContent, setInitialContent] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content/get?t=" + Date.now(), { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.website) {
            setContent(json.data.website);
            setInitialContent(JSON.stringify(json.data.website));
          }
          if (json.data.testimonials) {
            setTestimonials(json.data.testimonials);
          }
        }
      } catch (err) {
        showToast("Failed to load data. Check Firebase.", false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Track unsaved changes
  useEffect(() => {
    if (initialContent) {
      const current = JSON.stringify(content);
      if (current !== initialContent) {
        setHasChanges(true);
      }
    }
  }, [content, initialContent]);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const updateField = (page: string, key: string, val: any) => {
    setContent(p => ({ ...p, [page]: { ...(p[page] || {}), [key]: val } }));
  };

  const handleSave = async () => {
    for (const t of testimonials) {
      if (t.imageUrl && t.imageUrl.startsWith("data:")) {
        showToast("⚠️ Please paste Google Drive links instead of raw images.", false);
        return;
      }
    }

    setSaving(true);
    try {
      const payloadStr = JSON.stringify({ type: "content", data: { website: content, testimonials } });
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payloadStr,
      });
      const json = await res.json();
      if (json.success) {
        showToast("✓ Changes saved successfully!", true);
        setHasChanges(false);
        setInitialContent(JSON.stringify(content));
        setLastSaved(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      } else {
        showToast("Error saving: " + (json.message || "Unknown"), false);
      }
    } catch {
      showToast("Server timeout. Please try again.", false);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try { await fetch("/api/admin/logout", { method: "POST" }); } catch {}
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
    router.refresh();
  };

  // ─── JSON Exporter & Importer ──────────────────────────────────────────────
  const handleExport = () => {
    try {
      const dataStr = JSON.stringify({ type: "content", data: { website: content, testimonials } }, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `workden_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("✓ Backup downloaded successfully!", true);
    } catch {
      showToast("Failed to generate backup", false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.type === "content" && json.data) {
          if (json.data.website) setContent(json.data.website);
          if (json.data.testimonials) setTestimonials(json.data.testimonials);
          setHasChanges(true);
          showToast("✓ Backup file imported! Save to apply.", true);
        } else {
          throw new Error("Invalid backup format");
        }
      } catch {
        showToast("Error: Invalid JSON backup file.", false);
      }
    };
    reader.readAsText(file);
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
    setHasChanges(true);
  };

  const removeTesti = (id: string) => {
    setTestimonials(p => p.filter(t => t.id !== id));
    setHasChanges(true);
  };
  
  const updateTesti = (id: string, k: string, v: any) => {
    setTestimonials(p => p.map(t => t.id === id ? { ...t, [k]: v } : t));
    setHasChanges(true);
  };

  const convertDriveImageUrl = (url: string): string => {
    if (!url) return "";
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
    return url;
  };

  // ─── Re-order Helper Functions ─────────────────────────────────────────────
  const moveItem = (pageKey: string, arrayKey: string, index: number, direction: "up" | "down") => {
    const list = [...(content[pageKey]?.[arrayKey] || DEFAULT_CONTENT[pageKey]?.[arrayKey] || [])];
    if (direction === "up" && index > 0) {
      const temp = list[index]; list[index] = list[index - 1]; list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
      const temp = list[index]; list[index] = list[index + 1]; list[index + 1] = temp;
    }
    updateField(pageKey, arrayKey, list);
  };

  const deleteItem = (pageKey: string, arrayKey: string, index: number) => {
    const list = [...(content[pageKey]?.[arrayKey] || DEFAULT_CONTENT[pageKey]?.[arrayKey] || [])];
    updateField(pageKey, arrayKey, list.filter((_, i) => i !== index));
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

  // ─── String List Editor ────────────────────────────────────────────────────
  const renderStringListEditor = (label: string, list: string[] | undefined, onChange: (newList: string[]) => void) => {
    const arr = list || [];
    return (
      <div className="mt-3 bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{label}</label>
          <button type="button" onClick={() => onChange([...arr, ""])}
            className="text-[10px] font-bold bg-white hover:bg-gray-50 text-gray-700 px-3 py-1 rounded border border-gray-300 transition-colors cursor-pointer">
            + Add Item
          </button>
        </div>
        {arr.length === 0 && <p className="text-xs text-gray-400 italic">No items added yet.</p>}
        {arr.map((val, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input type="text" value={val}
              onChange={(e) => { const u = [...arr]; u[idx] = e.target.value; onChange(u); }}
              className="flex-1 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter item text..." />
            <button type="button" onClick={() => onChange(arr.filter((_, i) => i !== idx))}
              className="text-red-500 hover:text-red-750 text-xs px-2 py-1 hover:bg-red-50 rounded transition-colors cursor-pointer">✕</button>
          </div>
        ))}
      </div>
    );
  };

  // ─── Sidebar filter ─────────────────────────────────────────────────────────
  const filteredPages = useMemo(() => {
    if (!sidebarSearch.trim()) return Object.entries(PAGES);
    return Object.entries(PAGES).filter(([, p]) =>
      p.label.toLowerCase().includes(sidebarSearch.toLowerCase())
    );
  }, [sidebarSearch]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-gray-500 mt-3">Loading dashboard...</p>
      </div>
    </div>
  );

  const currentPage = PAGES[tab];

  // ─── Array Card Renderer ──────────────────────────────────────────────────
  const renderArrayCard = (
    pageKey: string, arrayKey: string, label: string, idx: number, listLen: number,
    accentColor: string, children: React.ReactNode
  ) => (
    <div className="bg-white p-5 rounded border border-gray-200 relative space-y-4 shadow-sm">
      <div className="absolute top-4 right-4 flex gap-1 z-10">
        <button onClick={() => moveItem(pageKey, arrayKey, idx, "up")} disabled={idx === 0}
          className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-450 hover:bg-gray-50 disabled:opacity-20 transition-colors text-xs cursor-pointer">▲</button>
        <button onClick={() => moveItem(pageKey, arrayKey, idx, "down")} disabled={idx === listLen - 1}
          className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-455 hover:bg-gray-50 disabled:opacity-20 transition-colors text-xs cursor-pointer">▼</button>
        <button onClick={() => deleteItem(pageKey, arrayKey, idx)}
          className="w-7 h-7 rounded border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors cursor-pointer"><ITrash /></button>
      </div>
      <div className="pr-24 font-bold text-gray-700 text-xs flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-gray-150 flex items-center justify-center text-[10px] font-bold text-gray-600">{idx + 1}</span>
        {label}
      </div>
      {children}
    </div>
  );

  const inputCls = "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-405 focus:outline-none focus:border-blue-500 transition-colors font-sans";
  const textareaCls = "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-405 focus:outline-none focus:border-blue-500 transition-colors resize-y font-sans";
  const labelCls = "block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide";
  const smallInputCls = "w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors";
  const smallLabelCls = "text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1 block";

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-200 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden flex-shrink-0 relative z-20`}>
        {/* Simple Title */}
        <div className="p-5 border-b border-gray-200 flex-shrink-0 bg-gray-50">
          <div className="font-extrabold text-base text-gray-850 tracking-tight leading-none mb-1">WorkDen Admin</div>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Content Management</span>
        </div>

        {/* Page Search */}
        <div className="px-4 pt-4 pb-2 flex-shrink-0">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><ISearch /></div>
            <input
              value={sidebarSearch}
              onChange={e => setSidebarSearch(e.target.value)}
              placeholder="Search pages..."
              className="w-full bg-white border border-gray-300 rounded pl-9 pr-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1 scrollbar-thin">
          <p className="text-[9px] font-bold text-gray-450 uppercase tracking-wider px-3 py-1">Pages</p>
          {filteredPages.filter(([k]) => k !== "header" && k !== "footer").map(([key, p]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                tab === key
                  ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}>
              <span className="text-base">{p.emoji}</span>
              <span className="truncate">{p.label}</span>
            </button>
          ))}

          <p className="text-[9px] font-bold text-gray-455 uppercase tracking-wider px-3 pt-4 py-1">Components</p>
          <button onClick={() => setTab("testimonials")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              tab === "testimonials"
                ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}>
            <span className="text-base">⭐</span>
            <span className="truncate">Testimonials</span>
          </button>

          <p className="text-[9px] font-bold text-gray-455 uppercase tracking-wider px-3 pt-4 py-1">Global Configuration</p>
          {filteredPages.filter(([k]) => k === "header" || k === "footer").map(([key, p]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                tab === key
                  ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}>
              <span className="text-base">{p.emoji}</span>
              <span className="truncate">{p.label}</span>
            </button>
          ))}

          <p className="text-[9px] font-bold text-gray-455 uppercase tracking-wider px-3 pt-4 py-1">System Utilities</p>
          <button onClick={() => setTab("backup")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              tab === "backup"
                ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}>
            <span className="text-base">💾</span>
            <span className="truncate">Backup & Restore</span>
          </button>
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-gray-250 bg-gray-50 flex-shrink-0">
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-xs text-red-600 hover:bg-red-50 transition-colors font-bold border border-red-200 cursor-pointer">
            <ILogout />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CANVAS ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10 bg-white">
        
        {/* Header Bar */}
        <header className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(o => !o)}
              className="text-gray-400 hover:text-gray-700 p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer border border-gray-300">
              <IHeader />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wide leading-none">
                <span>Admin</span>
                <span>›</span>
                <span className="text-blue-600">{tab === "backup" ? "Backup" : tab === "testimonials" ? "Testimonials" : currentPage?.label || "Settings"}</span>
              </div>
              <h1 className="text-lg font-bold text-gray-800 tracking-tight leading-none mt-1.5">
                {tab === "backup" ? "Backup & Recovery Console" : tab === "testimonials" ? "⭐ Testimonials List" : `${currentPage?.emoji || ""} Edit ${currentPage?.label}`}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Verification Links */}
            {tab !== "backup" && tab !== "testimonials" && (
              <a
                href={tab === "home" ? `/?t=${Date.now()}` : `/${tab}.html?t=${Date.now()}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-gray-600 hover:text-blue-600 bg-white border border-gray-300 px-3 py-1.5 rounded transition-all shadow-sm"
              >
                Inspect Live Site ↗
              </a>
            )}
            {tab === "testimonials" && (
              <a
                href={`/testimonials.html?t=${Date.now()}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-gray-600 hover:text-blue-600 bg-white border border-gray-300 px-3 py-1.5 rounded transition-all shadow-sm"
              >
                Inspect Live Site ↗
              </a>
            )}

            {/* Save Action */}
            {tab !== "backup" && (
              <button onClick={handleSave} disabled={saving}
                className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95 border border-transparent">
                {saving ? <ILoad /> : <ISave />}
                <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
                {hasChanges && !saving && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>
            )}
          </div>
        </header>

        {/* Simplified Float Toast */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-md border ${
            toast.ok
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`} style={{ minWidth: '280px' }}>
            <span className="text-xs font-bold">{toast.msg}</span>
          </div>
        )}

        {/* ── CENTRAL CONTAINER ── */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 scrollbar-thin">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* ── BACKUP UTILITIES TAB ── */}
            {tab === "backup" && (
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Database Backup & Recovery Console
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">Export your complete website contents offline or restore a previous JSON save file back into Firebase.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Export card */}
                  <button onClick={handleExport} className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300 rounded p-5 text-center flex flex-col items-center justify-center gap-2.5 transition-all duration-200 group cursor-pointer">
                    <span className="text-2xl">📥</span>
                    <div>
                      <p className="text-xs font-bold">Download JSON Backup</p>
                      <p className="text-[10px] text-gray-450 mt-0.5">Saves all pages & testimonials</p>
                    </div>
                  </button>

                  {/* Import card */}
                  <label className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300 rounded p-5 text-center flex flex-col items-center justify-center gap-2.5 transition-all duration-200 group cursor-pointer relative">
                    <span className="text-2xl">📤</span>
                    <div>
                      <p className="text-xs font-bold">Restore JSON Backup</p>
                      <p className="text-[10px] text-gray-455 mt-0.5">Restores contents from local file</p>
                    </div>
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {/* ── FLAT FIELD SECTIONS ── */}
            {tab !== "backup" && tab !== "testimonials" && currentPage && currentPage.sections.map(section => (
              <CollapsibleSection key={section.title} title={section.title}>
                {section.fields.map(field => (
                  <div key={field.key} className="space-y-1.5">
                    <label className={labelCls}>{field.label}</label>
                    {field.hint && <p className="text-[10px] text-gray-400 font-semibold mb-1 -mt-1 leading-normal">{field.hint}</p>}
                    {field.type === "text" || field.type === "url" ? (
                      <input type={field.type === "url" ? "url" : "text"}
                        value={content[tab]?.[field.key] ?? DEFAULT_CONTENT[tab]?.[field.key] ?? ""}
                        onChange={e => updateField(tab, field.key, e.target.value)}
                        className={inputCls}
                        placeholder={field.type === "url" ? "https://example.com" : `Enter ${field.label.toLowerCase()}...`}
                      />
                    ) : (
                      <textarea
                        value={content[tab]?.[field.key] ?? DEFAULT_CONTENT[tab]?.[field.key] ?? ""}
                        onChange={e => updateField(tab, field.key, e.target.value)}
                        rows={field.type === "richtext" ? 4 : 2}
                        className={`${textareaCls} font-sans`}
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                      />
                    )}
                  </div>
                ))}
              </CollapsibleSection>
            ))}

            {/* ── ARRAY GRID LISTS ── */}
            {tab === "home" && (
              <>
                {/* Features list */}
                <CollapsibleSection title="Why WorkDen Features Checklist Grid">
                  <div className="flex justify-end -mt-1.5 mb-3">
                    <button onClick={() => addItem("home", "features", { title: "", desc: "", icon: "fas fa-circle-play", bg: "#eff6ff", color: "var(--brand)" })}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                      <IPlus /> Add Feature Card
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(content.home?.features || DEFAULT_CONTENT.home.features).map((feat: any, idx: number) =>
                      renderArrayCard("home", "features", `Feature: ${feat.title || "Untitled"}`, idx,
                        (content.home?.features || DEFAULT_CONTENT.home.features).length, "#3b82f6",
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className={smallLabelCls}>Feature Title</label><input value={feat.title || ""} onChange={e => updateItemField("home", "features", idx, "title", e.target.value)} className={smallInputCls} placeholder="e.g. Government Registered" /></div>
                            <div><label className={smallLabelCls}>FontAwesome Icon Class</label><input value={feat.icon || ""} onChange={e => updateItemField("home", "features", idx, "icon", e.target.value)} className={smallInputCls} placeholder="fas fa-shield-halved" /></div>
                          </div>
                          <div><label className={smallLabelCls}>Description text</label><textarea rows={2} value={feat.desc || ""} onChange={e => updateItemField("home", "features", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} placeholder="Write description..." /></div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className={smallLabelCls}>Background Color Pill (Hex/CSS)</label><input value={feat.bg || ""} onChange={e => updateItemField("home", "features", idx, "bg", e.target.value)} className={smallInputCls} placeholder="#eff6ff" /></div>
                            <div><label className={smallLabelCls}>Icon Color (Hex/CSS)</label><input value={feat.color || ""} onChange={e => updateItemField("home", "features", idx, "color", e.target.value)} className={smallInputCls} placeholder="var(--brand)" /></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CollapsibleSection>

                {/* Categories list */}
                <CollapsibleSection title="Available Work Categories Cards Grid">
                  <div className="flex justify-end -mt-1.5 mb-3">
                    <button onClick={() => addItem("home", "categories", { title: "", desc: "", icon: "fas fa-file-pen", bg: "#eff6ff", color: "var(--brand)" })}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                      <IPlus /> Add Category Card
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(content.home?.categories || DEFAULT_CONTENT.home.categories).map((cat: any, idx: number) =>
                      renderArrayCard("home", "categories", `Category: ${cat.title || "Untitled"}`, idx,
                        (content.home?.categories || DEFAULT_CONTENT.home.categories).length, "#10b981",
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className={smallLabelCls}>Category Name</label><input value={cat.title || ""} onChange={e => updateItemField("home", "categories", idx, "title", e.target.value)} className={smallInputCls} placeholder="e.g. Form Filling" /></div>
                            <div><label className={smallLabelCls}>FontAwesome Icon Class</label><input value={cat.icon || ""} onChange={e => updateItemField("home", "categories", idx, "icon", e.target.value)} className={smallInputCls} placeholder="fas fa-file-pen" /></div>
                          </div>
                          <div><label className={smallLabelCls}>Brief description</label><textarea rows={2} value={cat.desc || ""} onChange={e => updateItemField("home", "categories", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} placeholder="Describe task..." /></div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className={smallLabelCls}>Background Color (Hex/CSS)</label><input value={cat.bg || ""} onChange={e => updateItemField("home", "categories", idx, "bg", e.target.value)} className={smallInputCls} /></div>
                            <div><label className={smallLabelCls}>Icon Color (Hex/CSS)</label><input value={cat.color || ""} onChange={e => updateItemField("home", "categories", idx, "color", e.target.value)} className={smallInputCls} /></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CollapsibleSection>

                {/* Steps list */}
                <CollapsibleSection title="How to Get Started Onboarding Steps list">
                  <div className="flex justify-end -mt-1.5 mb-3">
                    <button onClick={() => addItem("home", "steps", { title: "", desc: "" })}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                      <IPlus /> Add Onboarding Step
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(content.home?.steps || DEFAULT_CONTENT.home.steps).map((step: any, idx: number) =>
                      renderArrayCard("home", "steps", `Onboarding Step ${idx + 1}: ${step.title || "Untitled"}`, idx,
                        (content.home?.steps || DEFAULT_CONTENT.home.steps).length, "#f59e0b",
                        <div className="space-y-4">
                          <div><label className={smallLabelCls}>Step Header Title</label><input value={step.title || ""} onChange={e => updateItemField("home", "steps", idx, "title", e.target.value)} className={smallInputCls} placeholder="e.g. Try the Free Demo" /></div>
                          <div><label className={smallLabelCls}>Onboarding Details Description</label><textarea rows={2} value={step.desc || ""} onChange={e => updateItemField("home", "steps", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} placeholder="Describe details..." /></div>
                        </div>
                      )
                    )}
                  </div>
                </CollapsibleSection>
              </>
            )}

            {tab === "plans" && (
              <>
                <CollapsibleSection title="Dynamic Pricing Plans list">
                  <div className="flex justify-end -mt-1.5 mb-3">
                    <button onClick={() => addItem("plans", "plansList", { id: "custom", name: "", price: "", desc: "", isPaid: false, isPopular: false, refundNote: "", features: [] })}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                      <IPlus /> Add Pricing Plan
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(content.plans?.plansList || DEFAULT_CONTENT.plans.plansList).map((plan: any, idx: number) =>
                      renderArrayCard("plans", "plansList", `Plan: ${plan.name || "Untitled"} (${plan.isPaid ? "Paid" : "Free"})`, idx,
                        (content.plans?.plansList || DEFAULT_CONTENT.plans.plansList).length, plan.isPaid ? "#7c3aed" : "#10b981",
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div><label className={smallLabelCls}>Unique Plan ID</label><input value={plan.id || ""} onChange={e => updateItemField("plans", "plansList", idx, "id", e.target.value)} className={smallInputCls} placeholder="typing" /></div>
                            <div className="sm:col-span-2"><label className={smallLabelCls}>Plan Display Name</label><input value={plan.name || ""} onChange={e => updateItemField("plans", "plansList", idx, "name", e.target.value)} className={smallInputCls} placeholder="Online Typing Work" /></div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div><label className={smallLabelCls}>Price (Number or 'Free')</label><input value={plan.price || ""} onChange={e => updateItemField("plans", "plansList", idx, "price", e.target.value)} className={smallInputCls} placeholder="999" /></div>
                            <div className="flex items-center gap-2 pt-6">
                              <input type="checkbox" id={`paid-${idx}`} checked={!!plan.isPaid} onChange={e => updateItemField("plans", "plansList", idx, "isPaid", e.target.checked)} className="accent-blue-600 w-4 h-4 rounded cursor-pointer" />
                              <label htmlFor={`paid-${idx}`} className="text-xs text-gray-700 font-bold cursor-pointer select-none ml-1.5">Paid plan tier</label>
                            </div>
                            <div className="flex items-center gap-2 pt-6">
                              <input type="checkbox" id={`pop-${idx}`} checked={!!plan.isPopular} onChange={e => updateItemField("plans", "plansList", idx, "isPopular", e.target.checked)} className="accent-blue-600 w-4 h-4 rounded cursor-pointer" />
                              <label htmlFor={`pop-${idx}`} className="text-xs text-gray-700 font-bold cursor-pointer select-none ml-1.5">Popular banner</label>
                            </div>
                          </div>
                          <div><label className={smallLabelCls}>Brief plan description</label><textarea rows={2} value={plan.desc || ""} onChange={e => updateItemField("plans", "plansList", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} placeholder="Plan overview..." /></div>
                          <div><label className={smallLabelCls}>Refund Warning Banner (HTML Allowed)</label><input value={plan.refundNote || ""} onChange={e => updateItemField("plans", "plansList", idx, "refundNote", e.target.value)} className={smallInputCls} placeholder="⚠️ Note: Refund not available after ID activation." /></div>
                          {renderStringListEditor("List of features inside this plan", plan.features, (newList) => updateItemField("plans", "plansList", idx, "features", newList))}
                        </div>
                      )
                    )}
                  </div>
                </CollapsibleSection>

                <CollapsibleSection title="Value Proposition Mini Cards">
                  <div className="flex justify-end -mt-1.5 mb-3">
                    <button onClick={() => addItem("plans", "valueCards", { title: "", desc: "", icon: "fas fa-check" })}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                      <IPlus /> Add Value Card
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(content.plans?.valueCards || DEFAULT_CONTENT.plans.valueCards).map((card: any, idx: number) =>
                      renderArrayCard("plans", "valueCards", `Value Card ${idx + 1}: ${card.title || "Untitled"}`, idx,
                        (content.plans?.valueCards || DEFAULT_CONTENT.plans.valueCards).length, "#0891b2",
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className={smallLabelCls}>Card Title</label><input value={card.title || ""} onChange={e => updateItemField("plans", "valueCards", idx, "title", e.target.value)} className={smallInputCls} /></div>
                            <div><label className={smallLabelCls}>FontAwesome Icon Class</label><input value={card.icon || ""} onChange={e => updateItemField("plans", "valueCards", idx, "icon", e.target.value)} className={smallInputCls} /></div>
                          </div>
                          <div><label className={smallLabelCls}>Feature Details</label><textarea rows={2} value={card.desc || ""} onChange={e => updateItemField("plans", "valueCards", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} /></div>
                        </div>
                      )
                    )}
                  </div>
                </CollapsibleSection>
              </>
            )}

            {tab === "about" && (
              <CollapsibleSection title="Leadership Management Directory">
                <div className="flex justify-end -mt-1.5 mb-3">
                  <button onClick={() => addItem("about", "teamList", { name: "", role: "", imageUrl: "" })}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                    <IPlus /> Add Director
                  </button>
                </div>
                <div className="space-y-4">
                  {(content.about?.teamList || DEFAULT_CONTENT.about.teamList).map((member: any, idx: number) =>
                    renderArrayCard("about", "teamList", `Director: ${member.name || "Untitled"}`, idx,
                      (content.about?.teamList || DEFAULT_CONTENT.about.teamList).length, "#8b5cf6",
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className={smallLabelCls}>Full Name</label><input value={member.name || ""} onChange={e => updateItemField("about", "teamList", idx, "name", e.target.value)} className={smallInputCls} placeholder="Shivam Mishra" /></div>
                          <div><label className={smallLabelCls}>Designation</label><input value={member.role || ""} onChange={e => updateItemField("about", "teamList", idx, "role", e.target.value)} className={smallInputCls} placeholder="Managing Director" /></div>
                        </div>
                        <div>
                          <label className={smallLabelCls}>📎 Photo Link (Google Drive / Direct URL — optional)</label>
                          <input value={member.imageUrl || ""} onChange={e => updateItemField("about", "teamList", idx, "imageUrl", e.target.value)} className={smallInputCls} placeholder="https://drive.google.com/file/d/..." />
                          {member.imageUrl && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-[10px] text-gray-450 font-bold">Preview:</span>
                              <img src={convertDriveImageUrl(member.imageUrl)} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm" onError={(e: any) => { e.target.style.display="none"; }} />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CollapsibleSection>
            )}

            {tab === "projects" && (
              <CollapsibleSection title="Available Task Projects Directory">
                <div className="flex justify-end -mt-1.5 mb-3">
                  <button onClick={() => addItem("projects", "projectsList", { title: "", desc: "", icon: "fas fa-check", bg: "#eff6ff", color: "var(--brand)", level: "Easy", badges: [] })}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                    <IPlus /> Add Project Card
                  </button>
                </div>
                <div className="space-y-4">
                  {(content.projects?.projectsList || DEFAULT_CONTENT.projects.projectsList).map((proj: any, idx: number) =>
                    renderArrayCard("projects", "projectsList", `Project: ${proj.title || "Untitled"}`, idx,
                      (content.projects?.projectsList || DEFAULT_CONTENT.projects.projectsList).length, "#ea580c",
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className={smallLabelCls}>Project Title</label><input value={proj.title || ""} onChange={e => updateItemField("projects", "projectsList", idx, "title", e.target.value)} className={smallInputCls} /></div>
                          <div><label className={smallLabelCls}>FontAwesome Icon Class</label><input value={proj.icon || ""} onChange={e => updateItemField("projects", "projectsList", idx, "icon", e.target.value)} className={smallInputCls} /></div>
                        </div>
                        <div><label className={smallLabelCls}>Task Overview description</label><textarea rows={2} value={proj.desc || ""} onChange={e => updateItemField("projects", "projectsList", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} /></div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div><label className={smallLabelCls}>Icon Bg Color (Hex/CSS)</label><input value={proj.bg || ""} onChange={e => updateItemField("projects", "projectsList", idx, "bg", e.target.value)} className={smallInputCls} /></div>
                          <div><label className={smallLabelCls}>Icon Color (Hex/CSS)</label><input value={proj.color || ""} onChange={e => updateItemField("projects", "projectsList", idx, "color", e.target.value)} className={smallInputCls} /></div>
                          <div><label className={smallLabelCls}>Difficulty Level Text</label><input value={proj.level || ""} onChange={e => updateItemField("projects", "projectsList", idx, "level", e.target.value)} className={smallInputCls} placeholder="Easy · No Experience" /></div>
                        </div>
                        {renderStringListEditor("Colored labels / badges on project card", proj.badges, (newList) => updateItemField("projects", "projectsList", idx, "badges", newList))}
                      </div>
                    )
                  )}
                </div>
              </CollapsibleSection>
            )}

            {tab === "blogs" && (
              <CollapsibleSection title="Knowledge Base Blogs list">
                <div className="flex justify-end -mt-1.5 mb-3">
                  <button onClick={() => addItem("blogs", "blogsList", { title: "", desc: "", tag: "New", url: "#", date: "2026" })}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                    <IPlus /> Add Blog Article
                  </button>
                </div>
                <div className="space-y-4">
                  {(content.blogs?.blogsList || DEFAULT_CONTENT.blogs.blogsList).map((blog: any, idx: number) =>
                    renderArrayCard("blogs", "blogsList", `Blog: ${blog.title?.substring(0, 45) || "Untitled"}`, idx,
                      (content.blogs?.blogsList || DEFAULT_CONTENT.blogs.blogsList).length, "#e11d48",
                      <div className="space-y-4">
                        <div><label className={smallLabelCls}>Article Title</label><input value={blog.title || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "title", e.target.value)} className={smallInputCls} /></div>
                        <div><label className={smallLabelCls}>Short Summary / Excerpt</label><textarea rows={2} value={blog.desc || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} /></div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div><label className={smallLabelCls}>Category Tag label</label><input value={blog.tag || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "tag", e.target.value)} className={smallInputCls} /></div>
                          <div><label className={smallLabelCls}>Article path URL</label><input value={blog.url || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "url", e.target.value)} className={smallInputCls} placeholder="blogs/work-from-home.html" /></div>
                          <div><label className={smallLabelCls}>Publish Date / Year</label><input value={blog.date || ""} onChange={e => updateItemField("blogs", "blogsList", idx, "date", e.target.value)} className={smallInputCls} /></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CollapsibleSection>
            )}

            {tab === "demo-task" && (
              <CollapsibleSection title="Active Demo Practice Tasks levels">
                <div className="flex justify-end -mt-1.5 mb-3">
                  <button onClick={() => addItem("demo-task", "tasksList", { id: "custom", name: "", emoji: "📝", items: 10, timeMin: 60, desc: "", color: "#7C3AED", num: 1, howto: [] })}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2 rounded text-xs font-bold border border-gray-300 transition-colors cursor-pointer shadow-sm">
                    <IPlus /> Add task Level
                  </button>
                </div>
                <div className="space-y-4">
                  {(content["demo-task"]?.tasksList || DEFAULT_CONTENT["demo-task"].tasksList).map((task: any, idx: number) =>
                    renderArrayCard("demo-task", "tasksList", `Practice Level ${task.num || idx + 1}: ${task.name || "Untitled"}`, idx,
                      (content["demo-task"]?.tasksList || DEFAULT_CONTENT["demo-task"].tasksList).length, task.color || "#7C3AED",
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div><label className={smallLabelCls}>Level ID key</label><input value={task.id || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "id", e.target.value)} className={smallInputCls} placeholder="data" /></div>
                          <div><label className={smallLabelCls}>Display Emoji glyph</label><input value={task.emoji || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "emoji", e.target.value)} className={smallInputCls} placeholder="📊" /></div>
                          <div><label className={smallLabelCls}>Index Order number</label><input type="number" value={task.num || 0} onChange={e => updateItemField("demo-task", "tasksList", idx, "num", parseInt(e.target.value, 10) || 0)} className={smallInputCls} /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className={smallLabelCls}>Practice Level Name</label><input value={task.name || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "name", e.target.value)} className={smallInputCls} placeholder="Data Entry" /></div>
                          <div><label className={smallLabelCls}>Theme Highlight Color (Hex)</label><input value={task.color || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "color", e.target.value)} className={smallInputCls} placeholder="#EA580C" /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div><label className={smallLabelCls}>Total Questions / Items</label><input type="number" value={task.items || 0} onChange={e => updateItemField("demo-task", "tasksList", idx, "items", parseInt(e.target.value, 10) || 0)} className={smallInputCls} /></div>
                          <div><label className={smallLabelCls}>Allocated Time limit (sec)</label><input type="number" value={task.timeMin || 0} onChange={e => updateItemField("demo-task", "tasksList", idx, "timeMin", parseInt(e.target.value, 10) || 0)} className={smallInputCls} /></div>
                          <div><label className={smallLabelCls}>CSS tag class (Hcls)</label><input value={task.hcls || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "hcls", e.target.value)} className={smallInputCls} placeholder="orange" /></div>
                        </div>
                        <div><label className={smallLabelCls}>Brief practice overview</label><textarea rows={2} value={task.desc || ""} onChange={e => updateItemField("demo-task", "tasksList", idx, "desc", e.target.value)} className={`${smallInputCls} resize-y`} /></div>
                        {renderStringListEditor("Interactive How-to-solve guidelines instructions", task.howto, (newList) => updateItemField("demo-task", "tasksList", idx, "howto", newList))}
                      </div>
                    )
                  )}
                </div>
              </CollapsibleSection>
            )}

            {/* ── TESTIMONIALS LIST ── */}
            {tab === "testimonials" && (
              <div className="space-y-5">
                {/* Visual filter tabs */}
                <div className="bg-white p-1 rounded border border-gray-200 flex gap-1 shadow-sm">
                  <button onClick={() => setTestiTypeFilter("video")} className={`flex-1 text-xs font-bold py-2 rounded transition-colors cursor-pointer ${testiTypeFilter === "video" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}>🎥 Video Reviews</button>
                  <button onClick={() => setTestiTypeFilter("screenshot")} className={`flex-1 text-xs font-bold py-2 rounded transition-colors cursor-pointer ${testiTypeFilter === "screenshot" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}>📸 Payment Screenshots</button>
                  <button onClick={() => setTestiTypeFilter("written")} className={`flex-1 text-xs font-bold py-2 rounded transition-colors cursor-pointer ${testiTypeFilter === "written" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}>✍️ Written Reviews</button>
                </div>

                {/* Guide Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded p-4 text-xs font-medium text-blue-800 leading-normal">
                  <p className="font-bold mb-1">💡 Tips for {testiTypeFilter} testimonials:</p>
                  {testiTypeFilter === "video" && <>Upload video to Google Drive → Share as &quot;Anyone with the link&quot; → Copy the URL. Paste it below.</>}
                  {testiTypeFilter === "screenshot" && <>Upload screenshot image to Google Drive → Share as &quot;Anyone with link&quot; → Copy the URL. Paste it below.</>}
                  {testiTypeFilter === "written" && <>Type author name, city location, review text description, initials, and select avatar backdrop color.</>}
                </div>

                <div className="flex justify-end">
                  <button onClick={addTesti}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold transition-all shadow-sm cursor-pointer">
                    <IPlus /> Add New Review
                  </button>
                </div>

                {testimonials.filter(t => t.type === testiTypeFilter).length === 0 && (
                  <div className="bg-white rounded border border-gray-200 p-10 text-center text-gray-400 text-xs font-bold shadow-sm">
                    No {testiTypeFilter} review items yet. List is empty.
                  </div>
                )}

                {/* Review cards */}
                {testimonials.filter(t => t.type === testiTypeFilter).map(t => (
                  <div key={t.id} className="bg-white rounded border border-gray-200 p-5 relative shadow-sm hover:shadow-md transition-shadow">
                    <button onClick={() => removeTesti(t.id)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded cursor-pointer">
                      <ITrash />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-10">
                      <div>
                        <label className={labelCls}>Author Name</label>
                        <input value={t.name} onChange={e => updateTesti(t.id, "name", e.target.value)} placeholder="e.g. Priya Kapoor" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Location</label>
                        <input value={t.city || ""} onChange={e => updateTesti(t.id, "city", e.target.value)} placeholder="e.g. Pune, India" className={inputCls} />
                      </div>
                    </div>

                    {testiTypeFilter === "written" && (
                      <div className="mb-4">
                        <label className={labelCls}>Review Text</label>
                        <textarea value={t.text} onChange={e => updateTesti(t.id, "text", e.target.value)} rows={3} placeholder="Write review details here..." className={textareaCls} />
                      </div>
                    )}

                    {testiTypeFilter === "video" && (
                      <div className="mb-4">
                        <label className={labelCls}>🎥 Video URL (Google Drive link)</label>
                        <input value={t.videoUrl || ""} onChange={e => updateTesti(t.id, "videoUrl", e.target.value)} placeholder="https://drive.google.com/file/d/.../view?usp=sharing" className={inputCls} />
                      </div>
                    )}

                    {testiTypeFilter === "screenshot" && (
                      <div className="mb-4">
                        <label className={labelCls}>📸 Screenshot Image URL (Google Drive link)</label>
                        <input value={t.imageUrl || ""} onChange={e => updateTesti(t.id, "imageUrl", e.target.value)} placeholder="https://drive.google.com/file/d/.../view?usp=sharing" className={inputCls} />
                      </div>
                    )}

                    {testiTypeFilter !== "screenshot" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className={labelCls}>Initials (Avatar Glyph)</label>
                          <input maxLength={2} value={t.initials || ""} onChange={e => updateTesti(t.id, "initials", e.target.value)} placeholder="PK" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Avatar profile backdrop color</label>
                          <select value={t.gradient || ""} onChange={e => updateTesti(t.id, "gradient", e.target.value)} className={inputCls}>
                            <option value="linear-gradient(135deg,#f59e0b,#ef4444)">🟠 Orange-Red</option>
                            <option value="linear-gradient(135deg,#8b5cf6,#d946ef)">🟣 Purple-Pink</option>
                            <option value="linear-gradient(135deg,#14b8a6,#3b82f6)">🔵 Teal-Blue</option>
                            <option value="linear-gradient(135deg,#10b981,#059669)">🟢 Emerald Green</option>
                            <option value="linear-gradient(135deg,#f43f5e,#e11d48)">🔴 Red-Rose</option>
                            <option value="linear-gradient(135deg,#1d4ed8,#6366f1)">💙 Blue-Indigo</option>
                            <option value="linear-gradient(135deg,#ec4899,#f97316)">🌸 Pink-Orange</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Preview box */}
                    <div className="pt-4 mt-4 border-t border-gray-150">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Preview</p>
                      
                      <div className="bg-gray-50 rounded p-4 flex gap-3 items-start overflow-hidden border border-gray-200">
                        {testiTypeFilter === "screenshot" ? (
                          t.imageUrl ? (
                            <img src={convertDriveImageUrl(t.imageUrl)} alt={t.name} className="w-14 h-14 rounded object-cover flex-shrink-0 border border-gray-300" onError={(e: any) => { e.target.style.display = "none"; }} />
                          ) : <div className="text-xs italic text-gray-405 font-medium">Paste screenshot link to preview...</div>
                        ) : (
                          <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow" style={{ background: t.gradient }}>{t.initials || "AB"}</div>
                        )}
                        <div className="min-w-0 flex-1">
                          {testiTypeFilter === "written" && <p className="text-gray-600 text-xs mb-1 leading-relaxed font-medium">{t.text || "Write review text..."}</p>}
                          {testiTypeFilter === "video" && (t.videoUrl ? <p className="text-blue-650 text-xs font-mono truncate">{t.videoUrl}</p> : <p className="text-xs italic text-slate-400">Paste video link...</p>)}
                          <p className="text-gray-800 font-bold text-xs mt-1">{t.name || "Worker Name"} — <span className="text-gray-500">{t.city || "Location"}</span></p>
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
