/**
 * GRIHGO Delivery Partner App - Delivery Confirmation Screen
 * Premium confirmation screen with brand styling
 */

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon } from '@/components/ui';
import { logger } from '@/utils/logger';
import { mockNewOrder } from '@/services/mock';

const TAG = 'DeliveryConfirmation';

const CONFIRMATION_OPTIONS = [
    { id: 'handed', label: 'Handed to customer', icon: 'user', color: colors.primary, bgColor: '#E8F8F0' },
    { id: 'doorstep', label: 'Left at doorstep', icon: 'location', color: '#2563EB', bgColor: '#DBEAFE' },
    { id: 'security', label: 'Given to security', icon: 'user', color: '#D97706', bgColor: '#FEF3C7' },
    { id: 'other', label: 'Other', icon: 'document', color: '#9CA3AF', bgColor: '#F3F4F6' },
];

export default function DeliveryConfirmationScreen() {
    const [selected, setSelected] = useState<string>('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const order = mockNewOrder;

    const handleConfirm = async () => {
        logger.action(TAG, 'confirm', { method: selected, notes });
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            router.replace('/order/complete');
        }, 1000);
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
                        <Text style={styles.headerTitle}>Confirm Delivery</Text>
                        <View style={styles.headerPlaceholder} />
                    </View>

                    {/* Order Info */}
                    <View style={styles.orderInfo}>
                        <View style={styles.orderIdBadge}>
                            <Text style={styles.orderIdText}>Order #{order.id}</Text>
                        </View>
                        <Text style={styles.customerName}>{order.customer.name}</Text>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>How was the order delivered?</Text>
                <Text style={styles.subtitle}>Select the delivery method</Text>

                {/* Options */}
                <View style={styles.options}>
                    {CONFIRMATION_OPTIONS.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.option,
                                selected === option.id && styles.optionSelected,
                            ]}
                            onPress={() => setSelected(option.id)}
                            activeOpacity={0.9}
                        >
                            <View style={[styles.optionIcon, { backgroundColor: option.bgColor }]}>
                                <Icon name={option.icon as any} size={20} color={option.color} />
                            </View>
                            <Text style={[
                                styles.optionLabel,
                                selected === option.id && styles.optionLabelSelected,
                            ]}>
                                {option.label}
                            </Text>
                            {selected === option.id && (
                                <View style={styles.checkCircle}>
                                    <Icon name="checkmark" size={14} color="#FFFFFF" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Notes */}
                {selected === 'other' && (
                    <View style={styles.notesContainer}>
                        <Text style={styles.notesLabel}>Add notes (optional)</Text>
                        <TextInput
                            style={styles.notesInput}
                            placeholder="Describe how the order was delivered..."
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            numberOfLines={3}
                            placeholderTextColor={colors.light.textMuted}
                        />
                    </View>
                )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.earningsPreview}>
                    <Text style={styles.earningsLabel}>Your Earnings</Text>
                    <Text style={styles.earningsAmount}>₹{order.earnings.total}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !selected && styles.confirmButtonDisabled,
                        loading && styles.confirmButtonLoading
                    ]}
                    onPress={handleConfirm}
                    disabled={!selected || loading}
                    activeOpacity={0.9}
                >
                    <Text style={styles.confirmButtonText}>
                        {loading ? 'Confirming...' : 'Confirm Delivery'}
                    </Text>
                    {!loading && <Icon name="checkmark" size={18} color="#FFFFFF" />}
                </TouchableOpacity>
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
    },
    headerSafe: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
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
    headerPlaceholder: {
        width: 40,
    },
    orderInfo: {
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    orderIdBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        marginBottom: spacing.xs,
    },
    orderIdText: {
        ...typography.tiny,
        color: '#FFFFFF',
    },
    customerName: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },

    // Content
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
    },
    title: {
        ...typography.h4,
        color: colors.light.textPrimary,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.body,
        color: colors.light.textSecondary,
        marginBottom: spacing.xl,
    },

    // Options
    options: {
        gap: spacing.md,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        ...shadows.sm,
    },
    optionSelected: {
        borderColor: colors.primary,
        backgroundColor: '#E8F8F0',
    },
    optionIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    optionLabel: {
        ...typography.body,
        color: colors.light.textPrimary,
        flex: 1,
    },
    optionLabelSelected: {
        fontWeight: '600',
    },
    checkCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Notes
    notesContainer: {
        marginTop: spacing.xl,
    },
    notesLabel: {
        ...typography.small,
        color: colors.light.textSecondary,
        marginBottom: spacing.sm,
    },
    notesInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        ...typography.body,
        color: colors.light.textPrimary,
        textAlignVertical: 'top',
        minHeight: 100,
        ...shadows.sm,
    },

    // Footer
    footer: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    earningsPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    earningsLabel: {
        ...typography.body,
        color: colors.light.textSecondary,
    },
    earningsAmount: {
        ...typography.h3,
        color: colors.primary,
    },
    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    confirmButtonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    confirmButtonLoading: {
        backgroundColor: '#059669',
    },
    confirmButtonText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
});
