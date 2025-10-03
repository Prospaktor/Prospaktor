import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Card, Button, Switch, TextInput, Modal, Portal } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

const { width } = Dimensions.get('window');

interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | 'Extremely Active';
  goal: 'Lose Weight' | 'Maintain Weight' | 'Gain Weight';
  targetWeight?: number;
  isPremium: boolean;
  allergies: string[];
  healthConditions: string[];
  dietaryPreferences: string[];
}

interface HealthMetrics {
  bmi: number;
  bmr: number;
  dailyCalories: number;
  proteinGoal: number;
  carbGoal: number;
  fatGoal: number;
}

const ProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    gender: 'Male',
    height: 175,
    weight: 70,
    activityLevel: 'Moderately Active',
    goal: 'Maintain Weight',
    targetWeight: 70,
    isPremium: false,
    allergies: ['Nuts'],
    healthConditions: [],
    dietaryPreferences: ['Vegetarian'],
  });

  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    bmi: 22.9,
    bmr: 1700,
    dailyCalories: 2200,
    proteinGoal: 110,
    carbGoal: 275,
    fatGoal: 73,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');

  const activityLevels = [
    'Sedentary',
    'Lightly Active',
    'Moderately Active',
    'Very Active',
    'Extremely Active'
  ];

  const goals = ['Lose Weight', 'Maintain Weight', 'Gain Weight'];

  const allergies = ['Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Shellfish', 'Fish', 'Sesame'];
  const healthConditions = ['Diabetes', 'Heart Disease', 'High Blood Pressure', 'Celiac Disease', 'Lactose Intolerance'];
  const dietaryPreferences = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Low-Carb', 'High-Protein'];

  useEffect(() => {
    calculateHealthMetrics();
  }, [profile.height, profile.weight, profile.age, profile.gender, profile.activityLevel]);

  const calculateHealthMetrics = () => {
    // BMI Calculation
    const heightInMeters = profile.height / 100;
    const bmi = profile.weight / (heightInMeters * heightInMeters);

    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (profile.gender === 'Male') {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      'Sedentary': 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725,
      'Extremely Active': 1.9,
    };

    const dailyCalories = Math.round(bmr * activityMultipliers[profile.activityLevel]);

    // Macronutrient goals (based on standard ratios)
    const proteinGoal = Math.round(dailyCalories * 0.2 / 4); // 20% of calories from protein
    const carbGoal = Math.round(dailyCalories * 0.5 / 4); // 50% of calories from carbs
    const fatGoal = Math.round(dailyCalories * 0.3 / 9); // 30% of calories from fat

    setHealthMetrics({
      bmi: Math.round(bmi * 10) / 10,
      bmr: Math.round(bmr),
      dailyCalories,
      proteinGoal,
      carbGoal,
      fatGoal,
    });
  };

  const handleEditField = (field: string, currentValue: any) => {
    setEditingField(field);
    setEditValue(currentValue.toString());
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (editingField === 'height' || editingField === 'weight' || editingField === 'age') {
      const numericValue = parseFloat(editValue);
      if (isNaN(numericValue) || numericValue <= 0) {
        Alert.alert('Invalid Input', 'Please enter a valid number');
        return;
      }
      setProfile(prev => ({ ...prev, [editingField]: numericValue }));
    } else if (editingField === 'name' || editingField === 'email') {
      setProfile(prev => ({ ...prev, [editingField]: editValue }));
    }
    setShowEditModal(false);
  };

  const toggleAllergy = (allergy: string) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const toggleHealthCondition = (condition: string) => {
    setProfile(prev => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter(c => c !== condition)
        : [...prev.healthConditions, condition]
    }));
  };

  const toggleDietaryPreference = (preference: string) => {
    setProfile(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
  };

  const handleUpgradePremium = () => {
    Alert.alert(
      'Upgrade to Premium',
      'Get access to personalized diet plans, advanced analytics, and exclusive features!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => setProfile(prev => ({ ...prev, isPremium: true })) }
      ]
    );
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: theme.colors.info };
    if (bmi < 25) return { category: 'Normal', color: theme.colors.success };
    if (bmi < 30) return { category: 'Overweight', color: theme.colors.warning };
    return { category: 'Obese', color: theme.colors.error };
  };

  const bmiCategory = getBMICategory(healthMetrics.bmi);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              {profile.isPremium && (
                <View style={styles.premiumBadge}>
                  <Ionicons name="star" size={16} color={theme.colors.warning} />
                </View>
              )}
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
              {profile.isPremium ? (
                <Text style={styles.premiumText}>Premium Member</Text>
              ) : (
                <Button
                  mode="contained"
                  onPress={handleUpgradePremium}
                  style={styles.upgradeButton}
                  compact
                >
                  Upgrade to Premium
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Health Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Metrics</Text>
          <View style={styles.metricsGrid}>
            <Card style={styles.metricCard}>
              <Card.Content style={styles.metricContent}>
                <Text style={styles.metricValue}>{healthMetrics.bmi}</Text>
                <Text style={styles.metricLabel}>BMI</Text>
                <Text style={[styles.metricCategory, { color: bmiCategory.color }]}>
                  {bmiCategory.category}
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.metricCard}>
              <Card.Content style={styles.metricContent}>
                <Text style={styles.metricValue}>{healthMetrics.dailyCalories}</Text>
                <Text style={styles.metricLabel}>Daily Calories</Text>
                <Text style={styles.metricCategory}>Goal</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Card style={styles.infoCard}>
            <Card.Content>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Height</Text>
                <TouchableOpacity
                  style={styles.infoValueContainer}
                  onPress={() => handleEditField('height', profile.height)}
                >
                  <Text style={styles.infoValue}>{profile.height} cm</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Weight</Text>
                <TouchableOpacity
                  style={styles.infoValueContainer}
                  onPress={() => handleEditField('weight', profile.weight)}
                >
                  <Text style={styles.infoValue}>{profile.weight} kg</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Age</Text>
                <TouchableOpacity
                  style={styles.infoValueContainer}
                  onPress={() => handleEditField('age', profile.age)}
                >
                  <Text style={styles.infoValue}>{profile.age} years</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Activity Level</Text>
                <TouchableOpacity
                  style={styles.infoValueContainer}
                  onPress={() => handleEditField('activityLevel', profile.activityLevel)}
                >
                  <Text style={styles.infoValue}>{profile.activityLevel}</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Goal</Text>
                <TouchableOpacity
                  style={styles.infoValueContainer}
                  onPress={() => handleEditField('goal', profile.goal)}
                >
                  <Text style={styles.infoValue}>{profile.goal}</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Macronutrient Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Macronutrient Goals</Text>
          <Card style={styles.macroCard}>
            <Card.Content>
              <View style={styles.macroRow}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{healthMetrics.proteinGoal}g</Text>
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{healthMetrics.carbGoal}g</Text>
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{healthMetrics.fatGoal}g</Text>
                  <Text style={styles.macroLabel}>Fat</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Allergies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergies</Text>
          <Card style={styles.preferencesCard}>
            <Card.Content>
              <View style={styles.chipContainer}>
                {allergies.map((allergy) => (
                  <TouchableOpacity
                    key={allergy}
                    style={[
                      styles.preferenceChip,
                      profile.allergies.includes(allergy) && styles.selectedChip
                    ]}
                    onPress={() => toggleAllergy(allergy)}
                  >
                    <Text style={[
                      styles.chipText,
                      profile.allergies.includes(allergy) && styles.selectedChipText
                    ]}>
                      {allergy}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Health Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Conditions</Text>
          <Card style={styles.preferencesCard}>
            <Card.Content>
              <View style={styles.chipContainer}>
                {healthConditions.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.preferenceChip,
                      profile.healthConditions.includes(condition) && styles.selectedChip
                    ]}
                    onPress={() => toggleHealthCondition(condition)}
                  >
                    <Text style={[
                      styles.chipText,
                      profile.healthConditions.includes(condition) && styles.selectedChipText
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Dietary Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <Card style={styles.preferencesCard}>
            <Card.Content>
              <View style={styles.chipContainer}>
                {dietaryPreferences.map((preference) => (
                  <TouchableOpacity
                    key={preference}
                    style={[
                      styles.preferenceChip,
                      profile.dietaryPreferences.includes(preference) && styles.selectedChip
                    ]}
                    onPress={() => toggleDietaryPreference(preference)}
                  >
                    <Text style={[
                      styles.chipText,
                      profile.dietaryPreferences.includes(preference) && styles.selectedChipText
                    ]}>
                      {preference}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Premium Features */}
        {profile.isPremium && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Premium Features</Text>
            <Card style={styles.premiumFeaturesCard}>
              <Card.Content>
                <TouchableOpacity
                  style={styles.premiumFeature}
                  onPress={() => navigation.navigate('DietPlan')}
                >
                  <View style={styles.premiumFeatureContent}>
                    <Ionicons name="calendar" size={24} color={theme.colors.primary} />
                    <View style={styles.premiumFeatureText}>
                      <Text style={styles.premiumFeatureTitle}>Personalized Diet Plan</Text>
                      <Text style={styles.premiumFeatureDescription}>
                        Get AI-generated weekly meal plans tailored to your goals
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.premiumFeature}>
                  <View style={styles.premiumFeatureContent}>
                    <Ionicons name="analytics" size={24} color={theme.colors.primary} />
                    <View style={styles.premiumFeatureText}>
                      <Text style={styles.premiumFeatureTitle}>Advanced Analytics</Text>
                      <Text style={styles.premiumFeatureDescription}>
                        Detailed insights into your nutrition trends and progress
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.premiumFeature}>
                  <View style={styles.premiumFeatureContent}>
                    <Ionicons name="restaurant" size={24} color={theme.colors.primary} />
                    <View style={styles.premiumFeatureText}>
                      <Text style={styles.premiumFeatureTitle}>Exclusive Recipes</Text>
                      <Text style={styles.premiumFeatureDescription}>
                        Access to premium recipe collection and chef recommendations
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Edit Modal */}
      <Portal>
        <Modal
          visible={showEditModal}
          onDismiss={() => setShowEditModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Edit {editingField.charAt(0).toUpperCase() + editingField.slice(1)}
            </Text>
            
            {editingField === 'activityLevel' ? (
              <ScrollView style={styles.optionsList}>
                {activityLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={styles.optionItem}
                    onPress={() => {
                      setProfile(prev => ({ ...prev, activityLevel: level as any }));
                      setShowEditModal(false);
                    }}
                  >
                    <Text style={styles.optionText}>{level}</Text>
                    {profile.activityLevel === level && (
                      <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : editingField === 'goal' ? (
              <ScrollView style={styles.optionsList}>
                {goals.map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    style={styles.optionItem}
                    onPress={() => {
                      setProfile(prev => ({ ...prev, goal: goal as any }));
                      setShowEditModal(false);
                    }}
                  >
                    <Text style={styles.optionText}>{goal}</Text>
                    {profile.goal === goal && (
                      <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <TextInput
                value={editValue}
                onChangeText={setEditValue}
                placeholder={`Enter ${editingField}`}
                style={styles.modalInput}
                keyboardType={editingField === 'height' || editingField === 'weight' || editingField === 'age' ? 'numeric' : 'default'}
              />
            )}

            <View style={styles.modalButtons}>
              <Button
                mode="outlined"
                onPress={() => setShowEditModal(false)}
                style={styles.modalButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={saveEdit}
                style={styles.modalButton}
                disabled={editingField === 'activityLevel' || editingField === 'goal'}
              >
                Save
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.h4,
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  premiumBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
  },
  premiumText: {
    ...typography.body2,
    color: theme.colors.warning,
    fontWeight: '600',
  },
  upgradeButton: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
  },
  section: {
    margin: spacing.md,
  },
  sectionTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  metricContent: {
    alignItems: 'center',
    padding: spacing.md,
  },
  metricValue: {
    ...typography.h3,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  metricLabel: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: spacing.xs,
  },
  metricCategory: {
    ...typography.caption,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoLabel: {
    ...typography.body2,
    color: theme.colors.textPrimary,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    marginRight: spacing.xs,
  },
  macroCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    ...typography.h4,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  macroLabel: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  preferencesCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preferenceChip: {
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    ...typography.body2,
    color: theme.colors.textSecondary,
  },
  selectedChipText: {
    color: theme.colors.surface,
    fontWeight: '600',
  },
  premiumFeaturesCard: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  premiumFeature: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  premiumFeatureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumFeatureText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  premiumFeatureTitle: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  premiumFeatureDescription: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    margin: spacing.lg,
    borderRadius: theme.roundness,
    padding: spacing.lg,
  },
  modalContent: {
    maxHeight: 400,
  },
  modalTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: theme.colors.surfaceVariant,
    marginBottom: spacing.lg,
  },
  optionsList: {
    maxHeight: 200,
    marginBottom: spacing.lg,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionText: {
    ...typography.body2,
    color: theme.colors.textPrimary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});

export default ProfileScreen;