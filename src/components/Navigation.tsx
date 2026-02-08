import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/main', icon: '💬', label: '채팅' },
  { path: '/report', icon: '📊', label: '통계' },
  { path: '/debut', icon: '✨', label: '카드' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-black z-40 pb-safe">
      <div className="max-w-md mx-auto flex justify-around p-2 gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex-1"
            >
              <motion.div
                className={`flex flex-col items-center justify-center py-2 rounded-lg border-2 border-black transition-colors ${
                  isActive
                    ? 'bg-retro-primary text-black shadow-[4px_4px_0_0_#000]'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                whileTap={{ scale: 0.95 }}
                animate={{
                    y: isActive ? -4 : 0,
                }}
              >
                {/* Icon */}
                <span className="text-xl mb-1 filter drop-shadow-sm">
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className={`font-pixel text-[10px] ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  {item.label}
                </span>
                
                {isActive && (
                    <motion.div 
                        layoutId="nav-pill"
                        className="absolute -bottom-3 w-12 h-1 bg-black rounded-full"
                    />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
