const {Router} = require('express');
const fs = require('fs');
const auth = require('../middleware/auth.middleware');

const Exercise = require('../models/Exercise');
const Image = require('../models/Image');
const Train = require('../models/Train');
const User = require('../models/User');
const Strategy = require('../models/Strategy');

const router = Router();


router.get('/exercises', auth, async (req, res) => {
    try {
        let exercises = await Exercise.find();
        let results = [];

        await Promise.all(exercises.map(async e => {
            const images = await Image.find({exercise: e._id});

            results.push( {
                id: e._id,
                name: e.name,
                descr: e.descr,
                minCountReps: e.minCountReps,
                minWeight: e.minWeight,
                images: images
            });
        }));


        res.json(results);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.put('/exercises', auth, async (request, response) => {
    try {

        const {name, descr, minCountReps, minWeight} = request.body;

        const exercise = new Exercise({name, descr, minCountReps, minWeight});

        await exercise.save();

        response.status(201).json({message: 'Упражнение создано'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.post('/exercises', auth, async (request, response) => {
    try {
        const {id, imageId} = request.body;

        const exercise = await Exercise.findOne({_id: id});

        exercise.images.push(imageId);

        await exercise.save();

        response.status(201).json({message: 'Упражнение изменено'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.post('/image', auth, async (request, response) => {
    try {
        const { exerciseId } = request.body;

        var imageData = fs.readFileSync('C:/Users/user/React/fitness-app/images/1_1.jpg');
        const image = new Image({
            type: 'image/png',
            data: imageData,
            exercise:  exerciseId
        });


        image.save();
        response.status(201).json({message: 'Изображение добавлено'});
    } catch (e) {
        console.log(e.message);
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.post('/start', auth, async (request, response) => {
    try {

        const { dateStart, exercises } = request.body;

        const train = new Train({dateStart, user: request.user.userId, exercises});

        train.save();

        response.status(201).json({message: 'Тренировка добавлена'});
    } catch (e) {
        console.log(e.message);
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.post('/auto', auth, async (request, response) => {
    try {

        const user = await User.findOne({ _id:  request.user.userId});

        if (!user.bodyType) {
            return response.status(400).json({ message: 'Отсутствуют необходимые для автоматической генерации данные пользователя' });
        }

        const { aimId, levelId } = request.body;

        const strategy = await Strategy.findOne({ bodyType: user.bodyType, aim: aimId });

        if (!strategy) {
            return response.status(400).json({ message: 'Данный вид тренировки не рекомендуется для ваших показателей веса' })
        }



        // const train = new Train({dateStart, userId, exercises});
        //
        // train.save();


        response.status(201).json({message: 'Тренировка сформирована'});
    } catch (e) {
        console.log(e.message);
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});






module.exports = router;
