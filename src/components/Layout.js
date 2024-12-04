import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import MusicPlayer from './MusicPlayer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
} 