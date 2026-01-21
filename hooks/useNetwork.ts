/**
 * GRIHGO Delivery Partner App - Network Hook
 * Detect online/offline status
 */

import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface NetworkStatus {
    isConnected: boolean;
    isInternetReachable: boolean | null;
    type: string;
}

export function useNetwork(): NetworkStatus {
    const [status, setStatus] = useState<NetworkStatus>({
        isConnected: true,
        isInternetReachable: true,
        type: 'unknown',
    });

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            setStatus({
                isConnected: state.isConnected ?? false,
                isInternetReachable: state.isInternetReachable,
                type: state.type,
            });
        });

        // Check initial status
        NetInfo.fetch().then((state) => {
            setStatus({
                isConnected: state.isConnected ?? false,
                isInternetReachable: state.isInternetReachable,
                type: state.type,
            });
        });

        return () => unsubscribe();
    }, []);

    return status;
}

export function useIsOnline(): boolean {
    const { isConnected, isInternetReachable } = useNetwork();
    return isConnected && (isInternetReachable ?? true);
}
