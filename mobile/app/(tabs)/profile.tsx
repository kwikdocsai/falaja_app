import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Platform } from 'react-native';
import { ArrowLeft, MoreHorizontal, Diamond, Mic, Share2, Bolt, User, Shield, Bell, Gift, LogOut, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const mockUser = {
    name: "João Silva",
    phone: "+244 923 000 000",
    plan: 'Pro',
    creditsRemaining: 45,
    creditsTotal: 120,
    stats: {
        minutes: 124,
        shares: 45,
        savedHours: 2
    }
};

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>MEU PERFIL</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <MoreHorizontal size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileHero}>
                        <View style={styles.avatarOuter}>
                            <LinearGradient
                                colors={['#22d3ee', '#3b82f6']}
                                style={styles.avatarGradient}
                            >
                                <View style={styles.avatarInner}>
                                    <Image
                                        source={{ uri: 'https://picsum.photos/seed/user/200/200' }}
                                        style={styles.avatarImage}
                                    />
                                </View>
                            </LinearGradient>
                            <View style={styles.onlineBadge} />
                        </View>
                        <Text style={styles.userName}>{mockUser.name}</Text>
                        <Text style={styles.userPhone}>{mockUser.phone}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.planCard}
                        onPress={() => router.push('/usage')}
                        activeOpacity={0.9}
                    >
                        <View style={styles.planCardContent}>
                            <View>
                                <Text style={styles.planLabel}>PLANO ATUAL</Text>
                                <View style={styles.planNameRow}>
                                    <Text style={styles.planName}>FalaJá Pro</Text>
                                    <View style={styles.proBadge}>
                                        <Text style={styles.proBadgeText}>PRO</Text>
                                    </View>
                                </View>
                                <Text style={styles.planRenewal}>Renova em 12 Nov, 2023</Text>
                            </View>
                            <View style={styles.planIconContainer}>
                                <Diamond size={24} color="#3b82f6" fill="rgba(59, 130, 246, 0.2)" />
                            </View>
                        </View>
                        <View style={styles.planDecoration} />
                    </TouchableOpacity>

                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Mic size={20} color="#3b82f6" />
                            <Text style={styles.statValue}>{mockUser.stats.minutes}</Text>
                            <Text style={styles.statLabel}>MINUTOS</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Share2 size={20} color="#a78bfa" />
                            <Text style={styles.statValue}>{mockUser.stats.shares}</Text>
                            <Text style={styles.statLabel}>PARTILHAS</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Bolt size={20} color="#fbbf24" />
                            <Text style={styles.statValue}>{mockUser.stats.savedHours}h</Text>
                            <Text style={styles.statLabel}>POUPADAS</Text>
                        </View>
                    </View>

                    <View style={styles.menuSection}>
                        <Text style={styles.menuSectionTitle}>GERAL</Text>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={styles.menuIconContainer}>
                                    <User size={20} color="#94a3b8" />
                                </View>
                                <Text style={styles.menuItemLabel}>Editar Perfil</Text>
                            </View>
                            <ChevronRight size={18} color="#334155" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={styles.menuIconContainer}>
                                    <Shield size={20} color="#94a3b8" />
                                </View>
                                <Text style={styles.menuItemLabel}>Segurança</Text>
                            </View>
                            <ChevronRight size={18} color="#334155" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={styles.menuIconContainer}>
                                    <Bell size={20} color="#94a3b8" />
                                </View>
                                <Text style={styles.menuItemLabel}>Notificações</Text>
                            </View>
                            <ChevronRight size={18} color="#334155" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/referral')}>
                            <View style={styles.menuItemLeft}>
                                <View style={styles.menuIconContainer}>
                                    <Gift size={20} color="#94a3b8" />
                                </View>
                                <Text style={styles.menuItemLabel}>Convidar Amigos</Text>
                            </View>
                            <ChevronRight size={18} color="#334155" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.logoutButton}>
                        <LogOut size={20} color="#ef4444" />
                        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
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
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    profileHero: {
        alignItems: 'center',
        marginVertical: 32,
    },
    avatarOuter: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarGradient: {
        width: 128,
        height: 128,
        borderRadius: 64,
        padding: 4,
    },
    avatarInner: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        backgroundColor: '#0f172a',
        padding: 2,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 58,
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#22c55e',
        borderWidth: 3,
        borderColor: '#0f172a',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    userPhone: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: '500',
    },
    planCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 32,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 32,
    },
    planCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    },
    planLabel: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    planNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    planName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    proBadge: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        backgroundColor: '#3b82f6',
    },
    proBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    planRenewal: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 4,
    },
    planIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    planDecoration: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 24,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    statValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statLabel: {
        color: '#64748b',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 4,
    },
    menuSection: {
        gap: 12,
        marginBottom: 32,
    },
    menuSectionTitle: {
        color: '#64748b',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 4,
        marginLeft: 4,
    },
    menuItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 24,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 16,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemLabel: {
        color: '#e2e8f0',
        fontSize: 14,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 56,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        marginBottom: 40,
    },
    logoutButtonText: {
        color: '#ef4444',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
