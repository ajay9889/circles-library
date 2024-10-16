import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsUserLoggedIn } from './auth/auth.slice';
import { AuthContainer } from './auth/auth-container';
import { MarketConfig } from './market-configs/market-config.type';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  marketConfig: MarketConfig;
  marketLogo: any; // Assuming marketLogo is a local image file or a URL
  [key: string]: any;
}

export function ProtectedRoute({
  component: Component,
  marketConfig,
  marketLogo,
  ...rest
}: ProtectedRouteProps) {
  const isLoggedIn = useSelector(selectIsUserLoggedIn);

  if (!isLoggedIn) {
    return (
      <AuthContainer marketConfig={marketConfig} marketLogo={marketLogo} />
    );
  }

  return (
    <Component marketConfig={marketConfig} marketLogo={marketLogo} {...rest} />
  );
}
