/**
 * GRIHGO Delivery Partner App - Navigation Fullscreen Screen
 * 
 * Mockup Reference: 28_navigation_fullscreen_1768629365464.png
 * - Full-screen dark map with route
 * - Turn-by-turn directions at top
 * - Earnings badge
 * - Bottom customer info panel
 * - Call and Chat buttons
 */

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon } from '@/components/ui';
import { logger } from '@/utils/logger';
import { mockNewOrder } from '@/services/mock';

const TAG = 'NavigationFullscreenScreen';

export default function NavigationFullscreenScreen() {
    const [currentInstruction, setCurrentInstruction] = useState('In 500m turn right onto 12th Main Road');
    const [distance, setDistance] = useState('1.2 km');
    const [eta, setEta] = useState('4 min');

    const order = mockNewOrder;

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleCall = () => {
        logger.action(TAG, 'call');
        Linking.openURL(`tel:${order.customer.phone}`);
    };

    const handleChat = () => {
        logger.navigate(TAG, 'chat');
        router.push('/chat');
    };

    const handleBack = () => {
        logger.navigate(TAG, 'back');
        router.back();
    };

    const handleZoomIn = () => {
        logger.action(TAG, 'zoomIn');
    };

    const handleZoomOut = () => {
        logger.action(TAG, 'zoomOut');
    };

    const handleRecenter = () => {
        logger.action(TAG, 'recenter');
    };

    return (
        <View style={styles.container}>
            {/* Full Screen Map Placeholder */}
            <View style={styles.mapContainer}>
                {/* Map Grid Lines (simulating dark map) */}
                <View style={styles.mapGrid}>
                    {[...Array(20)].map((_, i) => (
                        <View key={`h-${i}`} style={[styles.gridLine, styles.horizontalLine, { top: `${i * 5}%` }]} />
                    ))}
                    {[...Array(15)].map((_, i) => (
                        <View key={`v-${i}`} style={[styles.gridLine, styles.verticalLine, { left: `${i * 7}%` }]} />
                    ))}
                </View>

                {/* Route Line */}
                <View style={styles.routeLine}>
                    <View style={styles.routeSegment1} />
                    <View style={styles.routeSegment2} />
                    <View style={styles.routeSegment3} />
                </View>

                {/* Current Location Marker */}
                <View style={styles.currentLocationMarker}>
                    <View style={styles.locationPulse} />
                    <View style={styles.locationDot}>
                        <Text style={styles.locationArrow}>▲</Text>
                    </View>
                </View>

                {/* Destination Marker */}
                <View style={styles.destinationMarker}>
                    <View style={styles.destinationPin}>
                        <Icon name="home" size={20} color="white" />
                    </View>
                </View>

                {/* Restaurant Marker */}
                <View style={styles.restaurantMarker}>
                    <View style={styles.restaurantPin}>
                        <Icon name="restaurant" size={16} color={colors.primary} />
                    </View>
                </View>
            </View>

            {/* Turn-by-Turn Instruction Bar */}
            <SafeAreaView style={styles.instructionBar} edges={['top']}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Icon name="back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.instructionContent}>
                    <View style={styles.turnIconContainer}>
                        <Text style={styles.turnIcon}>↱</Text>
                    </View>
                    <View style={styles.instructionText}>
                        <Text style={styles.instruction}>{currentInstruction}</Text>
                        <Text style={styles.instructionMeta}>{distance} • {eta}</Text>
                    </View>
                </View>
            </SafeAreaView>

            {/* Earnings Badge */}
            <View style={styles.earningsBadge}>
                <Text style={styles.earningsText}>₹{order.earnings.total}</Text>
            </View>

            {/* Map Controls */}
            <View style={styles.mapControls}>
                <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
                    <Icon name="zoom-in" size={20} color="#1A1A2E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
                    <Icon name="zoom-out" size={20} color="#1A1A2E" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.recenterButton]} onPress={handleRecenter}>
                    <Icon name="target" size={20} color="#1A1A2E" />
                </TouchableOpacity>
            </View>

            {/* Bottom Customer Panel */}
            <SafeAreaView style={styles.bottomPanel} edges={['bottom']}>
                <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{order.customer.name}</Text>
                    <Text style={styles.customerLocation}> • {order.customer.address.split(',')[0]}</Text>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                        <Icon name="phone" size={22} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
                        <Icon name="chat" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A2E',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    mapGrid: {
        ...StyleSheet.absoluteFillObject,
    },
    gridLine: {
        position: 'absolute',
        backgroundColor: '#2A2A4E',
    },
    horizontalLine: {
        left: 0,
        right: 0,
        height: 1,
    },
    verticalLine: {
        top: 0,
        bottom: 0,
        width: 1,
    },
    routeLine: {
        position: 'absolute',
        top: '30%',
        left: '20%',
        right: '20%',
        bottom: '40%',
    },
    routeSegment1: {
        position: 'absolute',
        left: '10%',
        top: '60%',
        width: '30%',
        height: 4,
        backgroundColor: '#4A90D9',
        borderRadius: 2,
    },
    routeSegment2: {
        position: 'absolute',
        left: '40%',
        top: '20%',
        width: 4,
        height: '40%',
        backgroundColor: '#4A90D9',
        borderRadius: 2,
    },
    routeSegment3: {
        position: 'absolute',
        left: '40%',
        top: '20%',
        width: '50%',
        height: 4,
        backgroundColor: '#4A90D9',
        borderRadius: 2,
    },
    currentLocationMarker: {
        position: 'absolute',
        bottom: '35%',
        left: '30%',
        alignItems: 'center',
    },
    locationPulse: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(74, 144, 217, 0.2)',
    },
    locationDot: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#4A90D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationArrow: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    destinationMarker: {
        position: 'absolute',
        top: '25%',
        right: '25%',
    },
    destinationPin: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E74C3C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinIcon: {
        fontSize: 20,
    },
    restaurantMarker: {
        position: 'absolute',
        top: '40%',
        left: '50%',
    },
    restaurantPin: {
        width: 30,
        height: 30,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    restaurantIcon: {
        fontSize: 16,
    },
    instructionBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2A2A4E',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    instructionContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    turnIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#3A3A5E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    turnIcon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    instructionText: {
        flex: 1,
    },
    instruction: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
        marginBottom: spacing.xs,
    },
    instructionMeta: {
        ...typography.small,
        color: '#A0A0C0',
    },
    earningsBadge: {
        position: 'absolute',
        top: 120,
        right: spacing.lg,
        backgroundColor: colors.primary,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
    },
    earningsText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
    mapControls: {
        position: 'absolute',
        right: spacing.lg,
        top: '45%',
        gap: spacing.sm,
    },
    controlButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.md,
    },
    recenterButton: {
        marginTop: spacing.sm,
    },
    controlIcon: {
        fontSize: 20,
        color: '#1A1A2E',
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2A2A4E',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
    },
    customerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    customerName: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
    customerLocation: {
        ...typography.body,
        color: '#A0A0C0',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    callButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        fontSize: 22,
    },
});
