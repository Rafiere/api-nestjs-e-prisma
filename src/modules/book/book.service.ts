import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {

    constructor(private prisma: PrismaService){


    }

    //Método para criar um livro.
    async create(data: BookDTO){

        //Estamos verificando se o livro já está cadastrado através do "bar_code" desse
        //livro. Se ele já estiver cadastrado, não podemos cadastrá-lo novamente, assim, uma
        //exception será lanç

        const bookExists = await this.prisma.bookEntity.findFirst({
            where: {
                bar_code: data.bar_code
            }
        })

        if(bookExists){
            throw new Error('O livro já está cadastrado.')
        }

        const book = await this.prisma.bookEntity.create({
            data,
        });
    }

    //Método para buscar todos os livros.
    async findAll(){

        return this.prisma.bookEntity.findMany();
    }

    //Método para atualizar um livro.
    async update(id: string, data: BookDTO){

        const bookExists = await this.prisma.bookEntity.findUnique({
            where: {
                id,
            },
        });

        if(!bookExists){
            throw new Error('O livro não existe!')
        }

        return await this.prisma.bookEntity.update({
            data,
            where: {
                id,
            }
        });
    }

    //Método para deletar um livro.
    async delete(id: string) {

        const bookExists = this.prisma.bookEntity.findUnique({
            where: {
                id,
            },
        });

        if(!bookExists){
            throw new Error("O livro não existe!");
        }

        return await this.prisma.bookEntity.delete({
            where: {
                id
            }
        });
    }
}
