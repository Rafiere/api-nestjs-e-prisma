import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {

  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: BookDTO){

    return this.bookService.create(data);
  }

  @Get()
  async findAll(){

    return this.bookService.findAll();
  }

  @Put(":id")
  async updateBook(@Param("id") id: string, @Body() data: BookDTO){

    return this.bookService.update(id, data)
  }

  @Delete(":id")
  async deleteBook(@Param("id") id: string){

    return this.bookService.delete(id);
  }
}
