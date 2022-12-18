import UserModel, { User } from "../model/user.model";

export function createUser(input: Partial<User>){
    return UserModel.create(input)
}

export function findUserById(id: string){
    return UserModel.findById(id);
}

export function findUserByEmail(email: string){
    return UserModel.findOne({email});
}

export function getUsers(){
    return UserModel.find().lean();
}
export function createAdmin(input: Partial<User>){
    return UserModel.create(input);
}

export function deleteUsers(){
    return UserModel.deleteMany({});
}