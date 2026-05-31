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

// ─── Types ────────────────────────────────────────────────────────────────────
type FType = "text" | "textarea" | "richtext" | "url";
type Field = { key: string; label: string; type: FType; hint?: string };
type Section = { title: string; fields: Field[] };
type PageDef = { label: string; icon: React.FC; sections: Section[] };

// ─── Full Page Schema ─────────────────────────────────────────────────────────
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
      { title: "Why WorkDen Section", fields: [
        { key: "whyTitle",    label: "Section Title",   type: "text" },
        { key: "whySubtitle", label: "Section Subtitle", type: "textarea" },
        { key: "feat1Title",  label: "Feature 1 Title", type: "text" }, { key: "feat1Desc", label: "Feature 1 Description", type: "textarea" },
        { key: "feat2Title",  label: "Feature 2 Title", type: "text" }, { key: "feat2Desc", label: "Feature 2 Description", type: "textarea" },
        { key: "feat3Title",  label: "Feature 3 Title", type: "text" }, { key: "feat3Desc", label: "Feature 3 Description", type: "textarea" },
        { key: "feat4Title",  label: "Feature 4 Title", type: "text" }, { key: "feat4Desc", label: "Feature 4 Description", type: "textarea" },
        { key: "feat5Title",  label: "Feature 5 Title", type: "text" }, { key: "feat5Desc", label: "Feature 5 Description", type: "textarea" },
        { key: "feat6Title",  label: "Feature 6 Title", type: "text" }, { key: "feat6Desc", label: "Feature 6 Description", type: "textarea" },
      ]},
      { title: "Work Categories Section", fields: [
        { key: "catTitle",   label: "Section Title",    type: "text" },
        { key: "catSubtitle",label: "Section Subtitle", type: "textarea" },
        { key: "cat1Title",  label: "Category 1 Title", type: "text" }, { key: "cat1Desc", label: "Category 1 Description", type: "textarea" },
        { key: "cat2Title",  label: "Category 2 Title", type: "text" }, { key: "cat2Desc", label: "Category 2 Description", type: "textarea" },
        { key: "cat3Title",  label: "Category 3 Title", type: "text" }, { key: "cat3Desc", label: "Category 3 Description", type: "textarea" },
        { key: "cat4Title",  label: "Category 4 Title", type: "text" }, { key: "cat4Desc", label: "Category 4 Description", type: "textarea" },
        { key: "cat5Title",  label: "Category 5 Title", type: "text" }, { key: "cat5Desc", label: "Category 5 Description", type: "textarea" },
        { key: "cat6Title",  label: "Category 6 Title", type: "text" }, { key: "cat6Desc", label: "Category 6 Description", type: "textarea" },
      ]},
      { title: "How It Works Section", fields: [
        { key: "howTitle",   label: "Section Title",    type: "text" },
        { key: "howSubtitle",label: "Section Subtitle", type: "textarea" },
        { key: "step1Title", label: "Step 1 Title",     type: "text" }, { key: "step1Desc", label: "Step 1 Description", type: "textarea" },
        { key: "step2Title", label: "Step 2 Title",     type: "text" }, { key: "step2Desc", label: "Step 2 Description", type: "textarea" },
        { key: "step3Title", label: "Step 3 Title",     type: "text" }, { key: "step3Desc", label: "Step 3 Description", type: "textarea" },
        { key: "step4Title", label: "Step 4 Title",     type: "text" }, { key: "step4Desc", label: "Step 4 Description", type: "textarea" },
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
      { title: "Plan 1: Online Typing Work (Paid)", fields: [
        { key: "plan1Name",       label: "Plan 1 Name",         type: "text" },
        { key: "plan1Price",      label: "Plan 1 Price (₹)",    type: "text" },
        { key: "plan1Desc",       label: "Plan 1 Description",  type: "textarea" },
        { key: "plan1RefundNote", label: "Refund Warning Note", type: "textarea" },
        { key: "plan1Feat1",      label: "Feature 1", type: "text" },
        { key: "plan1Feat2",      label: "Feature 2", type: "text" },
        { key: "plan1Feat3",      label: "Feature 3", type: "text" },
        { key: "plan1Feat4",      label: "Feature 4", type: "text" },
        { key: "plan1Feat5",      label: "Feature 5", type: "text" },
        { key: "plan1Feat6",      label: "Feature 6", type: "text" },
        { key: "plan1Feat7",      label: "Feature 7", type: "text" },
        { key: "plan1Feat8",      label: "Feature 8", type: "text" },
      ]},
      { title: "Plan 2: Freelance Telecaller (Free)", fields: [
        { key: "plan2Name",  label: "Plan 2 Name",         type: "text" },
        { key: "plan2Price", label: "Plan 2 Price (e.g. Free)", type: "text" },
        { key: "plan2Desc",  label: "Plan 2 Description",  type: "textarea" },
        { key: "plan2Feat1", label: "Feature 1", type: "text" },
        { key: "plan2Feat2", label: "Feature 2", type: "text" },
        { key: "plan2Feat3", label: "Feature 3", type: "text" },
        { key: "plan2Feat4", label: "Feature 4", type: "text" },
        { key: "plan2Feat5", label: "Feature 5", type: "text" },
        { key: "plan2Feat6", label: "Feature 6", type: "text" },
        { key: "plan2Feat7", label: "Feature 7", type: "text" },
        { key: "plan2Feat8", label: "Feature 8", type: "text" },
      ]},
      { title: "Plan 3: Affiliate Marketer (Free)", fields: [
        { key: "plan3Name",  label: "Plan 3 Name",         type: "text" },
        { key: "plan3Price", label: "Plan 3 Price (e.g. Free)", type: "text" },
        { key: "plan3Desc",  label: "Plan 3 Description",  type: "textarea" },
        { key: "plan3Feat1", label: "Feature 1", type: "text" },
        { key: "plan3Feat2", label: "Feature 2", type: "text" },
        { key: "plan3Feat3", label: "Feature 3", type: "text" },
        { key: "plan3Feat4", label: "Feature 4", type: "text" },
        { key: "plan3Feat5", label: "Feature 5", type: "text" },
        { key: "plan3Feat6", label: "Feature 6", type: "text" },
        { key: "plan3Feat7", label: "Feature 7", type: "text" },
        { key: "plan3Feat8", label: "Feature 8", type: "text" },
      ]},
      { title: "Value Proposition Strip", fields: [
        { key: "valueTitle",  label: "Value Strip Title",   type: "text" },
        { key: "valueDesc",   label: "Value Strip Description", type: "textarea" },
        { key: "value1Title", label: "Value Card 1 Title",  type: "text" },
        { key: "value1Desc",  label: "Value Card 1 Desc",   type: "textarea" },
        { key: "value2Title", label: "Value Card 2 Title",  type: "text" },
        { key: "value2Desc",  label: "Value Card 2 Desc",   type: "textarea" },
        { key: "value3Title", label: "Value Card 3 Title",  type: "text" },
        { key: "value3Desc",  label: "Value Card 3 Desc",   type: "textarea" },
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
      { title: "Team Members", fields: [
        { key: "team1Name", label: "Team Member 1 Name", type: "text" },
        { key: "team1Role", label: "Team Member 1 Role", type: "text" },
        { key: "team2Name", label: "Team Member 2 Name", type: "text" },
        { key: "team2Role", label: "Team Member 2 Role", type: "text" },
        { key: "team3Name", label: "Team Member 3 Name", type: "text" },
        { key: "team3Role", label: "Team Member 3 Role", type: "text" },
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
      { title: "Projects List", fields: [
        { key: "proj1Title", label: "Project 1 Title", type: "text" }, { key: "proj1Desc", label: "Project 1 Description", type: "textarea" },
        { key: "proj2Title", label: "Project 2 Title", type: "text" }, { key: "proj2Desc", label: "Project 2 Description", type: "textarea" },
        { key: "proj3Title", label: "Project 3 Title", type: "text" }, { key: "proj3Desc", label: "Project 3 Description", type: "textarea" },
        { key: "proj4Title", label: "Project 4 Title", type: "text" }, { key: "proj4Desc", label: "Project 4 Description", type: "textarea" },
        { key: "proj5Title", label: "Project 5 Title", type: "text" }, { key: "proj5Desc", label: "Project 5 Description", type: "textarea" },
        { key: "proj6Title", label: "Project 6 Title", type: "text" }, { key: "proj6Desc", label: "Project 6 Description", type: "textarea" },
        { key: "proj7Title", label: "Project 7 Title", type: "text" }, { key: "proj7Desc", label: "Project 7 Description", type: "textarea" },
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
      { title: "Blog Posts (1-6)", fields: [
        { key: "blog1Title", label: "Blog 1 Title", type: "text" }, { key: "blog1Desc", label: "Blog 1 Description", type: "textarea" }, { key: "blog1Tag", label: "Blog 1 Tag", type: "text" },
        { key: "blog2Title", label: "Blog 2 Title", type: "text" }, { key: "blog2Desc", label: "Blog 2 Description", type: "textarea" }, { key: "blog2Tag", label: "Blog 2 Tag", type: "text" },
        { key: "blog3Title", label: "Blog 3 Title", type: "text" }, { key: "blog3Desc", label: "Blog 3 Description", type: "textarea" }, { key: "blog3Tag", label: "Blog 3 Tag", type: "text" },
        { key: "blog4Title", label: "Blog 4 Title", type: "text" }, { key: "blog4Desc", label: "Blog 4 Description", type: "textarea" }, { key: "blog4Tag", label: "Blog 4 Tag", type: "text" },
        { key: "blog5Title", label: "Blog 5 Title", type: "text" }, { key: "blog5Desc", label: "Blog 5 Description", type: "textarea" }, { key: "blog5Tag", label: "Blog 5 Tag", type: "text" },
        { key: "blog6Title", label: "Blog 6 Title", type: "text" }, { key: "blog6Desc", label: "Blog 6 Description", type: "textarea" }, { key: "blog6Tag", label: "Blog 6 Tag", type: "text" },
      ]},
      { title: "Blog Posts (7-12)", fields: [
        { key: "blog7Title", label: "Blog 7 Title", type: "text" }, { key: "blog7Desc", label: "Blog 7 Description", type: "textarea" }, { key: "blog7Tag", label: "Blog 7 Tag", type: "text" },
        { key: "blog8Title", label: "Blog 8 Title", type: "text" }, { key: "blog8Desc", label: "Blog 8 Description", type: "textarea" }, { key: "blog8Tag", label: "Blog 8 Tag", type: "text" },
        { key: "blog9Title", label: "Blog 9 Title", type: "text" }, { key: "blog9Desc", label: "Blog 9 Description", type: "textarea" }, { key: "blog9Tag", label: "Blog 9 Tag", type: "text" },
        { key: "blog10Title", label: "Blog 10 Title", type: "text" }, { key: "blog10Desc", label: "Blog 10 Description", type: "textarea" }, { key: "blog10Tag", label: "Blog 10 Tag", type: "text" },
        { key: "blog11Title", label: "Blog 11 Title", type: "text" }, { key: "blog11Desc", label: "Blog 11 Description", type: "textarea" }, { key: "blog11Tag", label: "Blog 11 Tag", type: "text" },
        { key: "blog12Title", label: "Blog 12 Title", type: "text" }, { key: "blog12Desc", label: "Blog 12 Description", type: "textarea" }, { key: "blog12Tag", label: "Blog 12 Tag", type: "text" },
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
        { key: "emailGeneral", label: "General Email",            type: "text" },
        { key: "emailSupport", label: "Support Email",            type: "text" },
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

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState("home");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content/get");
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

  const updateField = (page: string, key: string, val: string) =>
    setContent(p => ({ ...p, [page]: { ...(p[page] || {}), [key]: val } }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "content", data: { website: content, testimonials } }),
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

  // Testimonial helpers
  const addTesti = () => setTestimonials(p => [{
    id: Date.now().toString(), name: "", city: "", text: "", initials: "AB",
    gradient: "linear-gradient(135deg,#3b82f6,#14b8a6)", imageUrl: ""
  }, ...p]);
  const removeTesti = (id: string) => setTestimonials(p => p.filter(t => t.id !== id));
  const updateTesti = (id: string, k: string, v: string) =>
    setTestimonials(p => p.map(t => t.id === id ? { ...t, [k]: v } : t));

  // convert Google Drive share link to embed link
  const getDriveEmbedUrl = (url: string): string => {
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

  const allNavItems = [
    ...Object.entries(PAGES).map(([key, p]) => ({ key, label: p.label, Icon: p.icon,
      isSpecial: key === "header" || key === "footer"
    })),
    { key: "testimonials", label: "Testimonials", Icon: IStar, isSpecial: false },
  ];

  const currentPage = PAGES[tab];

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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1.5">Pages</p>
          {allNavItems.filter(i => !i.isSpecial && i.key !== "testimonials").map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === key ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
              <Icon /> <span className="truncate">{label}</span>
            </button>
          ))}
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pt-3 pb-1.5">Components</p>
          <button onClick={() => setTab("testimonials")}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === "testimonials" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <IStar /> Testimonials
          </button>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pt-3 pb-1.5">Global</p>
          <button onClick={() => setTab("header")}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === "header" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <IHeader /> Header / Nav
          </button>
          <button onClick={() => setTab("footer")}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${tab === "footer" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <IFooter /> Footer
          </button>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-800 flex-shrink-0">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all">
            <ILogout /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header bar */}
        <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(o => !o)}
              className="text-slate-500 hover:text-white transition-colors p-1">
              <IHeader />
            </button>
            <div>
              <h1 className="text-sm font-bold text-white">
                {tab === "testimonials" ? "Manage Testimonials" : currentPage?.label || "Dashboard"}
              </h1>
              <p className="text-xs text-slate-500">Changes publish live to your website instantly after saving.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tab === "testimonials" && (
              <button onClick={addTesti}
                className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                <IPlus /> Add Review
              </button>
            )}
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-900/40">
              {saving ? <ILoad /> : <ISave />}
              {saving ? "Saving…" : "Save & Publish"}
            </button>
          </div>
        </header>

        {/* Toast */}
        {toast && (
          <div className={`mx-6 mt-3 px-4 py-2.5 rounded-xl text-xs font-semibold flex-shrink-0 ${toast.ok ? "bg-green-900/60 text-green-300 border border-green-700" : "bg-red-900/60 text-red-300 border border-red-700"}`}>
            {toast.msg}
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-5">

            {/* ── Page tabs content ─── */}
            {tab !== "testimonials" && currentPage && currentPage.sections.map(section => (
              <div key={section.title} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-700">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{section.title}</h2>
                </div>
                <div className="p-5 space-y-4">
                  {section.fields.map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{field.label}</label>
                      {field.hint && <p className="text-xs text-slate-500 mb-1">{field.hint}</p>}
                      {field.type === "text" || field.type === "url" ? (
                        <input type={field.type === "url" ? "url" : "text"}
                          value={content[tab]?.[field.key] ?? ""}
                          onChange={e => updateField(tab, field.key, e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder={field.type === "url" ? "https://…" : `Enter ${field.label.toLowerCase()}…`}
                        />
                      ) : (
                        <textarea
                          value={content[tab]?.[field.key] ?? ""}
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

            {/* ── Testimonials ─── */}
            {tab === "testimonials" && (
              <div className="space-y-4">
                {/* Drive Link Instructions */}
                <div className="bg-blue-900/30 border border-blue-700/50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-blue-300 mb-1">📸 How to add Google Drive images</p>
                  <p className="text-xs text-blue-400 leading-relaxed">
                    1. Upload screenshot to Google Drive → Right click → "Share" → "Anyone with link" → Copy link<br/>
                    2. Paste that link in the "Photo URL" field below. The system will auto-convert it to display format.<br/>
                    3. If Photo URL is filled, it will show as a full image in the testimonial card on the website. Otherwise, initials avatar is shown.
                  </p>
                </div>

                {testimonials.length === 0 && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-10 text-center text-slate-500 text-sm">
                    No testimonials. Click "Add Review" to create one.
                  </div>
                )}

                {testimonials.map(t => (
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
                        <input value={t.city} onChange={e => updateTesti(t.id, "city", e.target.value)}
                          placeholder="e.g. Pune, India"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Review Text</label>
                      <textarea value={t.text} onChange={e => updateTesti(t.id, "text", e.target.value)}
                        rows={2} placeholder="Write the review here…"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y" />
                    </div>

                    {/* Google Drive Image URL */}
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">📎 Photo URL (Google Drive share link) — optional</label>
                      <input value={t.imageUrl || ""} onChange={e => updateTesti(t.id, "imageUrl", e.target.value)}
                        placeholder="https://drive.google.com/file/d/…/view?usp=sharing"
                        className="w-full bg-slate-800 border border-blue-700/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Initials (Avatar fallback)</label>
                        <input maxLength={2} value={t.initials} onChange={e => updateTesti(t.id, "initials", e.target.value)}
                          placeholder="PK"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Avatar Color</label>
                        <select value={t.gradient} onChange={e => updateTesti(t.id, "gradient", e.target.value)}
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

                    {/* Live Preview */}
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <p className="text-xs font-semibold text-slate-600 mb-2">Preview</p>
                      <div className="bg-slate-800 rounded-xl p-3 flex gap-3 items-start">
                        {t.imageUrl ? (
                          <img
                            src={getDriveEmbedUrl(t.imageUrl)}
                            alt={t.name}
                            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                            onError={(e: any) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
                            style={{ background: t.gradient }}>
                            {t.initials || "AB"}
                          </div>
                        )}
                        <div>
                          <div className="text-yellow-400 text-xs mb-0.5">★★★★★</div>
                          <p className="text-slate-300 text-xs">{t.text || "Review text preview."}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{t.name || "Name"} — {t.city || "City"}</p>
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
