import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Slot {
    @prop()
    day: string;
    
    @prop({required: true})
    startTime: string;

    @prop()
    endTime: string;

    @prop({ref: () => User })
    user: Ref<User>;
}

const SlotModel = getModelForClass(Slot);

export default SlotModel;