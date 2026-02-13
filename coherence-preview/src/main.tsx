import { createRoot } from 'react-dom/client';
import '@charm-ux/cui/dist/themes/cui/theme.css';
import '@charm-ux/cui/dist/themes/cui/reset.css';
import AzureFunctionCard from './AzureFunctionCard';

const root = createRoot(document.getElementById('root')!);
root.render(
  <div style={{
    fontFamily: 'var(--font-family-base)',
    background: 'var(--neutral-background-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  }}>
    <AzureFunctionCard />
  </div>
);
