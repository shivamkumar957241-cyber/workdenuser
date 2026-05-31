"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Plus, Trash2, LogOut, LayoutDashboard, MessageSquareQuote, FileText, Globe } from "lucide-react";

const pageSchema: Record<string, { label: string, fields: {key: string, label: string, type: 'text'|'textarea'}[] }> = {
  home: {
    label: "Home Page",
    fields: [
      { key: "heroTitle", label: "Hero Title", type: "text" },
      { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "aboutTitle", label: "About Section Title", type: "text" },
      { key: "aboutDesc", label: "About Section Text", type: "textarea" },
    ]
  },
  plans: {
    label: "Plans Page",
    fields: [
      { key: "plansTitle", label: "Plans Title", type: "text" },
      { key: "plansSubtitle", label: "Plans Subtitle", type: "textarea" },
    ]
  },
  about: {
    label: "About Page",
    fields: [
      { key: "pageTitle", label: "Main Title", type: "text" },
      { key: "pageDesc", label: "Main Description", type: "textarea" },
    ]
  },
  projects: {
    label: "Projects Page",
    fields: [
      { key: "pageTitle", label: "Projects Title", type: "text" },
      { key: "pageDesc", label: "Projects Description", type: "textarea" },
    ]
  },
  blogs: {
    label: "Blogs Page",
    fields: [
      { key: "pageTitle", label: "Blogs Title", type: "text" },
      { key: "pageDesc", label: "Blogs Description", type: "textarea" },
    ]
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [testimonials, setTestimonials] = useState<any[]>([]);
  // siteContent represents { home: {...}, plans: {...}, about: {...} }
  const [siteContent, setSiteContent] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/content/get");
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.website) setSiteContent(json.data.website);
          if (json.data.testimonials) setTestimonials(json.data.testimonials);
        }
      } catch (err) {
        console.error("Failed to load initial data", err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  const saveContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "content", data: { website: siteContent, testimonials } }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Changes Saved Successfully! The live website will reflect these changes immediately.");
    } catch (e) {
      alert("Error saving content. Ensure Firebase rules allow read/write.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (pageKey: string, fieldKey: string, value: string) => {
    setSiteContent({
      ...siteContent,
      [pageKey]: {
        ...(siteContent[pageKey] || {}),
        [fieldKey]: value
      }
    });
  };

  const addTestimonial = () => {
    setTestimonials([{
      id: Date.now().toString(),
      name: "",
      city: "",
      text: "",
      initials: "AB",
      gradient: "linear-gradient(135deg, #3b82f6, #14b8a6)"
    }, ...testimonials]);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateTestimonial = (id: string, field: string, value: string) => {
    setTestimonials(testimonials.map(t => (t.id === id ? { ...t, [field]: value } : t)));
  };

  if (fetching) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            WorkDen Control
          </h1>
        </div>
        
        <div className="flex-1 py-4 space-y-1">
          <div className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Website Pages</div>
          {Object.keys(pageSchema).map(key => (
            <button 
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === key ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" /> {pageSchema[key].label}
            </button>
          ))}

          <div className="px-6 py-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Components</div>
          <button 
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === 'testimonials' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <MessageSquareQuote className="w-4 h-4" /> Testimonials
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-full px-2 py-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              {activeTab === 'testimonials' ? 'Manage Testimonials' : `Manage ${pageSchema[activeTab]?.label}`}
            </h2>
            <div className="flex gap-3">
              {activeTab === 'testimonials' && (
                <button onClick={addTestimonial} className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-900">
                  <Plus className="w-4 h-4" /> Add Testimonial
                </button>
              )}
              <button 
                onClick={saveContent}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save All Changes
              </button>
            </div>
          </div>
          
          {activeTab !== "testimonials" && pageSchema[activeTab] && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                {pageSchema[activeTab].fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">{field.label}</label>
                    {field.type === 'text' ? (
                      <input 
                        type="text" 
                        value={siteContent[activeTab]?.[field.key] || ""}
                        onChange={(e) => updateField(activeTab, field.key, e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <textarea 
                        value={siteContent[activeTab]?.[field.key] || ""}
                        onChange={(e) => updateField(activeTab, field.key, e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-24 font-mono text-sm"
                      />
                    )}
                    <p className="text-xs text-slate-400 mt-1">HTML tags like &lt;br&gt; or &lt;span&gt; are supported.</p>
                  </div>
                ))}
                {pageSchema[activeTab].fields.length === 0 && (
                  <p className="text-slate-500 text-center py-8">No editable fields configured for this page yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="space-y-6">
              {testimonials.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
                  No testimonials found. Click "Add Testimonial" to create one.
                </div>
              ) : (
                testimonials.map((t, index) => (
                  <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
                    <button 
                      onClick={() => removeTestimonial(t.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove Testimonial"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-2 gap-4 mr-12 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Author Name</label>
                        <input 
                          type="text" 
                          value={t.name}
                          onChange={(e) => updateTestimonial(t.id, 'name', e.target.value)}
                          placeholder="e.g. Priya Kapoor"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Location/City</label>
                        <input 
                          type="text" 
                          value={t.city}
                          onChange={(e) => updateTestimonial(t.id, 'city', e.target.value)}
                          placeholder="e.g. Pune, India"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Review Text</label>
                      <textarea 
                        value={t.text}
                        onChange={(e) => updateTestimonial(t.id, 'text', e.target.value)}
                        placeholder="Write the review content here..."
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Initials (For Avatar)</label>
                        <input 
                          type="text" 
                          value={t.initials}
                          maxLength={2}
                          onChange={(e) => updateTestimonial(t.id, 'initials', e.target.value)}
                          placeholder="e.g. PK"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Avatar Gradient (CSS)</label>
                        <select
                          value={t.gradient}
                          onChange={(e) => updateTestimonial(t.id, 'gradient', e.target.value)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="linear-gradient(135deg, #f59e0b, #ef4444)">Orange-Red</option>
                          <option value="linear-gradient(135deg, #8b5cf6, #d946ef)">Purple-Pink</option>
                          <option value="linear-gradient(135deg, #14b8a6, #3b82f6)">Teal-Blue</option>
                          <option value="linear-gradient(135deg, #10b981, #059669)">Green</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
