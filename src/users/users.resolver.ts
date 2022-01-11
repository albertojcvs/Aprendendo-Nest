import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Query(() => User)
  async user(@Args('id') id: string) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDTO) {
    const user = await this.usersService.create(data);

    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('data') data: UpdateUserDTO) {
    const user = await this.usersService.update(id, data);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    await this.usersService.findOne(id);
    await this.usersService.remove(id);
    return true;
  }
}
