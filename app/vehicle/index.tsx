/**
 * GRIHGO Delivery Partner App - Vehicle Edit Screen
 */

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Button, Input, Card, Select, Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'VehicleEditScreen';

const vehicleTypes = [
    { label: 'Bike', value: 'bike' },
    { label: 'Scooter', value: 'scooter' },
    { label: 'Bicycle', value: 'bicycle' },
];

export default function VehicleEditScreen() {
    const [vehicleType, setVehicleType] = useState('scooter');
    const [vehicleNumber, setVehicleNumber] = useState('KA-01-AB-1234');
    const [vehicleModel, setVehicleModel] = useState('Hero Splendor');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleSave = async () => {
        logger.action(TAG, 'save', { vehicleType, vehicleNumber, vehicleModel });
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
                <Text style={styles.headerTitle}>Edit Vehicle</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Vehicle Icon */}
                <View style={styles.iconSection}>
                    <View style={styles.vehicleIcon}>
                        <Icon name="scooter" size={40} color={colors.primary} />
                    </View>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Text style={styles.label}>Vehicle Type</Text>
                    <Select
                        value={vehicleType}
                        onValueChange={setVehicleType}
                        options={vehicleTypes}
                        placeholder="Select vehicle type"
                    />

                    <Text style={styles.label}>Vehicle Number</Text>
                    <Input
                        value={vehicleNumber}
                        onChangeText={setVehicleNumber}
                        placeholder="KA-01-AB-1234"
                    />

                    <Text style={styles.label}>Vehicle Model</Text>
                    <Input
                        value={vehicleModel}
                        onChangeText={setVehicleModel}
                        placeholder="Hero Splendor"
                    />
                </View>

                {/* Documents */}
                <Text style={styles.sectionTitle}>Vehicle Documents</Text>

                <Card style={styles.docCard}>
                    <View style={styles.docRow}>
                        <View style={styles.docInfo}>
                            <Text style={styles.docName}>Registration Certificate (RC)</Text>
                            <Text style={styles.docStatus}>✓ Verified</Text>
                        </View>
                        <TouchableOpacity style={styles.docButton}>
                            <Text style={styles.docButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </Card>

                <Card style={styles.docCard}>
                    <View style={styles.docRow}>
                        <View style={styles.docInfo}>
                            <Text style={styles.docName}>Insurance</Text>
                            <Text style={[styles.docStatus, styles.expiring]}>Expires in 30 days</Text>
                        </View>
                        <TouchableOpacity style={styles.docButton}>
                            <Text style={styles.docButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </Card>

                <Card style={styles.docCard}>
                    <View style={styles.docRow}>
                        <View style={styles.docInfo}>
                            <Text style={styles.docName}>Pollution Certificate (PUC)</Text>
                            <Text style={styles.docStatus}>✓ Verified</Text>
                        </View>
                        <TouchableOpacity style={styles.docButton}>
                            <Text style={styles.docButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </ScrollView>

            <View style={styles.footer}>
                <Button title="Save Changes" onPress={handleSave} loading={loading} />
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

    iconSection: { alignItems: 'center', marginVertical: spacing.xl },
    vehicleIcon: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: colors.light.surfaceSecondary,
        justifyContent: 'center', alignItems: 'center',
    },
    iconText: { fontSize: 40 },

    form: { marginBottom: spacing.xl },
    label: { ...typography.smallMedium, color: colors.light.textSecondary, marginBottom: spacing.xs, marginTop: spacing.md },

    sectionTitle: { ...typography.h4, color: colors.light.textPrimary, marginBottom: spacing.md },

    docCard: { marginBottom: spacing.sm },
    docRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    docInfo: { flex: 1 },
    docName: { ...typography.body, color: colors.light.textPrimary, marginBottom: spacing.xs },
    docStatus: { ...typography.small, color: colors.success },
    expiring: { color: colors.warning },
    docButton: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
    docButtonText: { ...typography.small, color: colors.primary },

    footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
});
