/**
 * GRIHGO Delivery Partner App - Profile Screen
 * Premium profile with brand header, stats, and enhanced sections
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Card, Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'ProfileScreen';

// Mock user data
const mockUser = {
    name: 'Rahul Sharma',
    rating: 4.8,
    id: 'GR-DP-12345',
    phone: '+91 98765 43210',
    email: 'rahul@email.com',
    totalDeliveries: 1248,
    memberSince: 'Jan 2024',
    vehicle: {
        model: 'Hero Splendor',
        number: 'KA-01-AB-1234',
    },
    bank: {
        name: 'HDFC Bank',
        accountLast4: '1234',
    },
    documents: [
        { name: 'Aadhaar Card', verified: true },
        { name: 'Driving License', verified: true },
        { name: 'PAN Card', verified: true },
    ],
};

export default function ProfileScreen() {
    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleSettings = () => {
        logger.navigate(TAG, 'settings');
        router.push('/settings');
    };

    const handleHelp = () => {
        logger.navigate(TAG, 'help');
        router.push('/help');
    };

    const handleVehicle = () => {
        logger.navigate(TAG, 'vehicle');
        router.push('/vehicle');
    };

    const handleBank = () => {
        logger.navigate(TAG, 'bank');
        router.push('/bank');
    };

    const handleLogout = () => {
        logger.action(TAG, 'logout');
        router.replace('/(auth)/login');
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
                        <Text style={styles.headerTitle}>Profile</Text>
                        <TouchableOpacity
                            style={styles.settingsButton}
                            onPress={handleSettings}
                        >
                            <Icon name="settings" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Card */}
                    <View style={styles.profileCard}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Icon name="user" size={36} color={colors.primary} />
                            </View>
                            <TouchableOpacity style={styles.cameraButton}>
                                <Icon name="camera" size={12} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>{mockUser.name}</Text>
                            <Text style={styles.userId}>ID: {mockUser.id}</Text>
                        </View>

                        <View style={styles.ratingBadge}>
                            <Icon name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>{mockUser.rating}</Text>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{mockUser.totalDeliveries}</Text>
                            <Text style={styles.statLabel}>Deliveries</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{mockUser.rating}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{mockUser.memberSince}</Text>
                            <Text style={styles.statLabel}>Member Since</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Account Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#E8F8F0' }]}>
                            <Icon name="user" size={18} color={colors.primary} />
                        </View>
                        <Text style={styles.sectionTitle}>Account Details</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="phone" size={18} color={colors.light.textMuted} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Phone</Text>
                            <Text style={styles.infoValue}>{mockUser.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="email" size={18} color={colors.light.textMuted} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{mockUser.email}</Text>
                        </View>
                    </View>
                </View>

                {/* Documents Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#DBEAFE' }]}>
                            <Icon name="document" size={18} color="#2563EB" />
                        </View>
                        <Text style={styles.sectionTitle}>Documents</Text>
                        <View style={styles.verifiedAllBadge}>
                            <Icon name="success" size={12} color={colors.success} />
                            <Text style={styles.verifiedAllText}>All Verified</Text>
                        </View>
                    </View>

                    {mockUser.documents.map((doc, index) => {
                        const docType = doc.name.toLowerCase().replace(' ', '');
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.docRow}
                                onPress={() => {
                                    logger.navigate(TAG, 'document', { type: docType });
                                    router.push(`/document/${docType}` as any);
                                }}
                            >
                                <View style={styles.docInfo}>
                                    <Text style={styles.docName}>{doc.name}</Text>
                                    <View style={styles.verifiedBadge}>
                                        <Icon name="checkmark" size={10} color={colors.success} />
                                        <Text style={styles.verifiedText}>Verified</Text>
                                    </View>
                                </View>
                                <Icon name="forward" size={16} color={colors.light.textMuted} />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Vehicle Section */}
                <TouchableOpacity style={styles.sectionCard} onPress={handleVehicle}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Icon name="scooter" size={18} color="#D97706" />
                        </View>
                        <Text style={styles.sectionTitle}>Vehicle</Text>
                        <Text style={styles.editLink}>Edit</Text>
                    </View>

                    <View style={styles.vehicleInfo}>
                        <View>
                            <Text style={styles.vehicleModel}>{mockUser.vehicle.model}</Text>
                            <Text style={styles.vehicleNumber}>{mockUser.vehicle.number}</Text>
                        </View>
                        <Icon name="forward" size={16} color={colors.light.textMuted} />
                    </View>
                </TouchableOpacity>

                {/* Bank Section */}
                <TouchableOpacity style={styles.sectionCard} onPress={handleBank}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: '#FCE7F3' }]}>
                            <Icon name="bank" size={18} color="#DB2777" />
                        </View>
                        <Text style={styles.sectionTitle}>Bank Account</Text>
                        <Text style={styles.editLink}>Edit</Text>
                    </View>

                    <View style={styles.vehicleInfo}>
                        <View>
                            <Text style={styles.vehicleModel}>{mockUser.bank.name}</Text>
                            <Text style={styles.vehicleNumber}>****{mockUser.bank.accountLast4}</Text>
                        </View>
                        <Icon name="forward" size={16} color={colors.light.textMuted} />
                    </View>
                </TouchableOpacity>

                {/* Menu Items */}
                <View style={styles.menuCard}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
                        <View style={[styles.menuIcon, { backgroundColor: '#F3F4F6' }]}>
                            <Icon name="settings" size={18} color={colors.light.textSecondary} />
                        </View>
                        <Text style={styles.menuText}>Settings</Text>
                        <Icon name="forward" size={16} color={colors.light.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
                        <View style={[styles.menuIcon, { backgroundColor: '#F3F4F6' }]}>
                            <Icon name="help" size={18} color={colors.light.textSecondary} />
                        </View>
                        <Text style={styles.menuText}>Help & Support</Text>
                        <Icon name="forward" size={16} color={colors.light.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
                        <View style={[styles.menuIcon, { backgroundColor: '#FEE2E2' }]}>
                            <Icon name="logout" size={18} color={colors.error} />
                        </View>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.version}>App Version 1.0.0</Text>
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
        paddingBottom: spacing.xl,
    },
    headerSafe: {
        paddingHorizontal: spacing.xl,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
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
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Profile Card
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.lg,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: -2,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1A7F4B',
    },
    profileInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    name: {
        ...typography.h4,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    userId: {
        ...typography.small,
        color: 'rgba(255,255,255,0.7)',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: 4,
    },
    ratingText: {
        ...typography.smallMedium,
        color: '#FFFFFF',
    },

    // Stats Row
    statsRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        ...typography.h4,
        color: '#FFFFFF',
    },
    statLabel: {
        ...typography.tiny,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
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
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
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
        flex: 1,
    },
    editLink: {
        ...typography.small,
        color: colors.primary,
        fontWeight: '600',
    },

    // Info Row
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    infoContent: {
        marginLeft: spacing.md,
    },
    infoLabel: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },
    infoValue: {
        ...typography.body,
        color: colors.light.textPrimary,
    },

    // Documents
    docRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    docInfo: {
        flex: 1,
    },
    docName: {
        ...typography.body,
        color: colors.light.textPrimary,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    verifiedText: {
        ...typography.tiny,
        color: colors.success,
    },
    verifiedAllBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F8F0',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: 4,
    },
    verifiedAllText: {
        ...typography.tiny,
        color: colors.success,
        fontWeight: '600',
    },

    // Vehicle Info
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vehicleModel: {
        ...typography.body,
        color: colors.light.textPrimary,
    },
    vehicleNumber: {
        ...typography.small,
        color: colors.light.textMuted,
        marginTop: 2,
    },

    // Menu
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    menuText: {
        ...typography.body,
        color: colors.light.textPrimary,
        flex: 1,
    },
    logoutItem: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        marginTop: spacing.sm,
        paddingTop: spacing.lg,
    },
    logoutText: {
        ...typography.body,
        color: colors.error,
        flex: 1,
    },

    // Version
    version: {
        ...typography.tiny,
        color: colors.light.textMuted,
        textAlign: 'center',
        marginTop: spacing.md,
    },
});
