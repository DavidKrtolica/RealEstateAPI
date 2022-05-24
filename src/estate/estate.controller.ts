import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Estate } from './estate.schema';
import { EstateService } from './estate.service';

@Controller()
export class EstateController {
  constructor(private estateService: EstateService) {}

  //GET ALL ESTATES 
  @Get('estates')
  async getAllEstates(): Promise<Estate[]> {
    return await this.estateService.findAll();
  }

  //GET ONE ESTATE BY ID
  @Get('estates/:searchEstateId')
  async getEstateById(@Param('searchEstateId') searchEstateId: number): Promise<Estate> {
    return await this.estateService.findOne(searchEstateId);
  }

  //CREATE A NEW ESTATE POST METHOD
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Post('estates')
  async createNewEstate(@Body() estateInput: any): Promise<any> {
    return await this.estateService.insertEstate(estateInput);
  }

  //DELETE ONE ESTATE BY ID
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Delete('estates/:deleteEstateId')
  async deleteEstateById(@Param('deleteEstateId') deleteEstateId: number): Promise<any> {
    return await this.estateService.deleteAnEstateByEstateId(deleteEstateId);
  }

  //UPDATE AN EXISTING ESTATE - PUT METHOD
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard)
  @Put('estates/:updateEstateId')
  async updateEstateById(@Param('updateEstateId') updateEstateId: number, @Body() updatedEstateInput: any): Promise<any> {
    return await this.estateService.updateEstateById(updateEstateId, updatedEstateInput);
  }
}