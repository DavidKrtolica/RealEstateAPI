import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { EstateService } from 'src/estate/estate.service';

@Injectable()
export class ReviewService {
    constructor(
        private readonly neo4jService: Neo4jService,
        private estateService: EstateService
    ) {}

    async findAll(): Promise<any> {
        //QUERIES TO THE NEO4J DATABASE
        const resComments = await this.neo4jService.read(`MATCH (n) RETURN (n.comment)`);
        const resStars = await this.neo4jService.read(`MATCH (n) RETURN (n.stars)`);
        const resEstateIds = await this.neo4jService.read(`MATCH (n) RETURN (n.estateId)`);

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

        // ADDING ALL ESTATE IDs TO SEPARATE ARRAY
        let newEstatesArr = [];
        resEstateIds.records.forEach(recordEstateId => {
            let getEstateIds = recordEstateId._fields[0].low;
            newEstatesArr.push(getEstateIds);
        });

        // MAKING A RESULT ARRAY AND ADDING ALL REVIEW OBJECT BY ASSIGNING
        // CORRENT COMMENTS AND AMOUNT OF STARS GIVEN
        let resultArr = [];
        for (let i = 0; i < newCommentArr.length; i++) {
            const newReview = { comment: newCommentArr[i], stars: newStarsArr[i], estateId: newEstatesArr[i] };
            resultArr.push(newReview);
        }

        //RETURNING RESULT ARRAY
        return resultArr;
    }

    async findOneReviewByEstateId(searchEstateId: number): Promise<any> {
        try {
            //GETTING THE CORRECT ESTATE WITH MATCHING ESTATE ID USING THE ESTATE-SERVICE
            const checkEstate = await this.estateService.findOne(searchEstateId);
            if (checkEstate !== null || checkEstate !== undefined) {
                //GETTING ALL REVIEW OBJECTS USING THE ABOVE METHODS - NO QUERIES!
                const reviews = await this.findAll();
                let result;
                if (reviews.length > 0) {
                    reviews.forEach(review => {
                        //CHECKING IF THE REVIEW ESTATE ID IS THE SAME AS THE ESTATE ID OF THE RETRIEVED ESTATE
                        if (review.estateId == checkEstate.estateId) {
                            //CREATING A NEW 'RESULT' OBJECT WHICH HAS DATA REGARDING BOTH REVIEW AND ESTATE
                            result = {
                                estateId: checkEstate.estateId,
                                estateCity: checkEstate.city,
                                estateAddress: checkEstate.estateAddress,
                                stars: review.stars,
                                comment: review.comment
                            };
                        }
                    });
                }
                return result;
            }
        } catch (error) {
            throw new NotFoundException(`Couldn't find estate with ID: ${searchEstateId}!`);
        }
    }

    async createReview(newReviewInput: any): Promise<any> {
        //SIMPLE NEO4J CREATE QUERY/CYPHER TO MAKE A NEW NODE AND 
        //ASSINING PASSED BODY/JSON OBJECT PROPERTIES TO THE NODE PROPS
        const newReview = await this.neo4jService.write(
            `CREATE (n: Review{ stars: ${newReviewInput.stars}, 
                                comment: "${newReviewInput.comment}", 
                                estateId: ${newReviewInput.estateId}})`
        );
        if (newReview != null || newReview != undefined) {
            return `Successfully created a new Review for following estate ID: ${newReviewInput.estateId} !`;
        } else {
            return 'There has been an error while creating a new Review!';
        }
    }

    async deleteReviewByEstateId(deleteReviewEstateId: number): Promise<any> {
        //SIMPLE NEO4J QUERY/CYPHER TO FIND A NODE WITH PROPERTY ESTATEID OF VALUE 4 AND DELETE
        const deleteReview = await this.neo4jService.write(
            `MATCH (n) WHERE (n.estateId = ${deleteReviewEstateId}) DELETE (n)`
        );
        //TO BE ABLE TO DO ERROR HANDLING, CHECKING IF "CONTAINSUPDATE" BOOLEAN
        //EXISTS ON THE RETURNED JSON SUMMARY OBJECT
        const wasUpdated = deleteReview.summary.updateStatistics;
        if ("_containsUpdates" in wasUpdated) {
            return `Successfully delete a Review for following estate ID: ${deleteReviewEstateId} !`;
        } else {
            return `There has been an error while deleting the Review with following estate ID: ${deleteReviewEstateId} !`;
        }
    }
}