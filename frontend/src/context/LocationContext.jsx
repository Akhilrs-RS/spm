import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home',
    address: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru, Karnataka',
    zip: '560103',
    isDefault: true,
    estimatedMinutes: '15-25'
  },
  {
    id: 'addr-2',
    label: 'Office / Work',
    address: 'Bagmane Tech Park, CV Raman Nagar',
    city: 'Bengaluru, Karnataka',
    zip: '560093',
    isDefault: false,
    estimatedMinutes: '20-30'
  }
];

export function LocationProvider({ children }) {
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState({
    type: 'express',
    title: 'Express Delivery (Under 25 mins)',
    time: '15-25 mins'
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
