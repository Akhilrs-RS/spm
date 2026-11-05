import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'Springfield, IL',
    zip: '62704',
    isDefault: true,
    estimatedMinutes: '15-25'
  },
  {
    id: 'addr-2',
    label: 'Office / Work',
    address: '100 Innovation Parkway, Suite 300',
    city: 'Springfield, IL',
    zip: '62701',
    isDefault: false,
    estimatedMinutes: '25-35'
  }
];

export function LocationProvider({ children }) {
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState({
    type: 'express',
    title: 'Express Delivery (Under 30 mins)',
    time: '25-35 mins'
  });

  const selectAddress = (addr) => {
    setSelectedAddress(addr);
    setIsLocationModalOpen(false);
  };

  const addNewAddress = (newAddr) => {
    const created = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: false,
      estimatedMinutes: '20-30'
    };
    setAddresses(prev => [...prev, created]);
    setSelectedAddress(created);
    setIsLocationModalOpen(false);
  };

  return (
    <LocationContext.Provider
      value={{
        addresses,
        selectedAddress,
        isLocationModalOpen,
        deliverySlot,
        setIsLocationModalOpen,
        selectAddress,
        addNewAddress,
        setDeliverySlot
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

