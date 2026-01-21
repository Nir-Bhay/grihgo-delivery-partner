/**
 * GRIHGO Delivery Partner App - Incentives Screen
 * 
 * Mockup Reference: 26_incentives_1768629326609.png
 * - Active Challenges with progress
 * - Streak card
 * - Completed Today section
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Card, Badge } from '@/components/ui';
import { mockChallenges } from '@/services/mock';
import { logger } from '@/utils/logger';

const TAG = 'IncentivesScreen';

export default function IncentivesScreen() {
    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const activeChallenges = [
        {
            id: '1',
            icon: '🏆',
            title: 'Peak Hour Warrior',
            description: 'Complete 5 orders between 12-3 PM',
            reward: 150,
            progress: 3,
            target: 5,
            timeLeft: '2 hours',
        },
        {
            id: '2',
            icon: '🔥',
            title: 'Hot Streak',
            description: 'Complete 10 orders today',
            reward: 200,
            progress: 7,
            target: 10,
            timeLeft: '5 hours left',
        },
    ];

    const completedToday = [
        { id: '1', title: 'Morning Rush', reward: 100, icon: '✓' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Incentives & Bonuses</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Active Challenges */}
                <Text style={styles.sectionTitle}>Active Challenges</Text>

                {activeChallenges.map((challenge) => {
                    const percent = Math.round((challenge.progress / challenge.target) * 100);
                    return (
                        <Card key={challenge.id} style={styles.challengeCard}>
                            <View style={styles.challengeHeader}>
                                <Text style={styles.challengeIcon}>{challenge.icon}</Text>
                                <View style={styles.challengeInfo}>
                                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                                    <Text style={styles.challengeDesc}>{challenge.description}</Text>
                                </View>
                                <View style={styles.rewardBadge}>
                                    <Text style={styles.rewardAmount}>₹{challenge.reward}</Text>
                                    <Text style={styles.rewardLabel}>bonus</Text>
                                </View>
                            </View>

                            <View style={styles.progressSection}>
                                <Text style={styles.progressCount}>{challenge.progress}/{challenge.target}</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${percent}%` }]} />
                                </View>
                                <Text style={styles.progressPercent}>{percent}%</Text>
                            </View>

                            <View style={styles.timeRow}>
                                <Text style={styles.timeIcon}>⏱</Text>
                                <Text style={styles.timeText}>Ends in {challenge.timeLeft}</Text>
                            </View>
                        </Card>
                    );
                })}

                {/* Streak Card */}
                <Card style={styles.streakCard}>
                    <View style={styles.streakRow}>
                        <Text style={styles.streakIcon}>🔥</Text>
                        <View>
                            <Text style={styles.streakTitle}>🔥 3 Day Streak!</Text>
                            <Text style={styles.streakDesc}>Keep it going for extra rewards</Text>
                        </View>
                    </View>
                </Card>

                {/* Completed Today */}
                <Text style={styles.sectionTitle}>Completed Today</Text>

                {completedToday.map((item) => (
                    <Card key={item.id} style={styles.completedCard}>
                        <View style={styles.completedRow}>
                            <View style={styles.completedIcon}>
                                <Text style={styles.completedCheck}>✓</Text>
                            </View>
                            <View style={styles.completedInfo}>
                                <Text style={styles.completedTitle}>{item.title}</Text>
                                <Text style={styles.completedReward}>₹{item.reward} earned</Text>
                            </View>
                            <Text style={styles.confetti}>🎊</Text>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
    },
    backArrow: {
        fontSize: 24,
        color: colors.light.textPrimary,
    },
    headerTitle: {
        ...typography.h4,
        color: colors.light.textPrimary,
    },
    headerPlaceholder: {
        width: 24,
    },

    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.light.textPrimary,
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },

    // Challenge Card
    challengeCard: {
        marginBottom: spacing.md,
    },
    challengeHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    challengeIcon: {
        fontSize: 32,
        marginRight: spacing.md,
    },
    challengeInfo: {
        flex: 1,
    },
    challengeTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        marginBottom: spacing.xs,
    },
    challengeDesc: {
        ...typography.small,
        color: colors.light.textSecondary,
    },
    rewardBadge: {
        backgroundColor: '#E8F8F0',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
    },
    rewardAmount: {
        ...typography.bodyMedium,
        color: colors.primary,
    },
    rewardLabel: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },

    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    progressCount: {
        ...typography.small,
        color: colors.light.textSecondary,
        width: 40,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: colors.light.surfaceSecondary,
        borderRadius: 4,
        marginHorizontal: spacing.sm,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
    progressPercent: {
        ...typography.small,
        color: colors.light.textSecondary,
        width: 40,
        textAlign: 'right',
    },

    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeIcon: {
        fontSize: 12,
        marginRight: spacing.xs,
    },
    timeText: {
        ...typography.small,
        color: colors.warning,
    },

    // Streak
    streakCard: {
        backgroundColor: '#FEF3C7',
        marginVertical: spacing.lg,
    },
    streakRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    streakIcon: {
        fontSize: 40,
        marginRight: spacing.md,
    },
    streakTitle: {
        ...typography.h4,
        color: colors.warning,
        marginBottom: spacing.xs,
    },
    streakDesc: {
        ...typography.small,
        color: colors.light.textSecondary,
    },

    // Completed
    completedCard: {
        marginBottom: spacing.md,
    },
    completedRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    completedIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    completedCheck: {
        color: 'white',
        fontSize: 20,
    },
    completedInfo: {
        flex: 1,
    },
    completedTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    completedReward: {
        ...typography.small,
        color: colors.primary,
    },
    confetti: {
        fontSize: 32,
    },
});
