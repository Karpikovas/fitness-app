const {Router} = require('express');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = Router();

function getBodyType(bodyMassIndex) {
   if (bodyMassIndex < 18.5) {
       return "60b3d51543859c7af068a111";
   }

   if (bodyMassIndex > 25) {
       return "60b3d53c43859c7af068a112";
   }

   return "60b3d56143859c7af068a113";
}

router.post('/edit', auth, async (request, response) => {
    try {

        const { weight, height } = request.body;

        const bodyMassIndex = weight / Math.pow(height / 100, 2);

        const user = await User.findOne({ _id:  request.user.userId});

        user.weight = weight;
        user.height = height;
        user.bodyType = getBodyType(bodyMassIndex);

        await user.save();

        response.status(201).json({message: 'Данные пользователя изменены'});
    } catch (e) {
        console.log(e.message);
        response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

module.exports = router;
