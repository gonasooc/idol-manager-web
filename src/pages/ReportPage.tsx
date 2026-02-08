import { useAtomValue } from 'jotai';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { statHistoryAtom, historyStatsAtom } from '@/store/historyAtoms';
import { bondLevelAtom, personalityScoreAtom, currentPersonaAtom } from '@/store/atoms';
import { motion } from 'framer-motion';

const PERSONA_MAP: Record<string, { title: string; emoji: string; color: string }> = {
  'gentle-confident': { title: '다정한 리더', emoji: '*', color: '#FFD700' },
  'gentle-shy': { title: '햇살 같은 동료', emoji: '+', color: '#FFA500' },
  'cold-confident': { title: '독기 있는 연습생', emoji: '!', color: '#FF4500' },
  'cold-shy': { title: '조용한 프로', emoji: '-', color: '#4169E1' },
  'balanced': { title: '균형잡힌 아이돌', emoji: '=', color: '#32CD32' },
};

// Retro stat box component
function RetroStatBox({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-black p-1">
      <div
        className="p-3 border-2"
        style={{
          borderColor: color,
          backgroundColor: `${color}20`,
        }}
      >
        <div className="font-pixel text-xl mb-1" style={{ color }}>
          {icon}
        </div>
        <div className="font-retro text-sm text-gray-400">{label}</div>
        <div className="font-pixel text-sm text-white">{value}</div>
      </div>
    </div>
  );
}

export function ReportPage() {
  const history = useAtomValue(statHistoryAtom);
  const stats = useAtomValue(historyStatsAtom);
  const bondLevel = useAtomValue(bondLevelAtom);
  const personality = useAtomValue(personalityScoreAtom);
  const persona = useAtomValue(currentPersonaAtom);

  // Time formatting
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Chart data transformation
  const chartData = history.map((snapshot, index) => ({
    index: index + 1,
    timestamp: snapshot.timestamp,
    timeLabel: formatTime(snapshot.timestamp),
    bondLevel: snapshot.bondLevel,
    kindness: snapshot.kindness,
    confidence: snapshot.confidence,
  }));

  // Persona timeline data
  const personaTimeline = history.reduce((acc, snapshot, index) => {
    if (index === 0 || snapshot.persona !== history[index - 1].persona) {
      acc.push({
        persona: snapshot.persona,
        timestamp: snapshot.timestamp,
        index: index + 1,
      });
    }
    return acc;
  }, [] as Array<{ persona: string; timestamp: number; index: number }>);

  if (history.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="retro-window max-w-md w-full"
        >
          <div className="retro-titlebar">
            <span>REPORT.exe</span>
            <div className="flex gap-1">
              <button className="retro-titlebar-btn">x</button>
            </div>
          </div>
          <div className="retro-content text-center py-8">
            <div className="font-pixel text-4xl mb-4 text-retro-gold">[?]</div>
            <h2 className="font-pixel text-sm text-gray-800 mb-4">데이터 없음</h2>
            <p className="font-retro text-xl text-gray-600">
              아이돌과 대화를 시작하면 성장 데이터가 기록됩니다!
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 pb-20">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Current Status Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="retro-window"
        >
          <div className="retro-titlebar">
            <span>CURRENT_STATUS.exe</span>
          </div>
          <div className="retro-content">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <RetroStatBox
                icon={persona.emoji}
                label="성격"
                value={persona.title}
                color="#ff69b4"
              />
              <RetroStatBox
                icon="♥"
                label="친밀도"
                value={bondLevel}
                color="#ff6b6b"
              />
              <RetroStatBox
                icon="♡"
                label="상냥함"
                value={`${personality.kindness > 0 ? '+' : ''}${personality.kindness}`}
                color="#ffd700"
              />
              <RetroStatBox
                icon="★"
                label="자신감"
                value={`${personality.confidence > 0 ? '+' : ''}${personality.confidence}`}
                color="#40e0d0"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Summary Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="retro-window"
        >
          <div className="retro-titlebar">
            <span>GROWTH_STATS.exe</span>
          </div>
          <div className="retro-content">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <RetroStatBox
                icon="##"
                label="총 기록"
                value={`${stats.totalSnapshots}`}
                color="#c0c0c0"
              />
              <RetroStatBox
                icon="^^"
                label="최고 친밀도"
                value={stats.maxBondLevel}
                color="#32cd32"
              />
              <RetroStatBox
                icon="vv"
                label="최저 친밀도"
                value={stats.minBondLevel}
                color="#f4a460"
              />
              <RetroStatBox
                icon={PERSONA_MAP[stats.mostFrequentPersona]?.emoji || '?'}
                label="주요 성격"
                value={PERSONA_MAP[stats.mostFrequentPersona]?.title || 'Unknown'}
                color="#4169e1"
              />
            </div>
          </div>
        </motion.div>

        {/* Bond Level Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="retro-window"
        >
          <div className="retro-titlebar">
            <span>친밀도_그래프.exe</span>
          </div>
          <div className="retro-content bg-retro-blue-dark">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="index"
                  stroke="#888"
                  tick={{ fill: '#888', fontFamily: 'VT323', fontSize: 14 }}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#888"
                  tick={{ fill: '#888', fontFamily: 'VT323', fontSize: 14 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a4e',
                    border: '2px solid #40e0d0',
                    fontFamily: 'VT323',
                    color: '#fff',
                  }}
                  labelFormatter={(value) => `Record #${value}`}
                />
                <Legend wrapperStyle={{ fontFamily: 'VT323', color: '#888' }} />
                <ReferenceLine y={30} stroke="#f4a460" strokeDasharray="5 5" />
                <ReferenceLine y={60} stroke="#ffd700" strokeDasharray="5 5" />
                <ReferenceLine y={90} stroke="#ff69b4" strokeDasharray="5 5" />
                <Line
                  type="stepAfter"
                  dataKey="bondLevel"
                  stroke="#ff6b6b"
                  strokeWidth={3}
                  dot={{ fill: '#ff6b6b', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#ff69b4' }}
                  name="친밀도"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Personality Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="retro-window"
        >
          <div className="retro-titlebar">
            <span>PERSONALITY_GRAPH.exe</span>
          </div>
          <div className="retro-content bg-retro-blue-dark">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="index"
                  stroke="#888"
                  tick={{ fill: '#888', fontFamily: 'VT323', fontSize: 14 }}
                />
                <YAxis
                  domain={[-100, 100]}
                  stroke="#888"
                  tick={{ fill: '#888', fontFamily: 'VT323', fontSize: 14 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a4e',
                    border: '2px solid #40e0d0',
                    fontFamily: 'VT323',
                    color: '#fff',
                  }}
                  labelFormatter={(value) => `Record #${value}`}
                />
                <Legend wrapperStyle={{ fontFamily: 'VT323', color: '#888' }} />
                <ReferenceLine y={0} stroke="#666" />
                <Line
                  type="stepAfter"
                  dataKey="kindness"
                  stroke="#ff69b4"
                  strokeWidth={3}
                  dot={{ fill: '#ff69b4', r: 4, strokeWidth: 0 }}
                  name="상냥함"
                />
                <Line
                  type="stepAfter"
                  dataKey="confidence"
                  stroke="#40e0d0"
                  strokeWidth={3}
                  dot={{ fill: '#40e0d0', r: 4, strokeWidth: 0 }}
                  name="자신감"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Persona Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="retro-window"
        >
          <div className="retro-titlebar">
            <span>PERSONA_TIMELINE.exe</span>
          </div>
          <div className="retro-content">
            <div className="space-y-2">
              {personaTimeline.map((change, index) => {
                const personaInfo = PERSONA_MAP[change.persona];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-black border-l-4"
                    style={{ borderColor: personaInfo?.color || '#888' }}
                  >
                    <div
                      className="font-pixel text-2xl"
                      style={{ color: personaInfo?.color || '#888' }}
                    >
                      [{personaInfo?.emoji || '?'}]
                    </div>
                    <div className="flex-1">
                      <div
                        className="font-pixel text-xs"
                        style={{ color: personaInfo?.color || '#888' }}
                      >
                        {personaInfo?.title || 'Unknown'}
                      </div>
                      <div className="font-retro text-sm text-gray-500">
                        {formatTime(change.timestamp)} (Record #{change.index})
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
