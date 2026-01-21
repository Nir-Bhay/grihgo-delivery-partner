/**
 * GRIHGO Delivery Partner App - Select/Dropdown Component
 * Dropdown picker for selecting options
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
} from 'react-native';
import { colors, typography, spacing, borderRadius, layout, shadows } from '@/constants';
import { logger } from '@/utils/logger';

const TAG = 'Select';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
}

export function Select({
    label,
    placeholder = 'Select...',
    options,
    value,
    onChange,
    error,
    disabled = false,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optionValue: string) => {
        logger.action(TAG, 'select', { value: optionValue });
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={[
                    styles.trigger,
                    isOpen && styles.triggerFocused,
                    error && styles.triggerError,
                    disabled && styles.triggerDisabled,
                ]}
                onPress={() => !disabled && setIsOpen(true)}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.triggerText,
                        !selectedOption && styles.placeholder,
                    ]}
                >
                    {selectedOption?.label || placeholder}
                </Text>
                <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}

            {/* Dropdown Modal */}
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownTitle}>{label || 'Select Option'}</Text>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        item.value === value && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            item.value === value && styles.optionTextSelected,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    {item.value === value && (
                                        <Text style={styles.optionCheck}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        ...typography.smallMedium,
        color: colors.light.textPrimary,
        marginBottom: spacing.sm,
    },
    trigger: {
        height: layout.inputHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.light.surface,
        borderWidth: 1,
        borderColor: colors.light.border,
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.lg,
    },
    triggerFocused: {
        borderColor: colors.primary,
    },
    triggerError: {
        borderColor: colors.error,
    },
    triggerDisabled: {
        backgroundColor: colors.light.surfaceSecondary,
        opacity: 0.7,
    },
    triggerText: {
        ...typography.body,
        color: colors.light.textPrimary,
    },
    placeholder: {
        color: colors.light.textMuted,
    },
    chevron: {
        fontSize: 10,
        color: colors.light.textMuted,
    },
    error: {
        ...typography.small,
        color: colors.error,
        marginTop: spacing.xs,
    },

    // Modal
    overlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
    },
    dropdown: {
        backgroundColor: colors.light.surface,
        borderRadius: borderRadius.lg,
        maxHeight: 400,
        ...shadows.xl,
    },
    dropdownTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.divider,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.divider,
    },
    optionSelected: {
        backgroundColor: '#E8F8F0',
    },
    optionText: {
        ...typography.body,
        color: colors.light.textPrimary,
    },
    optionTextSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
    optionCheck: {
        color: colors.primary,
        fontSize: 16,
    },
});
