import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Document, DocumentDocument } from './schema/document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { DocumentResponse } from './response/document.response';
import { plainToInstance } from 'class-transformer';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { EDocumentType, EFileType } from 'src/constant/enum';
import { REGEX_YOUTUBE_URL } from 'src/constant/regex';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
  ) {}

  async create(input: CreateDocumentDto): Promise<void> {
    this._validateDocumentType(input);
    const createdDocument = new this.documentModel(input);
    await createdDocument.save();
  }

  async getById(id: string): Promise<DocumentResponse> {
    const document = await this.documentModel.findOne({ _id: id });
    if (!document) {
      throw new HttpException('DOCUMENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(DocumentResponse, document, {
      excludeExtraneousValues: true,
    });
  }

  async update(input: UpdateDocumentDto): Promise<void> {
    this._validateDocumentType(input);
    await this.getById(input.id);
    await this.documentModel.findByIdAndUpdate(input.id, input);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.documentModel.findByIdAndDelete(id);
  }

  _validateDocumentType(input: CreateDocumentDto | UpdateDocumentDto) {
    switch (input.document_type) {
      case EDocumentType.file:
        if (!input.urls.length) {
          throw new HttpException(
            'DOCUMENT_FILE_EMPTY',
            HttpStatus.BAD_REQUEST,
          );
        }
        this._validateFileType(input);

      case EDocumentType.question:
        if (!input.questions.length) {
          throw new HttpException(
            'DOCUMENT_QUESTION_EMPTY',
            HttpStatus.BAD_REQUEST,
          );
        }
      default:
        if (!input.texts.length) {
          throw new HttpException(
            'DOCUMENT_TEXT_EMPTY',
            HttpStatus.BAD_REQUEST,
          );
        }
    }
  }

  _validateFileType(input: CreateDocumentDto | UpdateDocumentDto) {
    const ytbReg = new RegExp(REGEX_YOUTUBE_URL);

    switch (input.file_type) {
      case EFileType.youtube:
        if (!input.urls.filter((url) => !ytbReg.test(url)).length) {
          throw new HttpException('WRONG_URL_YOUTUBE', HttpStatus.BAD_REQUEST);
        }
      default:
        if (
          input.urls.filter(
            (url) =>
              url.match(/\.(jpeg|jpg|gif|png|webp|svg|doc|pdf)$/i) === null,
          )
        ) {
          throw new HttpException('WRONG_URL_FILE', HttpStatus.BAD_REQUEST);
        }
    }
  }
}
