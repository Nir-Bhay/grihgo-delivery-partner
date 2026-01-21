/**
 * GRIHGO Delivery Partner App - Mock Order Data
 * Realistic mock data for testing order flow
 */

import { Order, OrderStatus } from '@/types';

// New order that appears when driver is online
export const mockNewOrder: Order = {
    id: 'GR78945',
    status: 'ASSIGNED' as OrderStatus,
    createdAt: new Date(),
    restaurant: {
        id: 'r1',
        name: 'Paradise Biryani',
        address: 'Koramangala, 5th Block',
        phone: '+91 80 1234 5678',
        coordinates: { lat: 12.9352, lng: 77.6245 },
    },
    customer: {
        id: 'c1',
        name: 'Rahul S.',
        phone: '+91 98765 43210',
        address: 'HSR Layout, Sector 2',
        landmark: 'Near HDFC Bank',
        floor: 'Floor 3, Flat 302',
        coordinates: { lat: 12.9121, lng: 77.6446 },
    },
    items: [
        { name: 'Chicken Biryani', quantity: 1, price: 350 },
        { name: 'Butter Naan', quantity: 2, price: 80 },
        { name: 'Raita', quantity: 1, price: 40 },
    ],
    distance: 3.5,
    estimatedTime: 18,
    earnings: {
        base: 65,
        tip: 25,
        peakBonus: 20,
        total: 110,
    },
    timeline: [],
};

// Additional order for testing multiple active orders
export const mockSecondOrder: Order = {
    id: 'GR78946',
    status: 'ASSIGNED' as OrderStatus,
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    restaurant: {
        id: 'r4',
        name: 'Taco Bell',
        address: 'Whitefield Main Road',
        phone: '+91 80 4567 8901',
        coordinates: { lat: 12.9698, lng: 77.7500 },
    },
    customer: {
        id: 'c4',
        name: 'Sneha R.',
        phone: '+91 98111 22333',
        address: 'Brookfield, Embassy Tech Village',
        floor: 'Building A, Floor 7',
        coordinates: { lat: 12.9750, lng: 77.7100 },
    },
    items: [
        { name: 'Crunchwrap Supreme', quantity: 2, price: 249 },
        { name: 'Nachos', quantity: 1, price: 199 },
    ],
    distance: 2.8,
    estimatedTime: 14,
    earnings: {
        base: 55,
        tip: 0,
        peakBonus: 15,
        total: 70,
    },
    timeline: [],
};

export const mockActiveOrders: Order[] = [
    mockNewOrder,
    {
        id: 'GR78944',
        status: 'PICKED_UP' as OrderStatus,
        createdAt: new Date(Date.now() - 15 * 60 * 1000),
        restaurant: {
            id: 'r2',
            name: 'Pizza Hut',
            address: 'Indiranagar, 100 Feet Road',
            phone: '+91 80 2345 6789',
            coordinates: { lat: 12.9716, lng: 77.6412 },
        },
        customer: {
            id: 'c2',
            name: 'Priya M.',
            phone: '+91 99887 76655',
            address: 'HSR Layout, Sector 1',
            floor: 'Ground Floor',
            coordinates: { lat: 12.9101, lng: 77.6386 },
        },
        items: [
            { name: 'Margherita Pizza', quantity: 1, price: 450 },
            { name: 'Garlic Bread', quantity: 1, price: 150 },
        ],
        distance: 4.2,
        estimatedTime: 22,
        earnings: {
            base: 75,
            tip: 30,
            peakBonus: 0,
            total: 105,
        },
        timeline: [
            { status: 'ACCEPTED', time: new Date(Date.now() - 15 * 60 * 1000) },
            { status: 'ARRIVED_RESTAURANT', time: new Date(Date.now() - 10 * 60 * 1000) },
            { status: 'PICKED_UP', time: new Date(Date.now() - 5 * 60 * 1000) },
        ],
    },
];

export const mockOrderHistory: Order[] = [
    {
        id: 'GR78940',
        status: 'DELIVERED' as OrderStatus,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        completedAt: new Date(Date.now() - 5 * 60 * 1000),
        restaurant: {
            id: 'r3',
            name: 'Dominos Pizza',
            address: 'JP Nagar, 6th Phase',
            phone: '+91 80 3456 7890',
            coordinates: { lat: 12.8912, lng: 77.5946 },
        },
        customer: {
            id: 'c3',
            name: 'Amit K.',
            phone: '+91 98123 45678',
            address: 'BTM Layout, 1st Stage',
            coordinates: { lat: 12.9166, lng: 77.6101 },
        },
        items: [
            { name: 'Pepperoni Pizza', quantity: 1, price: 499 },
        ],
        distance: 2.8,
        estimatedTime: 15,
        earnings: {
            base: 55,
            tip: 25,
            peakBonus: 15,
            total: 95,
        },
        timeline: [
            { status: 'ACCEPTED', time: new Date(Date.now() - 30 * 60 * 1000) },
            { status: 'ARRIVED_RESTAURANT', time: new Date(Date.now() - 25 * 60 * 1000) },
            { status: 'PICKED_UP', time: new Date(Date.now() - 20 * 60 * 1000) },
            { status: 'DELIVERED', time: new Date(Date.now() - 5 * 60 * 1000) },
        ],
    },
    {
        id: 'GR78935',
        status: 'DELIVERED' as OrderStatus,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 90 * 60 * 1000),
        restaurant: {
            id: 'r5',
            name: 'Starbucks',
            address: 'MG Road, Central',
            phone: '+91 80 5678 9012',
            coordinates: { lat: 12.9750, lng: 77.6050 },
        },
        customer: {
            id: 'c5',
            name: 'Kiran V.',
            phone: '+91 99000 11222',
            address: 'Ulsoor, Lake View Road',
            coordinates: { lat: 12.9780, lng: 77.6200 },
        },
        items: [
            { name: 'Caramel Frappuccino', quantity: 2, price: 350 },
            { name: 'Chocolate Croissant', quantity: 1, price: 180 },
        ],
        distance: 1.5,
        estimatedTime: 10,
        earnings: {
            base: 45,
            tip: 20,
            peakBonus: 0,
            total: 65,
        },
        timeline: [
            { status: 'ACCEPTED', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
            { status: 'PICKED_UP', time: new Date(Date.now() - 110 * 60 * 1000) },
            { status: 'DELIVERED', time: new Date(Date.now() - 90 * 60 * 1000) },
        ],
    },
    {
        id: 'GR78928',
        status: 'CANCELLED' as OrderStatus,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        restaurant: {
            id: 'r6',
            name: 'McDonald\'s',
            address: 'Jayanagar 4th Block',
            phone: '+91 80 6789 0123',
            coordinates: { lat: 12.9250, lng: 77.5950 },
        },
        customer: {
            id: 'c6',
            name: 'Vivek T.',
            phone: '+91 98333 44555',
            address: 'Jayanagar 9th Block',
            coordinates: { lat: 12.9200, lng: 77.5850 },
        },
        items: [
            { name: 'McChicken Meal', quantity: 1, price: 249 },
        ],
        distance: 1.8,
        estimatedTime: 12,
        earnings: {
            base: 40,
            tip: 0,
            peakBonus: 0,
            total: 40,
        },
        timeline: [
            { status: 'ACCEPTED', time: new Date(Date.now() - 3 * 60 * 60 * 1000) },
            { status: 'CANCELLED', time: new Date(Date.now() - 175 * 60 * 1000) },
        ],
    },
];

// Restaurant distance from current location (mock)
export const getRestaurantDistance = (): string => '1.2 km away';

// Get order by ID
export const getOrderById = (orderId: string): Order | undefined => {
    return [...mockActiveOrders, ...mockOrderHistory].find(order => order.id === orderId);
};
