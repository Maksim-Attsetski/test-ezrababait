import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/authGuard';
import { IQuery } from 'src/utils';
import { DeedService } from './deed.service';
import { GetDeedDto } from './dto/get-deed.dto';

@Controller('deeds')
export class DeedController {
  constructor(private readonly deedService: DeedService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createDeedDto: GetDeedDto) {
    return this.deedService.create(createDeedDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: IQuery) {
    return this.deedService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deedService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeedDto: GetDeedDto) {
    return this.deedService.update(id, updateDeedDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deedService.remove(id);
  }
}
