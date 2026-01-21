/**
 * GRIHGO Delivery Partner App - Ratings & Reviews Screen
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Card } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'RatingsScreen';

const mockRatingBreakdown = [
    { stars: 5, count: 180, percent: 72 },
    { stars: 4, count: 45, percent: 18 },
    { stars: 3, count: 15, percent: 6 },
    { stars: 2, count: 7, percent: 3 },
    { stars: 1, count: 3, percent: 1 },
];

const mockReviews = [
    { id: '1', customer: 'Rahul S.', rating: 5, comment: 'Very polite and delivered on time!', date: '2 days ago' },
    { id: '2', customer: 'Priya M.', rating: 5, comment: 'Food was still hot. Great service!', date: '3 days ago' },
    { id: '3', customer: 'Amit K.', rating: 4, comment: 'Good delivery', date: '1 week ago' },
];

export default function RatingsScreen() {
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
                <Text style={styles.headerTitle}>Ratings & Reviews</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Overall Rating */}
                <Card style={styles.ratingCard}>
                    <View style={styles.ratingOverall}>
                        <Text style={styles.ratingNumber}>4.8</Text>
                        <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
                        <Text style={styles.ratingCount}>Based on 250 ratings</Text>
                    </View>

                    {/* Breakdown */}
                    <View style={styles.breakdown}>
                        {mockRatingBreakdown.map((item) => (
                            <View key={item.stars} style={styles.breakdownRow}>
                                <Text style={styles.starLabel}>{item.stars}★</Text>
                                <View style={styles.barContainer}>
                                    <View style={[styles.barFill, { width: `${item.percent}%` }]} />
                                </View>
                                <Text style={styles.countLabel}>{item.count}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Recent Reviews */}
                <Text style={styles.sectionTitle}>Recent Feedback</Text>

                {mockReviews.map((review) => (
                    <Card key={review.id} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{review.customer[0]}</Text>
                            </View>
                            <View style={styles.reviewerInfo}>
                                <Text style={styles.reviewerName}>{review.customer}</Text>
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                            <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
                        </View>
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                    </Card>
                ))}
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
    placeholder: { width: 24 },
    content: { flex: 1, paddingHorizontal: spacing.xl },

    ratingCard: { alignItems: 'center', marginBottom: spacing.xl },
    ratingOverall: { alignItems: 'center', marginBottom: spacing.lg },
    ratingNumber: { ...typography.xlarge, color: colors.primary },
    ratingStars: { fontSize: 20, marginVertical: spacing.xs },
    ratingCount: { ...typography.small, color: colors.light.textMuted },

    breakdown: { width: '100%' },
    breakdownRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
    starLabel: { width: 30, ...typography.small, color: colors.light.textSecondary },
    barContainer: { flex: 1, height: 8, backgroundColor: colors.light.surfaceSecondary, borderRadius: 4, marginHorizontal: spacing.sm },
    barFill: { height: '100%', backgroundColor: colors.warning, borderRadius: 4 },
    countLabel: { width: 30, ...typography.small, color: colors.light.textMuted, textAlign: 'right' },

    sectionTitle: { ...typography.h4, color: colors.light.textPrimary, marginBottom: spacing.md },

    reviewCard: { marginBottom: spacing.md },
    reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
    avatarText: { ...typography.bodyMedium, color: colors.primary },
    reviewerInfo: { flex: 1 },
    reviewerName: { ...typography.bodyMedium, color: colors.light.textPrimary },
    reviewDate: { ...typography.tiny, color: colors.light.textMuted },
    reviewRating: { fontSize: 12 },
    reviewComment: { ...typography.small, color: colors.light.textSecondary },
});
