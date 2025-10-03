import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Card, Button, Chip, ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

const { width } = Dimensions.get('window');

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
  saturatedFat: number;
  transFat: number;
  vitaminA: number;
  vitaminC: number;
  calcium: number;
  iron: number;
  potassium: number;
}

interface FoodItem {
  id: string;
  name: string;
  image: string;
  nutrition: NutritionInfo;
  servingSize: string;
  allergens?: string[];
  healthBenefits?: string[];
}

const NutritionDetailScreen = ({ route, navigation }: any) => {
  const { food } = route.params;
  const [servingCount, setServingCount] = useState(1);

  // Mock detailed nutrition data
  const detailedFood: FoodItem = {
    id: food.id || '1',
    name: food.name || 'Grilled Chicken Breast',
    image: food.image || '🍗',
    servingSize: '100g',
    nutrition: {
      calories: food.calories || 165,
      protein: food.protein || 31,
      carbs: food.carbs || 0,
      fat: food.fat || 3.6,
      fiber: food.fiber || 0,
      sugar: food.sugar || 0,
      sodium: 74,
      cholesterol: 85,
      saturatedFat: 1,
      transFat: 0,
      vitaminA: 0,
      vitaminC: 0,
      calcium: 15,
      iron: 1,
      potassium: 256,
    },
    allergens: ['None'],
    healthBenefits: [
      'High protein content',
      'Low in calories',
      'Rich in B vitamins',
      'Good source of selenium',
      'Supports muscle growth',
    ],
  };

  const nutritionItems = [
    { label: 'Calories', value: detailedFood.nutrition.calories, unit: 'kcal', color: theme.colors.primary },
    { label: 'Protein', value: detailedFood.nutrition.protein, unit: 'g', color: theme.colors.info },
    { label: 'Carbohydrates', value: detailedFood.nutrition.carbs, unit: 'g', color: theme.colors.warning },
    { label: 'Fat', value: detailedFood.nutrition.fat, unit: 'g', color: theme.colors.error },
    { label: 'Fiber', value: detailedFood.nutrition.fiber, unit: 'g', color: theme.colors.success },
    { label: 'Sugar', value: detailedFood.nutrition.sugar, unit: 'g', color: theme.colors.secondary },
    { label: 'Sodium', value: detailedFood.nutrition.sodium, unit: 'mg', color: theme.colors.tertiary },
    { label: 'Cholesterol', value: detailedFood.nutrition.cholesterol, unit: 'mg', color: theme.colors.accent },
  ];

  const vitaminMinerals = [
    { label: 'Vitamin A', value: detailedFood.nutrition.vitaminA, unit: 'μg', dailyValue: 900 },
    { label: 'Vitamin C', value: detailedFood.nutrition.vitaminC, unit: 'mg', dailyValue: 90 },
    { label: 'Calcium', value: detailedFood.nutrition.calcium, unit: 'mg', dailyValue: 1000 },
    { label: 'Iron', value: detailedFood.nutrition.iron, unit: 'mg', dailyValue: 18 },
    { label: 'Potassium', value: detailedFood.nutrition.potassium, unit: 'mg', dailyValue: 3500 },
  ];

  const calculateNutritionForServing = (value: number) => {
    return Math.round(value * servingCount * 10) / 10;
  };

  const addToMeal = () => {
    // Navigate to meal logging or show success message
    navigation.goBack();
  };

  const findSimilarFoods = () => {
    // Navigate to similar foods screen
    navigation.navigate('Recipes');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nutrition Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Food Info Card */}
      <Card style={styles.foodInfoCard}>
        <Card.Content style={styles.foodInfoContent}>
          <View style={styles.foodImageContainer}>
            <Text style={styles.foodEmoji}>{detailedFood.image}</Text>
          </View>
          <View style={styles.foodDetails}>
            <Text style={styles.foodName}>{detailedFood.name}</Text>
            <Text style={styles.servingSize}>
              Serving Size: {detailedFood.servingSize}
            </Text>
            
            {/* Serving Counter */}
            <View style={styles.servingCounter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setServingCount(Math.max(0.5, servingCount - 0.5))}
              >
                <Ionicons name="remove" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
              <Text style={styles.servingCount}>{servingCount}x</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setServingCount(servingCount + 0.5)}
              >
                <Ionicons name="add" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Nutrition Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Overview</Text>
        <View style={styles.nutritionOverview}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>
              {calculateNutritionForServing(detailedFood.nutrition.calories)}
            </Text>
            <Text style={styles.nutritionLabel}>Calories</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>
              {calculateNutritionForServing(detailedFood.nutrition.protein)}g
            </Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>
              {calculateNutritionForServing(detailedFood.nutrition.carbs)}g
            </Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>
              {calculateNutritionForServing(detailedFood.nutrition.fat)}g
            </Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
          </View>
        </View>
      </View>

      {/* Detailed Nutrition Facts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Facts</Text>
        <Card style={styles.nutritionCard}>
          <Card.Content>
            {nutritionItems.map((item, index) => (
              <View key={index} style={styles.nutritionRow}>
                <View style={styles.nutritionLabelContainer}>
                  <View style={[styles.nutritionColorDot, { backgroundColor: item.color }]} />
                  <Text style={styles.nutritionRowLabel}>{item.label}</Text>
                </View>
                <Text style={styles.nutritionRowValue}>
                  {calculateNutritionForServing(item.value)}{item.unit}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </View>

      {/* Vitamins & Minerals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vitamins & Minerals</Text>
        <Card style={styles.nutritionCard}>
          <Card.Content>
            {vitaminMinerals.map((item, index) => {
              const dailyValuePercent = (item.value / item.dailyValue) * 100;
              return (
                <View key={index} style={styles.vitaminRow}>
                  <View style={styles.vitaminInfo}>
                    <Text style={styles.vitaminLabel}>{item.label}</Text>
                    <Text style={styles.vitaminValue}>
                      {calculateNutritionForServing(item.value)}{item.unit}
                    </Text>
                  </View>
                  <View style={styles.vitaminProgress}>
                    <ProgressBar
                      progress={Math.min(dailyValuePercent / 100, 1)}
                      color={theme.colors.primary}
                      style={styles.progressBar}
                    />
                    <Text style={styles.dailyValueText}>
                      {Math.round(dailyValuePercent)}% DV
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card.Content>
        </Card>
      </View>

      {/* Health Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Benefits</Text>
        <View style={styles.benefitsContainer}>
          {detailedFood.healthBenefits?.map((benefit, index) => (
            <Chip
              key={index}
              style={styles.benefitChip}
              textStyle={styles.benefitText}
              icon="check-circle"
            >
              {benefit}
            </Chip>
          ))}
        </View>
      </View>

      {/* Allergens */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergens</Text>
        <View style={styles.allergensContainer}>
          {detailedFood.allergens?.map((allergen, index) => (
            <Chip
              key={index}
              style={styles.allergenChip}
              textStyle={styles.allergenText}
              icon="alert-circle"
            >
              {allergen}
            </Chip>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={addToMeal}
          style={styles.addToMealButton}
          icon="plus"
        >
          Add to Meal
        </Button>
        <Button
          mode="outlined"
          onPress={findSimilarFoods}
          style={styles.similarButton}
          icon="search"
        >
          Find Similar
        </Button>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
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
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodInfoCard: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  foodInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  foodImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  foodEmoji: {
    fontSize: 40,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    ...typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: spacing.sm,
  },
  servingSize: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.md,
  },
  servingCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignSelf: 'flex-start',
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  servingCount: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginHorizontal: spacing.md,
    minWidth: 30,
    textAlign: 'center',
  },
  section: {
    margin: spacing.md,
  },
  sectionTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  nutritionOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: spacing.lg,
    elevation: 1,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    ...typography.h4,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  nutritionLabel: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginTop: spacing.xs,
  },
  nutritionCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  nutritionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  nutritionRowLabel: {
    ...typography.body2,
    color: theme.colors.textPrimary,
  },
  nutritionRowValue: {
    ...typography.body2,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  vitaminRow: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  vitaminInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  vitaminLabel: {
    ...typography.body2,
    color: theme.colors.textPrimary,
  },
  vitaminValue: {
    ...typography.body2,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  vitaminProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.sm,
  },
  dailyValueText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    minWidth: 50,
    textAlign: 'right',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  benefitChip: {
    backgroundColor: theme.colors.lightGreen,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  benefitText: {
    color: theme.colors.primary,
  },
  allergensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergenChip: {
    backgroundColor: theme.colors.errorContainer,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  allergenText: {
    color: theme.colors.error,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  addToMealButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  similarButton: {
    flex: 1,
    borderColor: theme.colors.primary,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default NutritionDetailScreen;