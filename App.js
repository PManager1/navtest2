import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Details')}
      >
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>Details Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function DrawerContent() {
  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerText}>Menu</Text>
      <TouchableOpacity style={styles.drawerItem}>
        <Text>Option 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text>Option 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text>Option 3</Text>
      </TouchableOpacity>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false, // Hide the header for Home screen
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the header for all stack screens
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  drawerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  drawerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
});