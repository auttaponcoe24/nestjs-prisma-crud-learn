import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParamsTaskDto } from 'src/task/dto/task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // async create(createTaskDto: CreateTaskDto) {
  async create(createTaskDto: Prisma.TaskCreateInput) {
    const result = await this.prisma.task.create({
      data: createTaskDto,
    });

    return result;
  }

  async findAll(params: ParamsTaskDto) {
    const { start, page_size, keywords } = params;
    const result = await this.prisma.task.findMany({
      take: Number(page_size),
      skip: (Number(start) - 1) * Number(page_size),
      where: {
        title: {
          contains: keywords,
        },
      },
    });

    const total_record = await this.prisma.task.count();

    return { result, total_record };
  }

  async findOne(id: number) {
    const result = await this.prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    return result;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const result = await this.prisma.task.update({
      where: {
        id: id,
      },
      data: updateTaskDto,
    });

    return result;
  }

  async remove(id: string) {
    const findId = await this.prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!findId) {
      throw new NotFoundException('id not found');
    }

    const result = await this.prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    return { result, messages: 'Delete Success' };
  }
}
