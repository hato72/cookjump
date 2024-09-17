import type { CheckMaterialsList, Tool } from '@/features/routes/tools/type'
import { atomWithStorage } from 'jotai/utils'

// チェックボックスの状態を管理するatom
export const materialsAtom = atomWithStorage<CheckMaterialsList[]>(
  'materials',
  [],
)
export const toolsAtom = atomWithStorage<Tool[]>('tools',[{'id':1,'name':'フライパン','checked':false}])

export const modalShownAtom = atomWithStorage<boolean>('modalShown', false)

// dayの進行状態を管理するatom
export const stepAtom = atomWithStorage<string>(
  'step',
  '0', // デフォルト値として1日目が入っている
)
