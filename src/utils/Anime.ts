import { CardType, ICardAttack } from '../interfaces';
import anime from 'animejs/lib/anime.es';
import { AnimeParams } from 'animejs';
import { getCardPropertiesByType } from '.';

export const cardAttackAnimation = ({
  isEnemy,
  cardId,
  cardType,
}: {
  isEnemy: boolean;
  cardId: ICardAttack['attackingCard']['id'];
  cardType: CardType;
}) => ({
  targets: `#card_${cardId} `,
  ...getCardPropertiesByType(cardType, false).animation(isEnemy),
  duration: 1000,
  easing: 'easeOutElastic(1, .8)',
});

export const cardGetDamageAnimation = ({
  cardId,
}: {
  isEnemy: boolean;
  cardId: ICardAttack['attackingCard']['id'];
}): AnimeParams => ({
  targets: `#${cardId} .hp`,
  color: ['rgb(112,16,16)', 'rgb(0,0,0)'],
  fontSize: ['24px', '12px'],
});

export const tearDownTheVeil = {
  targets: '.veil-left, .veil-right',

  width: [{ value: '0%', duration: 250 }],
  easing: 'linear',
};

export const toCloseTheVeil = {
  targets: '.veil-left, .veil-right',
  width: '50%',
  duration: 250,
  easing: 'linear',
};

export const fieldUnderAttackAnimation = ({
  isEnemy,
  fieldId,
}: {
  isEnemy: boolean;
  fieldId: string;
}) => {
  return {
    targets: `.${isEnemy ? 'enemy' : 'player'} #${fieldId}`,
    scale: [
      { value: 1.2, duration: 400 },
      { value: 1, duration: 160 },
    ],
    easing: 'easeOutElastic(1, .8)',
  };
};

export const playerWinAnimation = {
  targets: '.player-win',
  opacity: '1',
  duration: 250,
  easing: 'easeInBounce',
};

export const animePromise = (params: AnimeParams) =>
  new Promise((complete) => {
    anime({ ...params, complete });
  });
