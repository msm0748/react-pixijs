import PixiJS from '@/components/pixijs';
import { Box } from '@chakra-ui/react';

export default function CanvasPage() {
  return (
    <Box width="dvw" height="dvh">
      <PixiJS />
    </Box>
  );
}
