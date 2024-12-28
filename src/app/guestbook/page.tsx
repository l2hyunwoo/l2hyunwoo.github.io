"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"

// In a real app, this would come from a database
const initialComments = [
  {
    id: 1,
    name: "John Doe",
    content: "Great blog! Keep up the good work!",
    date: "2023-12-27",
  },
  {
    id: 2,
    name: "Jane Smith",
    content: "Really enjoying your content.",
    date: "2023-12-26",
  },
]

export default function GuestbookPage() {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      name: "Guest",
      content: newComment,
      date: new Date().toISOString().split("T")[0],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Guestbook</h1>
        <p className="text-muted-foreground">
          Leave a comment, share your thoughts, or just say hi!
        </p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your message..."
          className="min-h-[100px]"
        />
        <Button type="submit">Sign Guestbook</Button>
      </form>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.name}</span>
              <span className="text-sm text-muted-foreground">
                {formatDate(comment.date)}
              </span>
            </div>
            <p className="text-muted-foreground">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

