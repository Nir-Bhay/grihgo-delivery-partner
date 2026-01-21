/**
 * GRIHGO Delivery Partner App - Emergency SOS Screen
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Card, Icon } from '@/components/ui';
import { logger } from '@/utils/logger';

const TAG = 'EmergencyScreen';

export default function EmergencyScreen() {
    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleEmergencyCall = () => {
        logger.action(TAG, 'emergencyCall');
        Linking.openURL('tel:100');
    };

    const handleSupportCall = () => {
        logger.action(TAG, 'supportCall');
        Linking.openURL('tel:1800123456');
    };

    const handleShareLocation = () => {
        logger.action(TAG, 'shareLocation');
        // Share location to emergency contacts
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Emergency SOS</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                {/* Main SOS Button */}
                <TouchableOpacity style={styles.sosButton} onPress={handleEmergencyCall}>
                    <Icon name="sos" size={48} color="white" />
                    <Text style={styles.sosText}>EMERGENCY</Text>
                    <Text style={styles.sosSubtext}>Call 100</Text>
                </TouchableOpacity>

                {/* Emergency Options */}
                <View style={styles.optionsGrid}>
                    <TouchableOpacity style={styles.optionCard} onPress={handleShareLocation}>
                        <Icon name="location" size={32} color={colors.error} />
                        <Text style={styles.optionTitle}>Share Location</Text>
                        <Text style={styles.optionSubtitle}>With emergency contacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={handleSupportCall}>
                        <Icon name="phone" size={32} color={colors.primary} />
                        <Text style={styles.optionTitle}>Call Support</Text>
                        <Text style={styles.optionSubtitle}>24/7 Helpline</Text>
                    </TouchableOpacity>
                </View>

                {/* Location Info */}
                <Card style={styles.locationCard}>
                    <Text style={styles.locationTitle}>Your Current Location</Text>
                    <Text style={styles.locationAddress}>Koramangala, 5th Block, Bangalore</Text>
                    <Text style={styles.locationCoords}>12.9352° N, 77.6245° E</Text>
                </Card>

                {/* Safety Tips */}
                <View style={styles.tipsSection}>
                    <Text style={styles.tipsTitle}>Stay Safe</Text>
                    <Text style={styles.tipItem}>• Move to a safe, well-lit area</Text>
                    <Text style={styles.tipItem}>• Stay calm and alert</Text>
                    <Text style={styles.tipItem}>• Keep your phone charged</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1A0000' },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
    },
    backArrow: { fontSize: 24, color: 'white' },
    headerTitle: { ...typography.h4, color: 'white' },
    placeholder: { width: 24 },

    content: { flex: 1, paddingHorizontal: spacing.xl, alignItems: 'center' },

    sosButton: {
        width: 200, height: 200, borderRadius: 100,
        backgroundColor: colors.error, justifyContent: 'center', alignItems: 'center',
        marginVertical: spacing['3xl'],
        shadowColor: colors.error, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20,
    },
    sosIcon: { fontSize: 48, marginBottom: spacing.sm },
    sosText: { ...typography.h3, color: 'white', fontWeight: 'bold' },
    sosSubtext: { ...typography.small, color: 'rgba(255,255,255,0.8)' },

    optionsGrid: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
    optionCard: {
        flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: borderRadius.lg,
        padding: spacing.lg, alignItems: 'center',
    },
    optionIcon: { fontSize: 32, marginBottom: spacing.sm },
    optionTitle: { ...typography.bodyMedium, color: 'white', textAlign: 'center' },
    optionSubtitle: { ...typography.tiny, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },

    locationCard: { width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: spacing.xl },
    locationTitle: { ...typography.small, color: 'rgba(255,255,255,0.6)', marginBottom: spacing.xs },
    locationAddress: { ...typography.body, color: 'white', marginBottom: spacing.xs },
    locationCoords: { ...typography.tiny, color: 'rgba(255,255,255,0.5)' },

    tipsSection: { width: '100%' },
    tipsTitle: { ...typography.h4, color: 'white', marginBottom: spacing.md },
    tipItem: { ...typography.small, color: 'rgba(255,255,255,0.7)', marginBottom: spacing.xs },
});
