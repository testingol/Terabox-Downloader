import { motion } from 'framer-motion';
import { Download, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TeraboxFile } from '@/types/terabox';
import FilePreview from './FilePreview';
import { useState } from 'react';
import { formatFileSize } from '@/lib/formatFileSize';

interface FileDetailsProps {
  file: TeraboxFile;
}

export default function FileDetails({ file }: FileDetailsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(file.proxy_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold truncate pr-4">
                {file.file_name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{formatFileSize(file.file_size)}</Badge>
                <Badge variant="secondary">
                  {file.file_name.split('.').pop()?.toUpperCase() || 'FILE'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <FilePreview file={file} />
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 p-6 justify-center items-center">
          <Button
            className="relative w-full sm:w-auto flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
            onClick={() => window.open(file.proxy_url, '_blank')}
          >
            <Download className="w-4 h-4" />
            Download
            <motion.div 
              className="absolute inset-0 rounded-md bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.2 }}
            />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="ml-4"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-foreground" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}