import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import { Card, Chip, Button, Searchbar, Menu, Divider } from 'react-native-paper';
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

interface FilterOptions {
  dietaryTags: string[];
  allergens: string[];
  healthConditions: string[];
  difficulty: string[];
  prepTime: string[];
  calories: string[];
}

const RecipesScreen = ({ navigation }: any) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    dietaryTags: [],
    allergens: [],
    healthConditions: [],
    difficulty: [],
    prepTime: [],
    calories: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const filterOptions = {
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Low-Carb', 'High-Protein'],
    allergens: ['Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Shellfish', 'Fish', 'Sesame'],
    healthConditions: ['Diabetes', 'Heart Disease', 'High Blood Pressure', 'Celiac Disease', 'Lactose Intolerance'],
    difficulty: ['Easy', 'Medium', 'Hard'],
    prepTime: ['Under 15 min', '15-30 min', '30-60 min', 'Over 60 min'],
    calories: ['Under 300', '300-500', '500-700', 'Over 700'],
  };

  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Prep Time', value: 'prepTime' },
    { label: 'Calories', value: 'calories' },
    { label: 'Protein', value: 'protein' },
    { label: 'Newest', value: 'newest' },
  ];

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [recipes, searchQuery, selectedFilters, sortBy]);

  const loadRecipes = () => {
    // Mock recipe data
    const mockRecipes: Recipe[] = [
      {
        id: '1',
        title: 'Mediterranean Quinoa Bowl',
        description: 'A nutritious bowl packed with quinoa, fresh vegetables, and Mediterranean flavors',
        image: '🥗',
        prepTime: 15,
        cookTime: 20,
        servings: 2,
        difficulty: 'Easy',
        rating: 4.8,
        calories: 420,
        protein: 15,
        carbs: 65,
        fat: 12,
        fiber: 8,
        sugar: 12,
        allergens: [],
        dietaryTags: ['Vegetarian', 'Gluten-Free', 'High-Protein'],
        healthConditions: ['Diabetes'],
        ingredients: ['Quinoa', 'Cherry tomatoes', 'Cucumber', 'Red onion', 'Feta cheese', 'Olive oil', 'Lemon juice'],
        instructions: ['Cook quinoa according to package instructions', 'Chop vegetables', 'Mix ingredients', 'Serve chilled'],
        author: 'Sarah Johnson',
        authorAvatar: '👩‍🍳',
        likes: 1247,
        reviews: 89,
      },
      {
        id: '2',
        title: 'Grilled Salmon with Asparagus',
        description: 'Perfectly grilled salmon with tender asparagus and lemon herb seasoning',
        image: '🐟',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        difficulty: 'Easy',
        rating: 4.9,
        calories: 285,
        protein: 35,
        carbs: 8,
        fat: 12,
        fiber: 4,
        sugar: 3,
        allergens: ['Fish'],
        dietaryTags: ['Gluten-Free', 'Keto', 'High-Protein'],
        healthConditions: ['Heart Disease'],
        ingredients: ['Salmon fillet', 'Asparagus', 'Lemon', 'Garlic', 'Olive oil', 'Herbs', 'Salt', 'Pepper'],
        instructions: ['Season salmon', 'Grill asparagus', 'Cook salmon', 'Serve with lemon'],
        author: 'Mike Chen',
        authorAvatar: '👨‍🍳',
        likes: 2156,
        reviews: 156,
      },
      {
        id: '3',
        title: 'Vegan Buddha Bowl',
        description: 'Colorful bowl with roasted vegetables, chickpeas, and tahini dressing',
        image: '🥙',
        prepTime: 20,
        cookTime: 30,
        servings: 3,
        difficulty: 'Medium',
        rating: 4.6,
        calories: 380,
        protein: 18,
        carbs: 55,
        fat: 14,
        fiber: 12,
        sugar: 8,
        allergens: [],
        dietaryTags: ['Vegan', 'Gluten-Free', 'High-Fiber'],
        healthConditions: ['Diabetes', 'Heart Disease'],
        ingredients: ['Sweet potato', 'Chickpeas', 'Kale', 'Avocado', 'Tahini', 'Lemon', 'Spices'],
        instructions: ['Roast vegetables', 'Prepare chickpeas', 'Make tahini dressing', 'Assemble bowl'],
        author: 'Emma Rodriguez',
        authorAvatar: '👩‍🌾',
        likes: 1893,
        reviews: 112,
      },
      {
        id: '4',
        title: 'Low-Carb Cauliflower Rice',
        description: 'Fluffy cauliflower rice with herbs and vegetables - perfect keto side dish',
        image: '🍚',
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        difficulty: 'Easy',
        rating: 4.4,
        calories: 95,
        protein: 4,
        carbs: 12,
        fat: 4,
        fiber: 4,
        sugar: 5,
        allergens: [],
        dietaryTags: ['Keto', 'Low-Carb', 'Gluten-Free'],
        healthConditions: ['Diabetes'],
        ingredients: ['Cauliflower', 'Onion', 'Garlic', 'Herbs', 'Olive oil', 'Salt', 'Pepper'],
        instructions: ['Process cauliflower', 'Sauté vegetables', 'Cook cauliflower rice', 'Season and serve'],
        author: 'David Kim',
        authorAvatar: '👨‍💼',
        likes: 987,
        reviews: 67,
      },
      {
        id: '5',
        title: 'Protein Smoothie Bowl',
        description: 'Thick and creamy smoothie bowl topped with fresh fruits and nuts',
        image: '🥤',
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        difficulty: 'Easy',
        rating: 4.7,
        calories: 320,
        protein: 25,
        carbs: 35,
        fat: 8,
        fiber: 6,
        sugar: 28,
        allergens: ['Nuts'],
        dietaryTags: ['High-Protein', 'Gluten-Free'],
        healthConditions: [],
        ingredients: ['Protein powder', 'Banana', 'Berries', 'Almond milk', 'Chia seeds', 'Granola', 'Nuts'],
        instructions: ['Blend smoothie base', 'Pour into bowl', 'Add toppings', 'Serve immediately'],
        author: 'Lisa Park',
        authorAvatar: '👩‍⚕️',
        likes: 1456,
        reviews: 98,
      },
    ];

    setRecipes(mockRecipes);
  };

  const applyFilters = () => {
    let filtered = [...recipes];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Dietary tags filter
    if (selectedFilters.dietaryTags.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedFilters.dietaryTags.some(tag =>
          recipe.dietaryTags.includes(tag)
        )
      );
    }

    // Allergens filter (exclude recipes with selected allergens)
    if (selectedFilters.allergens.length > 0) {
      filtered = filtered.filter(recipe =>
        !selectedFilters.allergens.some(allergen =>
          recipe.allergens.includes(allergen)
        )
      );
    }

    // Health conditions filter
    if (selectedFilters.healthConditions.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedFilters.healthConditions.some(condition =>
          recipe.healthConditions.includes(condition)
        )
      );
    }

    // Difficulty filter
    if (selectedFilters.difficulty.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedFilters.difficulty.includes(recipe.difficulty)
      );
    }

    // Prep time filter
    if (selectedFilters.prepTime.length > 0) {
      filtered = filtered.filter(recipe => {
        return selectedFilters.prepTime.some(timeRange => {
          switch (timeRange) {
            case 'Under 15 min':
              return recipe.prepTime < 15;
            case '15-30 min':
              return recipe.prepTime >= 15 && recipe.prepTime <= 30;
            case '30-60 min':
              return recipe.prepTime > 30 && recipe.prepTime <= 60;
            case 'Over 60 min':
              return recipe.prepTime > 60;
            default:
              return true;
          }
        });
      });
    }

    // Calories filter
    if (selectedFilters.calories.length > 0) {
      filtered = filtered.filter(recipe => {
        return selectedFilters.calories.some(calorieRange => {
          switch (calorieRange) {
            case 'Under 300':
              return recipe.calories < 300;
            case '300-500':
              return recipe.calories >= 300 && recipe.calories <= 500;
            case '500-700':
              return recipe.calories > 500 && recipe.calories <= 700;
            case 'Over 700':
              return recipe.calories > 700;
            default:
              return true;
          }
        });
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'prepTime':
          return a.prepTime - b.prepTime;
        case 'calories':
          return a.calories - b.calories;
        case 'protein':
          return b.protein - a.protein;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    setFilteredRecipes(filtered);
  };

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      dietaryTags: [],
      allergens: [],
      healthConditions: [],
      difficulty: [],
      prepTime: [],
      calories: [],
    });
  };

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const renderFilterChips = (category: keyof FilterOptions, options: string[]) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>
        {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
      </Text>
      <View style={styles.chipContainer}>
        {options.map((option) => (
          <Chip
            key={option}
            selected={selectedFilters[category].includes(option)}
            onPress={() => toggleFilter(category, option)}
            style={[
              styles.filterChip,
              selectedFilters[category].includes(option) && styles.selectedChip
            ]}
            textStyle={[
              styles.chipText,
              selectedFilters[category].includes(option) && styles.selectedChipText
            ]}
          >
            {option}
          </Chip>
        ))}
      </View>
    </View>
  );

  const renderRecipeCard = (recipe: Recipe) => (
    <TouchableOpacity
      key={recipe.id}
      style={styles.recipeCard}
      onPress={() => handleRecipePress(recipe)}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.recipeImageContainer}>
            <Text style={styles.recipeEmoji}>{recipe.image}</Text>
          </View>
          
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle} numberOfLines={2}>
              {recipe.title}
            </Text>
            <Text style={styles.recipeDescription} numberOfLines={2}>
              {recipe.description}
            </Text>
            
            <View style={styles.recipeMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                <Text style={styles.metaText}>{recipe.prepTime} min</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="star" size={14} color={theme.colors.warning} />
                <Text style={styles.metaText}>{recipe.rating}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="flame-outline" size={14} color={theme.colors.error} />
                <Text style={styles.metaText}>{recipe.calories} cal</Text>
              </View>
            </View>

            <View style={styles.dietaryTags}>
              {recipe.dietaryTags.slice(0, 3).map((tag, index) => (
                <Chip
                  key={index}
                  style={styles.dietaryChip}
                  textStyle={styles.dietaryChipText}
                  compact
                >
                  {tag}
                </Chip>
              ))}
              {recipe.dietaryTags.length > 3 && (
                <Text style={styles.moreTagsText}>+{recipe.dietaryTags.length - 3}</Text>
              )}
            </View>

            <View style={styles.recipeFooter}>
              <View style={styles.authorInfo}>
                <Text style={styles.authorAvatar}>{recipe.authorAvatar}</Text>
                <Text style={styles.authorName}>{recipe.author}</Text>
              </View>
              <View style={styles.recipeStats}>
                <View style={styles.statItem}>
                  <Ionicons name="heart" size={14} color={theme.colors.error} />
                  <Text style={styles.statText}>{recipe.likes}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="chatbubble-outline" size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.statText}>{recipe.reviews}</Text>
                </View>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Healthy Recipes</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search recipes, ingredients..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortButton,
                sortBy === option.value && styles.activeSortButton
              ]}
              onPress={() => setSortBy(option.value)}
            >
              <Text style={[
                styles.sortButtonText,
                sortBy === option.value && styles.activeSortButtonText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>Filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filtersScroll} showsVerticalScrollIndicator={false}>
            {renderFilterChips('dietaryTags', filterOptions.dietaryTags)}
            {renderFilterChips('allergens', filterOptions.allergens)}
            {renderFilterChips('healthConditions', filterOptions.healthConditions)}
            {renderFilterChips('difficulty', filterOptions.difficulty)}
            {renderFilterChips('prepTime', filterOptions.prepTime)}
            {renderFilterChips('calories', filterOptions.calories)}
          </ScrollView>
        </View>
      )}

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Recipes List */}
      <ScrollView style={styles.recipesList} showsVerticalScrollIndicator={false}>
        {filteredRecipes.map(renderRecipeCard)}
        
        {filteredRecipes.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateTitle}>No recipes found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters to find more recipes.
            </Text>
            <Button
              mode="outlined"
              onPress={clearFilters}
              style={styles.emptyStateButton}
            >
              Clear Filters
            </Button>
          </View>
        )}
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
  headerTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchBar: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  searchInput: {
    ...typography.body2,
  },
  sortContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  sortButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceVariant,
  },
  activeSortButton: {
    backgroundColor: theme.colors.primary,
  },
  sortButtonText: {
    ...typography.body2,
    color: theme.colors.textSecondary,
  },
  activeSortButtonText: {
    color: theme.colors.surface,
    fontWeight: '600',
  },
  filtersContainer: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    maxHeight: 300,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  filtersTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  clearFiltersText: {
    ...typography.body2,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  filtersScroll: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  filterSection: {
    marginBottom: spacing.md,
  },
  filterSectionTitle: {
    ...typography.body2,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: theme.colors.surfaceVariant,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.textSecondary,
  },
  selectedChipText: {
    color: theme.colors.surface,
  },
  resultsHeader: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  resultsCount: {
    ...typography.body2,
    color: theme.colors.textSecondary,
  },
  recipesList: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  recipeCard: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    padding: spacing.md,
  },
  recipeImageContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recipeEmoji: {
    fontSize: 32,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  recipeDescription: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  recipeMeta: {
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
  dietaryTags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dietaryChip: {
    backgroundColor: theme.colors.lightGreen,
    marginRight: spacing.xs,
    height: 24,
  },
  dietaryChipText: {
    ...typography.caption,
    color: theme.colors.primary,
    fontSize: 10,
  },
  moreTagsText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: spacing.xs,
  },
  recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  authorName: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  recipeStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  statText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: spacing.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyStateTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  emptyStateButton: {
    borderColor: theme.colors.primary,
  },
});

export default RecipesScreen;