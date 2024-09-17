import type { Recipe } from '@/type'

export const FetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/recipes`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }

  const data: Recipe[] = await response.json()
  return data
}
