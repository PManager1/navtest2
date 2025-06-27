// CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({ title }) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.header}>
      {canGoBack && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
  },
  iconContainer: {
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});