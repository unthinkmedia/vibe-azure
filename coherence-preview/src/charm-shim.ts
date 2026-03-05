/**
 * Thin React shim for Coherence web components.
 *
 * Instead of pulling `@charm-ux/cui` from a private npm feed that requires
 * authentication, the preview app loads the Coherence CDN lazy-loader in
 * index.html.  The lazy-loader auto-registers every `<cui-*>` custom element
 * at runtime.  React 19 handles web-component properties, events, and refs
 * natively, so this shim is just a `createElement` passthrough that preserves
 * the PascalCase import names all experiments already use.
 */

import { createElement, forwardRef, type ComponentPropsWithRef } from 'react';

type CuiProps = ComponentPropsWithRef<any> & Record<string, unknown>;

function wrap(tag: string) {
  const Wrapped = forwardRef<HTMLElement, CuiProps>((props, ref) =>
    createElement(tag, { ...props, ref }),
  );
  Wrapped.displayName = tag
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');
  return Wrapped;
}

// Every CuiXxx component used across experiments & patterns
export const CuiAccordion = wrap('cui-accordion');
export const CuiAccordionItem = wrap('cui-accordion-item');
export const CuiAppFrame = wrap('cui-app-frame');
export const CuiAvatar = wrap('cui-avatar');
export const CuiBadge = wrap('cui-badge');
export const CuiBreadcrumb = wrap('cui-breadcrumb');
export const CuiBreadcrumbItem = wrap('cui-breadcrumb-item');
export const CuiButton = wrap('cui-button');
export const CuiCard = wrap('cui-card');
export const CuiCheckbox = wrap('cui-checkbox');
export const CuiDataGrid = wrap('cui-data-grid');
export const CuiDivider = wrap('cui-divider');
export const CuiDrawer = wrap('cui-drawer');
export const CuiHeader = wrap('cui-header');
export const CuiIcon = wrap('cui-icon');
export const CuiInput = wrap('cui-input');
export const CuiLink = wrap('cui-link');
export const CuiMenu = wrap('cui-menu');
export const CuiMenuItem = wrap('cui-menu-item');
export const CuiMessageBar = wrap('cui-message-bar');
export const CuiNavHeading = wrap('cui-nav-heading');
export const CuiNavItem = wrap('cui-nav-item');
export const CuiPersona = wrap('cui-persona');
export const CuiPopOver = wrap('cui-pop-over');
export const CuiRadio = wrap('cui-radio');
export const CuiRadioGroup = wrap('cui-radio-group');
export const CuiSearchBox = wrap('cui-search-box');
export const CuiSelect = wrap('cui-select');
export const CuiSideNav = wrap('cui-side-nav');
export const CuiTab = wrap('cui-tab');
export const CuiTable = wrap('cui-table');
export const CuiTabPanel = wrap('cui-tab-panel');
export const CuiTabs = wrap('cui-tabs');
export const CuiTag = wrap('cui-tag');
export const CuiTextArea = wrap('cui-text-area');
export const CuiToolbar = wrap('cui-toolbar');
