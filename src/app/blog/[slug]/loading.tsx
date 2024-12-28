import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <article className="max-w-2xl mx-auto">
      <header className="mb-8">
        <Skeleton className="h-8 w-[300px] mb-2" />
        <Skeleton className="h-4 w-[100px]" />
      </header>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </article>
  )
}

