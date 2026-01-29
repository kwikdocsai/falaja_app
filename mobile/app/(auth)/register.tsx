import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, User, Mail, Smartphone, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen() {
    const router = useRouter();

    const handleRegister = () => {
        alert("Conta criada com sucesso! Por favor, faça login.");
        router.push('/login');
    };

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <ArrowLeft size={24} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepTitle}>Passo 01/02</Text>
                            <Text style={styles.stepSubtitle}>Informações Pessoais</Text>
                        </View>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <LinearGradient
                            colors={['#22d3ee', '#3b82f6']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={styles.progressBar}
                        />
                    </View>

                    <View style={styles.main}>
                        <Text style={styles.title}>
                            Junte-se ao{'\n'}
                            <Text style={styles.titleHighlight}>FalaJá Premium</Text>
                        </Text>
                        <Text style={styles.description}>
                            Experiência de transcrição AI de última geração. Crie sua identidade digital agora.
                        </Text>

                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>NOME COMPLETO</Text>
                                <View style={styles.inputContainer}>
                                    <User size={20} color="rgba(255, 255, 255, 0.4)" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Ex: João Baptista"
                                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>EMAIL CORPORATIVO</Text>
                                <View style={styles.inputContainer}>
                                    <Mail size={20} color="rgba(255, 255, 255, 0.4)" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="nome@empresa.com"
                                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                        style={styles.input}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>TELEMÓVEL</Text>
                                <View style={styles.phoneInputRow}>
                                    <View style={styles.countryCode}>
                                        <Text style={styles.flag}>🇦🇴</Text>
                                        <Text style={styles.code}>+244</Text>
                                    </View>
                                    <TextInput
                                        placeholder="9XX XXX XXX"
                                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                        style={[styles.input, styles.phoneInput]}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.checkboxContainer} activeOpacity={0.7}>
                                <View style={styles.checkbox}>
                                    <Check size={14} color="#3b82f6" />
                                </View>
                                <Text style={styles.checkboxLabel}>
                                    Concordo com os <Text style={styles.link}>Termos de Serviço</Text> e reconheço a Política de Privacidade.
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.submitButton} onPress={handleRegister} activeOpacity={0.8}>
                            <LinearGradient
                                colors={['#22d3ee', '#3b82f6']}
                                start={[0, 0]}
                                end={[1, 0]}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.submitButtonText}>CRIAR CONTA</Text>
                                <ArrowRight size={20} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.loginLinkContainer}>
                            <Text style={styles.loginLinkText}>Já é membro?</Text>
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text style={styles.loginLinkAction}>Entrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: Platform.OS === 'android' ? 20 : 0,
    },
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    stepContainer: {
        alignItems: 'flex-end',
    },
    stepTitle: {
        color: '#22d3ee',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    stepSubtitle: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 12,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#1e293b',
        borderRadius: 3,
        marginBottom: 40,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        width: '50%',
        borderRadius: 3,
    },
    main: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 40,
        marginBottom: 8,
    },
    titleHighlight: {
        color: '#22d3ee',
    },
    description: {
        color: '#94a3b8',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 32,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    phoneInputRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        height: 56,
        overflow: 'hidden',
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRightWidth: 1,
        borderRightColor: 'rgba(255, 255, 255, 0.05)',
        gap: 8,
    },
    flag: {
        fontSize: 20,
    },
    code: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    phoneInput: {
        paddingHorizontal: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    checkboxLabel: {
        color: '#64748b',
        fontSize: 12,
        flex: 1,
        lineHeight: 18,
    },
    link: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
    footer: {
        marginTop: 40,
        paddingBottom: 24,
    },
    submitButton: {
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#22d3ee',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    gradientButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        gap: 8,
    },
    loginLinkText: {
        color: '#64748b',
        fontSize: 14,
    },
    loginLinkAction: {
        color: '#22d3ee',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
