import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { ArrowLeft, Bell, Activity, PlusCircle, Wallet, Calendar, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function UsageScreen() {
    const router = useRouter();
    const progress = 62; // Percentage

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>USO DE CRÉDITO</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.usageHero}>
                        <View style={styles.progressContainer}>
                            <View style={styles.circularPlaceholder}>
                                <LinearGradient
                                    colors={['rgba(34, 211, 238, 0.1)', 'rgba(59, 130, 246, 0.1)']}
                                    style={styles.circleOuter}
                                >
                                    <View style={styles.circleInner}>
                                        <Text style={styles.remainingLabel}>RESTANTES</Text>
                                        <View style={styles.valueRow}>
                                            <Text style={styles.remainingValue}>45</Text>
                                            <Text style={styles.remainingUnit}>m</Text>
                                        </View>
                                        <Text style={styles.totalInfo}>De um total de 120 min</Text>
                                    </View>
                                </LinearGradient>

                                {/* Simple visual representation of progress using a border-like effect */}
                                <View style={styles.progressRing}>
                                    <View style={[styles.progressHalf, { transform: [{ rotate: '45deg' }] }]} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.planBadge}>
                            <View style={styles.pulseDot} />
                            <Text style={styles.planBadgeText}>PLANO ATIVO</Text>
                        </View>
                    </View>

                    <View style={styles.statsSection}>
                        <Text style={styles.sectionTitle}>RESUMO DE GASTOS</Text>

                        <View style={styles.statsCard}>
                            <View style={[styles.iconBox, { backgroundColor: 'rgba(34, 211, 238, 0.1)' }]}>
                                <Activity size={24} color="#22d3ee" />
                            </View>
                            <View style={styles.statsInfo}>
                                <Text style={styles.statsLabel}>TRANSCRIÇÕES EFETUADAS</Text>
                                <Text style={styles.statsValue}>75 min</Text>
                            </View>
                            <View style={styles.statsBadge}>
                                <Text style={styles.statsBadgeText}>62%</Text>
                            </View>
                        </View>

                        <View style={styles.statsCard}>
                            <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                                <Wallet size={24} color="#3b82f6" />
                            </View>
                            <View style={styles.statsInfo}>
                                <Text style={styles.statsLabel}>CRÉDITOS ACUMULADOS</Text>
                                <Text style={styles.statsValue}>12 min</Text>
                            </View>
                            <View style={[styles.statsBadge, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                                <Text style={[styles.statsBadgeText, { color: '#3b82f6' }]}>+ BÓNUS</Text>
                            </View>
                        </View>

                        <View style={styles.statsCard}>
                            <View style={[styles.iconBox, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
                                <Calendar size={24} color="#a855f7" />
                            </View>
                            <View style={styles.statsInfo}>
                                <Text style={styles.statsLabel}>PRÓXIMA RENOVAÇÃO</Text>
                                <Text style={styles.statsValue}>24 Nov, 2023</Text>
                            </View>
                            <View style={[styles.statsBadge, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
                                <Text style={[styles.statsBadgeText, { color: '#a855f7' }]}>EM 5 DIAS</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.upgradeButton}
                        activeOpacity={0.8}
                        onPress={() => router.push('/upgrade')}
                    >
                        <LinearGradient
                            colors={['#22d3ee', '#3b82f6']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={styles.upgradeGradient}
                        >
                            <PlusCircle size={24} color="#fff" />
                            <Text style={styles.upgradeButtonText}>Recarregar Créditos</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.tipCard}>
                        <Sparkles size={20} color="#22d3ee" style={styles.tipIcon} />
                        <Text style={styles.tipText}>
                            Sabias que podes ganhar 10 minutos grátis convidando um amigo?
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/referral')}>
                            <Text style={styles.tipAction}>Convidar</Text>
                        </TouchableOpacity>
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
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    usageHero: {
        alignItems: 'center',
        marginVertical: 40,
    },
    progressContainer: {
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    circleOuter: {
        width: 200,
        height: 200,
        borderRadius: 100,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleInner: {
        width: '100%',
        height: '100%',
        borderRadius: 96,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    remainingLabel: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 4,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    remainingValue: {
        color: '#fff',
        fontSize: 64,
        fontWeight: 'bold',
        letterSpacing: -2,
    },
    remainingUnit: {
        color: '#64748b',
        fontSize: 24,
        marginLeft: 4,
    },
    totalInfo: {
        color: '#334155',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 8,
    },
    progressRing: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        borderWidth: 10,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    planBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(34, 211, 238, 0.2)',
        marginTop: 24,
        gap: 8,
    },
    pulseDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22d3ee',
    },
    planBadgeText: {
        color: '#22d3ee',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    statsSection: {
        gap: 12,
        marginBottom: 40,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    statsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 28,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsInfo: {
        flex: 1,
        marginLeft: 16,
    },
    statsLabel: {
        color: '#64748b',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 4,
    },
    statsValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statsBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
    },
    statsBadgeText: {
        color: '#22d3ee',
        fontSize: 10,
        fontWeight: 'bold',
    },
    upgradeButton: {
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        marginBottom: 24,
    },
    upgradeGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    upgradeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        padding: 16,
        borderRadius: 20,
        gap: 12,
    },
    tipIcon: {
        opacity: 0.8,
    },
    tipText: {
        flex: 1,
        color: '#64748b',
        fontSize: 12,
        lineHeight: 18,
    },
    tipAction: {
        color: '#22d3ee',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
