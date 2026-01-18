import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/context/ThemeProvider';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-3 sm:px-4">
        <div></div>

        <div className="flex items-center gap-1 sm:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl hover:bg-muted/80 transition-colors"
              >
                {theme === 'light' && <Sun className="h-4 w-4 sm:h-5 sm:w-5" />}
                {theme === 'dark' && <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
                {theme === 'system' && <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-32">
              <DropdownMenuItem onClick={() => setTheme('light')} className="gap-2 cursor-pointer">
                <Sun className="h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="gap-2 cursor-pointer">
                <Moon className="h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="gap-2 cursor-pointer">
                <Monitor className="h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
