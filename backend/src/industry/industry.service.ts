import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IndustryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateIndustryDto) {
    return this.prisma.industry.create({
      data,
    });
  }
  async findAll() {
    return this.prisma.industry.findMany({
      include: {
        companies: true,
      },
    });
  }
  async findOne(id: number) {
    const industry = await this.prisma.industry.findUnique({
      where: { id },
      include: { companies: true },
    });

    if (!industry) {
      throw new NotFoundException(`Industry with ID ${id} not found`);
    }

    return industry;
  }

  async update(id: number, data: UpdateIndustryDto) {
    await this.findOne(id);
    return this.prisma.industry.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.industry.delete({
      where: { id },
    });
  }
}
