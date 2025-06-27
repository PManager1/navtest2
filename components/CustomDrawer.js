import React, { useState, useEffect } from 'react';
import { View, Linking, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuthStore } from '../store/useAuthStore';

const { width } = Dimensions.get('window');
const drawerWidth = width * 0.85; // Slightly narrower for a sleeker look

const smoothEasing = Easing.bezier(0.4, 0, 0.2, 1); // Smooth, modern easing

export default function CustomDrawer(props) {

  const navigation = props.navigation;
  // const user = useAuthStore.getState().user;
  // const userName = user?.firstName;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    logout();
    alert('Signed out successfully');
    navigation.navigate('Signin');
  };

  const handleContact = async () => {
    const mailUrl = `mailto:jaylimousa@gmail.com?subject=${encodeURIComponent('Support Request')}&body=${encodeURIComponent('Hi, I need help with...')}`;
    try {
      if (await Linking.canOpenURL(mailUrl)) {
        await Linking.openURL(mailUrl);
      } else {
        alert('Email app not available');
      }
    } catch (error) {
      alert('Failed to open mail app');
    }
  };

  const drawerStatus = useDrawerStatus();
  const [expanded, setExpanded] = useState(null);

  // Simplified animations
  const drawerTranslateX = useSharedValue(-drawerWidth);
  const profileOpacity = useSharedValue(0);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (drawerStatus === 'open') {
      drawerTranslateX.value = withTiming(0, { duration: 300, easing: smoothEasing });
      profileOpacity.value = withTiming(1, { duration: 400, easing: smoothEasing });
      backdropOpacity.value = withTiming(0.5, { duration: 300, easing: smoothEasing });
    } else {
      drawerTranslateX.value = withTiming(-drawerWidth, { duration: 300, easing: smoothEasing });
      profileOpacity.value = withTiming(0, { duration: 200, easing: smoothEasing });
      backdropOpacity.value = withTiming(0, { duration: 200, easing: smoothEasing });
    }
  }, [drawerStatus]);

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drawerTranslateX.value }],
  }));

  const animatedProfileStyle = useAnimatedStyle(() => ({
    opacity: profileOpacity.value,
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const ActionButton = ({ icon, text, onPress, bgColor }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.actionButton, { backgroundColor: bgColor }]}>
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={styles.actionButtonText}>{text}</Text>
    </TouchableOpacity>
  );

  const AccordionItem = ({ text, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.accordionItem}>
      <Text style={styles.accordionItemText}>{text}</Text>
    </TouchableOpacity>
  );

  const Accordion = ({ title, items, isExpanded, onToggle }) => {
    const height = useSharedValue(isExpanded ? 'auto' : 0);
    const opacity = useSharedValue(isExpanded ? 1 : 0);
    const chevronRotation = useSharedValue(isExpanded ? 180 : 0);

    useEffect(() => {
      height.value = withTiming(isExpanded ? 'auto' : 0, { duration: 300, easing: smoothEasing });
      opacity.value = withTiming(isExpanded ? 1 : 0, { duration: 300, easing: smoothEasing });
      chevronRotation.value = withTiming(isExpanded ? 180 : 0, { duration: 200, easing: smoothEasing });
    }, [isExpanded]);

    const animatedContentStyle = useAnimatedStyle(() => ({
      height: height.value,
      opacity: opacity.value,
    }));

    const animatedChevronStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${chevronRotation.value}deg` }],
    }));

    return (
      <View style={styles.accordionContainer}>
        <TouchableOpacity onPress={onToggle} style={styles.accordionHeader}>
          <Text style={styles.accordionTitle}>{title}</Text>
          <Animated.View style={animatedChevronStyle}>
            <Ionicons name="chevron-down" size={18} color="#60A5FA" />
          </Animated.View>
        </TouchableOpacity>
        <Animated.View style={[styles.accordionContent, animatedContentStyle]}>
          {items.map((item) => (
            <AccordionItem
              key={item.text}
              text={item.text}
              onPress={() => {
                if (['ProfileUpdateScreen', 'DocumentUploadScreen'].includes(item.screen)) {
                  navigation.navigate('Profile', { screen: item.screen });
                } else {
                  navigation.navigate(item.screen);
                }
              }}
            />
          ))}
        </Animated.View>
      </View>
    );
  };

  const accordions = [
    {
      title: 'Rider App',
      items: [
        { text: 'Home', screen: 'RiderHome' },
        // { text: 'Profile Update', screen: 'ProfileUpdateScreen' },
        { text: 'Ride Options', screen: 'RideOptions' },
        { text: 'Ride Plan', screen: 'RidePlan' },
        { text: 'Ride Confirm', screen: 'RideConfirm' },
        { text: 'Ride Incoming', screen: 'RideIncoming' },
        { text: 'Ride Waiting', screen: 'RideWaiting' },
      ],
    },
    {
      title: 'Profile',
      items: [
        { text: 'Signup', screen: 'Signup' },
        { text: 'Edit Profile', screen: 'ProfileUpdateScreen' },
        { text: 'Your Documents', screen: 'DocumentUploadScreen' },
      ],
    },
    {
      title: 'Account',
      items: [
        { text: 'Refer Points', screen: 'ReferScreen' },
        { text: 'Subscription', screen: 'ManageSubscription' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { text: 'Help', screen: null },
        { text: 'Settings', screen: 'Settings' },
      ],
    },
  ];

  const handleAccordionToggle = (title) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.backdrop, animatedBackdropStyle]} />
      <Animated.View style={[styles.container, animatedDrawerStyle]}>
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
          <LinearGradient colors={['#1E40AF', '#3B82F6']} style={styles.header}>
            <Animated.View style={[styles.headerContent, animatedProfileStyle]}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100' }}
                style={styles.profileImage}
              />
              <View style={styles.headerTextContainer}>
                {/* {userName && <Text style={styles.name}>{userName}</Text>} */}
                <View style={styles.statsContainer}>
                  {['❤️ 124', '★ 4.9', '🚗 1,234'].map((text, index) => (
                    <Text key={index} style={styles.headerText}>{text}</Text>
                  ))}
                </View>
              </View>
            </Animated.View>
          </LinearGradient>

          <View style={styles.accordionSection}>
            {accordions.map((accordion) => (
              <Accordion
                key={accordion.title}
                title={accordion.title}
                items={accordion.items}
                isExpanded={expanded === accordion.title}
                onToggle={() => handleAccordionToggle(accordion.title)}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <ActionButton icon="help-circle" text="Help" onPress={handleContact} bgColor="#3B82F6" />
              <ActionButton icon="log-out-outline" text="Logout" onPress={handleLogout} bgColor="#EF4444" />
            </View>
          </View>
        </DrawerContentScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#111827',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    width: drawerWidth,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    paddingTop: 32,
    borderTopRightRadius: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  headerText: {
    fontSize: 12,
    color: '#BFDBFE',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  accordionSection: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  accordionContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    marginVertical: 4,
  },
  accordionHeader: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  accordionContent: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    overflow: 'hidden',
  },
  accordionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  accordionItemText: {
    fontSize: 15,
    color: '#D1D5DB',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  footer: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
});