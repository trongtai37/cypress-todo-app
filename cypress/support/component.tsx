// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import React from 'react';
import { Provider } from 'react-redux';
import { StoreState, getStore } from '../../src/store';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { MountOptions, MountReturn, mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mountWithRedux(
        component: React.ReactNode,
        options?: MountOptions & { reduxStore?: StoreState }
      ): Cypress.Chainable<MountReturn>;
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

Cypress.Commands.add(
  'mountWithRedux',
  (component: React.ReactNode, options = {}) => {
    const { reduxStore = getStore(), ...mountOptions } = options;

    const wrapped = <Provider store={reduxStore as any}>{component}</Provider>;

    return mount(wrapped, mountOptions);
  }
);
