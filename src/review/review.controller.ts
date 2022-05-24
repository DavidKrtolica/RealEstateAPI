import { Controller, Get } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

  @Get('reviews')
  async getAllReviews(): Promise<any> {
    return await this.reviewService.findAll();
  }
}