import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, AnswerDocument } from './schemas/answer.schema';
import { Model } from 'mongoose';
import { CreateAnswerDto } from './dtos/create-answer.dto';
import { AnswerResponse } from './response/answer.response';
import { plainToInstance } from 'class-transformer';
import { UpdateAnswerDto } from './dtos/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}

  async create(input: CreateAnswerDto): Promise<void> {
    const createdAnswer = new this.answerModel(input);
    await createdAnswer.save();
  }

  async getById(id: string): Promise<AnswerResponse> {
    const answer = await this.answerModel.findOne({ _id: id });
    if (!answer) {
      throw new HttpException('ANSWER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(AnswerResponse, answer, {
      excludeExtraneousValues: true,
    });
  }

  async update(input: UpdateAnswerDto): Promise<void> {
    await this.getById(input.id);
    await this.answerModel.findByIdAndUpdate(input.id, input);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.answerModel.findByIdAndDelete(id);
  }
}
