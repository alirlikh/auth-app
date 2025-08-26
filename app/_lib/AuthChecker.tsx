'use client';

import { ReactNode } from 'react';
import { useAuth } from './authContext';
import LoadingSpinner from '../component/LoadingSpinner/LoadingSpinner';


const AuthChecker = ({ children }:{children : ReactNode}) => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />
  }

  return children;
};

export default AuthChecker;
