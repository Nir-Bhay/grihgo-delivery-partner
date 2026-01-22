/**
 * GRIHGO Delivery Partner App - Auth Store
 * Zustand store for authentication state
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { logger } from '@/utils/logger';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isOnline: boolean;

    // Actions
    login: (phone: string) => Promise<void>;
    logout: () => void;
    setOnlineStatus: (status: boolean) => void;
    updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,
            isOnline: false,

            login: async (phone: string) => {
                logger.action('AuthStore', 'login', { phone });
                // Mock user data - store createdAt as ISO string for safe serialization
                const mockUser: User = {
                    id: 'GR-DP-12345',
                    name: 'Rahul Sharma',
                    phone: phone,
                    email: 'rahul@email.com',
                    rating: 4.8,
                    totalDeliveries: 245,
                    documents: [],
                    createdAt: new Date().toISOString() as unknown as Date,
                    verified: true,
                };
                set({ isAuthenticated: true, user: mockUser });
            },

            logout: () => {
                logger.action('AuthStore', 'logout');
                set({ isAuthenticated: false, user: null, isOnline: false });
            },

            setOnlineStatus: (status: boolean) => {
                logger.action('AuthStore', 'setOnlineStatus', { status });
                set({ isOnline: status });
            },

            updateUser: (data: Partial<User>) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({ user: { ...currentUser, ...data } });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            // Handle rehydration to convert date strings back to Date objects
            onRehydrateStorage: () => (state) => {
                if (state?.user?.createdAt && typeof state.user.createdAt === 'string') {
                    state.user.createdAt = new Date(state.user.createdAt);
                }
            },
        }
    )
);
