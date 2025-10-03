import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Card, Button, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, spacing, typography } from '../styles/theme';

const { width, height } = Dimensions.get('window');

interface DetectedFood {
  id: string;
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  image: string;
}

const CameraScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedFoods, setDetectedFoods] = useState<DetectedFood[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    getCameraPermissions();
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (!cameraRef || isScanning) return;

    setIsScanning(true);
    try {
      const photo = await cameraRef.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      setCapturedImage(photo.uri);
      await analyzeFood(photo.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const analyzeFood = async (imageUri: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI food recognition
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock detected foods data
      const mockDetectedFoods: DetectedFood[] = [
        {
          id: '1',
          name: 'Grilled Chicken Breast',
          confidence: 0.95,
          calories: 165,
          protein: 31,
          carbs: 0,
          fat: 3.6,
          fiber: 0,
          sugar: 0,
          image: imageUri,
        },
        {
          id: '2',
          name: 'Mixed Green Salad',
          confidence: 0.87,
          calories: 25,
          protein: 2,
          carbs: 5,
          fat: 0.3,
          fiber: 2,
          sugar: 3,
          image: imageUri,
        },
        {
          id: '3',
          name: 'Quinoa Bowl',
          confidence: 0.82,
          calories: 120,
          protein: 4,
          carbs: 22,
          fat: 2,
          fiber: 2.5,
          sugar: 0.9,
          image: imageUri,
        },
      ];
      
      setDetectedFoods(mockDetectedFoods);
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze food. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFoodSelect = (food: DetectedFood) => {
    navigation.navigate('NutritionDetail', { food });
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setDetectedFoods([]);
    setIsAnalyzing(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-off" size={64} color={theme.colors.textSecondary} />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          NutriTrack needs camera access to recognize food and calculate nutrition information.
        </Text>
        <Button
          mode="contained"
          onPress={getCameraPermissions}
          style={styles.permissionButton}
        >
          Grant Permission
        </Button>
      </View>
    );
  }

  if (capturedImage && detectedFoods.length > 0) {
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <TouchableOpacity onPress={retakePicture} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.resultsTitle}>Detected Foods</Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
          <Text style={styles.resultsSubtitle}>
            Tap on a food item to view detailed nutrition information
          </Text>
          
          {detectedFoods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.foodItem}
              onPress={() => handleFoodSelect(food)}
            >
              <Card style={styles.foodCard}>
                <Card.Content style={styles.foodContent}>
                  <View style={styles.foodImageContainer}>
                    <Image source={{ uri: food.image }} style={styles.foodImage} />
                    <View style={styles.confidenceBadge}>
                      <Text style={styles.confidenceText}>
                        {Math.round(food.confidence * 100)}%
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    
                    <View style={styles.nutritionPreview}>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{food.calories}</Text>
                        <Text style={styles.nutritionLabel}>Calories</Text>
                      </View>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{food.protein}g</Text>
                        <Text style={styles.nutritionLabel}>Protein</Text>
                      </View>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{food.carbs}g</Text>
                        <Text style={styles.nutritionLabel}>Carbs</Text>
                      </View>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{food.fat}g</Text>
                        <Text style={styles.nutritionLabel}>Fat</Text>
                      </View>
                    </View>
                  </View>
                  
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color={theme.colors.textSecondary} 
                  />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (capturedImage && isAnalyzing) {
    return (
      <View style={styles.analyzingContainer}>
        <View style={styles.analyzingContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.analyzingTitle}>Analyzing Food...</Text>
          <Text style={styles.analyzingText}>
            Our AI is identifying the food items and calculating nutrition information.
          </Text>
          <Image source={{ uri: capturedImage }} style={styles.analyzingImage} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.cameraOverlay}>
          {/* Header */}
          <View style={styles.cameraHeader}>
            <TouchableOpacity onPress={goBack} style={styles.headerButton}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.surface} />
            </TouchableOpacity>
            <Text style={styles.cameraTitle}>Scan Food</Text>
            <View style={styles.headerButton} />
          </View>

          {/* Scanning Area */}
          <View style={styles.scanningArea}>
            <View style={styles.scanningFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <Text style={styles.scanningText}>
              Position food within the frame
            </Text>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
              disabled={isScanning}
            >
              <View style={[
                styles.captureButtonInner,
                isScanning && styles.captureButtonDisabled
              ]}>
                {isScanning ? (
                  <ActivityIndicator size="small" color={theme.colors.surface} />
                ) : (
                  <Ionicons name="camera" size={32} color={theme.colors.surface} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraTitle: {
    ...typography.h5,
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  scanningArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  scanningFrame: {
    width: width * 0.8,
    height: width * 0.8,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanningText: {
    ...typography.body1,
    color: theme.colors.surface,
    textAlign: 'center',
    marginTop: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: theme.roundness,
  },
  bottomControls: {
    paddingBottom: 50,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: theme.colors.textDisabled,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: theme.colors.background,
  },
  permissionTitle: {
    ...typography.h4,
    color: theme.colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    ...typography.body1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: theme.colors.primary,
  },
  analyzingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  analyzingContent: {
    alignItems: 'center',
  },
  analyzingTitle: {
    ...typography.h4,
    color: theme.colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  analyzingText: {
    ...typography.body1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  analyzingImage: {
    width: 200,
    height: 200,
    borderRadius: theme.roundness,
    marginTop: spacing.lg,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  resultsHeader: {
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
  resultsTitle: {
    ...typography.h5,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  resultsList: {
    flex: 1,
    padding: spacing.md,
  },
  resultsSubtitle: {
    ...typography.body2,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  foodItem: {
    marginBottom: spacing.md,
  },
  foodCard: {
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  foodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  foodImageContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: theme.roundness,
  },
  confidenceBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  confidenceText: {
    ...typography.caption,
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    ...typography.h6,
    color: theme.colors.textPrimary,
    marginBottom: spacing.sm,
  },
  nutritionPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    ...typography.body2,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  nutritionLabel: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
});

export default CameraScreen;