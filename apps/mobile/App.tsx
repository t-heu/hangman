//import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import HomeScreen from './src/pages/Home'
import GameScreen from './src/pages/Game'
import LobbyScreen from './src/pages/Lobby'

interface ThemeParams {
  selectedWord?: any; // Adjust the type according to your data structure
  code: string;
  wordArray?: any
  currentPlayerUID?: number | string;
  indexTheme?: number;
}

export type ScreenNames = "Home"| "Game" | "Lobby"
// Defina o tipo de navegação para cada tela
export type RootStackParamList = {
  Home: undefined; // Tela "Home" sem parâmetros
  Game: ThemeParams; // Tela "Game" com parâmetros de ThemeParams
  Lobby: ThemeParams; // Tela "Lobby" com parâmetros de ThemeParams
};
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'sourceCodePro': require('./assets/fonts/sourceCodePro/SourceCodePro-SemiBold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
