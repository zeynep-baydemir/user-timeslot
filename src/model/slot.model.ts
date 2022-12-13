import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";

export class Slot {
    @prop()
    day: string;
    
    @prop({required: true})
    startTime: string;

    @prop()
    endTime: string;

    @prop({default: null})
    userId: string;
}

const SlotModel = getModelForClass(Slot);

export default SlotModel;