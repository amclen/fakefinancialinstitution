import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from './feature/login/LoginScreen';
import SignUpScreen from './feature/login/SignUpScreen';
import Dashboard from './Dashboard';
import { UserProvider } from './UserContext';
import RequireAuth from './components/RequireAuth';
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          </Routes>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
