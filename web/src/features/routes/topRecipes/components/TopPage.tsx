'use client'
import { stepAtom } from '@/stores/atom'
import type { Recipe } from '@/type'
import { FetchRecipes } from '@/utils/utils'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import RecipeCard from './RecipeCards'

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [step] = useAtom(stepAtom) // stepの値を取得

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await FetchRecipes()
        setRecipes(data)
      } catch (error) {
        setError('Failed to fetch recipes')
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className="container mx-auto mb-4 p-4">
      <Modal />
      <h1 className="mb-6 text-3xl font-bold">3日間の夕食を自炊しよう！</h1>
      <h2 className="mb-6 text-lg font-bold text-zinc-600">
        {step === '0'
          ? 'まずは食材・道具を買いに行こう！  右上のボタンをタップ'
          : 'カードをタップしてレシピをチェック'}
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="mt-10 flex justify-center" aria-label="読み込み中">
            <div className="size-10 animate-spin rounded-full border-4 border-neutral-600 border-t-transparent"></div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              info={recipe}
              day={index + 1}
              isLocked={index + 1 !== parseInt(step, 10)} // stepと等しくない場合はロック
            />
          ))
        )}
      </div>
    </div>
  )
}
