/**
 * GRIHGO Delivery Partner App - Settings Screen
 * Premium settings screen with brand header and grouped settings cards
 */

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'SettingsScreen';

export default function SettingsScreen() {
    // Appearance
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');

    // Notifications
    const [orderAlerts, setOrderAlerts] = useState(true);
    const [promotional, setPromotional] = useState(false);
    const [earningsUpdates, setEarningsUpdates] = useState(true);

    // Sound & Haptics
    const [orderSound, setOrderSound] = useState(true);
    const [vibration, setVibration] = useState(true);

    // Navigation
    const [mapApp, setMapApp] = useState('Google Maps');

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleToggle = (setting: string, value: boolean) => {
        logger.action(TAG, 'toggle', { setting, value });
    };

    return (
        <View style={styles.container}>
            {/* Brand Header */}
            <View style={styles.headerGradient}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Icon name="back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Settings</Text>
                        <View style={styles.headerPlaceholder} />
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Appearance Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#DBEAFE' }]}>
                            <Icon name="moon" size={18} color="#2563EB" />
                        </View>
                        <Text style={styles.sectionTitle}>Appearance</Text>
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Dark Mode</Text>
                        <Switch
                            value={darkMode}
                            onValueChange={(v) => { setDarkMode(v); handleToggle('darkMode', v); }}
                            trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
                            thumbColor={darkMode ? colors.primary : '#9CA3AF'}
                        />
                    </View>
                    <View style={[styles.settingRow, styles.settingRowLast]}>
                        <Text style={styles.settingLabel}>Language</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{language}</Text>
                            <Icon name="down" size={12} color={colors.light.textMuted} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Notifications Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Icon name="bell" size={18} color="#D97706" />
                        </View>
                        <Text style={styles.sectionTitle}>Notifications</Text>
                    </View>

                    <View style={styles.settingRow}>
                        <View>
                            <Text style={styles.settingLabel}>Order Alerts</Text>
                            <Text style={styles.settingDescription}>New order notifications</Text>
                        </View>
                        <Switch
                            value={orderAlerts}
                            onValueChange={(v) => { setOrderAlerts(v); handleToggle('orderAlerts', v); }}
                            trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
                            thumbColor={orderAlerts ? colors.primary : '#9CA3AF'}
                        />
                    </View>
                    <View style={styles.settingRow}>
                        <View>
                            <Text style={styles.settingLabel}>Promotional</Text>
                            <Text style={styles.settingDescription}>Offers and updates</Text>
                        </View>
                        <Switch
                            value={promotional}
                            onValueChange={(v) => { setPromotional(v); handleToggle('promotional', v); }}
                            trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
                            thumbColor={promotional ? colors.primary : '#9CA3AF'}
                        />
                    </View>
                    <View style={[styles.settingRow, styles.settingRowLast]}>
                        <View>
                            <Text style={styles.settingLabel}>Earnings Updates</Text>
                            <Text style={styles.settingDescription}>Daily/weekly summaries</Text>
                        </View>
                        <Switch
                            value={earningsUpdates}
                            onValueChange={(v) => { setEarningsUpdates(v); handleToggle('earningsUpdates', v); }}
                            trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
                            thumbColor={earningsUpdates ? colors.primary : '#9CA3AF'}
                        />
                    </View>
                </View>

                {/* Sound & Haptics Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#FCE7F3' }]}>
                            <Icon name="sound" size={18} color="#DB2777" />
                        </View>
                        <Text style={styles.sectionTitle}>Sound & Haptics</Text>
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Order Sound</Text>
                        <Switch
                            value={orderSound}
                            onValueChange={(v) => { setOrderSound(v); handleToggle('orderSound', v); }}
                            trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
                            thumbColor={orderSound ? colors.primary : '#9CA3AF'}
                        />
                    </View>
                    <View style={[styles.settingRow, styles.settingRowLast]}>
                        <Text style={styles.settingLabel}>Vibration</Text>
                        <Switch
                            value={vibration}
                            onValueChange={(v) => { setVibration(v); handleToggle('vibration', v); }}
                            trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
                            thumbColor={vibration ? colors.primary : '#9CA3AF'}
                        />
                    </View>
                </View>

                {/* Navigation Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#E8F8F0' }]}>
                            <Icon name="location" size={18} color={colors.primary} />
                        </View>
                        <Text style={styles.sectionTitle}>Navigation</Text>
                    </View>

                    <View style={[styles.settingRow, styles.settingRowLast]}>
                        <Text style={styles.settingLabel}>Default Map App</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{mapApp}</Text>
                            <Icon name="down" size={12} color={colors.light.textMuted} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* About Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#F3F4F6' }]}>
                            <Icon name="info" size={18} color={colors.light.textSecondary} />
                        </View>
                        <Text style={styles.sectionTitle}>About</Text>
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>App Version</Text>
                        <Text style={styles.settingValue}>v1.0.0</Text>
                    </View>
                    <TouchableOpacity style={styles.linkRow}>
                        <Text style={styles.settingLabel}>Terms of Service</Text>
                        <Icon name="forward" size={16} color={colors.light.textMuted} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.linkRow, styles.settingRowLast]}>
                        <Text style={styles.settingLabel}>Privacy Policy</Text>
                        <Icon name="forward" size={16} color={colors.light.textMuted} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7F6',
    },

    // Header
    headerGradient: {
        backgroundColor: '#1A7F4B',
    },
    headerSafe: {
        paddingHorizontal: spacing.xl,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        ...typography.h4,
        color: '#FFFFFF',
    },
    headerPlaceholder: {
        width: 40,
    },

    // Content
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.xl,
        paddingBottom: spacing['3xl'],
    },

    // Section Card
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
        ...shadows.sm,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    sectionIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    sectionTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },

    // Setting Rows
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    settingRowLast: {
        borderBottomWidth: 0,
    },
    settingLabel: {
        ...typography.body,
        color: colors.light.textPrimary,
    },
    settingDescription: {
        ...typography.tiny,
        color: colors.light.textMuted,
        marginTop: 2,
    },
    settingValue: {
        ...typography.body,
        color: colors.light.textMuted,
    },

    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        gap: spacing.sm,
    },
    dropdownText: {
        ...typography.small,
        color: colors.light.textPrimary,
    },
});
