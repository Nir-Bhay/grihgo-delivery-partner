/**
 * GRIHGO Delivery Partner App - Earnings Dashboard
 * Premium earnings screen with brand header, animated stats, and progress visuals
 */

import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Card, Badge, Icon } from '@/components/ui';
import {
    mockEarningsToday,
    mockEarningsWeek,
    mockEarningsMonth,
    mockBreakdown,
    mockChallenges
} from '@/services/mock';
import { logger } from '@/utils/logger';

const TAG = 'EarningsScreen';

type Period = 'today' | 'week' | 'month';

const PERIODS: { key: Period; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
];

export default function EarningsScreen() {
    const [period, setPeriod] = useState<Period>('today');

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const getEarningsData = () => {
        switch (period) {
            case 'today': return mockEarningsToday;
            case 'week': return mockEarningsWeek;
            case 'month': return mockEarningsMonth;
        }
    };

    const earnings = getEarningsData();
    const breakdown = mockBreakdown;
    const totalBreakdown = breakdown.basePay + breakdown.tips + breakdown.peakBonus + breakdown.incentives;

    return (
        <View style={styles.container}>
            {/* Brand Header */}
            <View style={styles.headerGradient}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    <View style={styles.topBar}>
                        <Text style={styles.headerTitle}>Earnings</Text>
                        <TouchableOpacity
                            style={styles.reportButton}
                            onPress={() => {
                                logger.navigate(TAG, 'report');
                                router.push('/report');
                            }}
                        >
                            <Icon name="calendar" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Period Tabs */}
                    <View style={styles.periodTabs}>
                        {PERIODS.map((p) => (
                            <TouchableOpacity
                                key={p.key}
                                style={[styles.periodTab, period === p.key && styles.periodTabActive]}
                                onPress={() => {
                                    logger.action(TAG, 'changePeriod', { period: p.key });
                                    setPeriod(p.key);
                                }}
                            >
                                <Text style={[styles.periodTabText, period === p.key && styles.periodTabTextActive]}>
                                    {p.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Main Earnings Display */}
                    <View style={styles.earningsHero}>
                        <Text style={styles.earningsAmount}>₹{earnings.amount.toLocaleString()}</Text>
                        <View style={styles.comparisonBadge}>
                            <Icon name="trending" size={14} color={colors.success} />
                            <Text style={styles.comparisonText}>+₹650 vs yesterday</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#E8F8F0' }]}>
                            <Icon name="package" size={20} color={colors.primary} />
                        </View>
                        <Text style={styles.statValue}>{earnings.trips}</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Icon name="time" size={20} color="#D97706" />
                        </View>
                        <Text style={styles.statValue}>{Math.floor(earnings.hours)}h {Math.round((earnings.hours % 1) * 60)}m</Text>
                        <Text style={styles.statLabel}>Online</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
                            <Icon name="location" size={20} color="#2563EB" />
                        </View>
                        <Text style={styles.statValue}>{earnings.distance} km</Text>
                        <Text style={styles.statLabel}>Distance</Text>
                    </View>
                </View>

                {/* Breakdown Section */}
                <View style={styles.breakdownCard}>
                    <View style={styles.breakdownHeader}>
                        <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
                        <Text style={styles.totalAmount}>₹{totalBreakdown.toLocaleString()}</Text>
                    </View>

                    <BreakdownItem
                        label="Base Pay"
                        amount={breakdown.basePay}
                        total={totalBreakdown}
                        color={colors.primary}
                    />
                    <BreakdownItem
                        label="Tips"
                        amount={breakdown.tips}
                        total={totalBreakdown}
                        color="#10B981"
                    />
                    <BreakdownItem
                        label="Peak Hour Bonus"
                        amount={breakdown.peakBonus}
                        total={totalBreakdown}
                        color="#F59E0B"
                    />
                    <BreakdownItem
                        label="Incentives"
                        amount={breakdown.incentives}
                        total={totalBreakdown}
                        color="#8B5CF6"
                    />
                </View>

                {/* Challenge Card */}
                {mockChallenges.length > 0 && (
                    <TouchableOpacity
                        style={styles.challengeCard}
                        onPress={() => {
                            logger.navigate(TAG, 'incentives');
                            router.push('/incentives');
                        }}
                    >
                        <View style={styles.challengeHeader}>
                            <View style={styles.challengeIconContainer}>
                                <Icon name="trophy" size={24} color="#D97706" />
                            </View>
                            <View style={styles.challengeInfo}>
                                <Text style={styles.challengeTitle}>{mockChallenges[0].title}</Text>
                                <Text style={styles.challengeReward}>Earn ₹{mockChallenges[0].reward} bonus</Text>
                            </View>
                            <Icon name="forward" size={16} color={colors.light.textMuted} />
                        </View>

                        <View style={styles.challengeProgressContainer}>
                            <View style={styles.challengeProgressBar}>
                                <View
                                    style={[
                                        styles.challengeProgressFill,
                                        { width: `${(mockChallenges[0].progress / mockChallenges[0].target) * 100}%` }
                                    ]}
                                />
                            </View>
                            <Text style={styles.challengeProgressText}>
                                {mockChallenges[0].progress}/{mockChallenges[0].target}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

                {/* Weekly Summary Link */}
                <TouchableOpacity
                    style={styles.summaryLink}
                    onPress={() => router.push('/report')}
                >
                    <Icon name="document" size={18} color={colors.primary} />
                    <Text style={styles.summaryLinkText}>View Detailed Report</Text>
                    <Icon name="forward" size={16} color={colors.primary} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

// Breakdown Item Component
interface BreakdownItemProps {
    label: string;
    amount: number;
    total: number;
    color: string;
}

function BreakdownItem({ label, amount, total, color }: BreakdownItemProps) {
    const percentage = (amount / total) * 100;

    return (
        <View style={styles.breakdownItem}>
            <View style={styles.breakdownItemHeader}>
                <View style={styles.breakdownLabelRow}>
                    <View style={[styles.breakdownDot, { backgroundColor: color }]} />
                    <Text style={styles.breakdownLabel}>{label}</Text>
                </View>
                <Text style={styles.breakdownAmount}>₹{amount.toLocaleString()}</Text>
            </View>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
            </View>
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
        paddingTop: spacing.md,
        marginBottom: spacing.lg,
    },
    headerTitle: {
        ...typography.h3,
        color: '#FFFFFF',
    },
    reportButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Period Tabs
    periodTabs: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: borderRadius.lg,
        padding: 4,
        marginBottom: spacing.xl,
    },
    periodTab: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: borderRadius.md,
    },
    periodTabActive: {
        backgroundColor: '#FFFFFF',
    },
    periodTabText: {
        ...typography.small,
        color: 'rgba(255,255,255,0.7)',
    },
    periodTabTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },

    // Earnings Hero
    earningsHero: {
        alignItems: 'center',
        paddingBottom: spacing.md,
    },
    earningsAmount: {
        fontSize: 44,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: spacing.sm,
    },
    comparisonBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: 6,
    },
    comparisonText: {
        ...typography.small,
        color: '#FFFFFF',
    },

    // Content
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.xl,
        paddingBottom: spacing['3xl'],
    },

    // Stats Grid
    statsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        alignItems: 'center',
        ...shadows.sm,
    },
    statIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    statValue: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    statLabel: {
        ...typography.tiny,
        color: colors.light.textMuted,
        marginTop: 2,
    },

    // Breakdown Card
    breakdownCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        ...shadows.sm,
    },
    breakdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    totalAmount: {
        ...typography.h4,
        color: colors.primary,
    },
    breakdownItem: {
        marginBottom: spacing.md,
    },
    breakdownItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    breakdownLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    breakdownDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    breakdownLabel: {
        ...typography.small,
        color: colors.light.textSecondary,
    },
    breakdownAmount: {
        ...typography.smallMedium,
        color: colors.light.textPrimary,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },

    // Challenge Card
    challengeCard: {
        backgroundColor: '#FFFBEB',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    challengeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    challengeIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#FEF3C7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    challengeInfo: {
        flex: 1,
    },
    challengeTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    challengeReward: {
        ...typography.small,
        color: '#D97706',
        marginTop: 2,
    },
    challengeProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    challengeProgressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#FEF3C7',
        borderRadius: 4,
    },
    challengeProgressFill: {
        height: '100%',
        backgroundColor: '#F59E0B',
        borderRadius: 4,
    },
    challengeProgressText: {
        ...typography.small,
        color: colors.light.textMuted,
        minWidth: 40,
    },

    // Summary Link
    summaryLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        gap: spacing.sm,
        ...shadows.sm,
    },
    summaryLinkText: {
        ...typography.body,
        color: colors.primary,
        flex: 1,
    },
});
