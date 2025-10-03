import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Card, Avatar, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

const AIChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Nutrition Assistant. I can help you with:\n\n• Recipe recommendations\n• Nutrition questions\n• Dietary advice for health conditions\n• Meal planning tips\n\nWhat would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickQuestions = [
    "I have diabetes, what can I eat?",
    "Suggest a healthy breakfast recipe",
    "How many calories should I eat daily?",
    "What foods are high in protein?",
    "Is this food safe for my allergies?",
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Thinking...',
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputText('');
    setIsLoading(true);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Simulate API call to ChatGPT
      const response = await simulateChatGPTResponse(inputText.trim());
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== loadingMessage.id);
        const aiMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: response,
          isUser: false,
          timestamp: new Date(),
        };
        return [...filtered, aiMessage];
      });
    } catch (error) {
      // Remove loading message and add error response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== loadingMessage.id);
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        };
        return [...filtered, errorMessage];
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const simulateChatGPTResponse = async (input: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate different responses based on input
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('diabetes')) {
      return `For diabetes management, focus on:\n\n• **Low glycemic index foods**: Oats, quinoa, sweet potatoes\n• **Lean proteins**: Fish, chicken, tofu, beans\n• **Non-starchy vegetables**: Broccoli, spinach, peppers\n• **Healthy fats**: Avocado, nuts, olive oil\n• **Fiber-rich foods**: Berries, whole grains, legumes\n\n**Avoid**: Refined sugars, white bread, sugary drinks, processed foods\n\n**Portion control** is crucial. Consider working with a dietitian for personalized meal planning. Always monitor your blood sugar levels and consult your healthcare provider.`;
    }
    
    if (lowerInput.includes('breakfast') || lowerInput.includes('recipe')) {
      return `Here's a nutritious breakfast recipe:\n\n**🥣 Protein-Packed Overnight Oats**\n\n**Ingredients:**\n• 1/2 cup rolled oats\n• 1 tbsp chia seeds\n• 1 tbsp almond butter\n• 1 cup unsweetened almond milk\n• 1/2 banana, sliced\n• 1 tbsp honey\n• Fresh berries\n\n**Instructions:**\n1. Mix oats, chia seeds, and almond milk\n2. Add almond butter and honey\n3. Refrigerate overnight\n4. Top with banana and berries\n5. Enjoy cold!\n\n**Nutrition:** ~350 calories, 12g protein, 8g fiber`;
    }
    
    if (lowerInput.includes('calories') || lowerInput.includes('daily')) {
      return `Daily calorie needs depend on several factors:\n\n**For weight maintenance:**\n• Sedentary: 1,800-2,000 calories\n• Moderately active: 2,000-2,400 calories\n• Very active: 2,400-3,000 calories\n\n**For weight loss:** Subtract 500-750 calories from maintenance\n**For weight gain:** Add 300-500 calories to maintenance\n\n**Factors affecting needs:**\n• Age, gender, height, weight\n• Activity level\n• Muscle mass\n• Health conditions\n\nUse our app's calculator in your profile for personalized recommendations!`;
    }
    
    if (lowerInput.includes('protein')) {
      return `High-protein foods include:\n\n**Animal sources:**\n• Chicken breast: 31g per 100g\n• Salmon: 25g per 100g\n• Greek yogurt: 10g per 100g\n• Eggs: 6g per large egg\n\n**Plant sources:**\n• Lentils: 9g per 100g\n• Quinoa: 4g per 100g\n• Almonds: 21g per 100g\n• Tofu: 8g per 100g\n\n**Daily protein needs:**\n• Sedentary: 0.8g per kg body weight\n• Active: 1.2-1.7g per kg body weight\n• Athletes: 1.6-2.2g per kg body weight`;
    }
    
    if (lowerInput.includes('allergies') || lowerInput.includes('allergic')) {
      return `For allergy management:\n\n**Common allergens to avoid:**\n• Nuts (tree nuts, peanuts)\n• Dairy\n• Eggs\n• Soy\n• Wheat/gluten\n• Shellfish\n• Fish\n• Sesame\n\n**Safe alternatives:**\n• Nut-free: Seeds, coconut\n• Dairy-free: Plant milks, vegan cheese\n• Gluten-free: Rice, quinoa, corn\n• Egg-free: Flax eggs, applesauce\n\n**Always read labels carefully** and inform restaurants about your allergies. Consider carrying an epinephrine auto-injector if prescribed.`;
    }
    
    // Default response
    return `I'd be happy to help with that! Based on your question about "${input}", here's what I recommend:\n\nFor personalized nutrition advice, I suggest:\n\n• Tracking your meals in our app\n• Setting up your dietary preferences\n• Consulting with healthcare professionals for specific conditions\n\nIs there anything specific about nutrition or healthy eating you'd like to know more about?`;
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessageContainer : styles.aiMessageContainer,
            ]}
          >
            {!message.isUser && (
              <Avatar.Icon
                size={32}
                icon="robot"
                style={styles.aiAvatar}
              />
            )}
            <Card
              style={[
                styles.messageCard,
                message.isUser ? styles.userMessageCard : styles.aiMessageCard,
              ]}
            >
              <Card.Content style={styles.messageContent}>
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  message.isUser ? styles.userMessageTime : styles.aiMessageTime,
                ]}>
                  {formatTime(message.timestamp)}
                </Text>
              </Card.Content>
            </Card>
            {message.isUser && (
              <Avatar.Icon
                size={32}
                icon="account"
                style={styles.userAvatar}
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <View style={styles.quickQuestionsContainer}>
          <Text style={styles.quickQuestionsTitle}>Quick Questions:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionChip}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything about nutrition..."
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={theme.colors.surface} />
            ) : (
              <Ionicons name="send" size={20} color={theme.colors.surface} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageCard: {
    maxWidth: '80%',
    elevation: 1,
  },
  userMessageCard: {
    backgroundColor: theme.colors.primary,
    marginRight: spacing.sm,
  },
  aiMessageCard: {
    backgroundColor: theme.colors.surface,
    marginLeft: spacing.sm,
  },
  messageContent: {
    paddingVertical: spacing.sm,
  },
  messageText: {
    ...typography.body2,
    lineHeight: 20,
  },
  userMessageText: {
    color: theme.colors.surface,
  },
  aiMessageText: {
    color: theme.colors.textPrimary,
  },
  messageTime: {
    ...typography.caption,
    marginTop: spacing.xs,
    opacity: 0.7,
  },
  userMessageTime: {
    color: theme.colors.surface,
    textAlign: 'right',
  },
  aiMessageTime: {
    color: theme.colors.textSecondary,
  },
  aiAvatar: {
    backgroundColor: theme.colors.secondary,
  },
  userAvatar: {
    backgroundColor: theme.colors.primary,
  },
  quickQuestionsContainer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  quickQuestionsTitle: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
  },
  quickQuestionChip: {
    backgroundColor: theme.colors.lightGreen,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  quickQuestionText: {
    ...typography.caption,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  inputContainer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  textInput: {
    flex: 1,
    ...typography.body2,
    color: theme.colors.textPrimary,
    maxHeight: 100,
    paddingVertical: spacing.xs,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.textDisabled,
  },
});

export default AIChatScreen;