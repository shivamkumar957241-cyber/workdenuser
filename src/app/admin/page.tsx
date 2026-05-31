"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Plus, Trash2, LogOut, LayoutDashboard, MessageSquareQuote, FileText } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(false);
  
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any>({
    heroTitle: "Start Working from Home Today",
    heroSubtitle: "Earn money by completing simple verified digital tasks.",
    plansTitle: "Plans that work best for you",
    plansSubtitle: "Trusted by thousands of workers across India. Transparent pricing, no hidden fees."
  });

  useEffect(() => {
    // Fetch initial data
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
      alert("Content saved successfully!");
    } catch (e) {
      alert("Error saving content. Ensure Firebase rules allow read/write.");
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = () => {
    setTestimonials([
      {
        id: Date.now().toString(),
        name: "",
        city: "",
        text: "",
        initials: "AB",
        gradient: "linear-gradient(135deg, #3b82f6, #14b8a6)"
      },
      ...testimonials
    ]);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateTestimonial = (id: string, field: string, value: string) => {
    setTestimonials(testimonials.map(t => (t.id === id ? { ...t, [field]: value } : t)));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-500" />
            WorkDen Admin
          </h1>
        </div>
        <div className="flex-1 py-6 space-y-1">
          <button 
            onClick={() => setActiveTab("content")}
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'content' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" /> Website Content
          </button>
          <button 
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'testimonials' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
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
              {activeTab === 'content' ? 'Manage Website Sections' : 'Manage Testimonials'}
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
          
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Hero Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Title</label>
                      <input 
                        type="text" 
                        value={siteContent.heroTitle || ""}
                        onChange={(e) => setSiteContent({...siteContent, heroTitle: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Subtitle</label>
                      <textarea 
                        value={siteContent.heroSubtitle || ""}
                        onChange={(e) => setSiteContent({...siteContent, heroSubtitle: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Plans Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Plans Title</label>
                      <input 
                        type="text" 
                        value={siteContent.plansTitle || ""}
                        onChange={(e) => setSiteContent({...siteContent, plansTitle: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Plans Subtitle</label>
                      <textarea 
                        value={siteContent.plansSubtitle || ""}
                        onChange={(e) => setSiteContent({...siteContent, plansSubtitle: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-20"
                      />
                    </div>
                  </div>
                </div>
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
