import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Clipboard, Alert } from 'react-native';
import { ArrowLeft, Search, Copy, Play, Folder } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const mockHistory = [
    {
        id: '1',
        title: 'Reunião de Equipa',
        text: 'Focámos nos objetivos do próximo trimestre. A retenção de utilizadores é a nossa prioridade número um para este mês...',
        date: '24 Out, 2023',
        time: '02:14',
        duration: '2m',
        category: 'Business'
    },
    {
        id: '2',
        title: 'Pitch de Marketing Luanda',
        text: 'Começar com um gancho forte sobre a conectividade em Angola. Depois apresentar a nossa solução para as empresas locais...',
        date: '23 Out, 2023',
        time: '05:42',
        duration: '5m',
        category: 'Business'
    },
    {
        id: '3',
        title: 'Nota: Lista de Compras',
        text: 'Leite, ovos, pão e não esquecer as especiarias para o jantar de Sexta-feira. Confirmar se ainda há café em casa...',
        date: '18 Out, 2023',
        time: '01:15',
        duration: '1m',
        category: 'Personal'
    }
];

export default function HistoryScreen() {
    const router = useRouter();
    const [filter, setFilter] = useState('All');

    const filteredHistory = filter === 'All'
        ? mockHistory
        : mockHistory.filter(item => item.category === filter);

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'All': return 'Tudo';
            case 'Business': return 'Negócios';
            case 'Personal': return 'Pessoal';
            case 'Favorites': return 'Favoritos';
            default: return cat;
        }
    };

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        Alert.alert('Copiado', 'Texto copiado para a área de transferência!');
    };

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <ArrowLeft size={24} color="rgba(255, 255, 255, 0.7)" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>HISTÓRICO</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <Search size={24} color="rgba(255, 255, 255, 0.7)" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Text style={styles.heroLabel}>ARQUIVO FALAJÁ</Text>
                        <Text style={styles.heroTitle}>
                            As Tuas {'\n'}
                            <Text style={styles.heroTitleHighlight}>Transcrições</Text>
                        </Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                        {['All', 'Favorites', 'Business', 'Personal'].map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setFilter(cat)}
                                style={[
                                    styles.filterButton,
                                    filter === cat && styles.filterButtonActive
                                ]}
                            >
                                <Text style={[
                                    styles.filterButtonText,
                                    filter === cat && styles.filterButtonTextActive
                                ]}>
                                    {getCategoryLabel(cat)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.listContainer}>
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((item) => (
                                <View key={item.id} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.dateContainer}>
                                            <View style={styles.dateDot} />
                                            <Text style={styles.dateText}>{item.date}</Text>
                                        </View>
                                        <Text style={styles.timeText}>{item.time}</Text>
                                    </View>

                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardPreview} numberOfLines={2}>{item.text}</Text>

                                    <View style={styles.cardFooter}>
                                        <Text style={styles.durationText}>{item.duration} de áudio</Text>
                                        <View style={styles.cardActions}>
                                            <TouchableOpacity
                                                style={styles.actionButton}
                                                onPress={() => copyToClipboard(item.text)}
                                            >
                                                <Copy size={18} color="rgba(255, 255, 255, 0.4)" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.actionButton, styles.playButton]}>
                                                <Play size={18} color="#3b82f6" fill="#3b82f6" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <Folder size={64} color="rgba(255, 255, 255, 0.05)" />
                                <Text style={styles.emptyStateText}>Nenhuma transcrição encontrada nesta categoria.</Text>
                            </View>
                        )}
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
        marginTop: Platform.OS === 'android' ? 20 : 0,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },
    heroSection: {
        marginBottom: 32,
    },
    heroLabel: {
        color: '#22d3ee',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 8,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    heroTitleHighlight: {
        color: '#3b82f6',
    },
    filterContainer: {
        marginBottom: 32,
        flexDirection: 'row',
    },
    filterButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    filterButtonActive: {
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
    },
    filterButtonText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 12,
        fontWeight: 'bold',
    },
    filterButtonTextActive: {
        color: '#fff',
    },
    listContainer: {
        gap: 16,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#3b82f6',
    },
    dateText: {
        color: '#3b82f6',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    timeText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 10,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardPreview: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    durationText: {
        color: 'rgba(255, 255, 255, 0.2)',
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: 1,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyStateText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 16,
    },
});
