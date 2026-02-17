export const styles = `
  body { margin: 0; }
  [slot='main'] { min-width: 320px; }
  @media (max-width: 768px) {
    [slot='main'] { padding: 24px 16px !important; }
  }
`;
