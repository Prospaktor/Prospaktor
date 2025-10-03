import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Card, Button, Chip, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

const { width } = Dimensions.get('window');

interface QuickStats {
  caloriesConsumed: number;
  caloriesGoal: number;
  waterIntake: number;
  waterGoal: number;
  mealsLogged: number;
}

interface RecentFood {
  id: string;
  name: string;
  calories: number;
  image: string;
  time: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [quickStats, setQuickStats] = useState<QuickStats>({
    caloriesConsumed: 1200,
    caloriesGoal: 2000,
    waterIntake: 6,
    waterGoal: 8,
    mealsLogged: 3,
  });

  const [recentFoods, setRecentFoods] = useState<RecentFood[]>([
    {
      id: '1',
      name: 'Grilled Chicken Salad',
      calories: 350,
      image: '🥗',
      time: '2 hours ago',
    },
    {
      id: '2',
      name: 'Greek Yogurt with Berries',
      calories: 180,
      image: '🍓',
      time: '4 hours ago',
    },
    {
      id: '3',
      name: 'Quinoa Bowl',
      calories: 420,
      image: '🥘',
      time: '6 hours ago',
    },
  ]);

  const handleAIChat = () => {
    navigation.navigate('AIChat');
  };

  const handleCameraScan = () => {
    navigation.navigate('Camera');
  };

  const handleViewNutrition = (food: RecentFood) => {
    navigation.navigate('NutritionDetail', { food });
  };

  const calorieProgress = (quickStats.caloriesConsumed / quickStats.caloriesGoal) * 100;
  const waterProgress = (quickStats.waterIntake / quickStats.waterGoal) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* AI Chat Section */}
      <TouchableOpacity style={styles.aiChatSection} onPress={handleAIChat}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.aiChatGradient}
        >
          <View style={styles.aiChatContent}>
            <View style={styles.aiChatIcon}>
              <Ionicons name="chatbubble-ellipses" size={24} color={theme.colors.surface} />
            </View>
            <View style={styles.aiChatText}>
              <Text style={styles.aiChatTitle}>AI Nutrition Assistant</Text>
              <Text style={styles.aiChatSubtitle}>Ask me anything about nutrition!</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.surface} />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <View style={styles.statHeader}>
                <Text style={styles.statValue}>{quickStats.caloriesConsumed}</Text>
                <Text style={styles.statUnit}>kcal</Text>
              </View>
              <Text style={styles.statLabel}>Calories</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${calorieProgress}%`, backgroundColor: theme.colors.primary }
                  ]} 
                />
              </View>
              <Text style={styles.statGoal}>Goal: {quickStats.caloriesGoal} kcal</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <View style={styles.statHeader}>
                <Text style={styles.statValue}>{quickStats.waterIntake}</Text>
                <Text style={styles.statUnit}>glasses</Text>
              </View>
              <Text style={styles.statLabel}>Water</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${waterProgress}%`, backgroundColor: theme.colors.info }
                  ]} 
                />
              </View>
              <Text style={styles.statGoal}>Goal: {quickStats.waterGoal} glasses</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickAction} onPress={handleCameraScan}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.secondary]}
              style={styles.quickActionGradient}
            >
              <Ionicons name="camera" size={32} color={theme.colors.surface} />
              <Text style={styles.quickActionText}>Scan Food</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction} 
            onPress={() => navigation.navigate('Recipes')}
          >
            <LinearGradient
              colors={[theme.colors.secondary, theme.colors.tertiary]}
              style={styles.quickActionGradient}
            >
              <Ionicons name="restaurant" size={32} color={theme.colors.surface} />
              <Text style={styles.quickActionText}>Find Recipes</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction} 
            onPress={() => navigation.navigate('DietPlan')}
          >
            <LinearGradient
              colors={[theme.colors.tertiary, theme.colors.accent]}
              style={styles.quickActionGradient}
            >
              <Ionicons name="calendar" size={32} color={theme.colors.surface} />
              <Text style={styles.quickActionText}>Diet Plan</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction} 
            onPress={() => navigation.navigate('Community')}
          >
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.primary]}
              style={styles.quickActionGradient}
            >
              <Ionicons name="people" size={32} color={theme.colors.surface} />
              <Text style={styles.quickActionText}>Community</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Foods */}
      <View style={styles.recentFoodsContainer}>
        <View style={styles.recentFoodsHeader}>
          <Text style={styles.sectionTitle}>Recent Foods</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recipes')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentFoods.map((food) => (
          <TouchableOpacity 
            key={food.id} 
            style={styles.recentFoodItem}
            onPress={() => handleViewNutrition(food)}
          >
            <View style={styles.foodImageContainer}>
              <Text style={styles.foodEmoji}>{food.image}</Text>
            </View>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodTime}>{food.time}</Text>
            </View>
            <View style={styles.foodCalories}>
              <Text style={styles.calorieValue}>{food.calories}</Text>
              <Text style={styles.calorieUnit}>kcal</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Health Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
        
        <Card style={styles.tipCard}>
          <Card.Content>
            <View style={styles.tipContent}>
              <Ionicons name="bulb" size={24} color={theme.colors.warning} />
              <View style={styles.tipText}>
                <Text style={styles.tipTitle}>Stay Hydrated</Text>
                <Text style={styles.tipDescription}>
                  Drinking enough water helps with digestion and keeps your energy levels up throughout the day.
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  aiChatSection: {
    margin: spacing.md,
    borderRadius: theme.roundness,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  aiChatGradient: {
    padding: spacing.lg,
  },
  aiChatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiChatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  aiChatText: {
    flex: 1,
  },
  aiChatTitle: {
    ...typography.h5,
    color: theme.colors.surface,
    marginBottom: spacing.xs,
  },
  aiChatSubtitle: {
    ...typography.body2,
    color: theme.colors.surface,
    opacity: 0.9,
  },
  statsContainer: {
    margin: spacing.md,
  },
  sectionTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h3,
    color: theme.colors.primary,
    marginRight: spacing.xs,
  },
  statUnit: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  statLabel: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.outlineVariant,
    borderRadius: 2,
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  statGoal: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  quickActionsContainer: {
    margin: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - spacing.md * 3) / 2,
    height: 100,
    marginBottom: spacing.md,
    borderRadius: theme.roundness,
    overflow: 'hidden',
    elevation: 3,
  },
  quickActionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    ...typography.button,
    color: theme.colors.surface,
    marginTop: spacing.xs,
  },
  recentFoodsContainer: {
    margin: spacing.md,
  },
  recentFoodsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAllText: {
    ...typography.body2,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  recentFoodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: spacing.md,
    borderRadius: theme.roundness,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  foodImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  foodEmoji: {
    fontSize: 24,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    ...typography.body1,
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  foodTime: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  foodCalories: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  calorieValue: {
    ...typography.h6,
    color: theme.colors.primary,
  },
  calorieUnit: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  tipsContainer: {
    margin: spacing.md,
    marginBottom: spacing.xxl,
  },
  tipCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  tipTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tipDescription: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});

export default HomeScreen;