import React, { FormEvent } from 'react';
import {
  CuiButton,
  CuiCheckbox,
  CuiDivider,
  CuiInput,
  CuiSelect,
} from '@charm-ux/cui/react';

export const PageContent: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ padding: '40px 72px', maxWidth: 720 }}>
      <h1 className="font-base600 font-semi-bold" style={{ margin: '0 0 8px' }}>
        Create an Account
      </h1>
      <p
        style={{
          fontSize: 'var(--font-size-base-300)',
          lineHeight: 'var(--line-height-base-300)',
          color: 'var(--neutral-foreground-2)',
          margin: '0 0 24px',
        }}
      >
        Fill in the details below to register for a new account.
      </p>

      <CuiDivider style={{ margin: '0 0 24px' }} />

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <h2 className="font-base500 font-semi-bold" style={{ margin: '0 0 16px' }}>
          Personal Information
        </h2>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <CuiInput
            label="First name"
            name="firstName"
            required
            placeholder="Enter first name"
            style={{ flex: 1 }}
          />
          <CuiInput
            label="Last name"
            name="lastName"
            required
            placeholder="Enter last name"
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <CuiInput
            label="Email address"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <CuiInput
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="(555) 555-5555"
            helpText="Optional"
          />
        </div>

        <CuiDivider style={{ margin: '8px 0 24px' }} />

        {/* Account Details */}
        <h2 className="font-base500 font-semi-bold" style={{ margin: '0 0 16px' }}>
          Account Details
        </h2>

        <div style={{ marginBottom: 16 }}>
          <CuiInput
            label="Username"
            name="username"
            required
            placeholder="Choose a username"
          />
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <CuiInput
            label="Password"
            name="password"
            type="password"
            required
            placeholder="Create a password"
            style={{ flex: 1 }}
          />
          <CuiInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            required
            placeholder="Re-enter password"
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <CuiSelect label="Role" name="role" required>
            <option value="">Select a role</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
          </CuiSelect>
        </div>

        <CuiDivider style={{ margin: '8px 0 24px' }} />

        {/* Terms */}
        <div style={{ marginBottom: 24 }}>
          <CuiCheckbox>
            I agree to the Terms of Service and Privacy Policy
          </CuiCheckbox>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <CuiButton appearance="primary" type="submit">
            Register
          </CuiButton>
          <CuiButton appearance="outline" type="reset">
            Clear form
          </CuiButton>
        </div>
      </form>
    </div>
  );
};
