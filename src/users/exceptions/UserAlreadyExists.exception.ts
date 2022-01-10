import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsExecption extends HttpException{
    constructor(){
        super('The user already exists!',HttpStatus.CONFLICT)
    }
}