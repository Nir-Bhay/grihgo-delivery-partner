/**
 * GRIHGO Delivery Partner App - Main Layout
 * Tab-based navigation for the main app
 */

import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { colors, typography } from '@/constants';
import { Icon } from '@/components/ui';

export default function MainLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.light.textMuted,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tabs.Screen
                name="(tabs)/home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Icon name="home" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(tabs)/orders"
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color }) => <Icon name="package" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(tabs)/earnings"
                options={{
                    title: 'Earnings',
                    tabBarIcon: ({ color }) => <Icon name="wallet" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(tabs)/profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Icon name="user" size={22} color={color} />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 64,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: colors.light.surface,
        borderTopWidth: 1,
        borderTopColor: colors.light.border,
    },
    tabBarLabel: {
        ...typography.tiny,
        fontWeight: '500',
    },
});
