import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './App.css';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from './image.png';
import image2 from './image2.png';
import music from './music.mp3';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    gsap.set('.page2 img', {
      width: '30vw',
      height: '30vh',
      objectFit: 'cover',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page2',
        start: 'top top',
        end: '+=2000',
        scrub: true,
        pin: true,
        onEnter: () => {
          console.log('Animation entered');
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 1;
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log('Music playing successfully');
                })
                .catch((error) => {
                  console.log('Autoplay prevented:', error);
                });
            }
          }
        }
      }
    });

    tl.to('.page2 img', {
      width: '100vw',
      height: '100vh',
      ease: "none"    
    }, 0);

    tl.fromTo(
      '.text-left',
      { x: '-40vw', opacity: 0 },
      { x: 0, opacity: 1, ease: "none" },
      0
    );

    tl.fromTo(
      '.text-right',
      { x: '40vw', opacity: 0 },
      { x: 0, opacity: 1, ease: "none" },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Allow user interaction to unlock audio
  const handleAudioUnlock = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio play error:', err);
      });
    }
  };

  return (
    <div className='app' onClick={handleAudioUnlock}>
      <div className="page1">
        <h1>Scroll down</h1>
        <img src={image2} alt="#" />
      </div>
      <div className="page2">
        <img src={image} alt="#" />
        <audio 
          ref={audioRef} 
          src={music}
          preload="auto"
          crossOrigin="anonymous"
        ></audio>
        <div className="text-row">
          <div className="text-left"><h1>sidhu</h1></div>
          <div className="text-right"><h1>moosewala</h1></div>
        </div>
        <div className="block"></div>
      </div>
    </div>
  );
};

export default App;