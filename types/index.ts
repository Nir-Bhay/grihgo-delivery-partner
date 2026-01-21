/**
 * GRIHGO Delivery Partner App - Common Types
 */

// Coordinates
export interface Coordinates {
    lat: number;
    lng: number;
}

// Restaurant
export interface Restaurant {
    id: string;
    name: string;
    address: string;
    phone: string;
    coordinates: Coordinates;
}

// Customer
export interface Customer {
    id: string;
    name: string;
    phone: string;
    address: string;
    landmark?: string;
    floor?: string;
    coordinates: Coordinates;
}

// Order Item
export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

// Order Earnings
export interface OrderEarnings {
    base: number;
    tip: number;
    peakBonus: number;
    total: number;
}

// Order Status
export type OrderStatus =
    | 'ASSIGNED'
    | 'ACCEPTED'
    | 'ARRIVED_RESTAURANT'
    | 'PICKED_UP'
    | 'EN_ROUTE'
    | 'ARRIVED_CUSTOMER'
    | 'DELIVERED'
    | 'CANCELLED';

// Timeline Event
export interface TimelineEvent {
    status: OrderStatus;
    time: Date;
}

// Order
export interface Order {
    id: string;
    status: OrderStatus;
    createdAt: Date;
    completedAt?: Date;
    restaurant: Restaurant;
    customer: Customer;
    items: OrderItem[];
    distance: number; // km
    estimatedTime: number; // minutes
    earnings: OrderEarnings;
    timeline: TimelineEvent[];
    deliveryInstructions?: string;
}

// Earnings Summary
export interface EarningsSummary {
    amount: number;
    trips: number;
    hours: number;
    distance: number;
}

// Earnings Breakdown
export interface EarningsBreakdown {
    basePay: number;
    tips: number;
    peakBonus: number;
    incentives: number;
    total: number;
}

// Payout
export interface Payout {
    id: string;
    amount: number;
    date: Date;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    bankName: string;
    accountLast4: string;
}

// Challenge/Incentive
export interface Challenge {
    id: string;
    title: string;
    description: string;
    reward: number;
    progress: number;
    target: number;
    expiresAt: Date;
    status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
}

// Notification
export interface NotificationItem {
    id: string;
    type: 'ORDER' | 'EARNINGS' | 'BONUS' | 'ALERT' | 'PROMO';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

// Document
export interface Document {
    type: 'AADHAAR' | 'PAN' | 'DRIVING_LICENSE' | 'RC_BOOK' | 'INSURANCE' | 'PROFILE_PHOTO';
    number?: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
    uploadedAt?: Date;
    verifiedAt?: Date;
    expiresAt?: Date;
    imageUri?: string;
}

// Vehicle
export interface Vehicle {
    type: 'BIKE' | 'SCOOTER' | 'BICYCLE' | 'CAR';
    number: string;
    model: string;
    year: number;
    documents: Document[];
}

// Bank Account
export interface BankAccount {
    id: string;
    holderName: string;
    bankName: string;
    accountNumber: string; // Masked
    ifsc: string;
    isPrimary: boolean;
    verified: boolean;
}

// User/Partner
export interface User {
    id: string;
    name: string;
    phone: string;
    email?: string;
    dateOfBirth?: Date;
    city?: string;
    profilePhoto?: string;
    rating: number;
    totalDeliveries: number;
    documents: Document[];
    vehicle?: Vehicle;
    bankAccount?: BankAccount;
    createdAt: Date;
    verified: boolean;
}

// Feedback/Review
export interface Review {
    id: string;
    rating: number;
    comment?: string;
    customerName: string;
    orderId: string;
    createdAt: Date;
}
