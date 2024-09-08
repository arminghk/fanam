const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const mongoosastic          = require('mongoosastic');
const mongoosePaginate      = require('mongoose-paginate');
const ObjectId              = Schema.Types.ObjectId;
const Mixed                 = Schema.Types.Mixed;
const checkUserAccountType  = require('../Connection/tools').checkUserAccountType;

const FavAddressSchema = Schema({
    location: {
        type: [Number],
        default: [0, 0]
    },
    place_id: {
        type: String,
        default: ""
    },
    fav_place_name: {
        type: String,
        default: ""
    },
    fav_place_address: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    phone_number: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    plaque: {
        type: String,
        default: ""
    },
    unit: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    pin: {
        type: Boolean,
        default: false
    },
    service_type: {
        type: String,
        default: "normal"
    },
});

const DispatcherAddressSchema = Schema({
    location: {
        type: [Number],
        default: [0, 0]
    },
    place_id: {
        type: String,
        default: ""
    },
    fav_place_name: {
        type: String,
        default: ""
    },
    fav_place_address: {
        type: String,
        default: ""
    },
    fav_place_exact_address: {
        type: String,
        default: ""
    }

});
const CustomersMessageBoxSchema = Schema({
    title: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "global",
        enum: ['global', 'individual', 'city']
    },
    customer_id: {
        type: ObjectId,
        default: null
    },
    language: {
        type: String,
        default: "en"
    },
    customer_name: {
        type: String,
        default: ""
    },
    onesignal_player_id: {
        type: String,
        default: ""
    },
    customer_phone: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: ""
    },
    full_date: {
        type: String,
        default: ""
    },
    city_id: {
        type: ObjectId,
        default: null,
        ref: "City"
    },
    device: {
        type: String,
        default: "",
        enum: ['android', 'ios']
    },

}, {timestamps: true});
CustomersMessageBoxSchema.plugin(mongoosePaginate);

const customerSchema = Schema({

    phone_number: {type: String, es_indexed: true , index : true},
    verification_code: String,
    socket_id: {
        type: String,
        default: ""
    },
    last_online_time: String,
    is_verified: Number,
    avatar: {type: String, default: ""},
    name: {type: String, es_indexed: true, default: ""},
    family: {type: String, es_indexed: true, default: ""},
    address: {type: String, es_indexed: true, default: ""},
    email: {type: String, es_indexed: true, default: ""},
    password: {type: String,  default: ""},
    email_verified: {type: Boolean, default: false},
    email_code_sent_time :{type: String, default: ""},
    is_block: {type: Boolean, default: false},
    caller_number: String,
    sex: {type: String, default: "", enum: ['', 'male', 'female']},
    blood_group: {type: String, default: ""},
    emergency_phone_number: {type: String, default: ""},
    birthday: {type: String, default: ""},
    onesignal_player_id: {
        type: String,
        default: ""
    },
    sheba_number: {
        type: String,
        default: "",
        es_indexed: true
    },
    last_pushed_message : {
        type : ObjectId ,
        default : null
    },

    subscription_number: Number,
    rate: Number,
    station_id: [{ type:ObjectId, ref: 'Station',default:[] }],
    organization_id : {type : ObjectId , ref : 'Account'} ,
    male: Boolean,
    address_loc: {type: [Number], index: '2dsphere'},
    fav_address: {type: [FavAddressSchema] , default : []},
    dispatcher_address : {type : [DispatcherAddressSchema] , default : []} ,
    is_apple: {type: Boolean, default: false},
    dispatcher_customer: {type: Boolean, default: false},
    thirdPartyWebAppCustomer: {type: Boolean, default: false},
    ignored: {type: Boolean, default: false},
    dispatcher_operator: {type: ObjectId, default: null},
    device_id: {type: String, default: ""},
    invite_code: {type: String, default: ""},
    national_code: {type: String, default: ""},
    city_id: {type: ObjectId, default: null, ref: "City"},
    language: {
        type: String,
        default: "fa"
    },
    phones: {
        type: [String],
        default: []
    },
    specialCase: {
        type: Boolean,
        default: false
    },
    thirdPartyWebAppId : {type : ObjectId,default:null} ,
    sid: {type: String, default: ""},
    account_sid: {type: String, default: ""},
    conversation_sid: {type: String, default: ""},
    chat_service_sid : {type: String, default: ""},
},{timestamps:true});

customerSchema.plugin(mongoosePaginate);


customerSchema.plugin(mongoosastic, {
    hosts: [
        '127.0.0.1:9200'
    ]
});
customerSchema.query.checkUserAccountType = checkUserAccountType;

customerSchema.index({name : 1 , family : 1})

module.exports = {
    customerSchema,
    CustomersMessageBoxSchema
};
