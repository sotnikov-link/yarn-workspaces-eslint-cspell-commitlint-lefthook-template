import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ColorSchemeToggle } from './color-scheme-toggle';
import { theme } from './theme';
import { Welcome } from './welcome';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Welcome />
      <ColorSchemeToggle />
    </MantineProvider>
  );
}
