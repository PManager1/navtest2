import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from './components/CustomDrawer'; // <-- add this line
import AppHeader from './AppHeader';


// Create Navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

// Details Screen
function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details Screen</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

// Profile Screen
function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button title="Go to Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
    </View>
  );
}

// Edit Profile Screen
function EditProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Profile Screen</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// Settings Screen
function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// Home Stack Navigator
// function HomeStack() {
//   return (
//     <Stack.Navigator
      
//       screenOptions={{
//         headerLeft: ({ canGoBack, navigation }) =>
//           canGoBack ? null : (
//             <Button
//               title="Menu"
//               // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//               onPress={() => navigation.getParent()?.toggleDrawer()}
//             />
//           ),
//       }}
//     >
//       <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
//       <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
//       <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
//     </Stack.Navigator>
//   );
// }



 function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route, options, back }) => (
          <AppHeader navigation={navigation} back={back} title={options.title} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Details" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
    </Stack.Navigator>
  );
}



// Profile Stack Navigator
// function ProfileStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerLeft: ({ canGoBack, navigation }) =>
//           canGoBack ? null : (
//             <Button
//               title="Menu"
//               // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//               onPress={() => navigation.getParent()?.toggleDrawer()}
//             />
//           ),
//       }}
//     >
//       <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
//       <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
//     </Stack.Navigator>
//   );
// }

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            header: () => <AppHeader title="Profile" />,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            header: () => <AppHeader title="Edit Profile" />,
          }}
        />
    </Stack.Navigator>
  );
}


function DrawerScreens() {
  return (
    <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false, // <--- important
        }}
      >

      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Details" component={DetailsScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />

      
    </Drawer.Navigator>
  );
}


// Root Layout with Drawer Navigator
export default function App() {
  return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
            <DrawerScreens />
          </NavigationContainer>
            
            {/* <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Drawer" component={DrawerScreens} />
            </Stack.Navigator>
          </NavigationContainer> */}
          </View>
  );
}

//  return (
//     <NavigationContainer>
//        <Drawer.Navigator>
//             <Drawer.Screen
//               name="HomeStack"
//               component={HomeStack}
//               options={{ drawerLabel: 'Home', headerShown: false }}
//             />
//             <Drawer.Screen
//               name="ProfileStack"
//               component={ProfileStack}
//               options={{ drawerLabel: 'Profile', headerShown: false }}
//             />
//             <Drawer.Screen
//               name="Settings"
//               component={SettingsScreen}
//               options={{ drawerLabel: 'Settings', headerShown: false }}
//             />
//           </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});