import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
