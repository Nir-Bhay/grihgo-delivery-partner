/**
 * GRIHGO Delivery Partner App - Registration Screen
 * Multi-step registration wizard matching mockups
 * 
 * Mockup References:
 * - Step 1: 04_registration_step1_1768627223829.png (Personal Details)
 * - Step 2: 17_registration_step2_vehicle_1768628484152.png (Vehicle Details)
 * - Step 3: 16_document_upload_1768627546280.png (Document Upload)
 * - Step 4: 18_registration_step4_bank_1768628528052.png (Bank Details)
 */

import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, layout } from '@/constants';
import { Button, Input, Select, StepProgress, Card, Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'RegistrationScreen';

const STEPS = ['Personal', 'Vehicle', 'Docs', 'Bank'];

// City options
const CITIES = [
    { label: 'Bangalore', value: 'bangalore' },
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Chennai', value: 'chennai' },
    { label: 'Pune', value: 'pune' },
];

// Vehicle type options
const VEHICLE_TYPES = [
    { label: '🛵 Scooter', value: 'scooter' },
    { label: '🏍️ Bike', value: 'bike' },
    { label: '🚗 Car', value: 'car' },
    { label: '🚲 Bicycle', value: 'bicycle' },
];

export default function RegistrationScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Step 1: Personal Details
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [city, setCity] = useState('');

    // Step 2: Vehicle Details
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');

    // Step 3: Documents - just tracking upload status
    const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
    const [panUploaded, setPanUploaded] = useState(false);
    const [licenseUploaded, setLicenseUploaded] = useState(false);
    const [photoUploaded, setPhotoUploaded] = useState(false);

    // Step 4: Bank Details
    const [accountHolderName, setAccountHolderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleBack = () => {
        if (currentStep === 0) {
            logger.navigate(TAG, 'login');
            router.back();
        } else {
            logger.action(TAG, 'previousStep', { from: currentStep, to: currentStep - 1 });
            setCurrentStep(currentStep - 1);
        }
    };

    const handleContinue = () => {
        logger.action(TAG, 'nextStep', { from: currentStep, to: currentStep + 1 });

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final step - complete registration
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        logger.action(TAG, 'submit');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            logger.navigate(TAG, '(main)/(tabs)/home');
            router.replace('/(main)/(tabs)/home');
        }, 2000);
    };

    const handleDocumentUpload = (type: string) => {
        logger.action(TAG, 'uploadDocument', { type });
        // Simulate upload
        switch (type) {
            case 'aadhaar':
                setAadhaarUploaded(true);
                break;
            case 'pan':
                setPanUploaded(true);
                break;
            case 'license':
                setLicenseUploaded(true);
                break;
            case 'photo':
                setPhotoUploaded(true);
                break;
        }
    };

    const canContinue = () => {
        switch (currentStep) {
            case 0:
                return fullName && email && city;
            case 1:
                return vehicleType && vehicleNumber;
            case 2:
                return aadhaarUploaded && licenseUploaded;
            case 3:
                return accountHolderName && accountNumber && ifscCode;
            default:
                return false;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Icon name="back" size={24} color={colors.light.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Step {currentStep + 1} of {STEPS.length}</Text>
                    <View style={styles.headerPlaceholder} />
                </View>

                {/* Step Progress */}
                <View style={styles.progressContainer}>
                    <StepProgress steps={STEPS} currentStep={currentStep} />
                </View>

                {/* Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Step 1: Personal Details */}
                    {currentStep === 0 && (
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Personal Details</Text>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Full Name"
                                    placeholder="Rahul Sharma"
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Email"
                                    placeholder="rahul@email.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Date of Birth"
                                    placeholder="DD/MM/YYYY"
                                    value={dateOfBirth}
                                    onChangeText={setDateOfBirth}
                                    rightIcon={<Text>📅</Text>}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Select
                                    label="City"
                                    placeholder="Select City"
                                    options={CITIES}
                                    value={city}
                                    onChange={setCity}
                                />
                            </View>
                        </View>
                    )}

                    {/* Step 2: Vehicle Details */}
                    {currentStep === 1 && (
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Vehicle Details</Text>

                            <View style={styles.formGroup}>
                                <Select
                                    label="Vehicle Type"
                                    placeholder="Select Vehicle Type"
                                    options={VEHICLE_TYPES}
                                    value={vehicleType}
                                    onChange={setVehicleType}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Vehicle Number"
                                    placeholder="KA-01-AB-1234"
                                    value={vehicleNumber}
                                    onChangeText={setVehicleNumber}
                                    autoCapitalize="characters"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Vehicle Model"
                                    placeholder="Hero Splendor"
                                    value={vehicleModel}
                                    onChangeText={setVehicleModel}
                                />
                            </View>
                        </View>
                    )}

                    {/* Step 3: Document Upload */}
                    {currentStep === 2 && (
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Document Upload</Text>
                            <Text style={styles.stepSubtitle}>
                                Upload clear photos of your documents
                            </Text>

                            <View style={styles.documentsGrid}>
                                <DocumentCard
                                    title="Aadhaar Card"
                                    subtitle="Front & Back"
                                    uploaded={aadhaarUploaded}
                                    required
                                    onPress={() => handleDocumentUpload('aadhaar')}
                                />
                                <DocumentCard
                                    title="PAN Card"
                                    subtitle="Front side"
                                    uploaded={panUploaded}
                                    onPress={() => handleDocumentUpload('pan')}
                                />
                                <DocumentCard
                                    title="Driving License"
                                    subtitle="Valid license"
                                    uploaded={licenseUploaded}
                                    required
                                    onPress={() => handleDocumentUpload('license')}
                                />
                                <DocumentCard
                                    title="Profile Photo"
                                    subtitle="Clear face photo"
                                    uploaded={photoUploaded}
                                    onPress={() => handleDocumentUpload('photo')}
                                />
                            </View>
                        </View>
                    )}

                    {/* Step 4: Bank Details */}
                    {currentStep === 3 && (
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Bank Account</Text>
                            <Text style={styles.stepSubtitle}>
                                For receiving your earnings
                            </Text>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Account Holder Name"
                                    placeholder="Rahul Sharma"
                                    value={accountHolderName}
                                    onChangeText={setAccountHolderName}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Bank Name"
                                    placeholder="HDFC Bank"
                                    value={bankName}
                                    onChangeText={setBankName}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Input
                                    label="Account Number"
                                    placeholder="XXXX XXXX XXXX"
                                    value={accountNumber}
                                    onChangeText={setAccountNumber}
                                    keyboardType="number-pad"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Input
                                    label="IFSC Code"
                                    placeholder="HDFC0001234"
                                    value={ifscCode}
                                    onChangeText={setIfscCode}
                                    autoCapitalize="characters"
                                />
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Continue Button */}
                <View style={styles.footer}>
                    <Button
                        title={currentStep === STEPS.length - 1 ? 'Complete Registration' : 'Continue →'}
                        onPress={handleContinue}
                        loading={loading}
                        disabled={!canContinue()}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Document Upload Card Component
interface DocumentCardProps {
    title: string;
    subtitle: string;
    uploaded: boolean;
    required?: boolean;
    onPress: () => void;
}

function DocumentCard({ title, subtitle, uploaded, required, onPress }: DocumentCardProps) {
    return (
        <TouchableOpacity
            style={[styles.documentCard, uploaded && styles.documentCardUploaded]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.documentIcon}>
                <Icon name={uploaded ? 'checkmark' : 'document'} size={20} color={uploaded ? colors.success : colors.primary} />
            </View>
            <View style={styles.documentInfo}>
                <View style={styles.documentTitleRow}>
                    <Text style={styles.documentTitle}>{title}</Text>
                    {required && !uploaded && (
                        <Text style={styles.requiredBadge}>Required</Text>
                    )}
                </View>
                <Text style={styles.documentSubtitle}>{subtitle}</Text>
            </View>
            {uploaded ? (
                <Text style={styles.uploadedBadge}>✓ Uploaded</Text>
            ) : (
                <Text style={styles.uploadButton}>Upload</Text>
            )}
        </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    backButton: {
        padding: spacing.sm,
    },
    backArrow: {
        fontSize: 24,
        color: colors.light.textPrimary,
    },
    headerTitle: {
        ...typography.body,
        color: colors.light.textSecondary,
    },
    headerPlaceholder: {
        width: 40,
    },

    // Progress
    progressContainer: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
    },

    // Content
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
    },
    stepContent: {
        paddingBottom: spacing['3xl'],
    },
    stepTitle: {
        ...typography.h3,
        color: colors.light.textPrimary,
        marginBottom: spacing.sm,
    },
    stepSubtitle: {
        ...typography.body,
        color: colors.light.textSecondary,
        marginBottom: spacing.xl,
    },
    formGroup: {
        marginBottom: spacing.lg,
    },

    // Documents Grid
    documentsGrid: {
        gap: spacing.md,
    },
    documentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.light.surface,
        borderWidth: 1,
        borderColor: colors.light.border,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    documentCardUploaded: {
        borderColor: colors.primary,
        backgroundColor: '#F0FDF4',
    },
    documentIcon: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        backgroundColor: colors.light.surfaceSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    documentIconText: {
        fontSize: 20,
    },
    documentInfo: {
        flex: 1,
    },
    documentTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    documentTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    documentSubtitle: {
        ...typography.small,
        color: colors.light.textMuted,
        marginTop: spacing.xs,
    },
    requiredBadge: {
        ...typography.tiny,
        color: colors.error,
        fontWeight: '600',
    },
    uploadButton: {
        ...typography.smallMedium,
        color: colors.primary,
    },
    uploadedBadge: {
        ...typography.small,
        color: colors.success,
        fontWeight: '600',
    },

    // Footer
    footer: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: colors.light.background,
        borderTopWidth: 1,
        borderTopColor: colors.light.divider,
    },
});
