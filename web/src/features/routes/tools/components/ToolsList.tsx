import React from 'react'
import type { ToolsListProps } from '../type'

const ToolsList: React.FC<ToolsListProps> = ({ tools, onToolCheck }) => {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold text-[#F05537]">道具</h2>
      <ul className="space-y-3">
        {tools.map((tool) => (
          <li key={tool.id} className="flex items-center">
            <input
              type="checkbox"
              checked={tool.checked}
              onChange={() => onToolCheck(tool.id)}
              className="form-checkbox size-5 rounded-md text-indigo-600"
            />
            <span
              className={`ml-2 text-base ${tool.checked ? 'text-gray-500 line-through' : 'text-gray-800'}`}
            >
              {tool.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ToolsList
