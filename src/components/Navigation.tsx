import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/main', icon: '[ ]', label: 'CHAT' },
  { path: '/report', icon: '[#]', label: 'STATS' },
  { path: '/debut', icon: '[*]', label: 'CARD' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-win95-medium border-t-2 border-t-white z-40">
      <div className="max-w-md mx-auto">
        <div className="flex">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex-1 flex flex-col items-center justify-center py-3 transition-none ${
                  isActive
                    ? 'bg-yellow-400 border-2 border-t-yellow-200 border-l-yellow-200 border-b-yellow-600 border-r-yellow-600'
                    : 'bg-amber-50 border-2 border-t-white border-l-white border-b-gray-400 border-r-gray-400 hover:bg-amber-100'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-retro-teal"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <span className={`font-pixel text-sm mb-1 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className={`font-pixel text-xs ${
                    isActive ? 'text-gray-900 font-bold' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-yellow-300/20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom decorative border */}
        <div className="h-1 bg-linear-to-r from-retro-teal via-retro-pink to-retro-gold" />
      </div>
    </nav>
  );
}
