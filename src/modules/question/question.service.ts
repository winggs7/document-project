import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuestionResponse } from './response/question.response';
import { plainToInstance } from 'class-transformer';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { Answer, AnswerDocument } from '../answer/schemas/answer.schema';
import { UpdateAnswerDto } from '../answer/dtos/update-answer.dto';
import { CreateAnswerDto } from '../answer/dtos/create-answer.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}

  async create(input: CreateQuestionDto): Promise<void> {
    const createdAnswers = await this.answerModel.insertMany(input.answers);

    const createdQuestion = new this.questionModel({
      ...input,
      answers: createdAnswers.map((answer) => answer.id),
    });
    await createdQuestion.save();
  }

  async getById(id: string): Promise<QuestionResponse> {
    const question = await this.questionModel
      .findOne<QuestionResponse>({ _id: id })
      .populate({ path: 'answer' });

    if (!question) {
      throw new HttpException('QUESTION_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(QuestionResponse, question, {
      excludeExtraneousValues: true,
    });
  }

  async update(input: UpdateQuestionDto): Promise<void> {
    const oldAnswer = input.answers.filter(
      (answer) => answer instanceof UpdateAnswerDto && answer.id,
    ) as UpdateAnswerDto[];
    const newAnswer = input.answers.filter(
      (answer) => answer instanceof CreateAnswerDto,
    ) as CreateAnswerDto[];

    await this.answerModel.updateMany(
      {
        id: { $in: oldAnswer.map((answer) => answer.id) },
      },
      oldAnswer,
    );

    const createdNewAnswers = await this.answerModel.insertMany(newAnswer);

    await this.getById(input.id);
    await this.questionModel.findByIdAndUpdate(input.id, {
      ...input,
      answers: { ...createdNewAnswers, ...oldAnswer }.map(
        (answer) => answer.id,
      ),
    });
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.questionModel.findByIdAndDelete(id);
  }
}
