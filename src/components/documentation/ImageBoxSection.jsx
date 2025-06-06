import { ImageBox } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const ImageBoxSection = () => {
  const { addToast } = useToast();

  // 간단한 SVG 아이콘들을 inline으로 정의
  const sensorIcon = `<svg viewBox="0 0 24 24" fill="#3B82F6"><circle cx="12" cy="12" r="8" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="8" fill="white">센서</text></svg>`;

  const motorIcon = `<svg viewBox="0 0 24 24" fill="#10B981"><rect x="4" y="4" width="16" height="16" rx="2" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="6" fill="white">모터</text></svg>`;

  const cpuIcon = `<svg viewBox="0 0 24 24" fill="#F59E0B"><rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="7" fill="white">CPU</text></svg>`;

  const coverIcon = `<svg viewBox="0 0 24 24" fill="#EF4444"><rect x="2" y="6" width="20" height="12" rx="2" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="6" fill="white">COVER</text></svg>`;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🖼️ ImageBox 컴포넌트</h2>
        <p className="text-gray-600 mb-6">
          아이콘이나 이미지를 포함할 수 있는 박스 컴포넌트입니다. **🆕 NEW! 이미지 크기 조절 기능 추가!**
        </p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 기본 사용법
<ImageBox
  id="image1"
  x={100}
  y={50}
  width={120}
  height={80}
  text="수소 탱크"
  icon="/path/to/hydrogen-tank.png"
  iconType="image"
  backgroundColor="#E0F2FE"
  borderColor="#0284C7"
  onClick={() => console.log('수소 탱크 클릭')}
/>

// 🆕 NEW! 이미지 크기 조절 기능
<ImageBox
  x={200}
  y={150}
  width={120}
  height={100}
  text="연료전지 스택"
  icon="/path/to/fuel-cell.png"
  iconType="image"
  imageScale={0.8}          // 이미지를 80% 크기로
  imagePadding={12}         // 12px 여백
  imageObjectFit="cover"    // 이미지 피팅 방식
/>

// 절대 크기 지정
<ImageBox
  x={350}
  y={150}
  width={150}
  height={120}
  text="컨트롤러"
  icon="/path/to/controller.png"
  iconType="image"
  imageWidth={60}           // 이미지 너비 60px
  imageHeight={40}          // 이미지 높이 40px
  imagePadding={16}         // 16px 여백
/>

// 이모지 크기 조절
<ImageBox
  x={50}
  y={300}
  width={80}
  height={80}
  text="배터리"
  icon="🔋"
  iconType="emoji"
  imageScale={1.5}          // 이모지를 1.5배 크기로
  imagePadding={10}
/>

// SVG 아이콘 사용
<ImageBox
  x={150}
  y={300}
  width={100}
  height={80}
  text="센서"
  icon='<svg viewBox="0 0 24 24" fill="#3B82F6">...</svg>'
  iconType="svg"
  imageScale={0.9}
  imagePadding={15}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-96 border border-gray-200 rounded bg-gray-50 p-4">
            {/* SVG 아이콘 예제 */}
            <ImageBox
              id="demo-image1"
              x={30}
              y={30}
              width={80}
              height={60}
              icon={sensorIcon}
              iconType="svg"
              text="온도센서"
              className="border-2 border-blue-500 rounded-lg shadow-md"
              onClick={() => addToast("온도센서 클릭! 🌡️", "info")}
            />

            {/* 크기 조절된 SVG */}
            <ImageBox
              id="demo-image2"
              x={180}
              y={30}
              width={120}
              height={60}
              icon={motorIcon}
              iconType="svg"
              text="구동모터"
              imageScale={0.7}
              imagePadding={15}
              className="border-2 border-emerald-500 rounded-lg shadow-md"
              onClick={() => addToast("구동모터 클릭! ⚙️", "success")}
            />

            {/* 절대 크기 지정 */}
            <ImageBox
              id="demo-image3"
              x={350}
              y={30}
              width={100}
              height={80}
              icon={cpuIcon}
              iconType="svg"
              text="제어CPU"
              imageWidth={50}
              imageHeight={50}
              imagePadding={20}
              className="border-2 border-amber-500 rounded-lg shadow-md"
              onClick={() => addToast("제어CPU 클릭! 💻", "warning")}
            />

            {/* 이모지 크기 조절 */}
            <ImageBox
              id="demo-image4"
              x={105}
              y={140}
              width={140}
              height={70}
              icon="🔋"
              iconType="emoji"
              text="리튬배터리"
              imageScale={1.8}
              imagePadding={10}
              className="border-2 border-purple-500 rounded-lg shadow-md"
              onClick={() => addToast("리튬배터리 클릭! 🔋", "info")}
            />

            {/* 피팅 모드 예제 */}
            <ImageBox
              id="demo-image5"
              x={300}
              y={140}
              width={120}
              height={80}
              icon={coverIcon}
              iconType="svg"
              text="커버 모드"
              imageObjectFit="cover"
              imagePadding={5}
              className="border-2 border-red-500 rounded-lg shadow-md"
              onClick={() => addToast("커버 모드 클릭! 📐", "error")}
            />

            {/* 🆕 추가 이모지 예제들 */}
            <ImageBox
              id="demo-image6"
              x={50}
              y={250}
              width={70}
              height={60}
              icon="⚙️"
              iconType="emoji"
              text="설정"
              imageScale={1.2}
              imagePadding={8}
              className="border-2 border-gray-500 rounded-lg shadow-md"
              onClick={() => addToast("설정 클릭! ⚙️", "info")}
            />

            <ImageBox
              id="demo-image7"
              x={150}
              y={250}
              width={70}
              height={60}
              icon="🌡️"
              iconType="emoji"
              text="온도"
              imageScale={1.4}
              imagePadding={8}
              className="border-2 border-orange-500 rounded-lg shadow-md"
              onClick={() => addToast("온도 클릭! 🌡️", "warning")}
            />

            <ImageBox
              id="demo-image8"
              x={250}
              y={250}
              width={70}
              height={60}
              icon="💨"
              iconType="emoji"
              text="압력"
              imageScale={1.3}
              imagePadding={8}
              className="border-2 border-cyan-500 rounded-lg shadow-md"
              onClick={() => addToast("압력 클릭! 💨", "info")}
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
                {/* 기본 Props */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">id</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">""</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">고유 식별자</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">x, y</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">0</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">위치 좌표 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">width, height</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">100, 80</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">박스 크기 (픽셀)</td>
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
                  <td className="py-3 px-4 text-sm text-gray-600">표시할 텍스트</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">icon</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">baseImage</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">SVG 문자열, 이미지 URL, 또는 이모지</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">iconType</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"image"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">'svg', 'image', 'emoji'</td>
                </tr>

                {/* 🆕 새로운 이미지 크기 조절 Props */}
                <tr className="hover:bg-green-50 bg-green-25">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded text-green-800">🆕 imageWidth</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number | null</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">이미지 절대 너비 (픽셀) - null이면 자동 크기</td>
                </tr>
                <tr className="hover:bg-green-50 bg-green-25">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded text-green-800">🆕 imageHeight</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number | null</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">이미지 절대 높이 (픽셀) - null이면 자동 크기</td>
                </tr>
                <tr className="hover:bg-green-50 bg-green-25">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded text-green-800">🆕 imageScale</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">1</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">이미지 크기 비율 (0.1 ~ 2.0)</td>
                </tr>
                <tr className="hover:bg-green-50 bg-green-25">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded text-green-800">🆕 imagePadding</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">8</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">이미지 주변 여백 (픽셀)</td>
                </tr>
                <tr className="hover:bg-green-50 bg-green-25">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded text-green-800">🆕 imageObjectFit</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"contain"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">'contain', 'cover', 'fill', 'scale-down', 'none'</td>
                </tr>

                {/* 기타 Props */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">className</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"bg-gray..."</code>
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
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">클릭 이벤트 핸들러</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 🆕 이미지 피팅 모드 설명 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6 border border-green-200">
          <h4 className="text-xl font-bold text-green-800 mb-4">🎯 이미지 피팅 모드</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-700 mb-2">contain (기본값)</h5>
              <p className="text-sm text-gray-600">이미지 전체가 보이도록 비율을 유지하며 박스에 맞춤</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-700 mb-2">cover</h5>
              <p className="text-sm text-gray-600">박스를 완전히 채우도록 이미지를 크롭</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-700 mb-2">fill</h5>
              <p className="text-sm text-gray-600">박스에 맞게 이미지를 늘림 (비율 무시)</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-700 mb-2">scale-down</h5>
              <p className="text-sm text-gray-600">contain과 none 중 더 작은 크기 선택</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 사용 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>절대 크기 제어:</strong> imageWidth, imageHeight로 정확한 픽셀 크기 지정
            </li>
            <li>
              • <strong>비율 조절:</strong> imageScale로 박스 대비 이미지 크기 비율 조정 (0.1 ~ 2.0)
            </li>
            <li>
              • <strong>여백 조정:</strong> imagePadding으로 이미지와 테두리 사이 여백 조절
            </li>
            <li>
              • <strong>피팅 방식:</strong> imageObjectFit으로 이미지가 박스에 맞춰지는 방식 선택
            </li>
            <li>
              • <strong>반응형 호버:</strong> 마우스 호버 시 이미지가 10% 확대되는 애니메이션 효과
            </li>
            <li>
              • <strong>다양한 타입:</strong> 이미지, SVG, 이모지 모두 동일한 크기 조절 기능 지원
            </li>
            <li>
              • <strong>네트워크 독립성:</strong> 이모지와 인라인 SVG 사용으로 안정적인 표시 보장
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageBoxSection;
