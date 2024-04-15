import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionService } from '../question.service';
import { ValidateMongoId } from 'src/common/utils/validate.util';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';

@Controller('questions')
@ApiTags('Questions')
@ApiBearerAuth('accessToken')
export class QuestionAdminController {
  constructor(private readonly service: QuestionService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ValidateMongoId) id: string) {
    return await this.service.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateQuestionDto): Promise<void> {
    return this.service.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() body: UpdateQuestionDto): Promise<void> {
    return this.service.update(body);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ValidateMongoId) id: string): Promise<void> {
    return this.service.delete(id);
  }
}
