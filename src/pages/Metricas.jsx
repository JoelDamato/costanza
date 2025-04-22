import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, BookOpen, UserCheck, Clock, Ticket } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import useUserStore from '../store/users';
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF69B4", "#4BC0C0", "#36A2EB"]

const Metricas = () => {
  const [metricsData, setMetricsData] = useState({
    totalUsers: 0,
    courses: {},
    roles: {},
    usersPerDay: {},
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const clearUserData = useUserStore((state) => state.clearUserData);
  const navigate = useNavigate();

  const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
  ? 'https://back-cos-gim3.onrender.com'
  : 'http://localhost:5000';


  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_BASE_URL}/api/search/totalsusers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setMetricsData(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching metrics:", err)
        setError("Error al cargar las métricas")
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [API_BASE_URL])

  // Transformar los datos para los gráficos
  const prepareCourseData = () => {
    return Object.entries(metricsData.courses || {})
      .filter(([name]) => name !== "Cupon")
      .map(([name, value]) => ({
        name,
        estudiantes: value,
      }))
  }

  const prepareRoleData = () => {
    return Object.entries(metricsData.roles || {}).map(([name, value]) => ({
      name: name === "user" ? "Usuarios" : "Administradores",
      value,
    }))
  }

  const calculateTopCourse = () => {
    const filteredCourses = Object.entries(metricsData.courses || {}).filter(([name]) => name !== "Cupon")
    if (filteredCourses.length === 0) return { name: "N/A", estudiantes: 0 }
    filteredCourses.sort((a, b) => b[1] - a[1])
    return { name: filteredCourses[0][0], estudiantes: filteredCourses[0][1] }
  }

  const calculateTotalEnrollments = () => {
    return Object.entries(metricsData.courses || {})
      .filter(([name]) => name !== "Cupon")
      .reduce((total, [, count]) => total + count, 0)
  }

  const totalEnrollments = calculateTotalEnrollments()
  const topCourse = calculateTopCourse()
  const courseData = prepareCourseData()
  const roleData = prepareRoleData()

  const getCouponUsage = () => {
    return metricsData.courses?.Cupon || 0
  }

  const StatCard = ({ icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        <span className="ml-2 text-gray-500 font-medium">{title}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 p-4 rounded-lg text-red-700">{error}</div>
      </div>
    )
  }

  // Function to log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
    clearUserData();
    navigate('/');
  };

  // Function to show/hide profile
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };

  // Function to show/hide menu (on mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <div className="bg-gray-100 p-6 w-full min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Métricas</h1>

        {/* Tarjetas de estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            icon={<Users size={24} className="text-white" />}
            title="Usuarios Totales"
            value={metricsData.totalUsers.toLocaleString()}
            subtitle="Usuarios registrados"
            color="bg-blue-500"
          />
          <StatCard
            icon={<BookOpen size={24} className="text-white" />}
            title="Total Inscripciones"
            value={totalEnrollments.toLocaleString()}
            subtitle="Inscripciones a cursos"
            color="bg-purple-500"
          />
          <StatCard
            icon={<UserCheck size={24} className="text-white" />}
            title="Curso Más Popular"
            value={topCourse.name}
            subtitle={`${topCourse.estudiantes.toLocaleString()} estudiantes`}
            color="bg-green-500"
          />
          <StatCard
            icon={<Clock size={24} className="text-white" />}
            title="Cursos Disponibles"
            value={Object.keys(metricsData.courses || {}).filter((name) => name !== "Cupon").length}
            subtitle="Cursos activos"
            color="bg-orange-500"
          />
          <StatCard
            icon={<Ticket size={24} className="text-white" />}
            title="Cupones Usados"
            value={getCouponUsage().toLocaleString()}
            subtitle="Total de cupones"
            color="bg-pink-500"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico de distribución de cursos */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Distribución de Estudiantes por Curso</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} estudiantes`, "Cantidad"]} />
                <Bar dataKey="estudiantes" fill="#8884d8">
                  {courseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de roles */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Distribución de Roles</h2>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} usuarios`, "Cantidad"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de cursos */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Detalles de Cursos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiantes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % del Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progreso
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courseData
                  .sort((a, b) => b.estudiantes - a.estudiantes)
                  .map((course, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.estudiantes.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {((course.estudiantes / totalEnrollments) * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${(course.estudiantes / courseData[0].estudiantes) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Metricas

