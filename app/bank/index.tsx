/**
 * GRIHGO Delivery Partner App - Bank Edit Screen
 */

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Button, Input, Card, Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'BankEditScreen';

export default function BankEditScreen() {
    const [accountName, setAccountName] = useState('Rahul Sharma');
    const [bankName, setBankName] = useState('HDFC Bank');
    const [accountNumber, setAccountNumber] = useState('XXXX XXXX 1234');
    const [ifscCode, setIfscCode] = useState('HDFC0001234');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleSave = async () => {
        logger.action(TAG, 'save', { accountName, bankName });
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.back();
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="back" size={24} color={colors.light.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bank Details</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Current Bank */}
                <Card style={styles.bankCard}>
                    <View style={styles.bankHeader}>
                        <Icon name="bank" size={32} color={colors.primary} />
                        <View style={styles.bankInfo}>
                            <Text style={styles.bankName}>{bankName}</Text>
                            <Text style={styles.bankAccount}>****{accountNumber.slice(-4)}</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>✓ Verified</Text>
                        </View>
                    </View>
                </Card>

                {/* Form */}
                <View style={styles.form}>
                    <Text style={styles.label}>Account Holder Name</Text>
                    <Input
                        value={accountName}
                        onChangeText={setAccountName}
                        placeholder="Full name as per bank"
                    />

                    <Text style={styles.label}>Bank Name</Text>
                    <Input
                        value={bankName}
                        onChangeText={setBankName}
                        placeholder="HDFC Bank"
                    />

                    <Text style={styles.label}>Account Number</Text>
                    <Input
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        placeholder="Enter account number"
                        secureTextEntry
                    />

                    <Text style={styles.label}>IFSC Code</Text>
                    <Input
                        value={ifscCode}
                        onChangeText={setIfscCode}
                        placeholder="HDFC0001234"
                    />
                </View>

                {/* Payout Info */}
                <Card style={styles.infoCard}>
                    <Icon name="info" size={24} color={colors.warning} />
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Weekly Payouts</Text>
                        <Text style={styles.infoText}>
                            Earnings are deposited every Monday by 6 PM
                        </Text>
                    </View>
                </Card>

                {/* Recent Payouts */}
                <Text style={styles.sectionTitle}>Recent Payouts</Text>

                <Card style={styles.payoutCard}>
                    <View style={styles.payoutRow}>
                        <View>
                            <Text style={styles.payoutAmount}>₹28,500</Text>
                            <Text style={styles.payoutDate}>Jan 15, 2026</Text>
                        </View>
                        <Text style={styles.payoutStatus}>✓ Completed</Text>
                    </View>
                </Card>

                <Card style={styles.payoutCard}>
                    <View style={styles.payoutRow}>
                        <View>
                            <Text style={styles.payoutAmount}>₹32,100</Text>
                            <Text style={styles.payoutDate}>Jan 8, 2026</Text>
                        </View>
                        <Text style={styles.payoutStatus}>✓ Completed</Text>
                    </View>
                </Card>
            </ScrollView>

            <View style={styles.footer}>
                <Button title="Update Bank Details" onPress={handleSave} loading={loading} />
            </View>
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

    bankCard: { marginBottom: spacing.xl },
    bankHeader: { flexDirection: 'row', alignItems: 'center' },
    bankIcon: { fontSize: 32, marginRight: spacing.md },
    bankInfo: { flex: 1 },
    bankName: { ...typography.bodyMedium, color: colors.light.textPrimary },
    bankAccount: { ...typography.small, color: colors.light.textMuted },
    verifiedBadge: { backgroundColor: '#E8F8F0', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
    verifiedText: { ...typography.tiny, color: colors.success },

    form: { marginBottom: spacing.xl },
    label: { ...typography.smallMedium, color: colors.light.textSecondary, marginBottom: spacing.xs, marginTop: spacing.md },

    infoCard: { flexDirection: 'row', backgroundColor: '#FEF3C7', marginBottom: spacing.xl },
    infoIcon: { fontSize: 24, marginRight: spacing.md },
    infoContent: { flex: 1 },
    infoTitle: { ...typography.bodyMedium, color: colors.light.textPrimary, marginBottom: spacing.xs },
    infoText: { ...typography.small, color: colors.light.textSecondary },

    sectionTitle: { ...typography.h4, color: colors.light.textPrimary, marginBottom: spacing.md },

    payoutCard: { marginBottom: spacing.sm },
    payoutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    payoutAmount: { ...typography.h4, color: colors.light.textPrimary },
    payoutDate: { ...typography.small, color: colors.light.textMuted },
    payoutStatus: { ...typography.small, color: colors.success },

    footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
});
