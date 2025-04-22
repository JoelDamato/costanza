import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';
import Footer from './pages/Footer.jsx';
import Politicas from './components/Politicas';
import Condiciones from './components/Condiciones';
import PoliticaReembolso from './components/Politicaderembolso';


const Home = lazy(() => import('./pages/home.jsx'));
const Login = lazy(() => import('./pages/login.jsx'));
const VSl = lazy(() => import('./pages/Vsl.jsx'));
const VSl2 = lazy(() => import('./pages/Vsl2.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Cursos = lazy(() => import('./pages/Cursos.jsx'));
const PanelControl = lazy(() => import('./pages/Panel.jsx'));
const Capitulos = lazy(() => import('./pages/Capitulos.jsx'));
const Perfil = lazy(() => import('./pages/Perfil.jsx'));
const Metricas = lazy(() => import('./pages/Metricas.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Router>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vsl" element={<VSl />} />
              <Route path="/vsl2" element={<VSl2 />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/PanelControl" element={<PanelControl />} />
              <Route path="/cursos/:cursoId/:moduleName/:chapterId" element={<Capitulos />} />
              <Route path="/:cursoId" element={<Cursos />} />

              <Route path="/Perfil" element={<Perfil />} />
 
              <Route path="/Metricas" element={<Metricas />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/politica-privacidad" element={<Politicas />} />
<Route path="/terminos-condiciones" element={<Condiciones />} />
<Route path="/politica-compra" element={<PoliticaReembolso />} />


            </Routes>
          </Suspense>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;