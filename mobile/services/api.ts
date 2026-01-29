import AsyncStorage from '@react-native-async-storage/async-storage';

// BASE_URL for API calls. 
// For production, use your Vercel deployment URL.
// For local testing with Expo Go, use your computer's local IP (e.g., http://192.168.1.XX:3000)
export const BASE_URL = 'https://falaja.vercel.app'; // Replace with your actual URL

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    return response;
};

export const storage = {
    getItem: async (key: string) => await AsyncStorage.getItem(key),
    setItem: async (key: string, value: string) => await AsyncStorage.setItem(key, value),
    removeItem: async (key: string) => await AsyncStorage.removeItem(key),
};
