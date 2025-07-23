import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/shared/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
      <Toaster position="top-right" />
    </ErrorBoundary>
  );
};

export default App;
