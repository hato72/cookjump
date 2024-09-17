import React from 'react'
import type { MaterialsListProps } from '../type'

const MaterialsList: React.FC<MaterialsListProps> = ({
  materials,
  onMaterialsListCheck,
}) => {
  return (
    <>
      <h2 className="mb-4 flex items-center text-2xl font-bold text-[#F05537]">
        材料
      </h2>
      <ul className="space-y-3">
        {materials.map((materials) => (
          <li key={materials.id} className="flex items-center">
            <input
              type="checkbox"
              checked={materials.checked}
              onChange={() => onMaterialsListCheck(materials.id)}
              className="form-checkbox size-5 rounded-md text-indigo-600"
            />
            <span
              className={`ml-2 text-base ${materials.checked ? 'text-gray-500 line-through' : 'text-gray-800'}`}
            >
              {materials.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MaterialsList
