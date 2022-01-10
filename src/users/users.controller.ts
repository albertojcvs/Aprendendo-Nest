import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.create(createUserDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateUserDTO: UpdateUserDTO,
  ) {
    const userUpdated = await this.usersService.update(id, updateUserDTO);

    return userUpdated;
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { succes: { message: 'User was removed!' } };
  }
}
