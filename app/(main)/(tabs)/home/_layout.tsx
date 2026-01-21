/**
 * GRIHGO Delivery Partner App - Home Tab Layout
 */

import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
