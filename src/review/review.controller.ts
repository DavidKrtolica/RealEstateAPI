import { Controller, Get } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j'

@Controller()
export class ReviewController {
    constructor(private readonly neo4jService: Neo4jService) {}

  @Get('reviews')
  async getAllReviews(): Promise<any> {
    //QUERIES TO THE NEO4J DATABASE
    const resComments = await this.neo4jService.read(`MATCH (n) RETURN (n.comment)`);
    const resStars = await this.neo4jService.read(`MATCH (n) RETURN (n.stars)`);

    //ADDING ALL COMMENTS TO A SEPARATE ARRAY
    let newCommentArr = [];
    resComments.records.forEach(recordComment => {
        let getComment = recordComment._fields[0];
        newCommentArr.push(getComment);
    });

    // ADDING ALL STARS TO SEPARATE ARRAY
    let newStarsArr = [];
    resStars.records.forEach(recordStars => {
        let getStars = recordStars._fields[0].low;
        newStarsArr.push(getStars);
    });

    // MAKING A RESULT ARRAY AND ADDING ALL REVIEW OBJECT BY ASSIGNING
    // CORRENT COMMENTS AND AMOUNT OF STARS GIVEN
    let resultArr = [];
    for (let i = 0; i < newCommentArr.length; i++) {
        const newReview = { comment: newCommentArr[i], stars: newStarsArr[i] };
        resultArr.push(newReview);
    }

    //RETURNING RESULT ARRAY
    return resultArr;
  }
}