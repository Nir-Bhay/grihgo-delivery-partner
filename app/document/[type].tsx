/**
 * GRIHGO Delivery Partner App - Document Viewer Screen
 * 
 * Mockup Reference: 29_document_viewer_1768629406927.png
 * - Dark overlay background
 * - Document title and preview
 * - Verification status
 * - Re-upload and Delete options
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Button, Icon, IconName } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'DocumentViewerScreen';

// Mock document data
const mockDocuments: Record<string, {
    title: string;
    number: string;
    verified: boolean;
    verifiedDate: string;
    iconName: IconName;
}> = {
    aadhaar: {
        title: 'Aadhaar Card',
        number: 'XXXX XXXX 1234',
        verified: true,
        verifiedDate: 'Jan 10, 2026',
        iconName: 'id-card',
    },
    pan: {
        title: 'PAN Card',
        number: 'ABCDE1234F',
        verified: true,
        verifiedDate: 'Jan 10, 2026',
        iconName: 'id-card',
    },
    license: {
        title: 'Driving License',
        number: 'KA-01-2024-1234567',
        verified: true,
        verifiedDate: 'Jan 10, 2026',
        iconName: 'car',
    },
    rc: {
        title: 'RC Book',
        number: 'KA-01-AB-1234',
        verified: true,
        verifiedDate: 'Jan 10, 2026',
        iconName: 'document',
    },
    insurance: {
        title: 'Vehicle Insurance',
        number: 'POL-2024-12345',
        verified: true,
        verifiedDate: 'Jan 10, 2026',
        iconName: 'shield',
    },
    puc: {
        title: 'PUC Certificate',
        number: 'PUC-2024-1234',
        verified: true,
        verifiedDate: 'Jan 10, 2026',
        iconName: 'document',
    },
};

export default function DocumentViewerScreen() {
    const { type } = useLocalSearchParams<{ type: string }>();
    const document = mockDocuments[type || 'aadhaar'] || mockDocuments.aadhaar;

    useEffect(() => {
        logger.lifecycle(TAG, 'mount', { type });
        return () => logger.lifecycle(TAG, 'unmount');
    }, [type]);

    const handleClose = () => {
        logger.navigate(TAG, 'back');
        router.back();
    };

    const handleReupload = () => {
        logger.action(TAG, 'reupload', { type });
        // Would open camera/gallery picker
    };

    const handleDelete = () => {
        logger.action(TAG, 'delete', { type });
        // Would show confirmation dialog
    };

    return (
        <View style={styles.container}>
            {/* Dark Overlay Background */}
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <Icon name="close" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>{document.title}</Text>

                {/* Document Preview */}
                <View style={styles.documentPreview}>
                    <View style={styles.documentCard}>
                        <Icon name={document.iconName} size={48} color="#FFFFFF" />
                        <View style={styles.documentInfo}>
                            <Text style={styles.documentName}>Name: XXXX</Text>
                            <Text style={styles.documentDetail}>Date of Birth: XXXXX</Text>
                            <Text style={styles.documentDetail}>Gender: Male</Text>
                        </View>
                        <Text style={styles.documentNumber}>{document.number}</Text>
                    </View>
                </View>

                {/* Verification Status */}
                {document.verified && (
                    <View style={styles.verificationBadge}>
                        <Icon name="checkmark" size={16} color={colors.success} />
                        <Text style={styles.verificationText}>
                            Verified on {document.verifiedDate}
                        </Text>
                    </View>
                )}

                {/* Document Details */}
                <View style={styles.detailsCard}>
                    <Text style={styles.detailLabel}>Document Type: {document.title}</Text>
                    <Text style={styles.detailLabel}>Number: {document.number}</Text>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.reuploadButton} onPress={handleReupload}>
                        <Text style={styles.reuploadText}>Re-upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>

                {/* Note */}
                <Text style={styles.note}>
                    Note: This document cannot be changed without support approval
                </Text>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(13, 31, 23, 0.95)',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: spacing.xl,
    },
    header: {
        alignItems: 'flex-start',
        paddingVertical: spacing.md,
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    title: {
        ...typography.h2,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    documentPreview: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    documentCard: {
        width: '90%',
        aspectRatio: 1.6,
        backgroundColor: '#162D22',
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2A4539',
    },
    documentPlaceholder: {
        fontSize: 48,
        marginBottom: spacing.md,
    },
    documentInfo: {
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    documentName: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
    documentDetail: {
        ...typography.small,
        color: '#A7C4B5',
    },
    documentNumber: {
        ...typography.h4,
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    verificationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(46, 204, 113, 0.15)',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.full,
        marginBottom: spacing.xl,
        alignSelf: 'center',
    },
    verificationIcon: {
        fontSize: 16,
        color: colors.success,
        marginRight: spacing.sm,
    },
    verificationText: {
        ...typography.body,
        color: colors.success,
    },
    detailsCard: {
        backgroundColor: '#162D22',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },
    detailLabel: {
        ...typography.body,
        color: '#FFFFFF',
        marginBottom: spacing.sm,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xl,
        marginBottom: spacing.xl,
    },
    reuploadButton: {
        backgroundColor: '#2A4539',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.sm,
    },
    reuploadText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
    deleteText: {
        ...typography.bodyMedium,
        color: colors.error,
    },
    note: {
        ...typography.small,
        color: '#A7C4B5',
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
    },
});
