export type CheckMaterialsList = {
  id: number
  name: string
  recipe_id: number
  checked: boolean
}

export interface MaterialsListProps {
  materials: CheckMaterialsList[]
  onMaterialsListCheck: (id: number) => void
}

export interface Tool {
  id: number
  name: string
  checked: boolean
}

export interface ToolsListProps {
  tools: Tool[]
  onToolCheck: (id: number) => void
}
