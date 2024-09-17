export type Recipe = {
  id: number
  uuid: string
  title: string
  thumbnail: string
  video: string
  cooking_time: number
  ingredients: Ingredient[]
  cooking_instructions: CookingInstruction[]
}

export type Ingredient = {
  id: number
  ingredient_information: string
  recipe_id: number
}

export type CookingInstruction = {
  id: number
  content: string
  recipe_id: number
}
