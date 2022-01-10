import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAttributeAlreadyExistsException extends HttpException{
    constructor(attribute:string){
        super(`The ${attribute} already exists!`,HttpStatus.CONFLICT)
    }
}