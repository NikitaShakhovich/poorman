import { Card, Field} from "../ui";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {movePlayerCardToField, useAppDispatch, usePlayerFieldsSelector, usePlayerSelector,} from "../store";


const Player = () => {
    const dispatch = useAppDispatch()
    const cardsInHand = usePlayerSelector().cardsInHand
   const fields = usePlayerFieldsSelector()
  const handleDragEnd = ({ over, active }: DragEndEvent) => {
        console.log(over)
        if(!over?.id || over.data.current?.card){
            return
        }
      dispatch(movePlayerCardToField({fieldId: over.id as string, cardId: active.id as number}))
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-full w-full flex flex-col">
        <div className="flex justify-center">
          {fields.map((field) => (
            <Field id={field.id} key={field.id} card={field.data}/>
          ))}
        </div>
        <div className="w-full h-full border flex gap-2 items-center">
          {cardsInHand.map((card)=>(<Card key={card.id} id={card.id}/>))}
        </div>
      </div>
    </DndContext>
  );
};

export default Player;