/**
 * GRIHGO Delivery Partner App - Order Details Screen
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Card, Badge } from '@/components/ui';
import { mockOrderHistory } from '@/services/mock';
import { logger } from '@/utils/logger';

const TAG = 'OrderDetailsScreen';

export default function OrderDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const order = mockOrderHistory[0]; // Using mock data

    useEffect(() => {
        logger.lifecycle(TAG, 'mount', { orderId: id });
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const timeline = [
        { status: 'Order Accepted', time: '10:30 AM', done: true },
        { status: 'Arrived at Restaurant', time: '10:38 AM', done: true },
        { status: 'Order Picked Up', time: '10:45 AM', done: true },
        { status: 'Delivered', time: '11:02 AM', done: true },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order #{order.id}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Status Badge */}
                <View style={styles.statusRow}>
                    <Badge text="Completed" variant="success" />
                    <Text style={styles.orderDate}>Jan 17, 2026 • 10:30 AM</Text>
                </View>

                {/* Restaurant */}
                <Card style={styles.locationCard}>
                    <View style={styles.locationHeader}>
                        <Text style={styles.locationIcon}>🍽️</Text>
                        <Text style={styles.locationLabel}>PICKUP</Text>
                    </View>
                    <Text style={styles.locationName}>{order.restaurant.name}</Text>
                    <Text style={styles.locationAddress}>{order.restaurant.address}</Text>
                </Card>

                {/* Customer */}
                <Card style={styles.locationCard}>
                    <View style={styles.locationHeader}>
                        <Text style={styles.locationIcon}>📍</Text>
                        <Text style={styles.locationLabel}>DELIVERY</Text>
                    </View>
                    <Text style={styles.locationName}>{order.customer.name}</Text>
                    <Text style={styles.locationAddress}>{order.customer.address}</Text>
                </Card>

                {/* Timeline */}
                <Text style={styles.sectionTitle}>Order Timeline</Text>
                <Card style={styles.timelineCard}>
                    {timeline.map((item, index) => (
                        <View key={index} style={styles.timelineItem}>
                            <View style={[styles.timelineDot, item.done && styles.timelineDotDone]} />
                            {index < timeline.length - 1 && <View style={[styles.timelineLine, item.done && styles.timelineLineDone]} />}
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineStatus}>{item.status}</Text>
                                <Text style={styles.timelineTime}>{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </Card>

                {/* Order Items */}
                <Text style={styles.sectionTitle}>Order Items</Text>
                <Card style={styles.itemsCard}>
                    {order.items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                            <Text style={styles.itemQty}>{item.quantity}x</Text>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>₹{item.price}</Text>
                        </View>
                    ))}
                </Card>

                {/* Earnings */}
                <Text style={styles.sectionTitle}>Earnings</Text>
                <Card style={styles.earningsCard}>
                    <View style={styles.earningsRow}>
                        <Text style={styles.earningsLabel}>Base Pay</Text>
                        <Text style={styles.earningsValue}>₹{order.earnings.base}</Text>
                    </View>
                    <View style={styles.earningsRow}>
                        <Text style={styles.earningsLabel}>Tip</Text>
                        <Text style={[styles.earningsValue, styles.tipValue]}>₹{order.earnings.tip}</Text>
                    </View>
                    <View style={styles.earningsRow}>
                        <Text style={styles.earningsLabel}>Peak Bonus</Text>
                        <Text style={styles.earningsValue}>₹{order.earnings.peakBonus}</Text>
                    </View>
                    <View style={[styles.earningsRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>₹{order.earnings.total}</Text>
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
    placeholder: { width: 24 },

    content: { flex: 1, paddingHorizontal: spacing.xl },

    statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
    orderDate: { ...typography.small, color: colors.light.textMuted, marginLeft: spacing.md },

    locationCard: { marginBottom: spacing.md },
    locationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
    locationIcon: { fontSize: 16, marginRight: spacing.xs },
    locationLabel: { ...typography.tiny, color: colors.light.textMuted, letterSpacing: 1 },
    locationName: { ...typography.bodyMedium, color: colors.light.textPrimary, marginBottom: spacing.xs },
    locationAddress: { ...typography.small, color: colors.light.textSecondary },

    sectionTitle: { ...typography.h4, color: colors.light.textPrimary, marginTop: spacing.lg, marginBottom: spacing.md },

    timelineCard: { marginBottom: spacing.lg },
    timelineItem: { flexDirection: 'row', position: 'relative', paddingLeft: spacing.md },
    timelineDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: colors.light.border, backgroundColor: 'white', position: 'absolute', left: 0, top: 4 },
    timelineDotDone: { backgroundColor: colors.primary, borderColor: colors.primary },
    timelineLine: { position: 'absolute', left: 5, top: 16, width: 2, height: 30, backgroundColor: colors.light.border },
    timelineLineDone: { backgroundColor: colors.primary },
    timelineContent: { flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingBottom: spacing.lg, marginLeft: spacing.lg },
    timelineStatus: { ...typography.body, color: colors.light.textPrimary },
    timelineTime: { ...typography.small, color: colors.light.textMuted },

    itemsCard: {},
    itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
    itemQty: { ...typography.small, color: colors.light.textMuted, width: 30 },
    itemName: { ...typography.body, color: colors.light.textPrimary, flex: 1 },
    itemPrice: { ...typography.body, color: colors.light.textPrimary },

    earningsCard: { marginBottom: spacing['2xl'] },
    earningsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
    earningsLabel: { ...typography.body, color: colors.light.textSecondary },
    earningsValue: { ...typography.body, color: colors.light.textPrimary },
    tipValue: { color: colors.warning },
    totalRow: { borderTopWidth: 1, borderTopColor: colors.light.divider, paddingTop: spacing.md, marginTop: spacing.sm },
    totalLabel: { ...typography.bodyMedium, color: colors.light.textPrimary },
    totalValue: { ...typography.h4, color: colors.primary },
});
