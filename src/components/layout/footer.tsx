import { VERSION } from '@/constants/VERSION'
import { LINKS } from '@/constants/LINKS'

const Footer = () => {
  return (
    <footer className="container mx-auto flex w-full max-w-3xl flex-col-reverse items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-0">
      <div className="flex gap-2 text-sm">
        <p>© {new Date().getFullYear()} mysocialscribe</p>
        <span>-</span>
        <p>v{VERSION}</p>
      </div>

      <div className="flex gap-4">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            className="transition-all hover:scale-110"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
