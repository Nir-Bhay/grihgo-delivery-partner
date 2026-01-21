/**
 * GRIHGO Delivery Partner App - OTP Verification Screen
 * 6-digit OTP entry with countdown timer
 */

import { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius, layout } from '@/constants';
import { Button } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'OTPScreen';
const OTP_LENGTH = 6;
const RESEND_TIMER = 30;

export default function OTPScreen() {
    const { phone } = useLocalSearchParams<{ phone: string }>();
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(RESEND_TIMER);
    const [error, setError] = useState('');

    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        logger.lifecycle(TAG, 'mount', { phone });
        inputRefs.current[0]?.focus();
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    // Countdown timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        if (value.length > 1) {
            // Paste handling
            const pastedOtp = value.slice(0, OTP_LENGTH).split('');
            const newOtp = [...otp];
            pastedOtp.forEach((digit, i) => {
                if (i < OTP_LENGTH) newOtp[i] = digit;
            });
            setOtp(newOtp);
            if (pastedOtp.length === OTP_LENGTH) {
                inputRefs.current[OTP_LENGTH - 1]?.focus();
            }
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Move to next input
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join('');
        logger.action(TAG, 'verify', { otpLength: otpValue.length });

        if (otpValue.length !== OTP_LENGTH) {
            setError('Please enter complete OTP');
            return;
        }

        setLoading(true);

        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            logger.navigate(TAG, '(main)/(tabs)/home');
            // For demo, go to main app
            router.replace('/(main)/(tabs)/home');
        }, 1500);
    };

    const handleResend = () => {
        logger.action(TAG, 'resendOTP');
        setTimer(RESEND_TIMER);
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
    };

    const handleBack = () => {
        logger.navigate(TAG, 'login');
        router.back();
    };

    const formatTimer = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isOtpComplete = otp.every((digit) => digit !== '');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Header */}
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>Verify OTP</Text>
                    <Text style={styles.subtitle}>
                        Enter 6-digit code sent to{'\n'}
                        <Text style={styles.phone}>+91 {phone || '98765 43210'}</Text>
                    </Text>

                    {/* OTP Inputs */}
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={[
                                    styles.otpInput,
                                    digit && styles.otpInputFilled,
                                    error && styles.otpInputError,
                                ]}
                                value={digit}
                                onChangeText={(value) => handleChange(value, index)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                selectTextOnFocus
                            />
                        ))}
                    </View>

                    {error && <Text style={styles.error}>{error}</Text>}

                    {/* Timer */}
                    <View style={styles.timerContainer}>
                        {timer > 0 ? (
                            <Text style={styles.timerText}>
                                Resend in <Text style={styles.timerValue}>{formatTimer(timer)}</Text>
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={styles.resendLink}>Didn't receive? Resend OTP</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Verify Button */}
                    <Button
                        title="Verify & Continue"
                        onPress={handleVerify}
                        loading={loading}
                        disabled={!isOtpComplete}
                        style={styles.verifyButton}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.background,
    },
    keyboardView: {
        flex: 1,
    },

    // Header
    backButton: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    backText: {
        ...typography.body,
        color: colors.light.textSecondary,
    },

    // Content
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
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
        lineHeight: 24,
    },
    phone: {
        color: colors.light.textPrimary,
        fontWeight: '600',
    },

    // OTP
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
        marginTop: spacing['3xl'],
        marginBottom: spacing.lg,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderWidth: 1,
        borderColor: colors.light.border,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.light.surface,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.light.textPrimary,
    },
    otpInputFilled: {
        borderColor: colors.primary,
        backgroundColor: '#E8F8F0',
    },
    otpInputError: {
        borderColor: colors.error,
    },

    error: {
        ...typography.small,
        color: colors.error,
        marginBottom: spacing.md,
    },

    // Timer
    timerContainer: {
        marginBottom: spacing['3xl'],
    },
    timerText: {
        ...typography.small,
        color: colors.light.textMuted,
    },
    timerValue: {
        color: colors.light.textSecondary,
        fontWeight: '600',
    },
    resendLink: {
        ...typography.body,
        color: colors.primary,
        fontWeight: '600',
    },

    verifyButton: {
        width: '100%',
    },
});
