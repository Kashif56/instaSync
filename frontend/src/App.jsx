import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthRoutes from './routes/AuthRoutes';
import PostRoutes from './routes/PostRoutes';
import generalRoutes from './routes/generalRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/posts/*" element={<PostRoutes />} />
          {/* Add general routes */}
          {generalRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
