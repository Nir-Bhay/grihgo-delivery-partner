/**
 * GRIHGO Delivery Partner App - Help & Support Screen
 * Premium help screen with brand header and improved layout
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'HelpScreen';

const FAQ_ITEMS = [
    { question: 'How do I update my vehicle details?', answer: 'Go to Profile > Vehicle and tap Edit', icon: 'scooter' },
    { question: 'When do I receive payouts?', answer: 'Payouts are processed weekly on Mondays', icon: 'wallet' },
    { question: 'How is my rating calculated?', answer: 'Based on customer feedback and delivery time', icon: 'star' },
    { question: 'What if customer is not available?', answer: 'Wait 5 min, then contact support for instructions', icon: 'time' },
];

export default function HelpScreen() {
    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleCall = () => {
        logger.action(TAG, 'callSupport');
        Linking.openURL('tel:1800123456');
    };

    const handleChat = () => {
        logger.action(TAG, 'openChat');
        router.push('/chat');
    };

    const handleEmergency = () => {
        logger.navigate(TAG, 'emergency');
        router.push('/emergency');
    };

    const handleReport = () => {
        logger.navigate(TAG, 'reportIssue');
        router.push('/chat');
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
                        <Text style={styles.headerTitle}>Help & Support</Text>
                        <View style={styles.headerPlaceholder} />
                    </View>

                    {/* Contact Options */}
                    <View style={styles.contactGrid}>
                        <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
                            <View style={[styles.contactIcon, { backgroundColor: '#E8F8F0' }]}>
                                <Icon name="phone" size={24} color={colors.primary} />
                            </View>
                            <Text style={styles.contactTitle}>Call Support</Text>
                            <Text style={styles.contactSubtitle}>24/7 Available</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contactCard} onPress={handleChat}>
                            <View style={[styles.contactIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Icon name="chat" size={24} color="#2563EB" />
                            </View>
                            <Text style={styles.contactTitle}>Live Chat</Text>
                            <Text style={styles.contactSubtitle}>Quick Response</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Emergency Card */}
                <TouchableOpacity style={styles.emergencyCard} onPress={handleEmergency}>
                    <View style={styles.emergencyIconContainer}>
                        <Icon name="sos" size={24} color={colors.error} />
                    </View>
                    <View style={styles.emergencyInfo}>
                        <Text style={styles.emergencyTitle}>Emergency SOS</Text>
                        <Text style={styles.emergencySubtitle}>For urgent safety issues</Text>
                    </View>
                    <View style={styles.sosButton}>
                        <Text style={styles.sosButtonText}>SOS</Text>
                    </View>
                </TouchableOpacity>

                {/* FAQ Section */}
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                <View style={styles.faqCard}>
                    {FAQ_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.faqItem,
                                index === FAQ_ITEMS.length - 1 && styles.faqItemLast
                            ]}
                        >
                            <View style={styles.faqIconContainer}>
                                <Icon name={item.icon as any} size={16} color={colors.primary} />
                            </View>
                            <View style={styles.faqContent}>
                                <Text style={styles.faqQuestion}>{item.question}</Text>
                                <Text style={styles.faqAnswer}>{item.answer}</Text>
                            </View>
                            <Icon name="down" size={14} color={colors.light.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Quick Links */}
                <Text style={styles.sectionTitle}>Quick Links</Text>
                <View style={styles.linksCard}>
                    <TouchableOpacity style={styles.linkItem}>
                        <View style={[styles.linkIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Icon name="document" size={16} color="#D97706" />
                        </View>
                        <Text style={styles.linkText}>Training & Tips</Text>
                        <Icon name="forward" size={14} color={colors.light.textMuted} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkItem}>
                        <View style={[styles.linkIcon, { backgroundColor: '#FCE7F3' }]}>
                            <Icon name="star" size={16} color="#DB2777" />
                        </View>
                        <Text style={styles.linkText}>Ratings Guide</Text>
                        <Icon name="forward" size={14} color={colors.light.textMuted} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.linkItem, styles.linkItemLast]}>
                        <View style={[styles.linkIcon, { backgroundColor: '#E8F8F0' }]}>
                            <Icon name="info" size={16} color={colors.primary} />
                        </View>
                        <Text style={styles.linkText}>App Guidelines</Text>
                        <Icon name="forward" size={14} color={colors.light.textMuted} />
                    </TouchableOpacity>
                </View>

                {/* Report Issue */}
                <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
                    <Icon name="warning" size={18} color={colors.primary} />
                    <Text style={styles.reportText}>Report an Issue</Text>
                    <Icon name="forward" size={14} color={colors.primary} />
                </TouchableOpacity>
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

    // Contact Grid
    contactGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.md,
    },
    contactCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        alignItems: 'center',
        ...shadows.sm,
    },
    contactIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    contactTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    contactSubtitle: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },

    // Content
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.xl,
        paddingBottom: spacing['3xl'],
    },

    // Emergency
    emergencyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    emergencyIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    emergencyInfo: {
        flex: 1,
    },
    emergencyTitle: {
        ...typography.bodyMedium,
        color: colors.error,
    },
    emergencySubtitle: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },
    sosButton: {
        backgroundColor: colors.error,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
    },
    sosButtonText: {
        ...typography.smallMedium,
        color: '#FFFFFF',
    },

    // Section
    sectionTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        marginBottom: spacing.md,
    },

    // FAQ
    faqCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        marginBottom: spacing.xl,
        ...shadows.sm,
        overflow: 'hidden',
    },
    faqItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    faqItemLast: {
        borderBottomWidth: 0,
    },
    faqIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    faqContent: {
        flex: 1,
    },
    faqQuestion: {
        ...typography.body,
        color: colors.light.textPrimary,
        marginBottom: 2,
    },
    faqAnswer: {
        ...typography.small,
        color: colors.light.textMuted,
    },

    // Quick Links
    linksCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        marginBottom: spacing.lg,
        ...shadows.sm,
        overflow: 'hidden',
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    linkItemLast: {
        borderBottomWidth: 0,
    },
    linkIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    linkText: {
        ...typography.body,
        color: colors.light.textPrimary,
        flex: 1,
    },

    // Report
    reportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        gap: spacing.sm,
        ...shadows.sm,
    },
    reportText: {
        ...typography.body,
        color: colors.primary,
        flex: 1,
    },
});
