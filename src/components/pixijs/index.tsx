'use client';
import { Box } from '@chakra-ui/react';
import { Application, Sprite, Assets } from 'pixi.js';
import { useEffect, useRef } from 'react';

export default function PixiJS() {
  const ref = useRef<HTMLDivElement>(null);
  const app = useRef<Application | null>(null);

  useEffect(() => {
    app.current = new Application();

    const init = async () => {
      if (!app.current) return;

      await app.current.init({
        resizeTo: window,
      });
      ref.current?.appendChild(app.current.canvas);

      // load the texture we need
      const texture = await Assets.load(
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      );

      // This creates a texture from a 'bunny.png' image
      const bunny = new Sprite(texture);

      // Setup the position of the bunny
      bunny.x = app.current.renderer.width / 2;
      bunny.y = app.current.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      app.current.stage.addChild(bunny);

      // Listen for frame updates
      app.current.ticker.add(() => {
        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
      });
    };

    init();
  }, []);
  return <Box ref={ref} width="full" height="full"></Box>;
}
