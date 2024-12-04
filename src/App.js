import Layout from './components/Layout';
import { motion } from 'framer-motion';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">我是张航杰</h1>
          <p className="text-lg text-gray-600 mb-8">
            数钱吧女孩没日没夜
          </p>

          {/* 放大的播放器 */}
          <div className="w-full flex justify-center">
            <MusicPlayer className="static transform scale-150 mb-8" />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default App;
