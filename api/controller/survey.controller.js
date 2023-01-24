const { MongoClient, ObjectId } = require('mongodb');

const connectionString = process.env.MONGODB_CONNECTION_STRING;

async function saveSurvey(req, res) {

    try {
        const { surveyId, rating, likeComment, trainerImprovement, programImprovement } = req.body;

        if (surveyId && rating && !isNaN(rating) && likeComment && trainerImprovement && programImprovement) {
            const client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            const surveyDetailsCollection = client.db('studentsurveyapp').collection('surveyDetails');
            const surveyDetailsResult = await surveyDetailsCollection.findOne({ _id: ObjectId(surveyId) });
            if (surveyDetailsResult) {
                const surveyCollection = client.db('studentsurveyapp').collection('surveys');
                const result = await surveyCollection.insertOne({
                    surveyId: ObjectId(surveyId),
                    rating: +rating,
                    likeComment: likeComment,
                    trainerImprovement: trainerImprovement,
                    programImprovement: programImprovement,
                    insertedAt: new Date()
                });
                if (result.acknowledged) {
                    res.send({ message: "Thank you for your valuable input!" });
                } else {
                    res.status(500).send({ message: "Some error occurred while saving your survey. Please try again later." });
                }
            } else {
                res.status(400).send({ message: "This is an invalid or expired survey link. Please contact admin." });
            }
        } else {
            res.status(400).send({ message: "All fields are mandatory. Please resubmit filling up all fields." });
        }
    } catch (ex) {
        console.log(ex);
        res.status(500).send({ message: "Some error occurred while saving your survey. Please try again later." });
    }

}

async function getAllSurveys(req, res) {

    try {
        const page = req.query['page'] >= 1 ? req.query['page'] : 1;

        const limit = 50;
        const skip = (page - 1) * 50;

        const client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        const collection = client.db('studentsurveyapp').collection('surveys');

        const agg = [
            {
                '$facet': {
                    'count': [
                        {
                            '$count': 'count'
                        }
                    ],
                    'data': [
                        {
                            '$sort': {
                                'insertedAt': -1
                            }
                        }, {
                            '$skip': skip
                        }, {
                            '$limit': limit
                        }
                    ]
                }
            }
        ]


        const result = await collection.aggregate(agg).toArray();

        const output = {
            totalCount: result[0]?.count[0]?.count || 0,
            totalPage: result[0]?.count[0]?.count ? Math.ceil(result[0]?.count[0]?.count / limit) : 0,
            data: result[0]?.data
        }

        res.send(output);
    } catch (ex) {
        console.log(ex);
        res.status(500).send({ message: "Some error occurred while retrieving data. Please try again later." });
    }

}

module.exports = {
    saveSurvey,
    getAllSurveys
}