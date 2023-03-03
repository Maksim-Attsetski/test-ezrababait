import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IQuery } from 'src/utils';
import { DeedService } from './deed.service';
import { GetDeedDto } from './dto/get-deed.dto';

@Controller('deeds')
export class DeedController {
  constructor(private readonly deedService: DeedService) {}

  @Post()
  create(@Body() createDeedDto: GetDeedDto) {
    return this.deedService.create(createDeedDto);
  }

  @Get()
  findAll(@Query() query: IQuery) {
    return this.deedService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deedService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeedDto: GetDeedDto) {
    return this.deedService.update(id, updateDeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deedService.remove(id);
  }
}
