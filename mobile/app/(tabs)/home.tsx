import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, History, Mic, Copy, Share2, Save, X, User, BarChart2, Diamond, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { transcribeAudio, polishText } from '../../services/openai';
import { storage } from '../../services/api';

export default function Home() {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcription, setTranscription] = useState<string[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);

    const scrollViewRef = useRef<ScrollView>(null);
    const router = useRouter();

    useEffect(() => {
        // Request permissions
        async function getPermissions() {
            const response = await Audio.requestPermissionsAsync();
            if (response.status !== 'granted') {
                Alert.alert('Permissão necessária', 'Precisamos de acesso ao microfone para transcrever o seu áudio.');
            }
        }
        getPermissions();
    }, []);

    const startRecording = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
        } catch (err) {
            console.error('Failed to start recording', err);
            Alert.alert('Erro', 'Não foi possível iniciar a gravação.');
        }
    };

    const stopRecording = async () => {
        if (!recording) return;

        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        if (uri) {
            processAudio(uri);
        }
    };

    const processAudio = async (uri: string) => {
        setIsProcessing(true);
        setTranscription(prev => [...prev, "A processar áudio..."]);

        try {
            const text = await transcribeAudio(uri);
            const polished = await polishText(text);

            setTranscription(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1] = polished;
                return newArr;
            });

            // Simple copy to and scroll
            setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
        } catch (err: any) {
            console.error(err);
            setTranscription(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1] = `❌ ${err.message || 'Erro na transcrição'}`;
                return newArr;
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLogout = async () => {
        await storage.removeItem('falaja_auth');
        router.replace('/(auth)/login');
    };

    return (
        <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={styles.iconButton}>
                        <Menu size={24} color="#94a3b8" />
                    </TouchableOpacity>

                    <View style={styles.logoRow}>
                        <Text style={styles.logoText}>FALA<Text style={styles.accent}>JÁ</Text></Text>
                        <View style={[styles.statusDot, { backgroundColor: isRecording ? '#ef4444' : '#22c55e' }]} />
                    </View>

                    <TouchableOpacity onPress={() => router.push('/(tabs)/history')} style={styles.iconButton}>
                        <History size={24} color="#94a3b8" />
                    </TouchableOpacity>
                </View>

                <View style={styles.main}>
                    <View style={styles.statusBadgeContainer}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>
                                {isRecording ? 'Gravando Áudio...' : isProcessing ? 'Processando IA...' : 'Pronto para Transcrever'}
                            </Text>
                        </View>
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.transcriptScroll}
                        contentContainerStyle={styles.transcriptContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {transcription.length === 0 ? (
                            <Text style={styles.placeholderText}>
                                Mantenha pressionado o microfone para falar...
                            </Text>
                        ) : (
                            transcription.map((t, idx) => (
                                <Text
                                    key={idx}
                                    style={[
                                        styles.transcriptText,
                                        idx === transcription.length - 1 ? styles.activeTranscript : styles.oldTranscript
                                    ]}
                                >
                                    {t}
                                </Text>
                            ))
                        )}
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <View style={styles.micContainer}>
                        <View style={[styles.micGlow, { backgroundColor: isRecording ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.1)' }]} />
                        <TouchableOpacity
                            onPressIn={startRecording}
                            onPressOut={stopRecording}
                            activeOpacity={0.8}
                            style={[styles.micButton, { backgroundColor: isRecording ? '#ef4444' : '#3b82f6' }]}
                        >
                            <Mic size={32} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.micHint}>
                            {isRecording ? 'Solte para Finalizar' : 'Segure para Falar'}
                        </Text>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.actionIconBg}><Copy size={18} color="#94a3b8" /></View>
                            <Text style={styles.actionText}>Copiar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.actionIconBg}><Share2 size={18} color="#94a3b8" /></View>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.actionIconBg}><Save size={18} color="#94a3b8" /></View>
                            <Text style={styles.actionText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Sidebar Menu Modal */}
                {isMenuOpen && (
                    <View style={styles.menuOverlay}>
                        <TouchableOpacity style={styles.overlayClose} onPress={() => setIsMenuOpen(false)} />
                        <View style={styles.menuContent}>
                            <View style={styles.menuHeader}>
                                <Text style={styles.menuLogo}>FALA<Text style={styles.accent}>JÁ</Text></Text>
                                <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                                    <X size={24} color="#94a3b8" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.menuNav}>
                                <TouchableOpacity style={styles.menuItem} onPress={() => { router.push('/(tabs)/profile'); setIsMenuOpen(false); }}>
                                    <User size={20} color="#6366f1" />
                                    <Text style={styles.menuItemText}>Meu Perfil</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem} onPress={() => { router.push('/(tabs)/usage'); setIsMenuOpen(false); }}>
                                    <BarChart2 size={20} color="#6366f1" />
                                    <Text style={styles.menuItemText}>Uso de Créditos</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.menuItem, styles.premiumItem]}>
                                    <Diamond size={20} color="#3b82f6" />
                                    <Text style={[styles.menuItemText, { color: 'white' }]}>Upgrade Premium</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <LogOut size={20} color="#ef4444" />
                                <Text style={styles.logoutText}>Sair do FalaJá</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        marginBottom: 40,
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 20,
    },
    logoRow: { alignItems: 'center' },
    logoText: { color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 4 },
    accent: { color: '#3b82f6' },
    statusDot: { width: 6, height: 6, borderRadius: 3, marginTop: 4 },

    main: { flex: 1, paddingHorizontal: 24 },
    statusBadgeContainer: { alignItems: 'center', marginBottom: 24 },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    statusBadgeText: { color: '#3b82f6', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },

    transcriptScroll: { flex: 1 },
    transcriptContent: { paddingBottom: 20 },
    placeholderText: { fontSize: 28, color: 'rgba(148, 163, 184, 0.3)', textAlign: 'center', marginTop: 40, lineHeight: 40 },
    transcriptText: { fontSize: 28, lineHeight: 40, marginBottom: 24 },
    activeTranscript: { color: 'white' },
    oldTranscript: { color: 'rgba(148, 163, 184, 0.3)' },

    footer: { paddingHorizontal: 24, paddingBottom: 40, alignItems: 'center' },
    micContainer: { alignItems: 'center', marginBottom: 48, position: 'relative' },
    micGlow: { position: 'absolute', width: 160, height: 160, borderRadius: 80, top: -45 },
    micButton: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
    micHint: { color: '#64748b', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, marginTop: 16 },

    actionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 16 },
    actionButton: { flex: 1, alignItems: 'center' },
    actionIconBg: { width: 44, height: 44, backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    actionText: { color: '#64748b', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },

    menuOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100 },
    overlayClose: { flex: 1 },
    menuContent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 280, backgroundColor: '#020617', padding: 32, borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.1)' },
    menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
    menuLogo: { color: 'white', fontSize: 20, fontWeight: 'bold', letterSpacing: 4 },
    menuNav: { flex: 1, gap: 20 },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16 },
    premiumItem: { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59,130,246,0.3)', borderWidth: 1 },
    menuItemText: { color: '#94a3b8', fontWeight: '500', fontSize: 16 },
    logoutButton: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
    logoutText: { color: '#64748b', fontWeight: '500' },
});
