const mongoose = require('mongoose');
const Schema                = mongoose.Schema;
const mongoosePaginate      = require('mongoose-paginate');
const checkUserAccountType  = require('../Connection/tools').checkUserAccountType;
const ObjectId = Schema.Types.ObjectId;

const stationSchema = Schema({

    title: {type: String, required: true, lowercase: true, trim: true},
    username: {type: String, default: ""},
    code: {type: Number},
    loc: {type: [Number], index: '2dsphere'},
    phone_number: {type: String, es_indexed: true, default: ""},
    mobile_number: {type: String, default: ""},
    address: {type: String, default: ""},
    commission_rate: {type: Number, default: 0},
    subscription_share:{
        type:Number,
        default: 0


    },
    contract_share:{
        type:Number,
        default: 0


    },
    taxi_supplying_commission: {type: Number, default: 0},
    dispatching_commission: {type: Number, default: 0},
    city_id: {type: ObjectId, ref: "City"},
    support: {

        _id:{type: ObjectId, default: null},
        name:{type: String, default: ""},
        username:{type: String, default: ""},
        roles:{type: String, default: ""},
        agency_id:{type: ObjectId, default: null,ref:"Agency"},
        city_id:{type: ObjectId, default: null},
        city_array:{type: [ObjectId], default: null},
    }

},{timestamps:true});
stationSchema.plugin(mongoosePaginate);

stationSchema.query.checkUserAccountType = checkUserAccountType;
stationSchema.statics.checkUserAccountType = checkUserAccountType;

const stationSocketScheme = Schema({

    socket_id: String,
    type: String,
    station_id: ObjectId
},{timestamps:true});

module.exports = {
    stationSchema,
    stationSocketScheme
};
