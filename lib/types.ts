export type Role = 'customer' | 'barber' | 'shop_owner';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: Role;
  avatarUrl?: string;
}

export interface Barber {
  id: string;
  name: string;
  shopName: string;
  rating: number;
  reviewCount: number;
  distance: string;
  imageUrl: string;
  address: string;
  isOpen: boolean;
}

export interface Service {
  id: string;
  title: string;
  duration: number; // in minutes
  price: number;
}

export interface Booking {
  id: string;
  barberId: string;
  customerId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

export interface Review {
  id: string;
  bookingId: string;
  barberId: string;
  customerId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
}

