import { useAuth } from '../hooks/useAuth';
import AuthStack from './AuthStack';
import UserStack from './UserStack';

export default function RootNavigation() {
  const { user } = useAuth();

  return user ? <UserStack /> : <AuthStack />;
}