import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Fingerprint, User, Lock, Eye, ArrowRight, Chrome, Apple } from 'lucide-react-native';
import { storage } from '../../services/api';

export default function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        // Simple mock login logic matching web
        await storage.setItem('falaja_auth', 'true');
        router.replace('/(tabs)/home');
    };

    return (
        <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoBox}>
                                    <Fingerprint size={32} color="#3b82f6" />
                                </View>
                            </View>
                            <Text style={styles.logoText}>FALA<Text style={styles.accent}>JÁ</Text></Text>
                            <Text style={styles.subtitle}>Premium Voice Intelligence</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Identidade</Text>
                                <View style={styles.inputWrapper}>
                                    <User size={20} color="#94a3b8" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="ID de Utilizador"
                                        placeholderTextColor="rgba(255,255,255,0.2)"
                                        style={styles.input}
                                        value={userId}
                                        onChangeText={setUserId}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Código de Acesso</Text>
                                <View style={styles.inputWrapper}>
                                    <Lock size={20} color="#94a3b8" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="••••••••"
                                        placeholderTextColor="rgba(255,255,255,0.2)"
                                        style={styles.input}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                        <Eye size={20} color={showPassword ? "#3b82f6" : "#94a3b8"} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.forgotRow}>
                                <TouchableOpacity style={styles.checkboxRow}>
                                    <View style={styles.checkbox} />
                                    <Text style={styles.checkboxLabel}>Memorizar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.forgotText}>Recuperar Acesso</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={handleLogin} style={styles.loginButton} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={['#3b82f6', '#4f46e5']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>INICIALIZAR</Text>
                                    <ArrowRight size={18} color="white" />
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.dividerRow}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>Sincronizar com</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.socialRow}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Chrome size={24} color="#94a3b8" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Apple size={24} color="#94a3b8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={styles.registerLink}>
                            <Text style={styles.footerText}>
                                Novo na plataforma? <Text style={styles.accentText}>Criar Conta</Text>
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logoBox: {
        width: 64,
        height: 64,
        backgroundColor: '#020617',
        borderRadius: 20,
        transform: [{ rotate: '45deg' }],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.2)',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 8,
    },
    accent: {
        color: '#3b82f6',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 10,
        color: 'rgba(199, 210, 254, 0.5)',
        fontWeight: '500',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    formContainer: {
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        borderRadius: 32,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'rgba(165, 180, 252, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
        paddingLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        height: 52,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 14,
    },
    eyeIcon: {
        padding: 8,
    },
    forgotRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginRight: 8,
    },
    checkboxLabel: {
        fontSize: 12,
        color: 'rgba(199, 210, 254, 0.5)',
    },
    forgotText: {
        fontSize: 12,
        color: 'rgba(59, 130, 246, 0.7)',
    },
    loginButton: {
        height: 52,
        marginBottom: 24,
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    dividerText: {
        fontSize: 9,
        color: 'rgba(165, 180, 252, 0.2)',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginHorizontal: 16,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 12,
    },
    socialButton: {
        flex: 1,
        height: 52,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerLink: {
        marginTop: 32,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(165, 180, 252, 0.4)',
        fontSize: 12,
    },
    accentText: {
        color: '#3b82f6',
        fontWeight: 'bold',
    },
});
