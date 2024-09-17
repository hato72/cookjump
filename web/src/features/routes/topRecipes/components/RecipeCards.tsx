import Image from 'next/image'
import Link from 'next/link'
import type { RecipeCardInfo } from '../type'

interface RecipeCardProps {
  info: RecipeCardInfo
  day: number
  isLocked: boolean // 追加: ロック状態を示す
}

const RecipeCard = ({ info, day, isLocked }: RecipeCardProps) => {
  return (
    <div className="relative">
      <Link href={`/day_recipe/${day}`} passHref>
        <div
          key={info.id}
          className={`relative cursor-pointer overflow-hidden rounded-lg shadow-lg ${
            isLocked ? 'pointer-events-none' : ''
          }`}
        >
          <Image
            src={info.thumbnail}
            alt={info.title}
            width={800}
            height={450}
            className="h-64 w-full object-cover"
          />
          <div className="bg-white p-4">
            <h2 className="text-2xl font-semibold">{info.title}</h2>
            <div className="text-sm text-gray-600">
              <span>調理時間目安：{info.cooking_time}分</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 rounded-lg bg-[#F05537] px-4 py-2 font-bold text-white">
            Day{day}
          </div>
        </div>
      </Link>
      {/* ロックされている場合は黒い半透明のオーバーレイを表示 */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
          <p className="text-lg font-bold text-white">{day}日目のレシピです</p>
        </div>
      )}
    </div>
  )
}

export default RecipeCard
