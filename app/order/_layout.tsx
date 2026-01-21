/**
 * GRIHGO Delivery Partner App - Order Flow Layout
 */

import { Stack } from 'expo-router';

export default function OrderLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="active" />
            <Stack.Screen name="confirm" />
            <Stack.Screen name="complete" />
        </Stack>
    );
}
