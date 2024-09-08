const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const placeSchema = Schema({

    place_name: {
        type: String,
        default: ""
    },
    loc: {type: [Number], index: '2dsphere'},
    city_id: ObjectId,

},{timestamps:true});

placeSchema.index({place_name: 'text'});

const travelFactorSchema = Schema({

    first_place_id: ObjectId,
    second_place_id: ObjectId,
    cost: Number

},{timestamps:true});

const costBaseFactorSchema = Schema({

    factor: Number,
    city_id: ObjectId

},{timestamps:true});

const costTimeFactorSchema = Schema({

    start_time: Number,
    factor: Number

},{timestamps:true});

const costDistanceFactorSchema = Schema({

    start_distance: Number,
    end_distance: Number,
    factor: Number,
    city_id: ObjectId

},{timestamps:true});


const serviceFactorSchema = Schema({

    normal_factor: {type: Number, default: 1},
    truck_factor: {type: Number, default: 1},
    tank_truck_factor: {type: Number, default: 1},
    delivery_factor: {type: Number, default: 1},
    vip_factor: {type: Number, default: 1},
    lady_factor: {type: Number, default: 1},
    stop_factor: {type: Number, default: 200},
    input_factor: {type: Number, default: 2500},
    two_way_factor: {type: Number, default: 2},
    area_input_factor: {type: Number, default: 2500},
    minimum_travel_duration: {type: Number, default: 10},
    gift_ratio: {type: Number, default: 0},
    taxi_max_gift_amount: {type: Number, default: 100000},
    city_id: {type: ObjectId, ref: "City"},
    distance_factor: {type: Number, default: 2},
    min_taxi_credit: {type: Number, default: 0},
    air_conditioner_min_price: {type: Number, default: 0},
    taxi_search_radius: {type: Number, default: 1500},
    taxi_timer_time: {type: Number, default: 30},
    over_load_factor: {type: Number, default: 1},
    dispatch_fee: {type: Number, default: 10},
    taxi_dispatch_fee: {type: Boolean, default: false},
    least_customer_reservation_time_boundary : {type : Number , default : 0} ,
    least_customer_reservation_credit : {type : Number , default : 0} ,
    customer_cancellation_time : {type : Number , default : 60} ,
    customer_cancellation_factor : {type : Number , default : 0} ,
    taxi_cancellation_factor : {type : Number , default : 10} ,
    last_online_time_tolerance : {type : Number , default : 10} ,
    taxi_cancellation_time : {type : Number , default : 10} ,
    min_taxi_reservation_time_boundary : {type : Number , default : 1} ,
    taxi_shift_time : {type : Number , default : 5} ,
    customer_reserve_restriction : {type : Number , default : 0} ,
    reservation_factor : {type : Number , default : 5} ,
    air_conditioner_max_price : {type : Number , default : 0} ,
    air_conditioner_min_price : {type : Number , default : 0} ,
    time_to_remind_driver : {type : Number , default : 20000} ,
    max_reservation_date_boundary : {type : Number , default : 7} ,
    min_reservation_date_boundary : {type : Number , default : 0} ,
    min_reservation_time_boundary : {type : Number , default : 0} ,
    taxi_percent_per_reserve_cancellation : {type : Number , default : 10} ,// taxi percent per reserve cancellation
    customer_percent_per_reserve_cancellation : {type : Number , default : 10} ,// customer percent per reserve cancellation
    secure_call : {type : Boolean , default : false},
    customer_waiting_timer: {
        type: Number,
        default: 0
    },
    driver_pending_travels_timer: {
        type: Number,
        default: 0
    }
    
},{timestamps:true});


const sourceLocationRequestSchema = Schema({

    date: {
        type: String,
        default: ""
    },
    loc: {type: [Number], index: '2dsphere'} ,
    latitude : Number,
	longitude : Number

},{timestamps:true});

const areaSchema = Schema
({
    name: String,
    //type : {type : String , default : "Polygon"} ,
    coords: {type: Object},
    area_input: {type: Number,default:0},
    pricing_algorithm: {
        type: String,
        enum: ['const', 'distance_base']
    },
    second_destination_const_price:{
        type:Number
    },
    is_active: {type: Boolean, default: false},
    city_id: {type: ObjectId, default: null, ref: "City"}
},{timestamps:true});

const areaCostSchema = Schema
({
    source_id: ObjectId,
    destination_id: ObjectId,
    cost: Number
},{timestamps:true});

const areaTimeFactorSchema = Schema({

    start_time: Number,
    factor: Number,
    city_id: {type: ObjectId, ref: "City"}

},{timestamps:true});
const mapIrRequestSchema = Schema({

    uri: String,
    user_agent: String,
    full_date: String,
    loc: {type: [Number], index: '2dsphere'} ,

},{timestamps:true});

const mixFactorSchema = Schema({
    _id: {
        type: ObjectId
    },
    start_date: {type: String},
    end_date: {type: String},
    start_day: {type: Number},
    end_day: {type: Number},
    start_hour: {type: String},
    end_hour: {type: String},
    start_distance: {type: Number},
    end_distance: {type: Number},
    factor: {type: Number},
    source_area: {id: ObjectId, name: String, _id: false},
    destination_area: {id: ObjectId, name: String, _id: false},
    area_cost: {type: Number, default: 0},
    city_id: {type: ObjectId, ref: "City"},
    service_type: {
        _id: {
            type: ObjectId,
            default: null
        },
        name: {
            type: String,
            default: ""
        }
    }
},{timestamps:true});

mixFactorSchema.query.checkUserAccountType = function (user) {
    if (user && user.city_id)
        return this.find({city_id: user.city_id.toString()});
    else
        return this;
};


const areaServiceFactorSchema = Schema({

    tank_truck_factor: {type: Number, default: 1},
    truck_factor: {type: Number, default: 1},
    delivery_factor: {type: Number, default: 1},
    normal_factor: {type: Number, default: 1},
    vip_factor: {type: Number, default: 1},
    lady_factor: {type: Number, default: 1},
    stop_factor: {type: Number, default: 200},
    input_factor: {type: Number, default: 2500},
    two_way_factor: {type: Number, default: 2}

},{timestamps:true});

const citySchema = Schema({
    name: String,
    mname: Mixed,
    province_name: Mixed,
    coords: {type: Object},
    centroid: [Number, Number],
    center: {type: [Number]},
	mobile_shown: {type: Boolean, default: false},
    radius: Number,
    area_code: {
        type: String,
        default: ""
    },
    pricingAlgorithm: {
        type: String,
        default: ""
    }

},{timestamps:true});

const areaCoefficientSchema = Schema
({
    source: {
        type: Object,
        default: null
    },
    destination: {
        type: Object,
        default: null
    },
    minimum_cost: {
        type: Number,
        default: 0
    },
    maximum_cost: {
        type: Number,
        default: 0
    },
    factor: {
        type: Number,
        default: 0
    },
    global: {
        type: Number,
        default: 0
    },
    start_time: {
        type: String,
        default: ""
    },
    finish_time: {
        type: String,
        default: ""
    },
},{timestamps:true});


citySchema.query.checkUserAccountType = function (user) {
    if (typeof user == 'object') {
        if (user.city_id)
            return this.find({_id: user.city_id.toString()});
        else if(user && user.city_array && user.city_array.length && !user.city_id){
            return this.find({_id : {$in:user.city_array}});
        }

        else
            return this;
    }
    else
        return this;
};

module.exports = {
    placeSchema,
    travelFactorSchema,
    costBaseFactorSchema,
    costTimeFactorSchema,
    costDistanceFactorSchema,
    serviceFactorSchema,
    sourceLocationRequestSchema,
    areaSchema,
    areaCostSchema,
    areaTimeFactorSchema,
    mixFactorSchema,
    areaServiceFactorSchema,
    citySchema,
    areaCoefficientSchema,
    mapIrRequestSchema
};
