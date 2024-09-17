import { modalShownAtom } from '@/stores/atom'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalShown, setModalShown] = useAtom(modalShownAtom)

  useEffect(() => {
    // もしモーダルがまだ表示されていなければ表示する
    if (!modalShown) {
      setIsOpen(true)
    }
  }, [modalShown])

  const closeModal = () => {
    setIsOpen(false)
    setModalShown(true) // モーダルが表示された(閉じるを押された)ことを記録
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="ransform w-96 rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ease-in-out">
            <h2 className="mb-4 text-center text-xl font-semibold">
              ようこそCookJumpへ
            </h2>
            <p className="mb-4 text-center font-semibold text-gray-700">
              使う調理器具は「フライパン」だけ！！
            </p>
            <p className="mb-4 text-center font-semibold text-gray-700">
              達成するとクラシルチケットがもらえる
            </p>
            <button
              onClick={closeModal}
              className="w-full rounded bg-yellow-200 px-4 py-2 transition-colors duration-200 hover:bg-yellow-300"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  )
}
