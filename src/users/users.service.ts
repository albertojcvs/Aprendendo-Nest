import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { User } from './entity/user.entity';
import { UserAlreadyExistsExecption } from './exceptions/UserAlreadyExists.exception';
import { UserAttributeAlreadyExistsException } from './exceptions/UserAttributeAlreadyExists.exception';
import { UserNotFoundException } from './exceptions/UserNotFound.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async create(createUserDTO: CreateUserDTO) {
    const usernameAlreadyExists = await this.findBy(
      'username',
      createUserDTO.username,
    );

    if (usernameAlreadyExists)
      throw new UserAttributeAlreadyExistsException('username');

    const emailAlreadyExists = await this.findBy('email', createUserDTO.email);

    if (emailAlreadyExists)
      throw new UserAttributeAlreadyExistsException('email');

    const newUser = this.usersRepository.create(createUserDTO);

    return await this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    await this.usersRepository.update(id, {
      ...updateUserDTO
    });

    const user = await this.usersRepository.findOne(id);

    return user;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.usersRepository.delete(id);
  }

  async findBy(key: string, value: any) {
    const options = {};
    options[key] = value;
    const user = await this.usersRepository.findOne({ where: options });

    return user
  }
}
