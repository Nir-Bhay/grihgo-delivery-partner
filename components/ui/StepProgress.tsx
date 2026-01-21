/**
 * GRIHGO Delivery Partner App - Step Progress Component
 * Progress stepper for multi-step registration flow
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/constants';

interface StepProgressProps {
    steps: string[];
    currentStep: number; // 0-indexed
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
    return (
        <View style={styles.container}>
            {steps.map((label, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isUpcoming = index > currentStep;

                return (
                    <View key={index} style={styles.stepItem}>
                        {/* Connector line (before) */}
                        {index > 0 && (
                            <View
                                style={[
                                    styles.connector,
                                    styles.connectorBefore,
                                    isCompleted && styles.connectorCompleted,
                                ]}
                            />
                        )}

                        {/* Step circle */}
                        <View
                            style={[
                                styles.circle,
                                isCompleted && styles.circleCompleted,
                                isCurrent && styles.circleCurrent,
                                isUpcoming && styles.circleUpcoming,
                            ]}
                        >
                            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                        </View>

                        {/* Label */}
                        <Text
                            style={[
                                styles.label,
                                isCurrent && styles.labelCurrent,
                                isCompleted && styles.labelCompleted,
                            ]}
                        >
                            {label}
                        </Text>

                        {/* Connector line (after) */}
                        {index < steps.length - 1 && (
                            <View
                                style={[
                                    styles.connector,
                                    styles.connectorAfter,
                                    isCompleted && styles.connectorCompleted,
                                ]}
                            />
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },

    // Circle
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
        zIndex: 1,
        backgroundColor: colors.light.surface,
    },
    circleCompleted: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    circleCurrent: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    circleUpcoming: {
        backgroundColor: colors.light.surface,
        borderColor: colors.light.border,
    },
    checkmark: {
        fontSize: 10,
        color: colors.light.surface,
        fontWeight: 'bold',
    },

    // Label
    label: {
        ...typography.tiny,
        color: colors.light.textMuted,
        textAlign: 'center',
    },
    labelCurrent: {
        color: colors.light.textPrimary,
        fontWeight: '600',
    },
    labelCompleted: {
        color: colors.light.textSecondary,
    },

    // Connector
    connector: {
        position: 'absolute',
        top: 9, // Half of circle height
        height: 2,
        backgroundColor: colors.light.border,
    },
    connectorBefore: {
        right: '50%',
        left: 0,
        marginRight: 10, // Half circle width
    },
    connectorAfter: {
        left: '50%',
        right: 0,
        marginLeft: 10, // Half circle width
    },
    connectorCompleted: {
        backgroundColor: colors.primary,
    },
});
