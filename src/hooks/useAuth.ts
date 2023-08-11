import { useContext } from 'react';
import { AuthContext } from '../hocs/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}
