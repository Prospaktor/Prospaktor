import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Card, Button, Chip, TextInput, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

const { width } = Dimensions.get('window');

interface CommunityPost {
  id: string;
  type: 'recipe' | 'review' | 'tip' | 'achievement';
  title: string;
  content: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  recipe?: {
    name: string;
    calories: number;
    prepTime: number;
    difficulty: string;
    rating: number;
  };
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

const CommunityScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Recipes', value: 'recipe' },
    { label: 'Reviews', value: 'review' },
    { label: 'Tips', value: 'tip' },
    { label: 'Achievements', value: 'achievement' },
  ];

  useEffect(() => {
    loadCommunityPosts();
  }, []);

  const loadCommunityPosts = () => {
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        type: 'recipe',
        title: 'My Secret to Perfect Quinoa Bowls',
        content: 'After months of experimenting, I finally found the perfect quinoa cooking method! The key is to toast the quinoa before cooking and use a 1:1.5 ratio of quinoa to water. Here\'s my favorite Mediterranean bowl recipe...',
        image: '🥗',
        author: {
          name: 'Sarah Johnson',
          avatar: '👩‍🍳',
          verified: true,
          followers: 15420,
        },
        timestamp: '2 hours ago',
        likes: 234,
        comments: 18,
        shares: 12,
        tags: ['quinoa', 'mediterranean', 'healthy'],
        recipe: {
          name: 'Mediterranean Quinoa Bowl',
          calories: 420,
          prepTime: 15,
          difficulty: 'Easy',
          rating: 4.8,
        },
      },
      {
        id: '2',
        type: 'review',
        title: 'Tried the Grilled Salmon Recipe - Amazing!',
        content: 'I made the grilled salmon with asparagus from the app yesterday and it was absolutely delicious! The lemon herb seasoning was perfect. My family loved it and it only took 25 minutes total. Highly recommend!',
        image: '🐟',
        author: {
          name: 'Mike Chen',
          avatar: '👨‍💼',
          verified: false,
          followers: 892,
        },
        timestamp: '4 hours ago',
        likes: 89,
        comments: 7,
        shares: 3,
        tags: ['salmon', 'review', 'family-friendly'],
        recipe: {
          name: 'Grilled Salmon with Asparagus',
          calories: 285,
          prepTime: 10,
          difficulty: 'Easy',
          rating: 4.9,
        },
      },
      {
        id: '3',
        type: 'tip',
        title: 'Meal Prep Sunday Tips',
        content: 'Here are my top 5 meal prep tips that have saved me so much time during the week:\n\n1. Cook proteins in bulk (chicken, salmon, tofu)\n2. Pre-cut vegetables and store in containers\n3. Make dressings and sauces ahead\n4. Use mason jars for layered salads\n5. Freeze smoothie ingredients in portions\n\nWhat are your favorite meal prep tips?',
        author: {
          name: 'Emma Rodriguez',
          avatar: '👩‍🌾',
          verified: true,
          followers: 8934,
        },
        timestamp: '6 hours ago',
        likes: 156,
        comments: 23,
        shares: 8,
        tags: ['meal-prep', 'tips', 'organization'],
      },
      {
        id: '4',
        type: 'achievement',
        title: '30 Days of Healthy Eating Complete!',
        content: 'I just completed my first 30-day healthy eating challenge! Lost 8 pounds and feel so much more energetic. The key was meal planning and using this app to track everything. Thank you to everyone who supported me along the way!',
        author: {
          name: 'David Kim',
          avatar: '👨‍⚕️',
          verified: false,
          followers: 2341,
        },
        timestamp: '1 day ago',
        likes: 312,
        comments: 45,
        shares: 19,
        tags: ['achievement', 'weight-loss', 'motivation'],
      },
      {
        id: '5',
        type: 'recipe',
        title: 'Vegan Buddha Bowl Recipe',
        content: 'This colorful Buddha bowl is packed with nutrients and flavor! Perfect for lunch or dinner. The tahini dressing is the secret ingredient that brings everything together.',
        image: '🥙',
        author: {
          name: 'Lisa Park',
          avatar: '👩‍⚕️',
          verified: true,
          followers: 12756,
        },
        timestamp: '2 days ago',
        likes: 189,
        comments: 14,
        shares: 6,
        tags: ['vegan', 'buddha-bowl', 'nutritious'],
        recipe: {
          name: 'Vegan Buddha Bowl',
          calories: 380,
          prepTime: 20,
          difficulty: 'Medium',
          rating: 4.6,
        },
      },
    ];

    setPosts(mockPosts);
  };

  const filteredPosts = selectedFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === selectedFilter);

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  };

  const handleShare = (post: CommunityPost) => {
    // Implement share functionality
    console.log('Sharing post:', post.title);
  };

  const handleComment = (postId: string) => {
    // Navigate to comments screen or show comment modal
    console.log('Commenting on post:', postId);
  };

  const createPost = () => {
    if (newPostContent.trim()) {
      const newPost: CommunityPost = {
        id: Date.now().toString(),
        type: 'tip',
        title: 'New Post',
        content: newPostContent,
        author: {
          name: 'You',
          avatar: '👤',
          verified: false,
          followers: 0,
        },
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        tags: [],
      };
      
      setPosts(prev => [newPost, ...prev]);
      setNewPostContent('');
      setShowCreatePost(false);
    }
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'recipe': return 'restaurant';
      case 'review': return 'star';
      case 'tip': return 'bulb';
      case 'achievement': return 'trophy';
      default: return 'chatbubble';
    }
  };

  const getPostColor = (type: string) => {
    switch (type) {
      case 'recipe': return theme.colors.primary;
      case 'review': return theme.colors.warning;
      case 'tip': return theme.colors.info;
      case 'achievement': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  const renderPost = (post: CommunityPost) => (
    <Card key={post.id} style={styles.postCard}>
      <Card.Content style={styles.postContent}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.authorInfo}>
            <Avatar.Text
              size={40}
              label={post.author.avatar}
              style={styles.authorAvatar}
            />
            <View style={styles.authorDetails}>
              <View style={styles.authorNameRow}>
                <Text style={styles.authorName}>{post.author.name}</Text>
                {post.author.verified && (
                  <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
                )}
              </View>
              <Text style={styles.authorFollowers}>
                {post.author.followers.toLocaleString()} followers
              </Text>
              <Text style={styles.postTimestamp}>{post.timestamp}</Text>
            </View>
          </View>
          
          <View style={styles.postTypeContainer}>
            <Ionicons 
              name={getPostIcon(post.type) as any} 
              size={20} 
              color={getPostColor(post.type)} 
            />
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.postBody}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postText}>{post.content}</Text>
          
          {post.image && (
            <View style={styles.postImageContainer}>
              <Text style={styles.postEmoji}>{post.image}</Text>
            </View>
          )}

          {/* Recipe Card */}
          {post.recipe && (
            <Card style={styles.recipeCard}>
              <Card.Content style={styles.recipeCardContent}>
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeName}>{post.recipe.name}</Text>
                  <View style={styles.recipeMeta}>
                    <View style={styles.recipeMetaItem}>
                      <Ionicons name="flame-outline" size={14} color={theme.colors.error} />
                      <Text style={styles.recipeMetaText}>{post.recipe.calories} cal</Text>
                    </View>
                    <View style={styles.recipeMetaItem}>
                      <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                      <Text style={styles.recipeMetaText}>{post.recipe.prepTime} min</Text>
                    </View>
                    <View style={styles.recipeMetaItem}>
                      <Ionicons name="star" size={14} color={theme.colors.warning} />
                      <Text style={styles.recipeMetaText}>{post.recipe.rating}</Text>
                    </View>
                  </View>
                </View>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate('RecipeDetail', { 
                    recipe: {
                      id: post.id,
                      title: post.recipe.name,
                      description: `Recipe shared by ${post.author.name}`,
                      image: post.image || '🍽️',
                      prepTime: post.recipe.prepTime,
                      cookTime: 0,
                      servings: 1,
                      difficulty: post.recipe.difficulty,
                      rating: post.recipe.rating,
                      calories: post.recipe.calories,
                      protein: 0,
                      carbs: 0,
                      fat: 0,
                      fiber: 0,
                      sugar: 0,
                      allergens: [],
                      dietaryTags: [],
                      healthConditions: [],
                      ingredients: [],
                      instructions: [],
                      author: post.author.name,
                      authorAvatar: post.author.avatar,
                      likes: post.likes,
                      reviews: post.comments,
                    }
                  })}
                  style={styles.viewRecipeButton}
                  compact
                >
                  View Recipe
                </Button>
              </Card.Content>
            </Card>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {post.tags.map((tag, index) => (
                <Chip
                  key={index}
                  style={styles.tagChip}
                  textStyle={styles.tagChipText}
                  compact
                >
                  #{tag}
                </Chip>
              ))}
            </View>
          )}
        </View>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(post.id)}
          >
            <Ionicons
              name={likedPosts.has(post.id) ? "heart" : "heart-outline"}
              size={20}
              color={likedPosts.has(post.id) ? theme.colors.error : theme.colors.textSecondary}
            />
            <Text style={[
              styles.actionText,
              likedPosts.has(post.id) && { color: theme.colors.error }
            ]}>
              {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleComment(post.id)}
          >
            <Ionicons name="chatbubble-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare(post)}
          >
            <Ionicons name="share-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.actionText}>{post.shares}</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => setShowCreatePost(true)}
        >
          <Ionicons name="add" size={24} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterButton,
                selectedFilter === filter.value && styles.activeFilterButton
              ]}
              onPress={() => setSelectedFilter(filter.value)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === filter.value && styles.activeFilterButtonText
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts */}
      <ScrollView style={styles.postsContainer} showsVerticalScrollIndicator={false}>
        {filteredPosts.map(renderPost)}
        
        {filteredPosts.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateTitle}>No posts found</Text>
            <Text style={styles.emptyStateText}>
              Be the first to share your healthy recipes and tips with the community!
            </Text>
            <Button
              mode="contained"
              onPress={() => setShowCreatePost(true)}
              style={styles.emptyStateButton}
            >
              Create First Post
            </Button>
          </View>
        )}
      </ScrollView>

      {/* Create Post Modal */}
      {showCreatePost && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TouchableOpacity onPress={() => setShowCreatePost(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.postInput}
              value={newPostContent}
              onChangeText={setNewPostContent}
              placeholder="Share your healthy recipe, tip, or achievement..."
              multiline
              numberOfLines={6}
              maxLength={500}
            />
            
            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={() => setShowCreatePost(false)}
                style={styles.modalButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={createPost}
                style={styles.modalButton}
                disabled={!newPostContent.trim()}
              >
                Post
              </Button>
            </View>
          </View>
        </View>
      )}
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
  createPostButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceVariant,
  },
  activeFilterButton: {
    backgroundColor: theme.colors.primary,
  },
  filterButtonText: {
    ...typography.body2,
    color: theme.colors.textSecondary,
  },
  activeFilterButtonText: {
    color: theme.colors.surface,
    fontWeight: '600',
  },
  postsContainer: {
    flex: 1,
    padding: spacing.md,
  },
  postCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
    marginBottom: spacing.md,
  },
  postContent: {
    padding: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorAvatar: {
    backgroundColor: theme.colors.lightGreen,
    marginRight: spacing.md,
  },
  authorDetails: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginRight: spacing.xs,
  },
  authorFollowers: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  postTimestamp: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  postTypeContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBody: {
    marginBottom: spacing.md,
  },
  postTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.sm,
  },
  postText: {
    ...typography.body2,
    color: theme.colors.textPrimary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  postImageContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  postEmoji: {
    fontSize: 48,
  },
  recipeCard: {
    backgroundColor: theme.colors.lightGreen,
    marginVertical: spacing.md,
  },
  recipeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.sm,
  },
  recipeMeta: {
    flexDirection: 'row',
  },
  recipeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recipeMetaText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: spacing.xs,
  },
  viewRecipeButton: {
    borderColor: theme.colors.primary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  tagChip: {
    backgroundColor: theme.colors.surfaceVariant,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagChipText: {
    color: theme.colors.textSecondary,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  actionText: {
    ...typography.body2,
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
    backgroundColor: theme.colors.primary,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    margin: spacing.lg,
    borderRadius: theme.roundness,
    padding: spacing.lg,
    width: width - spacing.lg * 2,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
  },
  postInput: {
    backgroundColor: theme.colors.surfaceVariant,
    marginBottom: spacing.lg,
    minHeight: 120,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});

export default CommunityScreen;