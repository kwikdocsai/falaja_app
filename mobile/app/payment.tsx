import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Clipboard, Alert } from 'react-native';
import { ArrowLeft, CreditCard, Smartphone, CheckCircle, Copy, Receipt, Send, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
    const router = useRouter();
    const [isDone, setIsDone] = useState(false);
    const [hasFile, setHasFile] = useState(false);

    const copyToClipboard = (text: string, label: string) => {
        Clipboard.setString(text);
        Alert.alert('Copiado', `${label} copiado para a área de transferência!`);
    };

    const handleSend = () => {
        if (!hasFile) {
            Alert.alert("Erro", "Por favor, anexe o comprovativo da transferência primeiro.");
            return;
        }
        setIsDone(true);
    };

    if (isDone) {
        return (
            <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
                <SafeAreaView style={styles.successContainer}>
                    <View style={styles.successIconContainer}>
                        <View style={styles.successIconPulse} />
                        <View style={styles.successIconCircle}>
                            <Check size={80} color="#22d3ee" strokeWidth={3} />
                        </View>
                    </View>
                    <Text style={styles.successTitle}>Sucesso!</Text>
                    <Text style={styles.successSubtitle}>
                        O seu comprovativo foi recebido. O saldo será atualizado em instantes.
                    </Text>
                    <View style={styles.protocolBadge}>
                        <Text style={styles.protocolText}>
                            Protocolo: <Text style={styles.protocolId}>#MCX-9921-A</Text>
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => router.replace('/(tabs)/home')}
                    >
                        <LinearGradient
                            colors={['#22d3ee', '#3b82f6']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={styles.homeButtonGradient}
                        >
                            <Text style={styles.homeButtonText}>Voltar ao Início</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>PAGAMENTO MCX</Text>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.paymentInfo}>
                        <Text style={styles.valueLabel}>VALOR DA RECARGA</Text>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueAmount}>12.000</Text>
                            <Text style={styles.valueCurrency}>AOA</Text>
                        </View>
                    </View>

                    <View style={styles.detailsCard}>
                        <View style={styles.detailsCardHeader}>
                            <View style={styles.detailsHeaderLeft}>
                                <CreditCard size={18} color="#f97316" />
                                <Text style={styles.detailsHeaderTitle}>DADOS PARA PAGAMENTO</Text>
                            </View>
                            <View style={styles.expressBadge}>
                                <Text style={styles.expressBadgeText}>EXPRESS</Text>
                            </View>
                        </View>

                        <View style={styles.detailsBody}>
                            <View style={styles.detailItem}>
                                <View style={styles.detailIconBox}>
                                    <Smartphone size={24} color="#3b82f6" />
                                </View>
                                <View style={styles.detailInfo}>
                                    <Text style={styles.detailValue}>923 000 000</Text>
                                    <Text style={styles.detailLabel}>ENTIDADE / TELEFONE</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.copyButton}
                                    onPress={() => copyToClipboard('923000000', 'Número')}
                                >
                                    <Copy size={20} color="#64748b" />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.detailItem, styles.detailItemLast]}>
                                <View style={[styles.detailIconBox, { backgroundColor: 'rgba(34, 211, 238, 0.1)' }]}>
                                    <CheckCircle size={24} color="#22d3ee" />
                                </View>
                                <View style={styles.detailInfo}>
                                    <Text style={styles.detailValue}>FALAJÁ-RECARGAS</Text>
                                    <Text style={styles.detailLabel}>REFERÊNCIA / DESTINO</Text>
                                </View>
                                <CheckCircle size={24} color="#22d3ee" fill="rgba(34, 211, 238, 0.2)" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.uploadSection}>
                        <Text style={styles.sectionStep}>PASSO 2: ANEXAR COMPROVATIVO</Text>

                        <TouchableOpacity
                            style={[
                                styles.uploadButton,
                                hasFile && styles.uploadButtonActive
                            ]}
                            onPress={() => setHasFile(!hasFile)}
                        >
                            <View style={[
                                styles.uploadIconBox,
                                hasFile ? styles.uploadIconBoxActive : styles.uploadIconBoxNormal
                            ]}>
                                {hasFile ? <Receipt size={32} color="#22d3ee" /> : <Send size={32} color="#3b82f6" />}
                            </View>
                            <Text style={styles.uploadTitle}>
                                {hasFile ? 'Comprovativo Anexado' : 'Carregar Comprovativo'}
                            </Text>
                            <Text style={styles.uploadSubtitle}>
                                {hasFile ? 'Toque para remover' : 'Formatos: JPG, PNG ou PDF'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                !hasFile && styles.submitButtonDisabled
                            ]}
                            onPress={handleSend}
                            disabled={!hasFile}
                        >
                            <LinearGradient
                                colors={hasFile ? ['#22d3ee', '#3b82f6'] : ['#1e293b', '#1e293b']}
                                start={[0, 0]}
                                end={[1, 0]}
                                style={styles.submitGradient}
                            >
                                <Text style={styles.submitButtonText}>VALIDAR RECARGA</Text>
                                <Send size={18} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={styles.automaticNote}>
                            PROCESSAMENTO AUTOMÁTICO 24/7
                        </Text>
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
    paymentInfo: {
        alignItems: 'center',
        marginVertical: 32,
    },
    valueLabel: {
        color: '#22d3ee',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 3,
        opacity: 0.7,
        marginBottom: 8,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    valueAmount: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
        letterSpacing: -1,
    },
    valueCurrency: {
        color: '#64748b',
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 8,
    },
    detailsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 40,
    },
    detailsCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    detailsHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailsHeaderTitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    expressBadge: {
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    expressBadgeText: {
        color: '#22d3ee',
        fontSize: 9,
        fontWeight: 'bold',
    },
    detailsBody: {
        padding: 24,
        gap: 24,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    detailItemLast: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        paddingTop: 24,
    },
    detailIconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailInfo: {
        flex: 1,
    },
    detailValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailLabel: {
        color: '#64748b',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 2,
    },
    copyButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadSection: {
        gap: 16,
    },
    sectionStep: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginLeft: 8,
        marginBottom: 4,
    },
    uploadButton: {
        width: '100%',
        height: 180,
        borderRadius: 40,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    uploadButtonActive: {
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.05)',
    },
    uploadIconBox: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    uploadIconBoxNormal: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    uploadIconBoxActive: {
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
    },
    uploadTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    uploadSubtitle: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 4,
    },
    submitButton: {
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        marginTop: 12,
    },
    submitButtonDisabled: {
        opacity: 0.4,
    },
    submitGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    automaticNote: {
        textAlign: 'center',
        color: '#334155',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginTop: 12,
    },
    successContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    successIconContainer: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 32,
    },
    successIconPulse: {
        position: 'absolute',
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
    },
    successIconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: 'rgba(34, 211, 238, 0.3)',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    successSubtitle: {
        fontSize: 18,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 40,
    },
    protocolBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
        marginBottom: 48,
    },
    protocolText: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: '500',
    },
    protocolId: {
        color: '#fff',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        letterSpacing: 1,
    },
    homeButton: {
        width: '100%',
        height: 60,
        borderRadius: 20,
        overflow: 'hidden',
    },
    homeButtonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
