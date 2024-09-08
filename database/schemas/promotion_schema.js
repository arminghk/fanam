const mongoose = require('mongoose');
const Schema                = mongoose.Schema;
const mongoosePaginate      = require('mongoose-paginate');
const ObjectId              = Schema.Types.ObjectId;
const checkUserAccountType  = require('../Connection/tools').checkUserAccountType;


const discountSchema = Schema({

    amount: Number, // in percent
    code: String,
    description: String,
    is_active: Boolean,
    source_place_ids: {type: [String], default: []},
    destination_place_ids: {type: [String], default: []},
    max_cost: Number,
    is_global: {type: Boolean, default: true},
    days: Number,
   
    count: {type: Number, default: 1},
    date: String,
    time: String,
    time_stamp: Number,
    is_first_time: {type: Boolean, default: false},
    city_id: {type: ObjectId, default: null, ref: "City"},
    agency_id: {
        type: ObjectId,
        default: null,
        ref: "Agency"
    },
    start_date: {
        type: String,
        default: ""
    },
    finish_date: {
        type: String,
        default: ""
    },
    source_areas: [{
        type: ObjectId,
        default: [],
        ref: "NonGlobalDiscountArea"
    }],
    destination_areas: [{
        type: ObjectId,
        default: [],
        ref: "NonGlobalDiscountArea"
    }]

},{timestamps:true});
const NonGlobalDiscountAreaSchema = Schema({
    name: String,
    coords: {type: Object},
    centroid: {type: [Number]},
    radius: Number,
    city_id: {
        type: ObjectId,
        default: null,
        ref: "City"
    }
});
const vocherSchema = Schema({
    code: {
        type: String,
        unique : true
    },
    state : String,
    isActive : {type :Boolean , default :false},
    amount: {type: String, default: "0"},
    alt_currency_amount: {type: String, default: "0"},
    dateCreated: {
        type: String,
        default: ""
    },
    timeCreated: {
        type: String,
        default: ""
    },
    customer_id:{ type : ObjectId , ref : "Customer" },
    taxi_id:{ type : ObjectId , ref : "Taxi" },
    dateUsed: {
        type: String,
        default: ""
    },
    timeUsed: {
        type: String,
        default: ""
    },
    support: {
        _id:{type: ObjectId, default: null},
        name:{type: String, default: ""},
        username:{type: String, default: ""},
        roles:{type: String, default: ""},
        station_id:{type: ObjectId, default: null},
        city_id:{type: ObjectId, default: null},
		agency : {
			type : ObjectId ,
			ref : 'Agency',
			default: null
		},
    },
},{timestamps:true});
discountSchema.plugin(mongoosePaginate);
discountSchema.query.checkUserAccountType = checkUserAccountType;

module.exports = {
    vocherSchema,
    discountSchema,
    NonGlobalDiscountAreaSchema

};