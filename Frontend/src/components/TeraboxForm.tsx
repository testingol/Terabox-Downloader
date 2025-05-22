import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TeraboxFormProps {
  onSubmit: (link: string) => Promise<void>;
  isLoading: boolean;
}

export default function TeraboxForm({ onSubmit, isLoading }: TeraboxFormProps) {
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-2xl font-semibold">Terabox Link Downloader</CardTitle>
          <CardDescription>
            Enter a Terabox sharing link to fetch file details and download options
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="https://www.terabox.app/sharing/link?surl=..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="pr-10"
                  disabled={isLoading}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="relative overflow-hidden group"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <motion.span
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Fetch File
                  </motion.span>
                )}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isLoading ? 'Fetching...' : 'Fetch File'}
                </motion.span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}