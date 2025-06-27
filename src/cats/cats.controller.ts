import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'; // Importa los decoradores para manejar rutas
import { CatsService } from './cats.service'; // Importa el servicio de Cats
import { CreateCatDto } from './dto/create-cat.dto'; // Importa el DTO para crear un gato
import { UpdateCatDto } from './dto/update-cat.dto'; // Importa el DTO para actualizar un gato

@Controller('cats') // Define la ruta base del controlador, en este caso 'cats'
export class CatsController {
  constructor(private readonly catsService: CatsService) {} // Inyecta el servicio Cats en el controlador

  // GET /cats -> Devuelve todos los gatos
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  // GET /cats/:id -> Devuelve un gato por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(Number(id));
  }

  // POST /cats -> Crea un nuevo gato
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // PATCH /cats/:id -> Actualiza parcialmente un gato
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(Number(id), updateCatDto);
  }

  // DELETE /cats/:id -> Elimina un gato
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(Number(id));
  }
}