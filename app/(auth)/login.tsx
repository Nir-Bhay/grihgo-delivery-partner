/**
 * GRIHGO Delivery Partner App - Login Screen
 * Premium login with brand header and enhanced visuals
 */

import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Button, Input, Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'LoginScreen';

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const validatePhone = (value: string): boolean => {
        const cleaned = value.replace(/\D/g, '');
        return cleaned.length === 10;
    };

    const handleGetOTP = async () => {
        logger.action(TAG, 'getOTP', { phone });

        if (!validatePhone(phone)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            logger.navigate(TAG, 'otp', { phone });
            router.push({ pathname: '/(auth)/otp', params: { phone } });
        }, 1000);
    };

    const handleRegister = () => {
        logger.action(TAG, 'navigateToRegister');
        router.push('/(auth)/register');
    };

    return (
        <View style={styles.container}>
            {/* Brand Header */}
            <View style={styles.headerGradient}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    <View style={styles.logoSection}>
                        <Image
                            source={require('@/assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={styles.brandBadge}>
                            <Icon name="scooter" size={14} color={colors.primary} />
                            <Text style={styles.brandBadgeText}>Delivery Partner</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Welcome Card */}
                    <View style={styles.welcomeCard}>
                        <Text style={styles.welcomeTitle}>Welcome Back!</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Sign in to start earning and delivering
                        </Text>

                        {/* Phone Input */}
                        <View style={styles.formContainer}>
                            <View style={styles.inputLabel}>
                                <Icon name="phone" size={16} color={colors.light.textMuted} />
                                <Text style={styles.inputLabelText}>Phone Number</Text>
                            </View>
                            <Input
                                variant="phone"
                                placeholder="98765 43210"
                                value={phone}
                                onChangeText={(text) => {
                                    setPhone(text);
                                    setError('');
                                }}
                                error={error}
                                keyboardType="phone-pad"
                                maxLength={10}
                            />

                            <TouchableOpacity
                                style={[
                                    styles.otpButton,
                                    phone.length < 10 && styles.otpButtonDisabled,
                                    loading && styles.otpButtonLoading
                                ]}
                                onPress={handleGetOTP}
                                disabled={phone.length < 10 || loading}
                                activeOpacity={0.9}
                            >
                                {loading ? (
                                    <Text style={styles.otpButtonText}>Sending...</Text>
                                ) : (
                                    <>
                                        <Text style={styles.otpButtonText}>Get OTP</Text>
                                        <Icon name="forward" size={18} color="#FFFFFF" />
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Register Link */}
                    <TouchableOpacity
                        style={styles.registerCard}
                        onPress={handleRegister}
                        activeOpacity={0.9}
                    >
                        <View style={styles.registerIconContainer}>
                            <Icon name="user" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.registerInfo}>
                            <Text style={styles.registerTitle}>New to GRIHGO?</Text>
                            <Text style={styles.registerSubtitle}>Register as delivery partner</Text>
                        </View>
                        <Icon name="forward" size={18} color={colors.primary} />
                    </TouchableOpacity>

                    {/* Features */}
                    <View style={styles.features}>
                        <View style={styles.featureItem}>
                            <View style={[styles.featureIcon, { backgroundColor: '#E8F8F0' }]}>
                                <Icon name="wallet" size={18} color={colors.primary} />
                            </View>
                            <Text style={styles.featureText}>Daily Earnings</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
                                <Icon name="time" size={18} color="#D97706" />
                            </View>
                            <Text style={styles.featureText}>Flexible Hours</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={[styles.featureIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Icon name="help" size={18} color="#2563EB" />
                            </View>
                            <Text style={styles.featureText}>24/7 Support</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.footerLink}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={styles.footerLink}>Privacy Policy</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
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
        paddingBottom: spacing['2xl'],
    },
    headerSafe: {
        alignItems: 'center',
    },
    logoSection: {
        alignItems: 'center',
        paddingTop: spacing.xl,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: spacing.md,
    },
    brandBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        gap: 6,
    },
    brandBadgeText: {
        ...typography.smallMedium,
        color: colors.primary,
    },

    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
    },

    // Welcome Card
    welcomeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        marginBottom: spacing.lg,
        ...shadows.md,
    },
    welcomeTitle: {
        ...typography.h3,
        color: colors.light.textPrimary,
        marginBottom: spacing.xs,
    },
    welcomeSubtitle: {
        ...typography.body,
        color: colors.light.textSecondary,
        marginBottom: spacing.xl,
    },

    // Form
    formContainer: {
    },
    inputLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    inputLabelText: {
        ...typography.small,
        color: colors.light.textSecondary,
    },
    otpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        marginTop: spacing.xl,
        gap: spacing.sm,
    },
    otpButtonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    otpButtonLoading: {
        backgroundColor: '#059669',
    },
    otpButtonText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },

    // Register Card
    registerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        ...shadows.sm,
    },
    registerIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    registerInfo: {
        flex: 1,
    },
    registerTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    registerSubtitle: {
        ...typography.small,
        color: colors.light.textMuted,
    },

    // Features
    features: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: spacing['2xl'],
    },
    featureItem: {
        alignItems: 'center',
    },
    featureIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    featureText: {
        ...typography.tiny,
        color: colors.light.textSecondary,
    },

    // Footer
    footer: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: '#F5F7F6',
    },
    footerText: {
        ...typography.tiny,
        color: colors.light.textMuted,
        textAlign: 'center',
        lineHeight: 18,
    },
    footerLink: {
        color: colors.primary,
    },
});
