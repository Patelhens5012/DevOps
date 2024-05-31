import { Integrations } from '@sentry/tracing';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
