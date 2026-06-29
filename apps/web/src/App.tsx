import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-background text-foreground">
      <motion.h1
        className="text-4xl font-bold tracking-tight"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Frontend Template v1
      </motion.h1>

      <div className="flex items-center gap-3 text-muted-foreground">
        <FiStar className="text-2xl text-yellow-500" />
        <span className="text-sm">react-icons / FiStar</span>
      </div>

      <div className="flex items-center gap-3">
        <ClipLoader color="hsl(222.2 47.4% 11.2%)" size={32} />
        <span className="text-sm text-muted-foreground">react-spinners / ClipLoader</span>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui + framer-motion
      </p>
    </div>
  )
}

export default App
