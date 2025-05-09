import { Link } from 'react-router-dom';
import { FaSpotify, FaArrowRight, FaMusic, FaChartLine, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      {/* Efectos de fondo dinámicos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-green-500 to-teal-400 opacity-5"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo animado */}
        <motion.div
          className="mb-12"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30">
            <FaSpotify className="text-white text-5xl" />
          </div>
        </motion.div>

        {/* Títulos */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-300"
            whileHover={{ scale: 1.02 }}
          >
            SpotifyConnect
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Descubre estadísticas exclusivas y gestiona tus playlists favoritas directamente desde Spotify
          </motion.p>
        </motion.div>

        {/* Botón CTA */}
        <motion.div variants={itemVariants} whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center">
              Comenzar ahora <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl"
          variants={containerVariants}
        >
          {[
            {
              icon: <FaMusic className="text-3xl" />,
              title: "Tus Playlists",
              description: "Accede y organiza todas tus listas de reproducción en un solo lugar"
            },
            {
              icon: <FaChartLine className="text-3xl" />,
              title: "Estadísticas",
              description: "Visualiza tus hábitos de escucha con gráficos detallados"
            },
            {
              icon: <FaLock className="text-3xl" />,
              title: "Seguridad",
              description: "Autenticación segura mediante OAuth 2.0 de Spotify"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:border-green-400/30 transition-all duration-300 hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-green-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Efecto de ondas (opcional) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 wave-animation"></div>
        </div>
      </motion.div>
    </div>
  );
}