import { useSetAtom } from 'jotai';
import { updateBondLevelAtom, updatePersonalityAtom } from '../store/atoms';

export function DemoControls() {
  const updateBondLevel = useSetAtom(updateBondLevelAtom);
  const updatePersonality = useSetAtom(updatePersonalityAtom);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">
          테스트 컨트롤 (개발용)
        </h2>

        {/* 친밀도 조절 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">친밀도 변경</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateBondLevel(5)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              +5
            </button>
            <button
              onClick={() => updateBondLevel(10)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              +10
            </button>
            <button
              onClick={() => updateBondLevel(-5)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              -5
            </button>
            <button
              onClick={() => updateBondLevel(-10)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              -10
            </button>
          </div>
        </div>

        {/* 다정함 조절 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">
            다정함 ↔ 냉정함
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updatePersonality({ kindness: 10 })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              다정함 +10
            </button>
            <button
              onClick={() => updatePersonality({ kindness: -10 })}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              냉정함 +10
            </button>
          </div>
        </div>

        {/* 자신감 조절 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">
            자신감 ↔ 소심함
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updatePersonality({ confidence: 10 })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              자신감 +10
            </button>
            <button
              onClick={() => updatePersonality({ confidence: -10 })}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              소심함 +10
            </button>
          </div>
        </div>

        {/* 복합 시나리오 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">시나리오 테스트</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                updateBondLevel(8);
                updatePersonality({ kindness: 15, confidence: 10 });
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              칭찬하기 (친밀+8, 다정+15, 자신감+10)
            </button>
            <button
              onClick={() => {
                updateBondLevel(-5);
                updatePersonality({ kindness: -12, confidence: -8 });
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              꾸짖기 (친밀-5, 냉정+12, 소심+8)
            </button>
            <button
              onClick={() => {
                updateBondLevel(3);
                updatePersonality({ confidence: 20 });
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              격려하기 (친밀+3, 자신감+20)
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            💡 버튼을 클릭하면 수치가 변경되며 플로팅 애니메이션이 나타납니다.
            <br />
            친밀도 30, 60, 90 도달 시 프로그레스 바가 반짝입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
