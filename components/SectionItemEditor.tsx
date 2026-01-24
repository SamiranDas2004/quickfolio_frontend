"use client";
import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface SectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image_url?: string;
  link?: string;
}

interface SectionItemEditorProps {
  section: any;
  onSave: (updatedSection: any) => void;
  onClose: () => void;
  username: string;
}

export default function SectionItemEditor({ section, onSave, onClose, username }: SectionItemEditorProps) {
  const [items, setItems] = useState<SectionItem[]>(section.items || []);
  const [editingItem, setEditingItem] = useState<SectionItem | null>(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleAddItem = () => {
    const newItem: SectionItem = {
      id: Date.now().toString(),
      title: "",
      subtitle: "",
      date: "",
      description: "",
      image_url: "",
      link: ""
    };
    setEditingItem(newItem);
    setShowItemForm(true);
  };

  const handleEditItem = (item: SectionItem) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleSaveItem = () => {
    if (!editingItem) return;
    
    if (!editingItem.title || !editingItem.subtitle) {
      toast.error("Title and subtitle are required");
      return;
    }

    const existingIndex = items.findIndex(i => i.id === editingItem.id);
    let updatedItems;
    
    if (existingIndex >= 0) {
      updatedItems = [...items];
      updatedItems[existingIndex] = editingItem;
    } else {
      updatedItems = [...items, editingItem];
    }
    
    setItems(updatedItems);
    setShowItemForm(false);
    setEditingItem(null);
    toast.success("Item saved");
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter(i => i.id !== itemId));
    toast.success("Item deleted");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !editingItem) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    
    setUploadingImage(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload-project-image/${username}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setEditingItem({ ...editingItem, image_url: data.image_url });
        toast.success("Image uploaded");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveSection = () => {
    onSave({ ...section, items });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-black/90 border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit {section.title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!showItemForm ? (
            <>
              <button
                onClick={handleAddItem}
                className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                + Add Item
              </button>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white/5 border border-white/20 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-zinc-400 text-sm">{item.subtitle}</p>
                        {item.date && <p className="text-zinc-500 text-xs mt-1">{item.date}</p>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="px-3 py-1 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 flex gap-2">
                <button
                  onClick={handleSaveSection}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Save Section
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-3 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={editingItem?.title || ""}
                  onChange={(e) => setEditingItem(editingItem ? { ...editingItem, title: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Bachelor of Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Subtitle *</label>
                <input
                  type="text"
                  value={editingItem?.subtitle || ""}
                  onChange={(e) => setEditingItem(editingItem ? { ...editingItem, subtitle: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., University Name / Organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Date / Duration</label>
                <input
                  type="text"
                  value={editingItem?.date || ""}
                  onChange={(e) => setEditingItem(editingItem ? { ...editingItem, date: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2020-2024 or June 2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
                <textarea
                  value={editingItem?.description || ""}
                  onChange={(e) => setEditingItem(editingItem ? { ...editingItem, description: e.target.value } : null)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Link (Optional)</label>
                <input
                  type="url"
                  value={editingItem?.link || ""}
                  onChange={(e) => setEditingItem(editingItem ? { ...editingItem, link: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Image (Optional)</label>
                {editingItem?.image_url && (
                  <div className="mb-2">
                    <img src={editingItem.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {uploadingImage && <p className="text-zinc-400 text-sm mt-2">Uploading...</p>}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveItem}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Save Item
                </button>
                <button
                  onClick={() => {
                    setShowItemForm(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-3 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
