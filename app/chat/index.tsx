/**
 * GRIHGO Delivery Partner App - Chat/Support Screen
 */

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { logger } from '@/utils/logger';

const TAG = 'ChatScreen';

const mockMessages = [
    { id: '1', type: 'bot', text: 'Hi! How can we help you today?', time: '10:30 AM' },
    { id: '2', type: 'user', text: 'I have an issue with my last order payment', time: '10:31 AM' },
    { id: '3', type: 'bot', text: 'I understand. Let me check your recent orders. Can you share the order ID?', time: '10:31 AM' },
];

const quickReplies = ['Order Issue', 'Payment Help', 'Document Update', 'Other'];

export default function ChatScreen() {
    const [messages, setMessages] = useState(mockMessages);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleSend = () => {
        if (!inputText.trim()) return;

        logger.action(TAG, 'sendMessage', { text: inputText });
        setMessages([...messages, {
            id: Date.now().toString(),
            type: 'user',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
        setInputText('');

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                text: 'Thanks for your message! A support agent will get back to you shortly.',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }]);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>Support Chat</Text>
                    <Text style={styles.headerStatus}>🟢 Online</Text>
                </View>
                <View style={styles.placeholder} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            style={[styles.messageBubble, msg.type === 'user' ? styles.userBubble : styles.botBubble]}
                        >
                            <Text style={[styles.messageText, msg.type === 'user' && styles.userText]}>{msg.text}</Text>
                            <Text style={[styles.messageTime, msg.type === 'user' && styles.userTime]}>{msg.time}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Quick Replies */}
                <View style={styles.quickReplies}>
                    {quickReplies.map((reply) => (
                        <TouchableOpacity key={reply} style={styles.quickReply} onPress={() => setInputText(reply)}>
                            <Text style={styles.quickReplyText}>{reply}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.light.textMuted}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendIcon}>➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.light.background },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
        borderBottomWidth: 1, borderBottomColor: colors.light.divider,
    },
    backArrow: { fontSize: 24, color: colors.light.textPrimary },
    headerInfo: { alignItems: 'center' },
    headerTitle: { ...typography.h4, color: colors.light.textPrimary },
    headerStatus: { ...typography.tiny, color: colors.success },
    placeholder: { width: 24 },

    keyboardView: { flex: 1 },
    messages: { flex: 1, paddingHorizontal: spacing.xl },
    messagesContent: { paddingVertical: spacing.lg },

    messageBubble: { maxWidth: '80%', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.sm },
    botBubble: { backgroundColor: colors.light.surfaceSecondary, alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
    userBubble: { backgroundColor: colors.primary, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
    messageText: { ...typography.body, color: colors.light.textPrimary },
    userText: { color: 'white' },
    messageTime: { ...typography.tiny, color: colors.light.textMuted, marginTop: spacing.xs },
    userTime: { color: 'rgba(255,255,255,0.7)' },

    quickReplies: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm },
    quickReply: { backgroundColor: colors.light.surface, borderWidth: 1, borderColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
    quickReplyText: { ...typography.small, color: colors.primary },

    inputContainer: { flexDirection: 'row', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.light.divider },
    input: { flex: 1, backgroundColor: colors.light.surfaceSecondary, borderRadius: borderRadius.full, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, ...typography.body, color: colors.light.textPrimary },
    sendButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginLeft: spacing.sm },
    sendIcon: { color: 'white', fontSize: 18 },
});
