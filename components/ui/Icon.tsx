/**
 * GRIHGO Delivery Partner App - Icon Component
 * 
 * Centralized icon component using @expo/vector-icons
 * Replaces all emojis with smooth vector icons
 */

import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants';

export type IconName =
    // Navigation & UI
    | 'menu'
    | 'bell'
    | 'bell-outline'
    | 'back'
    | 'forward'
    | 'close'
    | 'settings'
    | 'help'
    | 'logout'
    | 'camera'
    | 'checkmark'
    | 'star'
    | 'star-outline'
    | 'calendar'
    // Communication
    | 'phone'
    | 'chat'
    | 'email'
    // Delivery
    | 'scooter'
    | 'bike'
    | 'car'
    | 'bicycle'
    | 'location'
    | 'navigate'
    | 'home'
    | 'restaurant'
    | 'package'
    | 'door'
    | 'security'
    | 'handshake'
    // Money
    | 'bank'
    | 'wallet'
    | 'cash'
    | 'rupee'
    | 'trophy'
    // Documents
    | 'document'
    | 'id-card'
    | 'shield'
    // Status
    | 'online'
    | 'offline'
    | 'warning'
    | 'error'
    | 'success'
    | 'info'
    // Actions
    | 'play'
    | 'pause'
    | 'refresh'
    | 'download'
    | 'upload'
    | 'share'
    | 'edit'
    | 'delete'
    | 'add'
    | 'remove'
    | 'search'
    | 'filter'
    // Misc
    | 'time'
    | 'distance'
    | 'sos'
    | 'fire'
    | 'moon'
    | 'sun'
    | 'globe'
    | 'volume'
    | 'vibration'
    | 'map'
    | 'user'
    | 'users'
    | 'bug'
    | 'lightbulb'
    | 'training'
    | 'zoom-in'
    | 'zoom-out'
    | 'target'
    | 'power'
    | 'heart'
    | 'trending'
    | 'down'
    | 'sound'
    | 'wifi';

interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
}

const iconMap: Record<IconName, { library: 'ionicons' | 'material' | 'fa5' | 'feather' | 'mci'; icon: string }> = {
    // Navigation & UI
    menu: { library: 'ionicons', icon: 'menu' },
    bell: { library: 'ionicons', icon: 'notifications' },
    'bell-outline': { library: 'ionicons', icon: 'notifications-outline' },
    back: { library: 'ionicons', icon: 'chevron-back' },
    forward: { library: 'ionicons', icon: 'chevron-forward' },
    close: { library: 'ionicons', icon: 'close' },
    settings: { library: 'ionicons', icon: 'settings-outline' },
    help: { library: 'ionicons', icon: 'help-circle-outline' },
    logout: { library: 'ionicons', icon: 'log-out-outline' },
    camera: { library: 'ionicons', icon: 'camera' },
    checkmark: { library: 'ionicons', icon: 'checkmark' },
    star: { library: 'ionicons', icon: 'star' },
    'star-outline': { library: 'ionicons', icon: 'star-outline' },
    calendar: { library: 'ionicons', icon: 'calendar-outline' },

    // Communication
    phone: { library: 'ionicons', icon: 'call' },
    chat: { library: 'ionicons', icon: 'chatbubble-ellipses' },
    email: { library: 'ionicons', icon: 'mail-outline' },

    // Delivery
    scooter: { library: 'mci', icon: 'motorbike' },
    bike: { library: 'ionicons', icon: 'bicycle' },
    car: { library: 'ionicons', icon: 'car' },
    bicycle: { library: 'ionicons', icon: 'bicycle' },
    location: { library: 'ionicons', icon: 'location' },
    navigate: { library: 'ionicons', icon: 'navigate' },
    home: { library: 'ionicons', icon: 'home' },
    restaurant: { library: 'ionicons', icon: 'restaurant' },
    package: { library: 'feather', icon: 'package' },
    door: { library: 'mci', icon: 'door' },
    security: { library: 'mci', icon: 'shield-account' },
    handshake: { library: 'fa5', icon: 'handshake' },

    // Money
    bank: { library: 'mci', icon: 'bank' },
    wallet: { library: 'ionicons', icon: 'wallet' },
    cash: { library: 'ionicons', icon: 'cash' },
    rupee: { library: 'fa5', icon: 'rupee-sign' },
    trophy: { library: 'ionicons', icon: 'trophy' },

    // Documents
    document: { library: 'ionicons', icon: 'document-text' },
    'id-card': { library: 'ionicons', icon: 'card' },
    shield: { library: 'ionicons', icon: 'shield-checkmark' },

    // Status
    online: { library: 'ionicons', icon: 'radio-button-on' },
    offline: { library: 'ionicons', icon: 'radio-button-off' },
    warning: { library: 'ionicons', icon: 'warning' },
    error: { library: 'ionicons', icon: 'close-circle' },
    success: { library: 'ionicons', icon: 'checkmark-circle' },
    info: { library: 'ionicons', icon: 'information-circle' },

    // Actions
    play: { library: 'ionicons', icon: 'play' },
    pause: { library: 'ionicons', icon: 'pause' },
    refresh: { library: 'ionicons', icon: 'refresh' },
    download: { library: 'ionicons', icon: 'download' },
    upload: { library: 'ionicons', icon: 'cloud-upload' },
    share: { library: 'ionicons', icon: 'share-social' },
    edit: { library: 'ionicons', icon: 'pencil' },
    delete: { library: 'ionicons', icon: 'trash' },
    add: { library: 'ionicons', icon: 'add' },
    remove: { library: 'ionicons', icon: 'remove' },
    search: { library: 'ionicons', icon: 'search' },
    filter: { library: 'ionicons', icon: 'filter' },

    // Misc
    time: { library: 'ionicons', icon: 'time-outline' },
    distance: { library: 'ionicons', icon: 'speedometer-outline' },
    sos: { library: 'mci', icon: 'phone-alert' },
    fire: { library: 'ionicons', icon: 'flame' },
    moon: { library: 'ionicons', icon: 'moon' },
    sun: { library: 'ionicons', icon: 'sunny' },
    globe: { library: 'ionicons', icon: 'globe-outline' },
    volume: { library: 'ionicons', icon: 'volume-high' },
    vibration: { library: 'ionicons', icon: 'phone-portrait' },
    map: { library: 'ionicons', icon: 'map' },
    user: { library: 'ionicons', icon: 'person' },
    users: { library: 'ionicons', icon: 'people' },
    bug: { library: 'ionicons', icon: 'bug' },
    lightbulb: { library: 'ionicons', icon: 'bulb' },
    training: { library: 'ionicons', icon: 'school' },
    'zoom-in': { library: 'ionicons', icon: 'add' },
    'zoom-out': { library: 'ionicons', icon: 'remove' },
    target: { library: 'ionicons', icon: 'locate' },
    power: { library: 'ionicons', icon: 'power' },
    heart: { library: 'ionicons', icon: 'heart' },
    trending: { library: 'ionicons', icon: 'trending-up' },
    down: { library: 'ionicons', icon: 'chevron-down' },
    sound: { library: 'ionicons', icon: 'volume-medium' },
    wifi: { library: 'ionicons', icon: 'wifi' },
};

export function Icon({ name, size = 24, color = colors.light.textPrimary }: IconProps) {
    const config = iconMap[name];

    if (!config) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    switch (config.library) {
        case 'ionicons':
            return <Ionicons name={config.icon as any} size={size} color={color} />;
        case 'material':
            return <MaterialIcons name={config.icon as any} size={size} color={color} />;
        case 'fa5':
            return <FontAwesome5 name={config.icon as any} size={size} color={color} />;
        case 'feather':
            return <Feather name={config.icon as any} size={size} color={color} />;
        case 'mci':
            return <MaterialCommunityIcons name={config.icon as any} size={size} color={color} />;
        default:
            return null;
    }
}

export default Icon;
