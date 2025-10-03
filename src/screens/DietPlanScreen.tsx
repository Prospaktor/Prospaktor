import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, Button, Chip, ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

const { width } = Dimensions.get('window');

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface DayPlan {
  date: string;
  dayName: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterGoal: number;
  waterConsumed: number;
}

interface WeeklyPlan {
  weekStart: string;
  days: DayPlan[];
  weeklyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    weightLoss: number;
  };
}

const DietPlanScreen = ({ navigation }: any) => {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateDietPlan();
  }, []);

  const generateDietPlan = async () => {
    setIsGenerating(true);
    
    // Simulate AI diet plan generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockWeeklyPlan: WeeklyPlan = {
      weekStart: '2024-01-15',
      weeklyGoals: {
        calories: 14000,
        protein: 770,
        carbs: 1750,
        fat: 490,
        weightLoss: 0.5,
      },
      days: [
        {
          date: '2024-01-15',
          dayName: 'Monday',
          waterGoal: 8,
          waterConsumed: 6,
          totalCalories: 2000,
          totalProtein: 110,
          totalCarbs: 250,
          totalFat: 70,
          meals: [
            {
              id: '1',
              name: 'Protein Smoothie Bowl',
              time: '7:00 AM',
              calories: 320,
              protein: 25,
              carbs: 35,
              fat: 8,
              fiber: 6,
              sugar: 28,
              image: '🥤',
              prepTime: 5,
              difficulty: 'Easy',
              ingredients: ['Protein powder', 'Banana', 'Berries', 'Almond milk', 'Chia seeds'],
              instructions: ['Blend all ingredients', 'Pour into bowl', 'Add toppings'],
            },
            {
              id: '2',
              name: 'Mediterranean Quinoa Bowl',
              time: '12:00 PM',
              calories: 420,
              protein: 15,
              carbs: 65,
              fat: 12,
              fiber: 8,
              sugar: 12,
              image: '🥗',
              prepTime: 15,
              difficulty: 'Easy',
              ingredients: ['Quinoa', 'Cherry tomatoes', 'Cucumber', 'Red onion', 'Feta cheese'],
              instructions: ['Cook quinoa', 'Chop vegetables', 'Mix ingredients', 'Serve chilled'],
            },
            {
              id: '3',
              name: 'Grilled Salmon with Asparagus',
              time: '6:00 PM',
              calories: 285,
              protein: 35,
              carbs: 8,
              fat: 12,
              fiber: 4,
              sugar: 3,
              image: '🐟',
              prepTime: 10,
              difficulty: 'Easy',
              ingredients: ['Salmon fillet', 'Asparagus', 'Lemon', 'Garlic', 'Olive oil'],
              instructions: ['Season salmon', 'Grill asparagus', 'Cook salmon', 'Serve with lemon'],
            },
            {
              id: '4',
              name: 'Greek Yogurt with Berries',
              time: '8:00 PM',
              calories: 180,
              protein: 15,
              carbs: 25,
              fat: 2,
              fiber: 4,
              sugar: 20,
              image: '🍓',
              prepTime: 2,
              difficulty: 'Easy',
              ingredients: ['Greek yogurt', 'Mixed berries', 'Honey', 'Granola'],
              instructions: ['Scoop yogurt', 'Add berries', 'Drizzle honey', 'Top with granola'],
            },
          ],
        },
        {
          date: '2024-01-16',
          dayName: 'Tuesday',
          waterGoal: 8,
          waterConsumed: 7,
          totalCalories: 1950,
          totalProtein: 105,
          totalCarbs: 240,
          totalFat: 65,
          meals: [
            {
              id: '5',
              name: 'Avocado Toast with Eggs',
              time: '7:30 AM',
              calories: 350,
              protein: 18,
              carbs: 25,
              fat: 20,
              fiber: 8,
              sugar: 3,
              image: '🥑',
              prepTime: 10,
              difficulty: 'Easy',
              ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Lemon', 'Salt', 'Pepper'],
              instructions: ['Toast bread', 'Mash avocado', 'Fry eggs', 'Assemble toast'],
            },
            {
              id: '6',
              name: 'Chicken Caesar Salad',
              time: '12:30 PM',
              calories: 380,
              protein: 28,
              carbs: 15,
              fat: 22,
              fiber: 4,
              sugar: 8,
              image: '🥬',
              prepTime: 12,
              difficulty: 'Easy',
              ingredients: ['Chicken breast', 'Romaine lettuce', 'Parmesan', 'Caesar dressing', 'Croutons'],
              instructions: ['Grill chicken', 'Chop lettuce', 'Mix salad', 'Add dressing'],
            },
            {
              id: '7',
              name: 'Turkey Meatballs with Zoodles',
              time: '6:30 PM',
              calories: 320,
              protein: 25,
              carbs: 12,
              fat: 18,
              fiber: 3,
              sugar: 8,
              image: '🍝',
              prepTime: 20,
              difficulty: 'Medium',
              ingredients: ['Ground turkey', 'Zucchini', 'Marinara sauce', 'Parmesan', 'Herbs'],
              instructions: ['Make meatballs', 'Spiralize zucchini', 'Cook meatballs', 'Serve with sauce'],
            },
            {
              id: '8',
              name: 'Dark Chocolate Bark',
              time: '8:30 PM',
              calories: 150,
              protein: 3,
              carbs: 12,
              fat: 10,
              fiber: 2,
              sugar: 8,
              image: '🍫',
              prepTime: 5,
              difficulty: 'Easy',
              ingredients: ['Dark chocolate', 'Almonds', 'Sea salt'],
              instructions: ['Melt chocolate', 'Add almonds', 'Sprinkle salt', 'Chill'],
            },
          ],
        },
        // Add more days...
      ],
    };
    
    setWeeklyPlan(mockWeeklyPlan);
    setIsGenerating(false);
  };

  const handleMealPress = (meal: Meal) => {
    navigation.navigate('RecipeDetail', { 
      recipe: {
        id: meal.id,
        title: meal.name,
        description: `A delicious ${meal.name.toLowerCase()} perfect for ${meal.time}`,
        image: meal.image,
        prepTime: meal.prepTime,
        cookTime: 0,
        servings: 1,
        difficulty: meal.difficulty,
        rating: 4.5,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
        fiber: meal.fiber,
        sugar: meal.sugar,
        allergens: [],
        dietaryTags: ['High-Protein'],
        healthConditions: [],
        ingredients: meal.ingredients,
        instructions: meal.instructions,
        author: 'AI Nutritionist',
        authorAvatar: '🤖',
        likes: 0,
        reviews: 0,
      }
    });
  };

  const regeneratePlan = () => {
    generateDietPlan();
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return theme.colors.success;
    if (percentage >= 80) return theme.colors.warning;
    return theme.colors.error;
  };

  if (isGenerating) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Ionicons name="restaurant" size={64} color={theme.colors.primary} />
          <Text style={styles.loadingTitle}>Generating Your Diet Plan</Text>
          <Text style={styles.loadingText}>
            Our AI is creating a personalized weekly meal plan based on your profile, goals, and preferences.
          </Text>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      </View>
    );
  }

  if (!weeklyPlan) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color={theme.colors.error} />
        <Text style={styles.errorTitle}>Failed to Generate Plan</Text>
        <Text style={styles.errorText}>
          We couldn't generate your diet plan. Please try again.
        </Text>
        <Button
          mode="contained"
          onPress={generateDietPlan}
          style={styles.retryButton}
        >
          Try Again
        </Button>
      </View>
    );
  }

  const currentDay = weeklyPlan.days[selectedDay];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weekly Diet Plan</Text>
        <TouchableOpacity onPress={regeneratePlan} style={styles.regenerateButton}>
          <Ionicons name="refresh" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Weekly Goals */}
        <Card style={styles.goalsCard}>
          <Card.Content>
            <Text style={styles.goalsTitle}>Weekly Goals</Text>
            <View style={styles.goalsGrid}>
              <View style={styles.goalItem}>
                <Text style={styles.goalValue}>{weeklyPlan.weeklyGoals.calories}</Text>
                <Text style={styles.goalLabel}>Calories</Text>
              </View>
              <View style={styles.goalItem}>
                <Text style={styles.goalValue}>{weeklyPlan.weeklyGoals.protein}g</Text>
                <Text style={styles.goalLabel}>Protein</Text>
              </View>
              <View style={styles.goalItem}>
                <Text style={styles.goalValue}>{weeklyPlan.weeklyGoals.weightLoss}kg</Text>
                <Text style={styles.goalLabel}>Weight Loss</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Day Selector */}
        <View style={styles.daySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {weeklyPlan.days.map((day, index) => (
              <TouchableOpacity
                key={day.date}
                style={[
                  styles.dayButton,
                  selectedDay === index && styles.selectedDayButton
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={[
                  styles.dayButtonText,
                  selectedDay === index && styles.selectedDayButtonText
                ]}>
                  {day.dayName}
                </Text>
                <Text style={[
                  styles.dayDateText,
                  selectedDay === index && styles.selectedDayDateText
                ]}>
                  {day.date.split('-')[2]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Daily Progress */}
        <Card style={styles.progressCard}>
          <Card.Content>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Calories</Text>
                <Text style={styles.progressValue}>
                  {currentDay.totalCalories} / 2000
                </Text>
              </View>
              <ProgressBar
                progress={currentDay.totalCalories / 2000}
                color={getProgressColor(currentDay.totalCalories, 2000)}
                style={styles.progressBar}
              />
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Water</Text>
                <Text style={styles.progressValue}>
                  {currentDay.waterConsumed} / {currentDay.waterGoal} glasses
                </Text>
              </View>
              <ProgressBar
                progress={currentDay.waterConsumed / currentDay.waterGoal}
                color={getProgressColor(currentDay.waterConsumed, currentDay.waterGoal)}
                style={styles.progressBar}
              />
            </View>

            <View style={styles.macrosRow}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{currentDay.totalProtein}g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{currentDay.totalCarbs}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{currentDay.totalFat}g</Text>
                <Text style={styles.macroLabel}>Fat</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Meals */}
        <View style={styles.mealsSection}>
          <Text style={styles.mealsTitle}>Today's Meals</Text>
          
          {currentDay.meals.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              style={styles.mealCard}
              onPress={() => handleMealPress(meal)}
            >
              <Card style={styles.mealCardContent}>
                <Card.Content style={styles.mealContent}>
                  <View style={styles.mealImageContainer}>
                    <Text style={styles.mealEmoji}>{meal.image}</Text>
                  </View>
                  
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                    
                    <View style={styles.mealMeta}>
                      <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                        <Text style={styles.metaText}>{meal.prepTime} min</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Ionicons name="flame-outline" size={14} color={theme.colors.error} />
                        <Text style={styles.metaText}>{meal.calories} cal</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Ionicons name="fitness-outline" size={14} color={theme.colors.info} />
                        <Text style={styles.metaText}>{meal.protein}g protein</Text>
                      </View>
                    </View>

                    <View style={styles.difficultyContainer}>
                      <Chip
                        style={[
                          styles.difficultyChip,
                          {
                            backgroundColor: 
                              meal.difficulty === 'Easy' ? theme.colors.success :
                              meal.difficulty === 'Medium' ? theme.colors.warning :
                              theme.colors.error
                          }
                        ]}
                        textStyle={styles.difficultyChipText}
                        compact
                      >
                        {meal.difficulty}
                      </Chip>
                    </View>
                  </View>
                  
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <Card.Content>
            <Text style={styles.tipsTitle}>💡 Daily Tips</Text>
            <Text style={styles.tipText}>
              • Stay hydrated throughout the day by drinking water between meals
            </Text>
            <Text style={styles.tipText}>
              • Take your time eating and chew slowly to improve digestion
            </Text>
            <Text style={styles.tipText}>
              • Consider meal prepping tomorrow's lunch to save time
            </Text>
          </Card.Content>
        </Card>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  regenerateButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  goalsCard: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  goalsTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  goalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  goalItem: {
    alignItems: 'center',
  },
  goalValue: {
    ...typography.h4,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  goalLabel: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  daySelector: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  dayButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginRight: spacing.sm,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surfaceVariant,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedDayButton: {
    backgroundColor: theme.colors.primary,
  },
  dayButtonText: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  selectedDayButtonText: {
    color: theme.colors.surface,
  },
  dayDateText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginTop: spacing.xs,
  },
  selectedDayDateText: {
    color: theme.colors.surface,
  },
  progressCard: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  progressTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  progressItem: {
    marginBottom: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...typography.body2,
    color: theme.colors.textPrimary,
  },
  progressValue: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    ...typography.h6,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  macroLabel: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginTop: spacing.xs,
  },
  mealsSection: {
    margin: spacing.md,
  },
  mealsTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  mealCard: {
    marginBottom: spacing.md,
  },
  mealCardContent: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  mealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  mealImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  mealEmoji: {
    fontSize: 28,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  mealTime: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
  },
  mealMeta: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  metaText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: spacing.xs,
  },
  difficultyContainer: {
    alignSelf: 'flex-start',
  },
  difficultyChip: {
    height: 24,
  },
  difficultyChipText: {
    ...typography.caption,
    color: theme.colors.surface,
    fontSize: 10,
    fontWeight: '600',
  },
  tipsCard: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  tipsTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  tipText: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: spacing.lg,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingTitle: {
    ...typography.h4,
    color: theme.colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  loadingText: {
    ...typography.body1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  loadingDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: spacing.xs,
  },
  dot1: {
    animationDelay: '0s',
  },
  dot2: {
    animationDelay: '0.2s',
  },
  dot3: {
    animationDelay: '0.4s',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: spacing.lg,
  },
  errorTitle: {
    ...typography.h4,
    color: theme.colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorText: {
    ...typography.body1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default DietPlanScreen;