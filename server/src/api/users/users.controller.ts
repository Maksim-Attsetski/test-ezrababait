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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: IQuery) {
    return this.usersService.findAll(query);
  }

  @Get('exist')
  checkIsExist(@Query() query: IQuery) {
    return this.usersService.checkIsExist(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('list/:id')
  updateList(@Param('id') id: string, @Body() list: IListForChange[]) {
    return this.usersService.updateList(id, list);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: GetUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
