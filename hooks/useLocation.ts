/**
 * GRIHGO Delivery Partner App - Location Hook
 * Location permission handling and GPS access
 */

import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface LocationStatus {
    granted: boolean;
    loading: boolean;
    error: string | null;
    location: Location.LocationObject | null;
}

export function useLocation() {
    const [status, setStatus] = useState<LocationStatus>({
        granted: false,
        loading: true,
        error: null,
        location: null,
    });

    const requestPermission = async () => {
        setStatus(prev => ({ ...prev, loading: true, error: null }));

        try {
            const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

            if (foregroundStatus !== 'granted') {
                setStatus({
                    granted: false,
                    loading: false,
                    error: 'Location permission denied',
                    location: null,
                });
                return false;
            }

            // Get current location
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setStatus({
                granted: true,
                loading: false,
                error: null,
                location,
            });

            return true;
        } catch (error) {
            setStatus({
                granted: false,
                loading: false,
                error: 'Failed to get location',
                location: null,
            });
            return false;
        }
    };

    const checkPermission = async () => {
        try {
            const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
            setStatus(prev => ({
                ...prev,
                granted: foregroundStatus === 'granted',
                loading: false,
            }));
        } catch {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        checkPermission();
    }, []);

    return {
        ...status,
        requestPermission,
        checkPermission,
    };
}

// Get formatted address from coordinates
export async function getAddressFromCoords(
    latitude: number,
    longitude: number
): Promise<string> {
    try {
        const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (result) {
            return `${result.street || ''} ${result.city || ''}, ${result.region || ''}`.trim();
        }
        return 'Unknown location';
    } catch {
        return 'Unknown location';
    }
}
