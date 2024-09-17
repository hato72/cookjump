import type { CheckMaterialsList } from './type'
export const fetchMaterials = async (): Promise<CheckMaterialsList[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/itemlists`,
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.map(
      (item: {
        id: number
        name: string
        recipe_id: number
        checked: boolean
      }) => ({
        id: item.id,
        name: item.name,
        checked: false, // Set initial state as unchecked
      }),
    )
  } catch (error) {
    console.error('Error fetching materials:', error)
    return []
  }
}
