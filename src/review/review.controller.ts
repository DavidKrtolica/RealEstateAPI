import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

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
  @Post('reviews')
  async createNewReview(@Body() inputReview: any): Promise<any> {
    return await this.reviewService.createReview(inputReview);
  }
}