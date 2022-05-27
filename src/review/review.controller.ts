import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  //GET FOR EXECUTING THE DATABASE POPULATION SERVICE
  //AND ADDING ALL TEST DATA REVIEWS INTO THE DB
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard) 
  @Get('reviewsPopulatingDb')
  async addTestReviewsPopulation(): Promise<any> {
    return await this.reviewService.populateNeo4jDb();
  }

  //GET ALL REVIEWS
  @Get('reviews')
  async getAllReviews(): Promise<any> {
    return await this.reviewService.findAll();
  }

  //GET REVIEWS ONLY BY SPECIFIC ESTATE ID
  @Get('reviews/:inputEstateId')
  async getReviewByEstateId(@Param('inputEstateId') inputEstateId: number): Promise<any> {
    return await this.reviewService.findOneReviewByEstateId(inputEstateId);
  }

  //CREATE A NEW REVIEW BY PASSING THE BODY
  //PROTECTED - NEED TO PASS JWT TOKEN
  @UseGuards(JwtAuthGuard) 
  @Post('reviews')
  async createNewReview(@Body() inputReview: any): Promise<any> {
    return await this.reviewService.createReview(inputReview);
  }

  //DELETE AN EXISTING REVIEW BY ESTATE ID
  @Delete('reviews/:deleteByEstateId')
  async deleteReview(@Param('deleteByEstateId') deleteByEstateId: number): Promise<any> {
    return await this.reviewService.deleteReviewByEstateId(deleteByEstateId);
  }
}