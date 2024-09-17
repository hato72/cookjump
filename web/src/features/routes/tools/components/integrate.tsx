'use client'
import { Button } from '@/components/ui/button'
import { materialsAtom, toolsAtom } from '@/stores/atom'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { fetchMaterials } from '../api'
import MaterialsList from './MaterialsList'
import ToolsList from './ToolsList'

const MaterialsToolsPage: React.FC = () => {
  const [materials, setMaterials] = useAtom(materialsAtom)
  const [tools, setTools] = useAtom(toolsAtom)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndSetMaterials = async () => {
      try {
        const data = await fetchMaterials()
        setMaterials((prevMaterials) => {
          //チェック状態を維持
          const updatedMaterials = data.map((material) => {
            const existingMaterial = prevMaterials.find(
              (m) => m.id === material.id,
            )
            return existingMaterial ? existingMaterial : material
          })
          return updatedMaterials
        })
      } catch (error) {
        setError('Failed to fetch ingredients')
        console.error('Error fetching ingredients:', error)
      } finally {
        setLoading(false)
      }
    }

    if (materials.length === 0) {
      // Fetch materials only if the atom is empty
      fetchAndSetMaterials()
    } else {
      setLoading(false)
    }
  }, [materials, setMaterials])

  const handleMaterialCheck = (id: number) => {
    setMaterials((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    )
  }

  const handleToolCheck = (id: number) => {
    setTools((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    )
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">買ったものはチェックしよう</h1>
        <h2 className="mb-6 text-lg font-bold text-zinc-600">
          調味料は小さめを買うのがおすすめ！
        </h2>
        <div className="mb-8 w-full max-w-md items-center rounded-lg bg-white p-6 shadow-md">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <MaterialsList
              materials={materials}
              onMaterialsListCheck={handleMaterialCheck}
            />
          )}
        </div>

        <div className="mb-8 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <ToolsList tools={tools} onToolCheck={handleToolCheck} />
        </div>
      </div>
      <div className="text-center sm:text-center">
        <Button
          asChild
          className="mb-12 rounded-full bg-[#F05537] px-10 py-2 font-bold text-white shadow-md hover:bg-[#808080] focus:outline-none"
        >
          <Link href="/">TOPへ</Link>
        </Button>
      </div>
    </div>
  )
}

export default MaterialsToolsPage
