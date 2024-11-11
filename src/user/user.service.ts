import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from 'src/user/dto/register.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(registerDto: RegisterDto): Promise<any> {
    try {
      const hashPassword = await bcrypt.hash(registerDto.password, 10);

      const result = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashPassword,
          name: registerDto.name,
          tel: registerDto.tel,
        },
      });

      return { message: 'Create Register Success', result };
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<RegisterDto> {
    const result = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) {
      throw new NotFoundException('Email Not Found');
    }

    return result;
  }

  async login(loginDto: LoginDto) {
    try {
      const findEmail = await this.prisma.user.findUnique({
        where: {
          email: loginDto.email,
        },
      });

      if (!findEmail) {
        throw new NotFoundException('Email is not found');
      }

      const comparePassword = await bcrypt.compare(
        loginDto.password,
        findEmail.password,
      );

      if (!comparePassword) {
        throw new NotFoundException('Password is invalid');
      }

      const payload = {
        email: findEmail.email,
        name: findEmail.name,
      };

      const token = jwt.sign(
        payload,
        process.env.SECRETKEY || 'jwt_secretkey',
        { expiresIn: '7d' },
      );

      const { password: _, ...userWithoutPassword } = findEmail;

      return {
        message: 'Login Success',
        result: userWithoutPassword,
        accessToken: token,
      };
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
