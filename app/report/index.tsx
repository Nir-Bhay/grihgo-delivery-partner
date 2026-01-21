/**
 * GRIHGO Delivery Partner App - Weekly Report Screen
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Card } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'WeeklyReportScreen';

const weeklyStats = {
    earnings: 28500,
    orders: 68,
    hours: 38,
    distance: 285,
    rating: 4.9,
    tips: 2800,
};

const highlights = [
    { icon: '🏆', text: 'Top 10% in your zone!' },
    { icon: '⚡', text: 'Fastest avg delivery: 18 min' },
    { icon: '💰', text: '12% more earnings than last week' },
];

export default function WeeklyReportScreen() {
    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Weekly Report</Text>
                <TouchableOpacity><Text style={styles.share}>📤</Text></TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Week Info */}
                <Text style={styles.weekLabel}>Jan 10 - Jan 16, 2026</Text>

                {/* Main Stats */}
                <Card style={styles.mainCard}>
                    <Text style={styles.earningsLabel}>Total Earnings</Text>
                    <Text style={styles.earningsAmount}>₹{weeklyStats.earnings.toLocaleString()}</Text>

                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{weeklyStats.orders}</Text>
                            <Text style={styles.statLabel}>Orders</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{weeklyStats.hours}h</Text>
                            <Text style={styles.statLabel}>Online</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{weeklyStats.distance} km</Text>
                            <Text style={styles.statLabel}>Distance</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>⭐ {weeklyStats.rating}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>
                </Card>

                {/* Daily Chart Placeholder */}
                <Card style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Daily Earnings</Text>
                    <View style={styles.chartBars}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <View key={day} style={styles.chartColumn}>
                                <View style={[styles.bar, { height: [40, 60, 50, 80, 70, 90, 55][i] }]} />
                                <Text style={styles.dayLabel}>{day}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Highlights */}
                <Text style={styles.sectionTitle}>Highlights</Text>
                {highlights.map((item, i) => (
                    <Card key={i} style={styles.highlightCard}>
                        <Text style={styles.highlightIcon}>{item.icon}</Text>
                        <Text style={styles.highlightText}>{item.text}</Text>
                    </Card>
                ))}

                {/* Tips Earned */}
                <Card style={styles.tipsCard}>
                    <View style={styles.tipsRow}>
                        <Text style={styles.tipsIcon}>💰</Text>
                        <View>
                            <Text style={styles.tipsLabel}>Tips Earned</Text>
                            <Text style={styles.tipsAmount}>₹{weeklyStats.tips.toLocaleString()}</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.light.background },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
    },
    backArrow: { fontSize: 24, color: colors.light.textPrimary },
    headerTitle: { ...typography.h4, color: colors.light.textPrimary },
    share: { fontSize: 20 },

    content: { flex: 1, paddingHorizontal: spacing.xl },
    weekLabel: { ...typography.body, color: colors.light.textSecondary, textAlign: 'center', marginBottom: spacing.lg },

    mainCard: { alignItems: 'center', marginBottom: spacing.lg },
    earningsLabel: { ...typography.small, color: colors.light.textMuted },
    earningsAmount: { ...typography.xlarge, color: colors.primary, marginVertical: spacing.sm },

    statsGrid: { flexDirection: 'row', width: '100%', marginTop: spacing.lg },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { ...typography.h4, color: colors.light.textPrimary },
    statLabel: { ...typography.tiny, color: colors.light.textMuted },

    chartCard: { marginBottom: spacing.lg },
    chartTitle: { ...typography.bodyMedium, color: colors.light.textPrimary, marginBottom: spacing.md },
    chartBars: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100 },
    chartColumn: { alignItems: 'center', flex: 1 },
    bar: { width: 20, backgroundColor: colors.primary, borderRadius: 4 },
    dayLabel: { ...typography.tiny, color: colors.light.textMuted, marginTop: spacing.xs },

    sectionTitle: { ...typography.h4, color: colors.light.textPrimary, marginBottom: spacing.md },

    highlightCard: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
    highlightIcon: { fontSize: 24, marginRight: spacing.md },
    highlightText: { ...typography.body, color: colors.light.textPrimary, flex: 1 },

    tipsCard: { marginBottom: spacing['2xl'] },
    tipsRow: { flexDirection: 'row', alignItems: 'center' },
    tipsIcon: { fontSize: 32, marginRight: spacing.md },
    tipsLabel: { ...typography.small, color: colors.light.textMuted },
    tipsAmount: { ...typography.h3, color: colors.warning },
});
