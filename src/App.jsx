import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';
import Footer from './pages/Footer.jsx';

const Home = lazy(() => import('./pages/home.jsx'));
const Login = lazy(() => import('./pages/login.jsx'));
const VSl = lazy(() => import('./pages/Vsl.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Cursos = lazy(() => import('./pages/Cursos.jsx'));
const PanelControl = lazy(() => import('./pages/Panel.jsx'));
const Capitulos = lazy(() => import('./pages/Capitulos.jsx'));
const Certificados = lazy(() => import('./pages/Certificados.jsx'));
const Certificadoscuty = lazy(() => import('./pages/Certificadoscuty.jsx'));
const Perfil = lazy(() => import('./pages/Perfil.jsx'));
const Curses = lazy(() => import('./pages/Curses.jsx'));
const EjemploLanding = lazy(() => import('./landinpage/landingejemplo.jsx'));
const Landingbarberos = lazy(() => import('./landinpage/landingbarberos.jsx'));
const HM = lazy(() => import('./landinpage/homeejemplo.jsx'));
const Luisfer = lazy(() => import('./landinpage/Luisfer.jsx'));
const Stam = lazy(() => import('./landinpage/Stam.jsx'));
const Sdstudio = lazy(() => import('./landinpage/Sdstudio.jsx'));
const Celin = lazy(() => import('./landinpage/Celinbarber.jsx'));
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
              <Route path="/Login" element={<Login />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/PanelControl" element={<PanelControl />} />
              <Route path="/cursos/:cursoId/:moduleName/:chapterId" element={<Capitulos />} />
              <Route path="/:cursoId" element={<Cursos />} />
              <Route path="/Certificados" element={<Certificados />} />
              <Route path="/Certificadoscuty" element={<Certificadoscuty />} />
              <Route path="/Perfil" element={<Perfil />} />
              <Route path="/Curses" element={<Curses />} />
              <Route path="/landing" element={<EjemploLanding />} />
              <Route path="/homee" element={<HM />} />
              <Route path="/landingbarberos" element={<Landingbarberos />} />
              <Route path="/luisferbarbershop" element={<Luisfer />} />
              <Route path="/Stambarber" element={<Stam />} />
              <Route path="/Sdstudio" element={<Sdstudio />} />
              <Route path="/Celinbarber" element={<Celin />} />
              <Route path="/Metricas" element={<Metricas />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;