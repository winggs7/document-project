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
import { DocumentService } from '../document.service';
import { ValidateMongoId } from 'src/common/utils/validate.util';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { UpdateDocumentDto } from '../dtos/update-document.dto';

@Controller('documents')
@ApiTags('Documents')
@ApiBearerAuth('accessToken')
export class DocumentAdminController {
  constructor(private readonly service: DocumentService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ValidateMongoId) id: string) {
    return await this.service.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateDocumentDto): Promise<void> {
    return this.service.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() body: UpdateDocumentDto): Promise<void> {
    return this.service.update(body);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ValidateMongoId) id: string): Promise<void> {
    return this.service.delete(id);
  }
}
