import Image from "next/image";
import Link from "next/link";
import OpenChatButton from "@/components/common/OpenChatButton";
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">DataManim</h1>

      <pre className="bg-gray-800 p-4 rounded-lg font-mono text-sm mb-6">
        <code className="text-white">광고 한 번 눌러주시겠습니까</code>
      </pre>

      <Link href="https://classroom.datamanim.com/p/bae" className="block mb-6">
        <Image
          src="https://github.com/Datamanim/datarepo/blob/main/images/clicks.png?raw=true"
          alt="Click here"
          width={845}
          height={483}
          className="rounded-lg"
        />
      </Link>

      <p className="text-lg mb-6">10회 빅분기 실기 대비 강의</p>

      <OpenChatButton />
    </div>
  );
}
