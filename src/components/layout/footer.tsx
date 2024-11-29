import { VERSION } from '@/constants/VERSION'
import { LINKS } from '@/constants/LINKS'

const Footer = () => {
  return (
    <footer className="container mx-auto flex w-full max-w-3xl items-center justify-between py-6">
      <div className="flex gap-2">
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
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
