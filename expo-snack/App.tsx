import { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useFonts } from 'expo-font';
import { CAST_FONTS } from './fonts';
import {
  CastThemeProvider,
  Typography,
  Button,
  Card,
  TextField,
  Checkbox,
  Switch,
  Chip,
  Badge,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  AppBar,
  Link,
  Table,
  Skeleton,
  Select,
  FAB,
  defaultTheme,
  createTheme,
} from '@castui/cast-ui';

import consumerOverrides from './themes/consumer.json';
import corporateOverrides from './themes/corporate.json';
import luxuryOverrides from './themes/luxury.json';

const consumerTheme = createTheme(consumerOverrides);
const corporateTheme = createTheme(corporateOverrides);
const luxuryTheme = createTheme(luxuryOverrides);

const themes = [
  { name: 'Default', value: defaultTheme },
  { name: 'Consumer', value: consumerTheme },
  { name: 'Corporate', value: corporateTheme },
  { name: 'Luxury', value: luxuryTheme },
];

// ---------------------------------------------------------------------------
// Section helper
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Typography variant="h3">{title}</Typography>
      {children}
    </View>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = themes[themeIndex];

  const [fontsLoaded] = useFonts(CAST_FONTS);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string | undefined>();
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set(['design']));
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const cycleTheme = () => setThemeIndex((prev) => (prev + 1) % themes.length);

  const toggleChip = (id: string) => {
    setSelectedChips((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const surface = currentTheme.value.semantic.colour.surface;

  return (
    <CastThemeProvider theme={currentTheme.value}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: surface }]}>
        <AppBar
          title={`Cast UI — ${currentTheme.name}`}
          trailing={
            <Button label="Theme ↻" variant="text" onPress={cycleTheme} />
          }
        />

        <ScrollView style={[styles.scroll, { backgroundColor: surface }]}>
          <View style={styles.content}>

            {/* ── Typography ─────────────────────────── */}
            <Section title="Typography">
              <Typography variant="display">Display</Typography>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="subtitle">Subtitle</Typography>
              <Typography variant="body">Body text for content.</Typography>
              <Typography variant="small">Small text</Typography>
              <Typography variant="caption">Caption text</Typography>
              <Typography variant="overline">Overline</Typography>
              <Typography variant="label">Label</Typography>
            </Section>

            <Divider />

            {/* ── Form Controls ──────────────────────── */}
            <Section title="Form Controls">
              <TextField
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              <TextField
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                helperText={email && !email.includes('@') ? 'Enter a valid email' : undefined}
                error={!!email && !email.includes('@')}
              />
              <Select
                label="Role"
                placeholder="Select a role..."
                options={[
                  { label: 'Designer', value: 'designer' },
                  { label: 'Developer', value: 'developer' },
                  { label: 'Product Manager', value: 'pm' },
                ]}
                value={role}
                onSelect={setRole}
              />
              <Checkbox
                label="I agree to the terms and conditions"
                checked={agreedTerms}
                onValueChange={setAgreedTerms}
              />
              <View style={styles.row}>
                <Button label="Submit" onPress={() => setShowSnackbar(true)} />
                <Button label="Reset" variant="outline" onPress={() => {
                  setName('');
                  setEmail('');
                  setRole(undefined);
                  setAgreedTerms(false);
                }} />
              </View>
            </Section>

            <Divider />

            {/* ── Cards ──────────────────────────────── */}
            <Section title="Cards">
              <Card
                title="Getting Started"
                subtitle="Quick setup guide"
                body="Install the package, wrap your app in CastThemeProvider, and start using components. All styling is handled by design tokens."
              />
              <Card
                title="Need Help?"
                body="Check out the documentation or reach out to the team."
                actions={
                  <>
                    <Button label="Docs" variant="filled" onPress={() => {}} />
                    <Button label="Contact" variant="outline" onPress={() => {}} />
                  </>
                }
              />
            </Section>

            <Divider />

            {/* ── Toggles & Chips ────────────────────── */}
            <Section title="Toggles & Chips">
              <Switch label="Notifications" value={notifications} onValueChange={setNotifications} />
              <Switch label="Dark Mode" value={darkMode} onValueChange={setDarkMode} />
              <Typography variant="label">Interests</Typography>
              <View style={styles.row}>
                {['design', 'code', 'product', 'research'].map((id) => (
                  <Chip
                    key={id}
                    label={id.charAt(0).toUpperCase() + id.slice(1)}
                    selected={selectedChips.has(id)}
                    onPress={() => toggleChip(id)}
                  />
                ))}
              </View>
            </Section>

            <Divider />

            {/* ── Buttons ────────────────────────────── */}
            <Section title="Buttons">
              <View style={styles.row}>
                <Button label="Filled" onPress={() => {}} />
                <Button label="Outline" variant="outline" onPress={() => {}} />
                <Button label="Text" variant="text" onPress={() => {}} />
              </View>
              <View style={styles.row}>
                <Button label="Disabled" disabled onPress={() => {}} />
                <FAB
                  icon={<Typography variant="label" color="#fff">+</Typography>}
                  onPress={() => {}}
                />
                <FAB
                  icon={<Typography variant="label" color="#fff">+</Typography>}
                  label="Create"
                  variant="extended"
                  onPress={() => {}}
                />
              </View>
            </Section>

            <Divider />

            {/* ── Alerts ─────────────────────────────── */}
            <Section title="Alerts">
              <Alert severity="info" title="Information">
                This is an informational message.
              </Alert>
              <Alert severity="success" title="Success">
                Operation completed successfully.
              </Alert>
              <Alert severity="warning">
                Proceed with caution.
              </Alert>
              <Alert severity="error" title="Error" onDismiss={() => {}}>
                Something went wrong. Please try again.
              </Alert>
            </Section>

            <Divider />

            {/* ── Table ──────────────────────────────── */}
            <Section title="Table">
              <Table
                columns={[
                  { key: 'name', header: 'Name' },
                  { key: 'role', header: 'Role' },
                  { key: 'status', header: 'Status' },
                ]}
                data={[
                  { name: 'Alice', role: 'Engineer', status: 'Active' },
                  { name: 'Bob', role: 'Designer', status: 'Active' },
                  { name: 'Charlie', role: 'PM', status: 'Away' },
                ]}
              />
            </Section>

            <Divider />

            {/* ── Badge & Link ───────────────────────── */}
            <Section title="Badge & Link">
              <View style={styles.row}>
                <Badge content={3}>
                  <View style={styles.badgeTarget}>
                    <Typography variant="caption" align="center">Inbox</Typography>
                  </View>
                </Badge>
                <Badge content={99}>
                  <View style={styles.badgeTarget}>
                    <Typography variant="caption" align="center">Alerts</Typography>
                  </View>
                </Badge>
                <Badge>
                  <View style={styles.badgeTarget}>
                    <Typography variant="caption" align="center">New</Typography>
                  </View>
                </Badge>
              </View>
              <View style={styles.row}>
                <Link onPress={() => {}}>Learn more</Link>
                <Typography variant="body"> · </Typography>
                <Link onPress={() => {}}>Documentation</Link>
              </View>
            </Section>

            <Divider />

            {/* ── Skeleton Loading ────────────────────── */}
            <Section title="Skeleton Loading">
              <View style={styles.row}>
                <Skeleton variant="circle" />
                <View style={{ flex: 1, gap: 8 }}>
                  <Skeleton variant="text" height={16} />
                  <Skeleton variant="text" width={160} height={16} />
                </View>
              </View>
              <Skeleton variant="rectangle" height={80} />
            </Section>

            <Divider />

            {/* ── Dialog & Snackbar ───────────────────── */}
            <Section title="Dialog & Snackbar">
              <View style={styles.row}>
                <Button label="Show Dialog" onPress={() => setShowDialog(true)} />
                <Button label="Show Snackbar" variant="outline" onPress={() => setShowSnackbar(true)} />
              </View>
            </Section>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>

        {/* ── Overlays ──────────────────────────────── */}
        <Dialog
          visible={showDialog}
          title="Confirm Action"
          actions={
            <>
              <Button label="Cancel" variant="text" onPress={() => setShowDialog(false)} />
              <Button label="Confirm" onPress={() => setShowDialog(false)} />
            </>
          }
        >
          Are you sure you want to proceed? This action cannot be undone.
        </Dialog>

        {showSnackbar ? (
          <View style={styles.snackbarContainer}>
            <Snackbar
              message="Action completed successfully."
              action="Dismiss"
              visible={showSnackbar}
              onAction={() => setShowSnackbar(false)}
            />
          </View>
        ) : null}

      </SafeAreaView>
    </CastThemeProvider>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTarget: {
    width: 48,
    height: 48,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snackbarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },
});
