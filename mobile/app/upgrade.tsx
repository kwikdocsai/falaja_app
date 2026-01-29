import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Dimensions } from 'react-native';
import { ArrowLeft, Clock, Zap, Mic, CheckCircle2, Sparkles, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const plans = [
    {
        id: 'starter',
        name: 'Iniciante',
        price: 'Grátis',
        description: 'Perfeito para testar as funcionalidades básicas.',
        features: ['15 min de transcrição/mês', 'Precisão standard', 'Exportar como TXT'],
        popular: false
    },
    {
        id: 'pro',
        name: 'Profissional',
        price: '4.500 Kz',
        description: 'Para quem precisa de poder e rapidez no dia-a-dia.',
        features: ['300 min de transcrição/mês', 'Precisão de IA avançada', 'Identificação de oradores', 'Exportar PDF e DOCX'],
        popular: true
    },
    {
        id: 'basic',
        name: 'Básico',
        price: '2.000 Kz',
        description: 'Ideal para estudantes e uso ocasional.',
        features: ['60 min de transcrição/mês', 'Precisão melhorada', 'Sem anúncios'],
        popular: false
    }
];

export default function UpgradeScreen() {
    const router = useRouter();
    const [period, setPeriod] = useState<'Mensal' | 'Anual'>('Mensal');

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>PLANOS</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <Clock size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>Desbloqueia o Teu Poder</Text>
                        <Text style={styles.heroSubtitle}>
                            Transcreve áudio ilimitado com precisão de IA. Escolhe o plano ideal para ti.
                        </Text>
                    </View>

                    <View style={styles.periodSwitcherContainer}>
                        <View style={styles.periodSwitcher}>
                            <TouchableOpacity
                                onPress={() => setPeriod('Mensal')}
                                style={[styles.periodButton, period === 'Mensal' && styles.periodButtonActive]}
                            >
                                <Text style={[styles.periodButtonText, period === 'Mensal' && styles.periodButtonTextActive]}>
                                    Mensal
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setPeriod('Anual')}
                                style={[styles.periodButton, period === 'Anual' && styles.periodButtonActive]}
                            >
                                <Text style={[styles.periodButtonText, period === 'Anual' && styles.periodButtonTextActive]}>
                                    Anual
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {period === 'Anual' && (
                            <View style={styles.saveBadge}>
                                <Text style={styles.saveBadgeText}>POUPA 20%</Text>
                            </View>
                        )}
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={width * 0.8 + 20}
                        decelerationRate="fast"
                        contentContainerStyle={styles.plansContainer}
                    >
                        {plans.map((plan) => (
                            <View
                                key={plan.id}
                                style={[
                                    styles.planCard,
                                    plan.popular && styles.planCardPopular
                                ]}
                            >
                                {plan.popular && (
                                    <View style={styles.popularTag}>
                                        <Text style={styles.popularTagText}>MAIS POPULAR</Text>
                                    </View>
                                )}

                                <View style={styles.planCardHeader}>
                                    <View style={[
                                        styles.planIconContainer,
                                        plan.popular ? styles.planIconContainerPopular : styles.planIconContainerNormal
                                    ]}>
                                        {plan.popular ? <Zap size={24} color="#fff" /> : <Mic size={24} color="#fff" />}
                                    </View>
                                    <Text style={styles.planName}>{plan.name}</Text>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.planPrice}>{plan.price}</Text>
                                        {plan.price !== 'Grátis' && <Text style={styles.planPeriod}>/mês</Text>}
                                    </View>
                                    <Text style={styles.planDescription}>{plan.description}</Text>
                                </View>

                                <View style={styles.featuresList}>
                                    {plan.features.map((feature, index) => (
                                        <View key={index} style={styles.featureItem}>
                                            <CheckCircle2
                                                size={18}
                                                color={plan.popular ? '#22d3ee' : 'rgba(255, 255, 255, 0.3)'}
                                            />
                                            <Text style={styles.featureText}>{feature}</Text>
                                        </View>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.planButton,
                                        plan.id === 'starter' ? styles.planButtonOutline : styles.planButtonFilled
                                    ]}
                                    onPress={() => plan.id !== 'starter' && router.push('/payment')}
                                >
                                    {plan.popular ? (
                                        <LinearGradient
                                            colors={['#22d3ee', '#3b82f6']}
                                            start={[0, 0]}
                                            end={[1, 0]}
                                            style={styles.planButtonGradient}
                                        >
                                            <Text style={styles.planButtonText}>Atualizar Agora</Text>
                                        </LinearGradient>
                                    ) : (
                                        <Text style={[
                                            styles.planButtonText,
                                            plan.id === 'starter' ? styles.planButtonTextOutline : {}
                                        ]}>
                                            {plan.id === 'starter' ? 'Plano Atual' : 'Atualizar Agora'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.guaranteeCard}>
                        <Star size={20} color="#fbbf24" fill="#fbbf24" />
                        <Text style={styles.guaranteeText}>
                            Garantia de satisfação de 7 dias ou o seu dinheiro de volta.
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
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: 20,
        marginBottom: 32,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 12,
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 20,
    },
    periodSwitcherContainer: {
        alignItems: 'center',
        marginBottom: 40,
        position: 'relative',
    },
    periodSwitcher: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 30,
        padding: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    periodButton: {
        paddingHorizontal: 32,
        paddingVertical: 10,
        borderRadius: 26,
    },
    periodButtonActive: {
        backgroundColor: '#3b82f6',
    },
    periodButtonText: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: 'bold',
    },
    periodButtonTextActive: {
        color: '#fff',
    },
    saveBadge: {
        position: 'absolute',
        top: -15,
        right: width * 0.15,
        backgroundColor: '#22d3ee',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        transform: [{ rotate: '15deg' }],
    },
    saveBadgeText: {
        color: '#0f172a',
        fontSize: 10,
        fontWeight: 'bold',
    },
    plansContainer: {
        paddingHorizontal: 24,
        gap: 20,
    },
    planCard: {
        width: width * 0.8,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 40,
        padding: 32,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
    },
    planCardPopular: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        borderColor: 'rgba(34, 211, 238, 0.3)',
        borderWidth: 2,
    },
    popularTag: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#22d3ee',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderBottomLeftRadius: 20,
    },
    popularTagText: {
        color: '#0f172a',
        fontSize: 10,
        fontWeight: 'bold',
    },
    planCardHeader: {
        marginBottom: 32,
    },
    planIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    planIconContainerNormal: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    planIconContainerPopular: {
        backgroundColor: '#3b82f6',
    },
    planName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 12,
    },
    planPrice: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    planPeriod: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 4,
    },
    planDescription: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
    },
    featuresList: {
        gap: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    featureText: {
        color: '#e2e8f0',
        fontSize: 14,
    },
    planButton: {
        height: 56,
        borderRadius: 20,
        marginTop: 40,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    planButtonFilled: {
        backgroundColor: '#fff',
    },
    planButtonOutline: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    planButtonGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    planButtonText: {
        color: '#0f172a',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    planButtonTextOutline: {
        color: '#64748b',
    },
    guaranteeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        margin: 24,
        marginTop: 40,
        padding: 20,
        borderRadius: 24,
    },
    guaranteeText: {
        flex: 1,
        color: '#64748b',
        fontSize: 12,
        lineHeight: 18,
    },
});
