/**
 * GRIHGO Delivery Partner App - Skeleton Loader Component
 * Shimmer loading placeholder for data fetching states
 */

import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '@/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SkeletonProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: ViewStyle;
}

export function Skeleton({
    width = '100%',
    height = 20,
    borderRadius: radius = 8,
    style
}: SkeletonProps) {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        );
        animation.start();
        return () => animation.stop();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
    });

    return (
        <View
            style={[
                styles.skeleton,
                {
                    width: width as any,
                    height,
                    borderRadius: radius
                },
                style
            ]}
        >
            <Animated.View
                style={[
                    styles.shimmer,
                    { transform: [{ translateX }] }
                ]}
            />
        </View>
    );
}

// Pre-built skeleton layouts
export function SkeletonCard() {
    return (
        <View style={styles.card}>
            <Skeleton width={48} height={48} borderRadius={12} />
            <View style={styles.cardContent}>
                <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
                <Skeleton width="80%" height={12} />
            </View>
        </View>
    );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
    return (
        <View style={styles.list}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </View>
    );
}

export function SkeletonStats() {
    return (
        <View style={styles.stats}>
            {[1, 2, 3].map((i) => (
                <View key={i} style={styles.statItem}>
                    <Skeleton width={44} height={44} borderRadius={12} />
                    <Skeleton width={50} height={16} style={{ marginTop: 8 }} />
                    <Skeleton width={40} height={10} style={{ marginTop: 4 }} />
                </View>
            ))}
        </View>
    );
}

export function SkeletonProfile() {
    return (
        <View style={styles.profile}>
            <Skeleton width={80} height={80} borderRadius={40} />
            <Skeleton width={120} height={20} style={{ marginTop: 12 }} />
            <Skeleton width={80} height={14} style={{ marginTop: 8 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#E5E7EB',
        overflow: 'hidden',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: 100,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    cardContent: {
        flex: 1,
        marginLeft: spacing.md,
    },
    list: {
        paddingHorizontal: spacing.xl,
    },
    stats: {
        flexDirection: 'row',
        gap: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    profile: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
});
