import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function useLoginStatus() {
  const { login } = useAuth();
  const history = useHistory();

  useEffect(() => {
    // Check the login status here, using the login function
    const result = login(localStorage.getItem('access_token'));

    if (!result.valid) {
        history.push('/login');
    }
  }, [login]);

  // You can return additional login-related data or functions if needed
}
