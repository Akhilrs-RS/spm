import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  Sliders,
  Check,
  Save,
  Phone,
  Mail,
  Calendar,
  Clock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Plus,
  Leaf
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { formatINR } from '../../utils/formatCurrency';

const AVATAR_COLORS = [
  { id: 'emerald', class: 'bg-emerald-600', name: 'Emerald Fresh' },
  { id: 'amber', class: 'bg-amber-500', name: 'Amber Gold' },
  { id: 'blue', class: 'bg-blue-600', name: 'Ocean Blue' },
  { id: 'purple', class: 'bg-purple-600', name: 'Royal Purple' },
  { id: 'rose', class: 'bg-rose-500', name: 'Berry Rose' },
  { id: 'slate', class: 'bg-slate-800', name: 'Dark Slate' },
];

const PRESET_NOTES = [
  'Call upon arrival and leave at door',
  'Do not ring doorbell (baby sleeping)',
  'Leave with building security guard',
  'Ring bell and wait for recipient'
];

export default function ProfileModal() {
  const {
    profile,
    orderHistory,
    isProfileOpen,
    setIsProfileOpen,
    updateProfile
  } = useUser();

  const { addToCart, setIsCartOpen, showToast } = useCart();
  const { addresses, selectedAddress, selectAddress, addNewAddress } = useLocation();

  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'orders', 'addresses', 'preferences'

  // Personal form state
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [avatarColor, setAvatarColor] = useState(profile.avatarColor || 'bg-emerald-600');
  const [isSaved, setIsSaved] = useState(false);

  // Preferences form state
  const [dietary, setDietary] = useState(profile.dietaryPreference || 'all');
  const [deliveryInstruction, setDeliveryInstruction] = useState(profile.deliveryInstruction || '');
  const [whatsappNotif, setWhatsappNotif] = useState(profile.notifications?.whatsapp ?? true);
  const [emailNotif, setEmailNotif] = useState(profile.notifications?.emailReceipts ?? true);

  // Address add form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newZip, setNewZip] = useState('');

  if (!isProfileOpen) return null;

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      avatarColor
    });
    setIsSaved(true);
    showToast('Profile updated successfully!');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      dietaryPreference: dietary,
      deliveryInstruction,
      notifications: {
        whatsapp: whatsappNotif,
        emailReceipts: emailNotif,
        promotions: false
      }
    });
    showToast('Preferences updated successfully!');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress || !newZip) return;
    addNewAddress({
      label: newLabel,
      address: newAddress,
      city: newCity,
      zip: newZip
    });
    setNewAddress('');
    setNewZip('');
    setShowAddressForm(false);
    showToast('New address saved!');
  };

  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;
    
    // Add all items from this order into active cart
    order.items.forEach((item) => {
      addToCart({
        id: item.productId || item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.price,
        weightOptions: [item.weightOption],
        image: item.image,
        category: 'groceries'
      }, item.weightOption, 1);
    });

    setIsProfileOpen(false);
    setIsCartOpen(true);
    showToast(`Reordered ${order.items.length} items to your basket!`);
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 flex flex-col max-h-[85vh]">
        
        {/* Profile Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white relative shrink-0">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar Circle */}
            <div className={`w-16 h-16 rounded-2xl ${avatarColor} flex items-center justify-center text-white text-2xl font-black shadow-lg border-2 border-white/20 shrink-0`}>
              {getInitials(profile.name)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white truncate">{profile.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Member
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1"><Mail size={12} className="text-emerald-400" /> {profile.email}</span>
                <span className="flex items-center gap-1"><Phone size={12} className="text-emerald-400" /> +91 {profile.phone}</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 -mb-2 pt-2 border-t border-slate-700/60 no-scrollbar">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === 'personal'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              <User size={14} />
              <span>Personal Details</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === 'orders'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              <Package size={14} />
              <span>My Orders</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                {orderHistory.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === 'addresses'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              <MapPin size={14} />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === 'preferences'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              <Sliders size={14} />
              <span>Preferences</span>
            </button>
          </div>
        </div>

        {/* Tab Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Personal Details */}
          {activeTab === 'personal' && (
            <form onSubmit={handlePersonalSubmit} className="space-y-6">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Contact Information</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Update your display name, contact phone, and account details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      placeholder="e.g. Akhil R S"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      placeholder="e.g. akhil@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Mobile Number (for delivery updates)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-16 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white font-mono"
                      placeholder="9876543210"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Avatar Color Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Avatar Color Theme</label>
                <div className="flex items-center gap-3">
                  {AVATAR_COLORS.map((clr) => (
                    <button
                      key={clr.id}
                      type="button"
                      onClick={() => setAvatarColor(clr.class)}
                      className={`w-9 h-9 rounded-xl ${clr.class} flex items-center justify-center text-white transition ring-2 ${
                        avatarColor === clr.class ? 'ring-offset-2 ring-slate-900 scale-110' : 'ring-transparent'
                      }`}
                      title={clr.name}
                    >
                      {avatarColor === clr.class && <Check size={16} strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {isSaved ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <Check size={16} /> Changes saved successfully!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Changes will be saved locally on your device
                  </span>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 transition active:scale-95"
                >
                  <Save size={15} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Order History & 1-Click Reorder */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Past Supermarket Orders</h4>
                  <p className="text-xs text-slate-500">Track delivery status or reorder favorite items in 1 click</p>
                </div>
              </div>

              {orderHistory.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Package size={36} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">No past orders found</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Your grocery orders will appear here after checkout.</p>
                </div>
              ) : (
                orderHistory.map((order, idx) => (
                  <div
                    key={order.orderId || idx}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition bg-white shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                            {order.orderId}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-brand-800'
                                : 'bg-amber-100 text-amber-900 animate-pulse'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Calendar size={12} /> {order.date} • Delivered to {order.address?.label || 'Home'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-400 block">Total Paid</span>
                        <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                          {formatINR(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Items Thumbnails */}
                    {order.items && order.items.length > 0 && (
                      <div className="flex items-center gap-3 overflow-x-auto py-1 no-scrollbar">
                        {order.items.map((it, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100 shrink-0"
                          >
                            <img src={it.image} alt={it.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div className="pr-1">
                              <p className="text-[10px] font-bold text-slate-800 max-w-[120px] truncate">{it.name}</p>
                              <p className="text-[9px] text-slate-400">{it.quantity}x • {it.weightOption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {order.items?.length || 0} items purchased
                      </span>

                      <button
                        onClick={() => handleReorder(order)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-brand-600 text-brand-700 hover:text-white border border-emerald-300 hover:border-brand-600 rounded-xl font-bold text-xs transition duration-200 active:scale-95 shadow-2xs group"
                      >
                        <RotateCcw size={13} className="group-hover:-rotate-90 transition-transform duration-300" />
                        <span>Reorder in 1-Click</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Saved Delivery Addresses</h4>
                  <p className="text-xs text-slate-500">Fast 15–25m delivery destinations</p>
                </div>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition shadow-2xs"
                  >
                    <Plus size={14} />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {/* Add form */}
              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">New Address Details</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Label (e.g. Home, Office, Gym)"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="6-Digit PIN Code"
                      value={newZip}
                      onChange={(e) => setNewZip(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                      maxLength={6}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="House/Flat No, Apartment, Street name"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City (e.g. Bengaluru, Mumbai)"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                    required
                  />
                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address Cards */}
              <div className="space-y-2.5">
                {addresses.map((addr) => {
                  const isCurrent = selectedAddress?.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      className={`p-3.5 rounded-2xl border flex items-start justify-between transition ${
                        isCurrent
                          ? 'border-brand-500 bg-brand-50/50 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                            isCurrent ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <MapPin size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                              {addr.label}
                            </span>
                            <span className="text-xs text-brand-600 font-bold">
                              ⚡ {addr.estimatedMinutes} mins
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-800 mt-1">{addr.address}</p>
                          <p className="text-[11px] text-slate-400">{addr.city} • PIN: {addr.zip}</p>
                        </div>
                      </div>

                      <div>
                        {isCurrent ? (
                          <span className="px-2.5 py-1 rounded-lg bg-brand-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-2xs">
                            <Check size={12} strokeWidth={3} /> Default
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              selectAddress(addr);
                              showToast(`Switched default to ${addr.label}`);
                            }}
                            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                          >
                            Set Default
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Grocery Preferences & Delivery Notes */}
          {activeTab === 'preferences' && (
            <form onSubmit={handlePreferencesSubmit} className="space-y-6">
              {/* Dietary preference */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Dietary & Food Lifestyle</h4>
                <p className="text-xs text-slate-500 mb-3">
                  Customize recommended products and grocery alerts
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'all', label: 'All Foods', desc: 'No restrictions' },
                    { id: 'veg', label: 'Vegetarian', desc: '100% Veg only' },
                    { id: 'vegan', label: 'Vegan', desc: 'Plant-based only' },
                    { id: 'organic', label: 'Organic Only', desc: 'Certified Organic' },
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      type="button"
                      onClick={() => setDietary(diet.id)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                        dietary === diet.id
                          ? 'border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900">{diet.label}</span>
                      <span className="text-[10px] text-slate-400 mt-1">{diet.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery drop notes */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Doorstep Delivery Notes</h4>
                <p className="text-xs text-slate-500 mb-2.5">
                  Instructions automatically forwarded to your quick delivery rider
                </p>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {PRESET_NOTES.map((note) => (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setDeliveryInstruction(note)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 text-[11px] font-medium border border-slate-200 transition"
                    >
                      + {note}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={deliveryInstruction}
                  onChange={(e) => setDeliveryInstruction(e.target.value)}
                  placeholder="e.g. Leave with guard, ring doorbell only once..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white resize-none"
                  maxLength={120}
                />
              </div>

              {/* Notification Toggles */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-sm font-extrabold text-slate-900">Communication & Receipts</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">WhatsApp Delivery Updates</span>
                      <span className="text-[11px] text-slate-400">Receive live dispatch and rider location links on WhatsApp</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappNotif}
                      onChange={(e) => setWhatsappNotif(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Email Tax Invoices</span>
                      <span className="text-[11px] text-slate-400">Automatically send itemized tax receipts to {email}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotif}
                      onChange={(e) => setEmailNotif(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                    />
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 transition active:scale-95"
                >
                  <Save size={15} />
                  <span>Save Preferences</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}

