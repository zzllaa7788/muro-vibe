/**
 * 물어봐이브 (Mureo-Vibe) - 메인 앱 컴포넌트
 */

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found';
import { validateEnv } from '@config/env';
import './App.css';

function App() {
  useEffect(() => {
    try {
      validateEnv();
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
