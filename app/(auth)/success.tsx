/**
 * GRIHGO Delivery Partner App - Registration Success Screen
 * Celebration screen after completing registration
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Button, Card } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'RegistrationSuccess';

export default function RegistrationSuccessScreen() {
    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleContinue = () => {
        logger.navigate(TAG, 'dashboard');
        router.replace('/(main)/(tabs)/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🎉</Text>
                </View>

                <Text style={styles.title}>Welcome Aboard!</Text>
                <Text style={styles.subtitle}>
                    Your registration is complete. You're now ready to start delivering!
                </Text>

                {/* Next Steps */}
                <Card style={styles.stepsCard}>
                    <Text style={styles.stepsTitle}>What's Next?</Text>

                    <View style={styles.stepRow}>
                        <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepLabel}>Go Online</Text>
                            <Text style={styles.stepDesc}>Toggle your status to start receiving orders</Text>
                        </View>
                    </View>

                    <View style={styles.stepRow}>
                        <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepLabel}>Accept Orders</Text>
                            <Text style={styles.stepDesc}>Accept nearby orders and start earning</Text>
                        </View>
                    </View>

                    <View style={styles.stepRow}>
                        <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepLabel}>Get Paid</Text>
                            <Text style={styles.stepDesc}>Earnings deposited weekly to your bank</Text>
                        </View>
                    </View>
                </Card>
            </View>

            <View style={styles.footer}>
                <Button title="Start Delivering →" onPress={handleContinue} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing['4xl'],
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    icon: {
        fontSize: 60,
    },
    title: {
        ...typography.h2,
        color: colors.light.textPrimary,
        marginBottom: spacing.md,
    },
    subtitle: {
        ...typography.body,
        color: colors.light.textSecondary,
        textAlign: 'center',
        marginBottom: spacing['2xl'],
    },

    stepsCard: {
        width: '100%',
    },
    stepsTitle: {
        ...typography.h4,
        color: colors.light.textPrimary,
        marginBottom: spacing.lg,
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    stepNumberText: {
        ...typography.smallMedium,
        color: 'white',
    },
    stepContent: {
        flex: 1,
    },
    stepLabel: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        marginBottom: spacing.xs,
    },
    stepDesc: {
        ...typography.small,
        color: colors.light.textMuted,
    },

    footer: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
});
