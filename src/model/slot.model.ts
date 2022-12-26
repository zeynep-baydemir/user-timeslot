import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { DecoratorKeys } from "@typegoose/typegoose/lib/internal/constants";
import { Room } from "./organization.model";
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

    @prop({ref: () => Room})
    room: Ref<Room>;

    @prop()
    desk: string;
}

const SlotModel = getModelForClass(Slot);

export default SlotModel;