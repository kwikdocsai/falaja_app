import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const steps = [
    {
        title: "Clica e Fala",
        desc: "Transcreve o teu áudio instantaneamente com a melhor tecnologia de IA do mercado.",
        img: "https://picsum.photos/seed/mic/400/400",
    },
    {
        title: "Edita e Melhora",
        desc: "Usa a nossa IA para corrigir gramática, resumir reuniões ou mudar o tom do teu texto.",
        img: "https://picsum.photos/seed/brain/400/400",
    },
    {
        title: "Partilha Rápida",
        desc: "Envia os teus textos corrigidos para o WhatsApp, E-mail ou copia para qualquer aplicação.",
        img: "https://picsum.photos/seed/share/400/400",
    }
];

export default function Onboarding() {
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (current < steps.length - 1) {
            setCurrent(current + 1);
        } else {
            router.push('/(auth)/login');
        }
    };

    return (
        <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text style={styles.skipText}>Saltar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.main}>
                    <View style={styles.imageContainer}>
                        <View style={styles.glow} />
                        <Image
                            source={{ uri: steps[current].img }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{steps[current].title}</Text>
                        <Text style={styles.desc}>{steps[current].desc}</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.pagination}>
                        {steps.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i === current ? styles.activeDot : null
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={handleNext}
                        style={styles.button}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#3b82f6', '#4f46e5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.buttonText}>
                                {current === steps.length - 1 ? 'Começar Agora' : 'Próximo'}
                            </Text>
                            <ArrowRight size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
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
        paddingHorizontal: 24,
        paddingTop: 20,
        alignItems: 'flex-end',
    },
    skipText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        fontWeight: '500',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 48,
        width: 240,
        height: 240,
    },
    glow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderRadius: 120,
        transform: [{ scale: 1.2 }],
        opacity: 0.5,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.9,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
    },
    desc: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 48,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 48,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    activeDot: {
        width: 32,
        backgroundColor: '#3b82f6',
    },
    button: {
        width: '100%',
        height: 56,
    },
    gradientButton: {
        flex: 1,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
