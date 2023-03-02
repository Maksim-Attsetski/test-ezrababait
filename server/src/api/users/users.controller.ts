import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/get.dto';
import { IListForChange, IQuery } from 'src/utils';
import { AuthGuard } from 'src/guards/authGuard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: IQuery) {
    return this.usersService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('list/:id')
  updateList(@Param('id') id: string, @Body() list: IListForChange[]) {
    return this.usersService.updateList(id, list);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: GetUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
