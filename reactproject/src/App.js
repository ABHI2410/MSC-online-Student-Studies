import { Routes } from "./Routes";
import { UserProvider } from './UserContext';
import { AuthProvider } from './AuthContext';

function App() {

  return (
    <div>
      <AuthProvider>
        <UserProvider>
          <Routes/>
        </UserProvider>
      </AuthProvider>
      
    </div>
  );
};

export default App;
