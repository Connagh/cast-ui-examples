import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  CastThemeProvider,
  Button,
  Card,
  googleFontsUrl,
  whiteLabel,
  consumer,
  corporate,
  luxury,
} from '@castui/cast-ui';
import type { CastTheme } from '@castui/cast-ui';

const themes: CastTheme[] = [whiteLabel, consumer, corporate, luxury];

function AppContent({ onCycleTheme }: { onCycleTheme: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <Card
          title="Theme Preview"
          subtitle="Cast UI Design System"
          body="This card demonstrates the theme's surface treatment, typography, elevation, and border radius. Try switching themes to see how each design language transforms the same components."
          actions={
            <View style={styles.cardActions}>
              <Button label="Primary Action" variant="filled" onPress={() => {}} />
              <Button label="Secondary" variant="outline" onPress={() => {}} />
            </View>
          }
        />
      </View>

      <View style={styles.buttonRow}>
        <Button label="Change Theme" variant="filled" onPress={onCycleTheme} />
        <Button label="Outline" variant="outline" onPress={() => {}} />
        <Button label="Text" variant="text" onPress={() => {}} />
      </View>
    </View>
  );
}

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = themes[themeIndex];

  const cycleTheme = () => setThemeIndex((i) => (i + 1) % themes.length);

  // Dynamic font loading
  useEffect(() => {
    const url = googleFontsUrl(currentTheme.name);
    const linkId = 'cast-ui-fonts';
    let link = document.getElementById(linkId) as HTMLLinkElement | null;

    if (url) {
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = url;
    } else if (link) {
      link.remove();
    }
  }, [currentTheme]);

  // Sync body background with theme surface color
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.semantic.color.surface;
    document.body.style.color = currentTheme.semantic.color.onSurface;
  }, [currentTheme]);

  return (
    <CastThemeProvider theme={currentTheme}>
      <AppContent onCycleTheme={cycleTheme} />
    </CastThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
    minHeight: '100vh' as unknown as number,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 480,
    marginBottom: 40,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
