import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Platform, Clipboard, Alert, Share } from 'react-native';
import { ArrowLeft, Copy, Share2, MessageSquare, Globe, Camera, Gift } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function ReferralScreen() {
    const router = useRouter();
    const inviteCode = "FALAJÁ-JOAO";

    const handleCopyCode = () => {
        Clipboard.setString(inviteCode);
        Alert.alert("Sucesso", "Código copiado para a área de transferência!");
    };

    const handleInvite = async () => {
        try {
            await Share.share({
                message: `Usa o meu código ${inviteCode} para ganhares 15 minutos grátis no FalaJá - Transcrição de Áudio com IA! Download aqui: https://falaja.app`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>CONVIDAR AMIGOS</Text>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <View style={styles.giftIconContainer}>
                            <View style={styles.giftPulse} />
                            <Image
                                source={{ uri: 'https://picsum.photos/seed/gift/400/400' }}
                                style={styles.giftImage}
                            />
                        </View>

                        <View style={styles.heroText}>
                            <Text style={styles.heroTitle}>
                                Ganha Minutos <Text style={styles.heroTitleHighlight}>Grátis</Text>
                            </Text>
                            <Text style={styles.heroSubtitle}>
                                Convida os teus amigos para o FalaJá e ambos ganham <Text style={styles.boldText}>15 minutos</Text> de transcrição gratuita após o primeiro carregamento deles.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.codeCard}>
                        <View>
                            <Text style={styles.codeLabel}>O TEU CÓDIGO ÚNICO</Text>
                            <Text style={styles.codeValue}>{inviteCode}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.copyButton}
                            onPress={handleCopyCode}
                        >
                            <Copy size={24} color="#64748b" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.shareSection}>
                        <Text style={styles.shareSectionTitle}>PARTILHAR COM</Text>
                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialItem} onPress={() => Alert.alert('WhatsApp', 'A abrir WhatsApp...')}>
                                <View style={[styles.socialIconBox, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
                                    <MessageSquare size={24} color="#22c55e" />
                                </View>
                                <Text style={styles.socialLabel}>WhatsApp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialItem} onPress={() => Alert.alert('Facebook', 'A abrir Facebook...')}>
                                <View style={[styles.socialIconBox, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
                                    <Globe size={24} color="#2563eb" />
                                </View>
                                <Text style={styles.socialLabel}>Facebook</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialItem} onPress={() => Alert.alert('Instagram', 'A abrir Instagram...')}>
                                <View style={[styles.socialIconBox, { backgroundColor: 'rgba(244, 63, 94, 0.1)' }]}>
                                    <Camera size={24} color="#f43f5e" />
                                </View>
                                <Text style={styles.socialLabel}>Instagram</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.inviteButton}
                        activeOpacity={0.8}
                        onPress={handleInvite}
                    >
                        <LinearGradient
                            colors={['#22d3ee', '#3b82f6']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={styles.inviteGradient}
                        >
                            <Text style={styles.inviteButtonText}>Partilhar Link de Convite</Text>
                            <Share2 size={20} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        marginTop: Platform.OS === 'android' ? 20 : 0,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    heroSection: {
        alignItems: 'center',
        marginVertical: 40,
    },
    giftIconContainer: {
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 32,
    },
    giftPulse: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        transform: [{ scale: 1.2 }],
    },
    giftImage: {
        width: 180,
        height: 180,
        borderRadius: 90,
        zIndex: 1,
    },
    heroText: {
        alignItems: 'center',
        gap: 12,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    heroTitleHighlight: {
        color: '#22d3ee',
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    boldText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    codeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 32,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 40,
    },
    codeLabel: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 4,
    },
    codeValue: {
        color: '#22d3ee',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 4,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    copyButton: {
        width: 56,
        height: 56,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    shareSectionTitle: {
        color: '#334155',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 4,
        marginBottom: 24,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 32,
    },
    socialItem: {
        alignItems: 'center',
        gap: 8,
    },
    socialIconBox: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    socialLabel: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    inviteButton: {
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        marginBottom: 24,
    },
    inviteGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    inviteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
