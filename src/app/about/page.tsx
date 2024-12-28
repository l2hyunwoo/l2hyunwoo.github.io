import Link from "next/link"
import { Github, Linkedin, Mail, FileText, BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

const socialLinks = [
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  {
    name: "Resume",
    href: "https://notion.so/your-resume",
    icon: FileText,
  },
  {
    name: "Medium",
    href: "https://medium.com/@yourusername",
    icon: BookOpen,
  },
]

const career = [
  {
    company: "Tech Company",
    position: "Senior Software Engineer",
    period: "2022 - Present",
  },
  {
    company: "Startup",
    position: "Software Engineer",
    period: "2020 - 2022",
  },
  // Add more career entries as needed
]

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="shrink-0 mb-4 md:mb-0">
            <Image
              src="/placeholder.svg"
              alt="Profile picture"
              width={120}
              height={120}
              className="rounded-full object-cover"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">About Me</h1>
            <p className="text-muted-foreground">
              Hi, I&apos;m a software engineer passionate about building modern web applications.
              I specialize in React, Next.js, and TypeScript.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Connect with me</h2>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              asChild
              className="gap-2"
            >
              <Link href={link.href} target="_blank">
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Career</h2>
        <div className="space-y-6">
          {career.map((job, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-medium">{job.company}</h3>
              <p className="text-muted-foreground">{job.position}</p>
              <p className="text-sm text-muted-foreground">{job.period}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

