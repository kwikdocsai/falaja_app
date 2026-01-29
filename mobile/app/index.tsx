import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { storage } from '../services/api';

export default function Index() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                console.log('🔍 Checking auth state...');
                const authRecord = await storage.getItem('falaja_auth');
                console.log('✅ Auth record:', authRecord);

                if (authRecord) {
                    router.replace('/(tabs)/home');
                } else {
                    router.replace('/(auth)/onboarding');
                }
            } catch (e) {
                console.error('❌ Auth error:', e);
                router.replace('/(auth)/onboarding');
            } finally {
                setIsLoading(false);
            }
        }

        // Short delay to ensure router is ready
        const timer = setTimeout(() => {
            checkAuth();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#3b82f6" />
        </View>
    );
}
