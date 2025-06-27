import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

export default function AppHeader({ navigation, back, title }) {
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        elevation: 4,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (back) {
            navigation.goBack();
          } else {
            // Access the parent drawer navigator
            navigation.getParent()?.dispatch(DrawerActions.toggleDrawer());
          }
        }}
      >
        <Ionicons name={back ? 'arrow-back' : 'menu'} size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ marginLeft: 16, fontSize: 18 }}>{title}</Text>
    </View>
  );
}