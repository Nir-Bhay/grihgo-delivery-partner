/**
 * GRIHGO Delivery Partner App - Training Tips Screen
 */

import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Card, Button } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'TrainingScreen';
const { width } = Dimensions.get('window');

const tips = [
    { id: '1', icon: '🚀', title: 'Speed Up Pickups', desc: 'Arrive early and call the restaurant to have your order ready' },
    { id: '2', icon: '📱', title: 'Keep App Updated', desc: 'Always use the latest version for best performance' },
    { id: '3', icon: '⭐', title: 'Earn 5 Stars', desc: 'Be polite, deliver on time, and handle food with care' },
    { id: '4', icon: '💰', title: 'Maximize Earnings', desc: 'Work during peak hours for bonus earnings' },
    { id: '5', icon: '🗺️', title: 'Know Your Area', desc: 'Learn shortcuts and best routes in your zone' },
];

const videos = [
    { id: '1', title: 'Getting Started', duration: '3 min', completed: true },
    { id: '2', title: 'Handling Orders', duration: '5 min', completed: true },
    { id: '3', title: 'Customer Service', duration: '4 min', completed: false },
    { id: '4', title: 'Earnings Tips', duration: '6 min', completed: false },
];

export default function TrainingScreen() {
    const [currentTip, setCurrentTip] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / (width - 64));
        setCurrentTip(index);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Training & Tips</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Progress */}
                <Card style={styles.progressCard}>
                    <View style={styles.progressRow}>
                        <View style={styles.progressCircle}>
                            <Text style={styles.progressPercent}>50%</Text>
                        </View>
                        <View style={styles.progressInfo}>
                            <Text style={styles.progressTitle}>Training Progress</Text>
                            <Text style={styles.progressDesc}>2 of 4 videos completed</Text>
                        </View>
                    </View>
                </Card>

                {/* Tips Carousel */}
                <Text style={styles.sectionTitle}>Quick Tips</Text>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.carousel}
                >
                    {tips.map((tip) => (
                        <Card key={tip.id} style={styles.tipCard}>
                            <Text style={styles.tipIcon}>{tip.icon}</Text>
                            <Text style={styles.tipTitle}>{tip.title}</Text>
                            <Text style={styles.tipDesc}>{tip.desc}</Text>
                        </Card>
                    ))}
                </ScrollView>

                {/* Dots */}
                <View style={styles.dots}>
                    {tips.map((_, i) => (
                        <View key={i} style={[styles.dot, i === currentTip && styles.dotActive]} />
                    ))}
                </View>

                {/* Training Videos */}
                <Text style={styles.sectionTitle}>Training Videos</Text>
                {videos.map((video) => (
                    <Card key={video.id} style={styles.videoCard}>
                        <View style={styles.videoRow}>
                            <View style={[styles.thumbnail, video.completed && styles.thumbnailCompleted]}>
                                <Text style={styles.playIcon}>{video.completed ? '✓' : '▶'}</Text>
                            </View>
                            <View style={styles.videoInfo}>
                                <Text style={styles.videoTitle}>{video.title}</Text>
                                <Text style={styles.videoDuration}>{video.duration}</Text>
                            </View>
                            {video.completed && <Text style={styles.completedBadge}>Completed</Text>}
                        </View>
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

    progressCard: { marginBottom: spacing.xl },
    progressRow: { flexDirection: 'row', alignItems: 'center' },
    progressCircle: {
        width: 60, height: 60, borderRadius: 30,
        backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center',
        marginRight: spacing.lg,
    },
    progressPercent: { ...typography.h4, color: colors.primary },
    progressInfo: { flex: 1 },
    progressTitle: { ...typography.bodyMedium, color: colors.light.textPrimary },
    progressDesc: { ...typography.small, color: colors.light.textMuted },

    sectionTitle: { ...typography.h4, color: colors.light.textPrimary, marginBottom: spacing.md },

    carousel: { marginHorizontal: -spacing.xl },
    tipCard: { width: width - 64, marginHorizontal: spacing.xl / 2, alignItems: 'center', paddingVertical: spacing.xl },
    tipIcon: { fontSize: 48, marginBottom: spacing.md },
    tipTitle: { ...typography.h4, color: colors.light.textPrimary, marginBottom: spacing.xs, textAlign: 'center' },
    tipDesc: { ...typography.body, color: colors.light.textSecondary, textAlign: 'center' },

    dots: { flexDirection: 'row', justifyContent: 'center', marginVertical: spacing.lg },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.light.border, marginHorizontal: 4 },
    dotActive: { backgroundColor: colors.primary, width: 24 },

    videoCard: { marginBottom: spacing.sm },
    videoRow: { flexDirection: 'row', alignItems: 'center' },
    thumbnail: {
        width: 50, height: 50, borderRadius: borderRadius.md,
        backgroundColor: colors.light.surfaceSecondary, justifyContent: 'center', alignItems: 'center',
        marginRight: spacing.md,
    },
    thumbnailCompleted: { backgroundColor: colors.primaryLight },
    playIcon: { fontSize: 18, color: colors.primary },
    videoInfo: { flex: 1 },
    videoTitle: { ...typography.bodyMedium, color: colors.light.textPrimary },
    videoDuration: { ...typography.small, color: colors.light.textMuted },
    completedBadge: { ...typography.tiny, color: colors.success },
});
