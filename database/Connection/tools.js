const mongoose = require('mongoose');

module.exports.checkUserAccountType = function (user, aggregate) {
    if (aggregate) {
        if (user && user.city_id)
            return aggregate.match({city_id : mongoose.mongoose.Types.ObjectId(user.city_id.toString())});
        else
            return aggregate
    }
    else if (!aggregate) {
        if (user && user.city_id)
            return this.find({city_id: user.city_id.toString()});
        else
            return this;
    }
}