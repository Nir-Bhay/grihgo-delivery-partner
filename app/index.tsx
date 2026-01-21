/**
 * GRIHGO Delivery Partner App - Entry Point
 * Redirects to auth or main app using Redirect component
 */

import { Redirect } from 'expo-router';

export default function Index() {
    // Use Redirect component instead of router.replace()
    // This is the correct pattern for expo-router
    return <Redirect href="/(auth)/login" />;
}
