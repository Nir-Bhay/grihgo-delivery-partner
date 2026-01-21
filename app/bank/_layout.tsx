import { Stack } from 'expo-router';
export default function BankLayout() {
    return <Stack screenOptions={{ headerShown: false }}><Stack.Screen name="index" /></Stack>;
}
