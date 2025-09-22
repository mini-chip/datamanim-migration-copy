import Image from "next/image";
import Link from "next/link";
import OpenChatButton from "@/components/common/OpenChatButton";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DataStudy
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          데이터 분석의 모든 것을 배우는 곳
        </p>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 mb-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            🎯 데이터 분석 마스터 코스
          </h2>
          <p className="text-lg mb-6">
            실무에 바로 적용할 수 있는 데이터 분석 기술을 배워보세요
          </p>
        </div>
      </div>

      {/* 주요 콘텐츠 섹션 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* ADP 자격증 */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">ADP 자격증</h3>
            <p className="text-gray-600 mb-4">
              데이터 분석 전문가 자격증 준비를 위한 통계 기초부터 실무까지
            </p>
            <Link
              href="/dataset/ADP/statistics-basics"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              학습하기
            </Link>
          </div>
        </div>

        {/* 빅데이터분석기사 */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              빅데이터분석기사
            </h3>
            <p className="text-gray-600 mb-4">
              머신러닝과 딥러닝을 활용한 빅데이터 분석 실무 기술 습득
            </p>
            <Link
              href="/dataset/bigdata/machine-learning-basics"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              학습하기
            </Link>
          </div>
        </div>

        {/* Pandas 튜토리얼 */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">🐼</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Pandas 마스터
            </h3>
            <p className="text-gray-600 mb-4">
              데이터 조작과 분석을 위한 필수 라이브러리 완전 정복
            </p>
            <Link
              href="/dataset/pandas/pandas-tutorial"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              학습하기
            </Link>
          </div>
        </div>
      </div>

      {/* 특징 섹션 */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          왜 DataStudy인가?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">📚</div>
            <h4 className="font-semibold mb-2">체계적 학습</h4>
            <p className="text-sm text-gray-600">
              기초부터 실무까지 단계별 커리큘럼
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">💻</div>
            <h4 className="font-semibold mb-2">실습 중심</h4>
            <p className="text-sm text-gray-600">
              이론과 실습을 병행한 실무형 교육
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🏆</div>
            <h4 className="font-semibold mb-2">자격증 대비</h4>
            <p className="text-sm text-gray-600">
              ADP, 빅분기 등 주요 자격증 완벽 대비
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">👥</div>
            <h4 className="font-semibold mb-2">커뮤니티</h4>
            <p className="text-sm text-gray-600">
              함께 학습하고 성장하는 학습 공동체
            </p>
          </div>
        </div>
      </div>

      {/* 학습 통계 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-12 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">학습 현황</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">1,000+</div>
            <div className="text-lg">누적 학습자</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-lg">실습 예제</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">95%</div>
            <div className="text-lg">합격률</div>
          </div>
        </div>
      </div>

      {/* 오픈채팅 버튼 */}
      <div className="text-center">
        <OpenChatButton />
      </div>
    </div>
  );
}
