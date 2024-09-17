'use client'
import { Button } from '@/components/ui/button'
import { stepAtom } from '@/stores/atom'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [step, setStep] = useAtom(stepAtom)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (step === '0') {
      e.preventDefault() // デフォルトのリンク動作をキャンセル
      setStep('1') // stepを'1'に更新
      router.push('/tools') // 手動でページ遷移を行う
    }
  }

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-gray-800 hover:text-gray-600">
            <Image
              src="/kurashiru-logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <Button
          className="rounded-full bg-[#F05537] px-6 py-3 text-sm font-bold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-600"
          asChild
        >
          <Link href="/tools" onClick={handleClick}>
            必要道具・素材を買いに行こう！
          </Link>
        </Button>
      </div>
    </header>
  )
}

export default Header
