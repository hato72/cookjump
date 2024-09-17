'use client'
import { Button } from '@/components/ui/button'
import { stepAtom } from '@/stores/atom'
import type { Recipe } from '@/type'
import { FetchRecipes } from '@/utils/utils'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DayRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | undefined>()
  const [, setStep] = useAtom(stepAtom) // stepAtomの状態を取得・更新するためにuseAtomを使用

  const params = useParams<{ day: string }>()
  const dayCount = Number(params.day)

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

  useEffect(() => {
    if (
      recipes &&
      recipes.length > 0 &&
      dayCount > 0 &&
      dayCount <= recipes.length
    ) {
      const sortedRecipes = [...recipes].sort((a, b) => a.id - b.id)
      const current = sortedRecipes[dayCount - 1] // dayCount 番目に小さいレシピを取得
      setCurrentRecipe(current)
    } else {
      setCurrentRecipe(undefined)
    }
  }, [recipes, dayCount])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!currentRecipe) {
    return <div>No recipe found for this day.</div>
  }

  const handleButtonClick = () => {
    if (dayCount === 3) {
      setStep('1') // 完成ボタンを押したときはstepを1にリセット
    } else {
      setStep((prevStep) => (parseInt(prevStep, 10) + 1).toString()) // 次の日のレシピを見るボタンを押したときはstepを+1
    }
  }

  const nextHref = dayCount === 3 ? '/complete' : `/`

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-2 text-3xl font-bold">{currentRecipe.title}</h1>
      <h2 className="mb-4 text-xl">Day{dayCount}</h2>

      <div className="overflow-hidden rounded-lg">
        <video
          src={currentRecipe.video}
          muted
          width={1024}
          height={768}
          className="h-auto w-full"
        />
      </div>

      <section className="mt-6">
        <h3 className="mb-2 text-2xl font-semibold">材料</h3>
        <ul className="list-none text-lg leading-relaxed">
          {currentRecipe.ingredients?.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.ingredient_information}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="mb-2 text-2xl font-semibold">手順</h3>
        <ul className="list-none space-y-2 text-lg leading-relaxed">
          {currentRecipe.cooking_instructions?.map((instruction) => (
            <li key={instruction.id} className="mt-2">
              {instruction.content}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 text-center">
        <Button
          className="mb-12 rounded-full bg-[#F05537] px-12 py-6 text-lg font-bold text-white shadow-md hover:bg-[#808080] focus:outline-none"
          asChild
        >
          <Link href={nextHref} onClick={handleButtonClick}>
            完成！
          </Link>
        </Button>
      </div>
    </div>
  )
}
