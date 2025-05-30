import { ImageBox } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const ImageBoxSection = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🖼️ ImageBox 컴포넌트</h2>
        <p className="text-gray-600 mb-6">이미지를 포함하는 박스 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<ImageBox
  id="image1"
  x={100}
  y={50}
  width={120}
  height={80}
  src="/path/to/image.jpg"
  alt="설명"
  text="이미지 박스"
  className="border-2 border-blue-500 rounded-lg"
  onClick={() => console.log('이미지 박스 클릭')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50 p-4">
            {/* 플레이스홀더 이미지를 사용한 예제들 */}
            <ImageBox
              id="demo-image1"
              x={30}
              y={30}
              width={100}
              height={60}
              src="https://via.placeholder.com/100x60/3B82F6/FFFFFF?text=센서"
              alt="센서 이미지"
              text="온도센서"
              className="border-2 border-blue-500 rounded-lg shadow-md"
              onClick={() => addToast("온도센서 클릭! 🌡️", "info")}
            />

            <ImageBox
              id="demo-image2"
              x={180}
              y={30}
              width={120}
              height={60}
              src="https://via.placeholder.com/120x60/10B981/FFFFFF?text=모터"
              alt="모터 이미지"
              text="구동모터"
              className="border-2 border-emerald-500 rounded-lg shadow-md"
              onClick={() => addToast("구동모터 클릭! ⚙️", "success")}
            />

            <ImageBox
              id="demo-image3"
              x={350}
              y={30}
              width={80}
              height={80}
              src="https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=CPU"
              alt="CPU 이미지"
              text="제어CPU"
              className="border-2 border-amber-500 rounded-lg shadow-md"
              onClick={() => addToast("제어CPU 클릭! 💻", "warning")}
            />

            <ImageBox
              id="demo-image4"
              x={105}
              y={140}
              width={140}
              height={70}
              src="https://via.placeholder.com/140x70/8B5CF6/FFFFFF?text=배터리"
              alt="배터리 이미지"
              text="리튬배터리"
              className="border-2 border-purple-500 rounded-lg shadow-md"
              onClick={() => addToast("리튬배터리 클릭! 🔋", "info")}
            />
          </div>
        </div>

        {/* Props 섹션 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">📋 Props</h3>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">속성</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">타입</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">기본값</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">id</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">고유 식별자</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">x</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">X 좌표 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">y</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">Y 좌표 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">width</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">너비 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">height</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">높이 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">src</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">이미지 경로</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">alt</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">""</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">이미지 대체 텍스트</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">text</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">""</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">박스 텍스트</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">className</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"border..."</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">TailwindCSS 클래스</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">onClick</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">function</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">undefined</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">클릭 이벤트 핸들러</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 사용 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>이미지 경로:</strong> 로컬 파일 또는 외부 URL 모두 사용 가능
            </li>
            <li>
              • <strong>플레이스홀더:</strong> via.placeholder.com 등을 활용해 개발 중 임시 이미지 사용
            </li>
            <li>
              • <strong>접근성:</strong> alt 속성을 반드시 설정하여 스크린 리더 지원
            </li>
            <li>
              • <strong>반응형:</strong> 다양한 크기의 이미지를 지원하여 유연한 레이아웃 구성
            </li>
            <li>
              • <strong>상호작용:</strong> onClick 이벤트로 이미지 클릭 시 상세 정보 표시 가능
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageBoxSection;
