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

  const handleLogout = async () => {
    // In a real app we would have an API to clear the cookie,
    // but for now we just delete it from JS and redirect
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  const saveContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "content", data: siteContent }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Content saved successfully!");
    } catch (e) {
      alert("Error saving content. Ensure Firebase rules allow read/write.");
    } finally {
      setLoading(false);
    }
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
          
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Manage Website Sections</h2>
                <button 
                  onClick={saveContent}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Hero Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Title</label>
                      <input 
                        type="text" 
                        value={siteContent.heroTitle}
                        onChange={(e) => setSiteContent({...siteContent, heroTitle: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Subtitle</label>
                      <textarea 
                        value={siteContent.heroSubtitle}
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
                        value={siteContent.plansTitle}
                        onChange={(e) => setSiteContent({...siteContent, plansTitle: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Plans Subtitle</label>
                      <textarea 
                        value={siteContent.plansSubtitle}
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
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Manage Testimonials</h2>
                <button className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-900">
                  <Plus className="w-4 h-4" /> Add Testimonial
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                <p className="text-slate-500 mb-2">Testimonials system is connected.</p>
                <p className="text-sm text-slate-400">Note: Use Google Drive links for Image/Video URLs since Firebase Storage is disabled.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
