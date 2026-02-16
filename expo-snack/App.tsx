import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { CAST_FONTS } from './fonts';
import {
  CastThemeProvider,
  Card,
  Button,
  whiteLabel,
  consumer,
  corporate,
  luxury,
} from '@castui/cast-ui';

const themes = [
  { name: 'White Label', value: whiteLabel },
  { name: 'Consumer', value: consumer },
  { name: 'Corporate', value: corporate },
  { name: 'Luxury', value: luxury },
];

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = themes[themeIndex];

  const [fontsLoaded] = useFonts(CAST_FONTS);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const handleButtonPress = () => {
    alert('Button pressed!');
  };

  const surface = currentTheme.value.semantic.color.surface;

  return (
    <CastThemeProvider theme={currentTheme.value}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: surface }]}>
        <ScrollView style={[styles.container, { backgroundColor: surface }]}>
          <View style={styles.content}>
            <Text style={[styles.title, { color: currentTheme.value.semantic.color.onSurface }]}>Cast UI Components Demo</Text>
            <Text style={[styles.themeName, { color: currentTheme.value.semantic.color.onSurfaceMuted }]}>Theme: {currentTheme.name}</Text>

            <View style={styles.switcher}>
              <Button label="Switch Theme →" onPress={cycleTheme} />
            </View>

            <Card
              title="Welcome Card"
              subtitle="Getting Started"
              body="This is a simple card component from @castui/cast-ui. Cards are great for displaying grouped content."
            />

            <Card
              title="Interactive Card"
              body="This card contains a button component. Click it to see the interaction!"
              actions={<Button label="Click Me" onPress={handleButtonPress} />}
            />

            <Card
              title="Button Variants"
              body="Different button styles and configurations:"
              actions={
                <>
                  <Button label="Primary" onPress={handleButtonPress} />
                  <Button label="Secondary" variant="outline" onPress={handleButtonPress} />
                  <Button label="Text" variant="text" onPress={handleButtonPress} />
                </>
              }
            />

            <Card
              title="Disabled State"
              body="Buttons can be disabled to prevent interaction."
              actions={
                <>
                  <Button label="Enabled" onPress={handleButtonPress} />
                  <Button label="Disabled" disabled onPress={handleButtonPress} />
                </>
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </CastThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  themeName: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  switcher: {
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
