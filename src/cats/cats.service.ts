
import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    { id: 1, name: 'Garfield', age: 5, breed: 'Persian' },
    { id: 2, name: 'Tom', age: 3, breed: 'Siamese' },
  ];

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat | undefined {
    return this.cats.find(cat => cat.id === id);
  }

  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: this.cats.length + 1,
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat | null {
    const cat = this.findOne(id);
    if (!cat) return null;
    Object.assign(cat, updateCatDto);
    return cat;
  }

  remove(id: number): boolean {
    const index = this.cats.findIndex(cat => cat.id === id);
    if (index === -1) return false;
    this.cats.splice(index, 1);
    return true;
  }
}
