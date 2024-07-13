import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ColorSchemeToggle } from './color-scheme-toggle';
import { TrpcServiceProvider } from './sdk/trpc-service/provider';
import { theme } from './theme';
import { TrpcUserList } from './trpc-user-list';
import { Welcome } from './welcome';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Welcome />
      <ColorSchemeToggle />
      <TrpcServiceProvider>
        <TrpcUserList />
      </TrpcServiceProvider>
    </MantineProvider>
  );
}
