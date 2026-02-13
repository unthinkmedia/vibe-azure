import { useState } from 'react';
import { CuiCheckbox } from '@charm-ux/cui/dist/react/index.js';

const colors = [
  { name: 'Red', hex: '#e74c3c' },
  { name: 'Blue', hex: '#3498db' },
  { name: 'Green', hex: '#2ecc71' },
  { name: 'Purple', hex: '#9b59b6' },
  { name: 'Orange', hex: '#e67e22' },
];

export default function ColorCheckboxes() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ margin: 0 }}>Select Colors</h3>
      {colors.map(c => (
        <CuiCheckbox
          key={c.name}
          label={c.name}
          checked={selected.has(c.name)}
          onChange={() => toggle(c.name)}
        />
      ))}
      {selected.size > 0 && (
        <p style={{ margin: '8px 0 0' }}>
          Selected: {[...selected].join(', ')}
        </p>
      )}
    </div>
  );
}
