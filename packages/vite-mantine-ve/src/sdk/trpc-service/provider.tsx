import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import type { PropsWithChildren } from 'react';
import { memo, useState } from 'react';
import { trpcService } from '../trpc-service';

export const TrpcServiceProvider = memo<PropsWithChildren>(({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpcService.createClient({
      links: [httpBatchLink({ url: '/api/trpc-service' })],
    }),
  );

  return (
    <trpcService.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcService.Provider>
  );
});

TrpcServiceProvider.displayName = 'TrpcServiceProvider';
