/**
 * GRIHGO Delivery Partner App - Orders Tab Layout
 */

import { Stack } from 'expo-router';

export default function OrdersLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
