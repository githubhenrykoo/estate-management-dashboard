import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/users"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Users
      </Link>
      <Link
        href="/properties"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Properties
      </Link>
      <Link
        href="/complaints"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Complaints
      </Link>
      <Link
        href="/news"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        News
      </Link>
      <Link
        href="/reports"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Reports
      </Link>
    </nav>
  )
}