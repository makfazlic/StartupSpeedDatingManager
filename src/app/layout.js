import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Startup Speed Dating - ETH Entrepreneur Club',
  description: 'Website for the Startup Speed Dating event of the ETH Entrepreneur Club',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en
    
    "
    className='bg-slate-200'
    >
      <body className={inter.className}>{children}</body>
    </html>
  )
}
