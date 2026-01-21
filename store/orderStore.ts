/**
 * GRIHGO Delivery Partner App - Order Store
 * Zustand store for order state management
 */

import { create } from 'zustand';
import { Order, OrderStatus } from '@/types';
import { mockNewOrder, mockActiveOrders, mockOrderHistory } from '@/services/mock';
import { logger } from '@/utils/logger';

interface OrderState {
    activeOrder: Order | null;
    pendingOrder: Order | null;
    orderHistory: Order[];

    // Actions
    setPendingOrder: (order: Order | null) => void;
    acceptOrder: (orderId: string) => void;
    declineOrder: (orderId: string) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    completeOrder: (orderId: string) => void;
    loadOrderHistory: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
    activeOrder: null,
    pendingOrder: null,
    orderHistory: [],

    setPendingOrder: (order) => {
        logger.action('OrderStore', 'setPendingOrder', { orderId: order?.id });
        set({ pendingOrder: order });
    },

    acceptOrder: (orderId) => {
        logger.action('OrderStore', 'acceptOrder', { orderId });
        const pending = get().pendingOrder;
        if (pending && pending.id === orderId) {
            set({
                activeOrder: { ...pending, status: 'ACCEPTED' },
                pendingOrder: null,
            });
        }
    },

    declineOrder: (orderId) => {
        logger.action('OrderStore', 'declineOrder', { orderId });
        set({ pendingOrder: null });
    },

    updateOrderStatus: (orderId, status) => {
        logger.action('OrderStore', 'updateOrderStatus', { orderId, status });
        const active = get().activeOrder;
        if (active && active.id === orderId) {
            set({ activeOrder: { ...active, status } });
        }
    },

    completeOrder: (orderId) => {
        logger.action('OrderStore', 'completeOrder', { orderId });
        const active = get().activeOrder;
        if (active && active.id === orderId) {
            const completed = { ...active, status: 'DELIVERED' as OrderStatus, completedAt: new Date() };
            set({
                activeOrder: null,
                orderHistory: [completed, ...get().orderHistory],
            });
        }
    },

    loadOrderHistory: () => {
        logger.action('OrderStore', 'loadOrderHistory');
        set({ orderHistory: mockOrderHistory });
    },
}));
