/**
 * GRIHGO Delivery Partner App - Internationalization
 * Multi-language support (English + Hindi)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'hi';

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

// English translations
const en = {
    // Common
    'common.loading': 'Loading...',
    'common.retry': 'Try Again',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.done': 'Done',
    'common.save': 'Save',
    'common.back': 'Back',

    // Home
    'home.greeting.morning': 'Good Morning',
    'home.greeting.afternoon': 'Good Afternoon',
    'home.greeting.evening': 'Good Evening',
    'home.online': 'Online',
    'home.offline': 'Offline',
    'home.waitForOrders': 'Waiting for orders...',
    'home.todayEarnings': 'Today\'s Earnings',
    'home.orders': 'Orders',
    'home.distance': 'Distance',
    'home.hours': 'Hours',

    // Order
    'order.new': 'New Order',
    'order.accept': 'Accept Order',
    'order.decline': 'Decline',
    'order.pickup': 'Pickup',
    'order.enRoute': 'En Route',
    'order.deliver': 'Deliver',
    'order.arrivedRestaurant': 'Arrived at Restaurant',
    'order.arrivedCustomer': 'Arrived at Customer',
    'order.completeDelivery': 'Complete Delivery',
    'order.confirmDelivery': 'Confirm Delivery',
    'order.deliveryComplete': 'Delivery Complete!',
    'order.estimatedEarnings': 'Estimated Earnings',

    // Profile
    'profile.title': 'Profile',
    'profile.myDocuments': 'My Documents',
    'profile.settings': 'Settings',
    'profile.help': 'Help & Support',
    'profile.logout': 'Logout',

    // Earnings
    'earnings.title': 'Earnings',
    'earnings.today': 'Today',
    'earnings.thisWeek': 'This Week',
    'earnings.thisMonth': 'This Month',
    'earnings.breakdown': 'Earnings Breakdown',
    'earnings.basePay': 'Base Pay',
    'earnings.tips': 'Tips',
    'earnings.bonus': 'Bonus',

    // Settings
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.darkMode': 'Dark Mode',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.sounds': 'Sound & Haptics',

    // Errors
    'error.noInternet': 'No Internet Connection',
    'error.somethingWrong': 'Something Went Wrong',
    'error.tryAgain': 'Please try again',
    'error.permissionDenied': 'Permission Denied',
};

// Hindi translations
const hi = {
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.retry': 'पुनः प्रयास करें',
    'common.cancel': 'रद्द करें',
    'common.confirm': 'पुष्टि करें',
    'common.done': 'हो गया',
    'common.save': 'सहेजें',
    'common.back': 'वापस',

    // Home
    'home.greeting.morning': 'शुभ प्रभात',
    'home.greeting.afternoon': 'शुभ दोपहर',
    'home.greeting.evening': 'शुभ संध्या',
    'home.online': 'ऑनलाइन',
    'home.offline': 'ऑफ़लाइन',
    'home.waitForOrders': 'ऑर्डर की प्रतीक्षा...',
    'home.todayEarnings': 'आज की कमाई',
    'home.orders': 'ऑर्डर',
    'home.distance': 'दूरी',
    'home.hours': 'घंटे',

    // Order
    'order.new': 'नया ऑर्डर',
    'order.accept': 'ऑर्डर स्वीकार करें',
    'order.decline': 'अस्वीकार करें',
    'order.pickup': 'पिकअप',
    'order.enRoute': 'रास्ते में',
    'order.deliver': 'डिलीवर करें',
    'order.arrivedRestaurant': 'रेस्टोरेंट पहुंचे',
    'order.arrivedCustomer': 'ग्राहक के पास पहुंचे',
    'order.completeDelivery': 'डिलीवरी पूर्ण करें',
    'order.confirmDelivery': 'डिलीवरी की पुष्टि करें',
    'order.deliveryComplete': 'डिलीवरी पूर्ण!',
    'order.estimatedEarnings': 'अनुमानित कमाई',

    // Profile
    'profile.title': 'प्रोफाइल',
    'profile.myDocuments': 'मेरे दस्तावेज़',
    'profile.settings': 'सेटिंग्स',
    'profile.help': 'सहायता',
    'profile.logout': 'लॉग आउट',

    // Earnings
    'earnings.title': 'कमाई',
    'earnings.today': 'आज',
    'earnings.thisWeek': 'इस सप्ताह',
    'earnings.thisMonth': 'इस महीने',
    'earnings.breakdown': 'कमाई विवरण',
    'earnings.basePay': 'बेस पे',
    'earnings.tips': 'टिप्स',
    'earnings.bonus': 'बोनस',

    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.appearance': 'दिखावट',
    'settings.darkMode': 'डार्क मोड',
    'settings.language': 'भाषा',
    'settings.notifications': 'सूचनाएं',
    'settings.sounds': 'ध्वनि और हैप्टिक्स',

    // Errors
    'error.noInternet': 'इंटरनेट कनेक्शन नहीं',
    'error.somethingWrong': 'कुछ गलत हो गया',
    'error.tryAgain': 'कृपया पुनः प्रयास करें',
    'error.permissionDenied': 'अनुमति अस्वीकृत',
};

const translations: Record<Language, Record<string, string>> = { en, hi };

const LANG_STORAGE_KEY = '@grihgo_language';

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        AsyncStorage.getItem(LANG_STORAGE_KEY)
            .then(saved => {
                if (saved === 'en' || saved === 'hi') {
                    setLanguageState(saved);
                }
            })
            .catch((error) => {
                // Silently fail - use default language
                console.warn('Failed to load language preference:', error);
            });
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        AsyncStorage.setItem(LANG_STORAGE_KEY, lang).catch((error) => {
            console.warn('Failed to save language preference:', error);
        });
    };

    const t = (key: string): string => {
        // Safe access with fallback to prevent crashes
        const langTranslations = translations[language];
        if (!langTranslations) {
            return key;
        }
        return langTranslations[key] || key;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n(): I18nContextType {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
