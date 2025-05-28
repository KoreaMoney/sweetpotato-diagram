const UsageGuide = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">박스 연결 방식 사용법</h3>
      <div className="space-y-3">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-medium text-gray-800">fromBox</h4>
          <p className="text-sm text-gray-600">시작 박스: &#123; id: "박스ID", position: "연결위치" &#125;</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-medium text-gray-800">toBox</h4>
          <p className="text-sm text-gray-600">도착 박스: &#123; id: "박스ID", position: "연결위치" &#125;</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <h4 className="font-medium text-gray-800">boxes</h4>
          <p className="text-sm text-gray-600">모든 박스 정보 배열 (id, x, y, width, height)</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <h4 className="font-medium text-gray-800">position</h4>
          <p className="text-sm text-gray-600">"top", "right", "bottom", "left", "center"</p>
        </div>
      </div>

      <h4 className="font-semibold text-gray-800 mt-6 mb-3">추가 옵션</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <code className="bg-gray-100 px-2 py-1 rounded">offset: &#123; x, y &#125;</code>
        </div>
        <div>
          <code className="bg-gray-100 px-2 py-1 rounded">connectionType="auto"</code>
        </div>
        <div>
          <code className="bg-gray-100 px-2 py-1 rounded">stepOffset</code>
        </div>
        <div>
          <code className="bg-gray-100 px-2 py-1 rounded">animated</code>
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;
