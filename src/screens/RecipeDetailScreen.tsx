import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { Card, Button, Chip, IconButton, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

const { width } = Dimensions.get('window');

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  allergens: string[];
  dietaryTags: string[];
  healthConditions: string[];
  ingredients: string[];
  instructions: string[];
  author: string;
  authorAvatar: string;
  likes: number;
  reviews: number;
}

const RecipeDetailScreen = ({ route, navigation }: any) => {
  const { recipe }: { recipe: Recipe } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [servingCount, setServingCount] = useState(recipe.servings);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');

  const calculateNutritionForServing = (value: number) => {
    return Math.round((value * servingCount / recipe.servings) * 10) / 10;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically update the recipe's like count in your database
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing recipe: ${recipe.title}\n\n${recipe.description}\n\nDownload NutriTrack app to see more healthy recipes!`,
        title: recipe.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share recipe');
    }
  };

  const handleSaveRecipe = () => {
    Alert.alert('Recipe Saved', 'This recipe has been added to your favorites!');
  };

  const handleStartCooking = () => {
    Alert.alert('Cooking Mode', 'Starting cooking mode with step-by-step instructions!');
  };

  const renderIngredients = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <View style={styles.servingAdjuster}>
        <Text style={styles.servingText}>Servings:</Text>
        <View style={styles.servingCounter}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setServingCount(Math.max(1, servingCount - 1))}
          >
            <Ionicons name="remove" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.servingCount}>{servingCount}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setServingCount(servingCount + 1)}
          >
            <Ionicons name="add" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Card style={styles.ingredientsCard}>
        <Card.Content>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.ingredientBullet} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </View>
  );

  const renderInstructions = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Card style={styles.instructionsCard}>
        <Card.Content>
          {recipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
      
      <Button
        mode="contained"
        onPress={handleStartCooking}
        style={styles.startCookingButton}
        icon="play"
      >
        Start Cooking
      </Button>
    </View>
  );

  const renderNutrition = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Nutrition Facts</Text>
      <Text style={styles.nutritionSubtitle}>
        Per {servingCount} serving{servingCount !== 1 ? 's' : ''}
      </Text>
      
      <Card style={styles.nutritionCard}>
        <Card.Content>
          <View style={styles.nutritionOverview}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateNutritionForServing(recipe.calories)}
              </Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateNutritionForServing(recipe.protein)}g
              </Text>
              <Text style={styles.nutritionLabel}>Protein</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateNutritionForServing(recipe.carbs)}g
              </Text>
              <Text style={styles.nutritionLabel}>Carbs</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateNutritionForServing(recipe.fat)}g
              </Text>
              <Text style={styles.nutritionLabel}>Fat</Text>
            </View>
          </View>
          
          <Divider style={styles.nutritionDivider} />
          
          <View style={styles.detailedNutrition}>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionRowLabel}>Fiber</Text>
              <Text style={styles.nutritionRowValue}>
                {calculateNutritionForServing(recipe.fiber)}g
              </Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionRowLabel}>Sugar</Text>
              <Text style={styles.nutritionRowValue}>
                {calculateNutritionForServing(recipe.sugar)}g
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return renderIngredients();
      case 'instructions':
        return renderInstructions();
      case 'nutrition':
        return renderNutrition();
      default:
        return renderIngredients();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <IconButton
            icon={isLiked ? "heart" : "heart-outline"}
            iconColor={isLiked ? theme.colors.error : theme.colors.textSecondary}
            onPress={handleLike}
            size={24}
          />
          <IconButton
            icon="share-outline"
            iconColor={theme.colors.textSecondary}
            onPress={handleShare}
            size={24}
          />
          <IconButton
            icon="bookmark-outline"
            iconColor={theme.colors.textSecondary}
            onPress={handleSaveRecipe}
            size={24}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Recipe Header */}
        <Card style={styles.recipeHeaderCard}>
          <Card.Content style={styles.recipeHeaderContent}>
            <View style={styles.recipeImageContainer}>
              <Text style={styles.recipeEmoji}>{recipe.image}</Text>
            </View>
            
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
              
              <View style={styles.recipeMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.metaText}>{recipe.prepTime} min prep</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="restaurant-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.metaText}>{recipe.cookTime} min cook</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="people-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.metaText}>{recipe.servings} servings</Text>
                </View>
              </View>

              <View style={styles.ratingContainer}>
                <View style={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= recipe.rating ? "star" : "star-outline"}
                      size={16}
                      color={theme.colors.warning}
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>{recipe.rating}</Text>
                <Text style={styles.ratingCount}>({recipe.reviews} reviews)</Text>
              </View>

              <View style={styles.difficultyContainer}>
                <Text style={styles.difficultyLabel}>Difficulty:</Text>
                <Chip
                  style={[
                    styles.difficultyChip,
                    {
                      backgroundColor: 
                        recipe.difficulty === 'Easy' ? theme.colors.success :
                        recipe.difficulty === 'Medium' ? theme.colors.warning :
                        theme.colors.error
                    }
                  ]}
                  textStyle={styles.difficultyChipText}
                >
                  {recipe.difficulty}
                </Chip>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Dietary Tags */}
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Dietary Information</Text>
          <View style={styles.tagsRow}>
            {recipe.dietaryTags.map((tag, index) => (
              <Chip
                key={index}
                style={styles.dietaryChip}
                textStyle={styles.dietaryChipText}
              >
                {tag}
              </Chip>
            ))}
          </View>
          
          {recipe.allergens.length > 0 && (
            <View style={styles.allergensContainer}>
              <Text style={styles.allergensTitle}>Contains:</Text>
              <View style={styles.tagsRow}>
                {recipe.allergens.map((allergen, index) => (
                  <Chip
                    key={index}
                    style={styles.allergenChip}
                    textStyle={styles.allergenChipText}
                    icon="alert-circle"
                  >
                    {allergen}
                  </Chip>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Author Info */}
        <Card style={styles.authorCard}>
          <Card.Content style={styles.authorContent}>
            <Text style={styles.authorAvatar}>{recipe.authorAvatar}</Text>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{recipe.author}</Text>
              <Text style={styles.authorRole}>Recipe Creator</Text>
            </View>
            <View style={styles.authorStats}>
              <View style={styles.authorStat}>
                <Ionicons name="heart" size={16} color={theme.colors.error} />
                <Text style={styles.authorStatText}>{recipe.likes}</Text>
              </View>
              <View style={styles.authorStat}>
                <Ionicons name="restaurant" size={16} color={theme.colors.primary} />
                <Text style={styles.authorStatText}>24 recipes</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
              onPress={() => setActiveTab('ingredients')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'ingredients' && styles.activeTabText
              ]}>
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'instructions' && styles.activeTab]}
              onPress={() => setActiveTab('instructions')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'instructions' && styles.activeTabText
              ]}>
                Instructions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'nutrition' && styles.activeTab]}
              onPress={() => setActiveTab('nutrition')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'nutrition' && styles.activeTabText
              ]}>
                Nutrition
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        {renderTabContent()}

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
  headerActions: {
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  recipeHeaderCard: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  recipeHeaderContent: {
    flexDirection: 'row',
    padding: spacing.lg,
  },
  recipeImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  recipeEmoji: {
    fontSize: 48,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    ...typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: spacing.sm,
  },
  recipeDescription: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  recipeMeta: {
    flexDirection: 'row',
    marginBottom: spacing.md,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: spacing.sm,
  },
  ratingText: {
    ...typography.body2,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  ratingCount: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyLabel: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginRight: spacing.sm,
  },
  difficultyChip: {
    height: 28,
  },
  difficultyChipText: {
    ...typography.caption,
    color: theme.colors.surface,
    fontWeight: '600',
  },
  tagsContainer: {
    margin: spacing.md,
  },
  tagsTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  dietaryChip: {
    backgroundColor: theme.colors.lightGreen,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  dietaryChipText: {
    color: theme.colors.primary,
  },
  allergensContainer: {
    marginTop: spacing.sm,
  },
  allergensTitle: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
  },
  allergenChip: {
    backgroundColor: theme.colors.errorContainer,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  allergenChipText: {
    color: theme.colors.error,
  },
  authorCard: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  authorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  authorAvatar: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  authorRole: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  authorStats: {
    flexDirection: 'row',
  },
  authorStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  authorStatText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: spacing.xs,
  },
  tabsContainer: {
    margin: spacing.md,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.roundness,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: theme.roundness - 2,
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  tabText: {
    ...typography.body2,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  tabContent: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  nutritionSubtitle: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.md,
  },
  servingAdjuster: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  servingText: {
    ...typography.body2,
    color: theme.colors.textPrimary,
  },
  servingCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
  ingredientsCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginTop: 6,
    marginRight: spacing.md,
  },
  ingredientText: {
    ...typography.body2,
    color: theme.colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  instructionsCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
    marginBottom: spacing.lg,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    ...typography.body2,
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  instructionText: {
    ...typography.body2,
    color: theme.colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  startCookingButton: {
    backgroundColor: theme.colors.primary,
  },
  nutritionCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  nutritionOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
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
  nutritionDivider: {
    marginVertical: spacing.md,
  },
  detailedNutrition: {
    paddingVertical: spacing.sm,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default RecipeDetailScreen;