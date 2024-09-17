'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CompletionPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto p-4">
        <p className="mb-8 text-2xl font-bold">
          修了の証としてクラシルアプリで使用できるチケットをプレゼント！
        </p>
        <div className="image mb-8 flex items-center justify-center">
          <Image src="/ticket.png" width={150} height={150} alt="ticket_img" />
        </div>
      </div>
      <div className="mb-8 text-center sm:text-center">
        <Button
          asChild
          className="rounded-full bg-[#F05537] px-10 py-4 font-bold text-white shadow-md hover:bg-[#808080] focus:outline-none"
        >
          <Link href="https://www.kurashiru.com/">明日の献立はこちら</Link>
        </Button>
      </div>
    </div>
  )
}

export default CompletionPage
