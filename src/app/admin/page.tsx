"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ path, cls = "w-5 h-5" }: { path: string; cls?: string }) => (
  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);
const IconHome    = () => <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />;
const IconPlans   = () => <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
const IconAbout   = () => <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
const IconStar    = () => <Icon path="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />;
const IconBlog    = () => <Icon path="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />;
const IconProj    = () => <Icon path="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />;
const IconDemo    = () => <Icon path="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
const IconSave    = () => <Icon path="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />;
const IconPlus    = () => <Icon path="M12 4v16m8-8H4" />;
const IconTrash   = () => <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />;
const IconLogout  = () => <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />;
const IconLoad    = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

// ─── Page Schemas ──────────────────────────────────────────────────────────────
type FieldType = "text" | "textarea" | "richtext";
type Field = { key: string; label: string; type: FieldType; hint?: string };
type Section = { title: string; fields: Field[] };
type PageSchema = { label: string; icon: React.FC; sections: Section[] };

const PAGES: Record<string, PageSchema> = {
  home: {
    label: "Home Page",
    icon: IconHome,
    sections: [
      {
        title: "Hero Section",
        fields: [
          { key: "heroTitle", label: "Hero Heading", type: "richtext", hint: "Use <br> for line break, <span class=\"hl\">text</span> for highlighted text" },
          { key: "heroSubtitle", label: "Hero Subtitle / Description", type: "textarea" },
          { key: "heroBadge", label: "Hero Badge Text", type: "text", hint: "Small badge shown above title" },
          { key: "heroCta1", label: "Primary Button Text", type: "text" },
          { key: "heroCta2", label: "Secondary Button Text", type: "text" },
          { key: "heroTrust1", label: "Trust Line 1 (GSTIN text)", type: "text" },
          { key: "heroTrust2", label: "Trust Line 2 (MSME text)", type: "text" },
          { key: "heroTrust3", label: "Trust Line 3", type: "text" },
        ],
      },
      {
        title: "Why WorkDen Section",
        fields: [
          { key: "whyTitle", label: "Section Title", type: "text" },
          { key: "whySubtitle", label: "Section Subtitle", type: "textarea" },
          { key: "feat1Title", label: "Feature 1 Title", type: "text" },
          { key: "feat1Desc", label: "Feature 1 Description", type: "textarea" },
          { key: "feat2Title", label: "Feature 2 Title", type: "text" },
          { key: "feat2Desc", label: "Feature 2 Description", type: "textarea" },
          { key: "feat3Title", label: "Feature 3 Title", type: "text" },
          { key: "feat3Desc", label: "Feature 3 Description", type: "textarea" },
          { key: "feat4Title", label: "Feature 4 Title", type: "text" },
          { key: "feat4Desc", label: "Feature 4 Description", type: "textarea" },
          { key: "feat5Title", label: "Feature 5 Title", type: "text" },
          { key: "feat5Desc", label: "Feature 5 Description", type: "textarea" },
          { key: "feat6Title", label: "Feature 6 Title", type: "text" },
          { key: "feat6Desc", label: "Feature 6 Description", type: "textarea" },
        ],
      },
      {
        title: "Work Categories Section",
        fields: [
          { key: "catTitle", label: "Section Title", type: "text" },
          { key: "catSubtitle", label: "Section Subtitle", type: "textarea" },
          { key: "cat1Title", label: "Category 1 Title", type: "text" },
          { key: "cat1Desc", label: "Category 1 Description", type: "textarea" },
          { key: "cat2Title", label: "Category 2 Title", type: "text" },
          { key: "cat2Desc", label: "Category 2 Description", type: "textarea" },
          { key: "cat3Title", label: "Category 3 Title", type: "text" },
          { key: "cat3Desc", label: "Category 3 Description", type: "textarea" },
          { key: "cat4Title", label: "Category 4 Title", type: "text" },
          { key: "cat4Desc", label: "Category 4 Description", type: "textarea" },
          { key: "cat5Title", label: "Category 5 Title", type: "text" },
          { key: "cat5Desc", label: "Category 5 Description", type: "textarea" },
          { key: "cat6Title", label: "Category 6 Title", type: "text" },
          { key: "cat6Desc", label: "Category 6 Description", type: "textarea" },
        ],
      },
      {
        title: "How It Works Section",
        fields: [
          { key: "howTitle", label: "Section Title", type: "text" },
          { key: "howSubtitle", label: "Section Subtitle", type: "textarea" },
          { key: "step1Title", label: "Step 1 Title", type: "text" },
          { key: "step1Desc", label: "Step 1 Description", type: "textarea" },
          { key: "step2Title", label: "Step 2 Title", type: "text" },
          { key: "step2Desc", label: "Step 2 Description", type: "textarea" },
          { key: "step3Title", label: "Step 3 Title", type: "text" },
          { key: "step3Desc", label: "Step 3 Description", type: "textarea" },
          { key: "step4Title", label: "Step 4 Title", type: "text" },
          { key: "step4Desc", label: "Step 4 Description", type: "textarea" },
        ],
      },
      {
        title: "CTA Section",
        fields: [
          { key: "ctaTitle", label: "CTA Heading", type: "text" },
          { key: "ctaSubtitle", label: "CTA Subtitle", type: "textarea" },
          { key: "ctaBtn1", label: "CTA Button 1 Text", type: "text" },
          { key: "ctaBtn2", label: "CTA Button 2 Text", type: "text" },
        ],
      },
    ],
  },
  plans: {
    label: "Plans Page",
    icon: IconPlans,
    sections: [
      {
        title: "Plans Header",
        fields: [
          { key: "plansTitle", label: "Main Title", type: "text" },
          { key: "plansSubtitle", label: "Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  about: {
    label: "About Page",
    icon: IconAbout,
    sections: [
      {
        title: "About Header",
        fields: [
          { key: "pageTitle", label: "Page Title", type: "text" },
          { key: "pageDesc", label: "Page Description", type: "textarea" },
        ],
      },
    ],
  },
  projects: {
    label: "Projects Page",
    icon: IconProj,
    sections: [
      {
        title: "Projects Header",
        fields: [
          { key: "pageTitle", label: "Page Title", type: "text" },
          { key: "pageDesc", label: "Page Description", type: "textarea" },
        ],
      },
    ],
  },
  blogs: {
    label: "Blogs Page",
    icon: IconBlog,
    sections: [
      {
        title: "Blogs Header",
        fields: [
          { key: "pageTitle", label: "Page Title", type: "text" },
          { key: "pageDesc", label: "Page Description", type: "textarea" },
        ],
      },
    ],
  },
  "demo-task": {
    label: "Demo Task Page",
    icon: IconDemo,
    sections: [
      {
        title: "Demo Task Header",
        fields: [
          { key: "pageTitle", label: "Page Title", type: "text" },
          { key: "pageDesc", label: "Page Description", type: "textarea" },
        ],
      },
    ],
  },
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});

  // Load data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content/get");
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.website) setContent(json.data.website);
          if (json.data.testimonials) setTestimonials(json.data.testimonials);
        }
      } catch (e) {
        showToast("Failed to load data. Check Firebase rules.", false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  // Update content field
  const updateField = (page: string, key: string, value: string) => {
    setContent(prev => ({ ...prev, [page]: { ...(prev[page] || {}), [key]: value } }));
  };

  // Save all
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "content", data: { website: content, testimonials } }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("✓ Changes saved! Website updated live.", true);
      } else {
        showToast("Save failed: " + (json.message || "Unknown error"), false);
      }
    } catch (e) {
      showToast("Network error. Please try again.", false);
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (_) {}
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
    router.refresh();
  };

  // Testimonial helpers
  const addTestimonial = () => {
    setTestimonials(prev => [{
      id: Date.now().toString(),
      name: "", city: "", text: "", initials: "AB",
      gradient: "linear-gradient(135deg,#3b82f6,#14b8a6)"
    }, ...prev]);
  };
  const removeTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));
  const updateTesti = (id: string, key: string, val: string) =>
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [key]: val } : t));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <IconLoad />
          <p className="text-slate-400 mt-3 text-sm">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const navItems = Object.entries(PAGES).map(([key, p]) => ({ key, label: p.label, Icon: p.icon }));

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">W</div>
            <div>
              <div className="font-bold text-sm text-white">WorkDen Admin</div>
              <div className="text-xs text-slate-500">Content Manager</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">Pages</p>
          {navItems.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon /> {label}
            </button>
          ))}
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 pt-4 pb-2">Components</p>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "testimonials"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <IconStar /> Testimonials
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all"
          >
            <IconLogout /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/70 backdrop-blur border-b border-slate-800 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-lg font-bold text-white">
                {activeTab === "testimonials" ? "Manage Testimonials" : PAGES[activeTab]?.label ?? "Dashboard"}
              </h1>
              <p className="text-xs text-slate-500">Changes you save here go live on the website instantly.</p>
            </div>
            <div className="flex items-center gap-3">
              {activeTab === "testimonials" && (
                <button onClick={addTestimonial} className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  <IconPlus /> Add Review
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-5 py-2 rounded-lg text-sm font-bold text-white transition-all shadow-lg shadow-blue-900/40"
              >
                {saving ? <IconLoad /> : <IconSave />}
                {saving ? "Saving…" : "Save & Publish"}
              </button>
            </div>
          </div>
        </header>

        {/* Toast */}
        {toast && (
          <div className={`mx-8 mt-4 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${toast.ok ? "bg-green-900/60 text-green-300 border border-green-700" : "bg-red-900/60 text-red-300 border border-red-700"}`}>
            {toast.msg}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Page Content Tabs */}
            {activeTab !== "testimonials" && PAGES[activeTab] && PAGES[activeTab].sections.map((section) => (
              <div key={section.title} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-700">
                  <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{section.title}</h2>
                </div>
                <div className="p-6 space-y-5">
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-slate-300 mb-1.5">{field.label}</label>
                      {field.hint && <p className="text-xs text-slate-500 mb-1.5">{field.hint}</p>}
                      {field.type === "text" ? (
                        <input
                          type="text"
                          value={content[activeTab]?.[field.key] ?? ""}
                          onChange={e => updateField(activeTab, field.key, e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder={`Enter ${field.label.toLowerCase()}…`}
                        />
                      ) : (
                        <textarea
                          value={content[activeTab]?.[field.key] ?? ""}
                          onChange={e => updateField(activeTab, field.key, e.target.value)}
                          rows={field.type === "richtext" ? 3 : 2}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                          placeholder={`Enter ${field.label.toLowerCase()}…`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Testimonials */}
            {activeTab === "testimonials" && (
              <div className="space-y-4">
                {testimonials.length === 0 && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center text-slate-500">
                    No testimonials yet. Click "Add Review" to create one.
                  </div>
                )}
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 relative">
                    <button onClick={() => removeTestimonial(t.id)} className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors">
                      <IconTrash />
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-4 pr-10">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Author Name</label>
                        <input value={t.name} onChange={e => updateTesti(t.id, "name", e.target.value)} placeholder="e.g. Priya Kapoor" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">City / Location</label>
                        <input value={t.city} onChange={e => updateTesti(t.id, "city", e.target.value)} placeholder="e.g. Pune, India" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Review Text</label>
                      <textarea value={t.text} onChange={e => updateTesti(t.id, "text", e.target.value)} rows={3} placeholder="Write the review here…" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Initials (Avatar)</label>
                        <input maxLength={2} value={t.initials} onChange={e => updateTesti(t.id, "initials", e.target.value)} placeholder="PK" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Avatar Color</label>
                        <select value={t.gradient} onChange={e => updateTesti(t.id, "gradient", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                          <option value="linear-gradient(135deg,#f59e0b,#ef4444)">🟠 Orange-Red</option>
                          <option value="linear-gradient(135deg,#8b5cf6,#d946ef)">🟣 Purple-Pink</option>
                          <option value="linear-gradient(135deg,#14b8a6,#3b82f6)">🔵 Teal-Blue</option>
                          <option value="linear-gradient(135deg,#10b981,#059669)">🟢 Green</option>
                          <option value="linear-gradient(135deg,#f43f5e,#e11d48)">🔴 Red-Rose</option>
                          <option value="linear-gradient(135deg,#f97316,#fb923c)">🟡 Orange</option>
                        </select>
                      </div>
                    </div>
                    {/* Preview */}
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <p className="text-xs font-semibold text-slate-500 mb-2">Preview</p>
                      <div className="bg-slate-800 rounded-xl p-4 flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style={{ background: t.gradient }}>
                          {t.initials || "AB"}
                        </div>
                        <div>
                          <div className="text-yellow-400 text-xs mb-1">★★★★★</div>
                          <p className="text-slate-300 text-sm">{t.text || "Review text will appear here."}</p>
                          <p className="text-slate-500 text-xs mt-1">{t.name || "Name"} — {t.city || "City"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
