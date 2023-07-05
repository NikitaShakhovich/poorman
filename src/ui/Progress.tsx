import { piece, progress } from '../assets';
import { usePlayerSelector } from '../store';
import { useEffect, useRef } from 'react';
import { get_mana_mp3 } from '../assets';

const Progress = () => {
  const manaCurrent = usePlayerSelector().manaCurrent;
  const prevManaCurrentRef = useRef(manaCurrent);
  const manaSound = useRef<any>(null);
  useEffect(() => {
    if (manaCurrent >= prevManaCurrentRef.current) {
      if (manaSound.current) {
        manaSound.current.play();
      }
    }
    prevManaCurrentRef.current = manaCurrent;
  }, [manaCurrent]);

  setTimeout(() => {
    if (manaSound.current && manaSound.current.volume) {
      manaSound.current.volume = 0.1;
    }
  }, 100);

  return (
    <div className="flex flex-col items-center justify-center">
      <audio ref={manaSound}>
        <source src={get_mana_mp3} type="audio/mpeg" />
      </audio>
      <div className="text-white text-2xl">{manaCurrent}</div>
      <div
        style={{ backgroundImage: `url(${progress})` }}
        className="w-[70px] bg-center relative flex justify-end flex-col  bg-contain h-[492px] bg-no-repeat px-[2px]"
      >
        {new Array(manaCurrent).fill(null).map((_, index) => {
          const bottom = `${12 + index * 62.5}px`;
          const zIndex = `${50 - index}`;
          return (
            <img
              alt="manapiece"
              key={bottom}
              style={{ bottom, zIndex }}
              src={piece}
              className={`object-contain w-[66px] absolute ${zIndex}`}
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
