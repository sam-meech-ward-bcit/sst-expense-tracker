/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedNewExpenseImport } from './routes/_authenticated/new-expense'
import { Route as AuthenticatedAllExpensesImport } from './routes/_authenticated/all-expenses'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedNewExpenseRoute = AuthenticatedNewExpenseImport.update({
  path: '/new-expense',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAllExpensesRoute = AuthenticatedAllExpensesImport.update({
  path: '/all-expenses',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/all-expenses': {
      preLoaderRoute: typeof AuthenticatedAllExpensesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/new-expense': {
      preLoaderRoute: typeof AuthenticatedNewExpenseImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedAllExpensesRoute,
    AuthenticatedNewExpenseRoute,
    AuthenticatedProfileRoute,
    AuthenticatedIndexRoute,
  ]),
  AboutRoute,
])

/* prettier-ignore-end */
