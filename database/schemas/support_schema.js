const mongoose = require('mongoose');
const Schema                = mongoose.Schema;
const mongoosePaginate      = require('mongoose-paginate');
const ObjectId              = Schema.Types.ObjectId;
const Mixed                 = Schema.Types.Mixed;
const checkUserAccountType  = require('../Connection/tools').checkUserAccountType;

var customerMessageSchema = Schema({

    customer_id: ObjectId,
    customer_name: String,
    customer_phone_number: String,
    title: String,
    body: String

});


var nofitySchema = Schema({

    current_id: {type: Number, default: 1},
    url: String,
    title: String,
    ticker: String,
    body: String

});

const socketScheme = Schema({
    socket_id: String,
    type: String
});

const appVersionScheme = Schema({

    version_code: Number,
    url: {type: String, default: ""},
    is_force_update: Number,
    last_force_version: Number,
    is_deprecated: {type: Boolean, default: false},
    package_name: {type: String, default: ""}

});

const IosVersionScheme = Schema({
    version_code: Number,
    url: {type: String, default: ""},
    is_force_update: Number,
    last_force_version: Number
});

const DriverVersionScheme = Schema({
    version_code: Number,
    url: {type: String, default: ""},
    is_force_update: Number,
    last_force_version: Number,
    is_force_location: Number
});

const DriverIosVersionScheme = Schema({
    version_code: Number,
    url: {type: String, default: ""},
    is_force_update: Number,
    last_force_version: Number
});

const templateMessageSchema = Schema({

    title: String,
    explanation: {type: String, default: ""},
    date: String,
    time: String,
    mtitle: Mixed,
    mexplanation: Mixed,


});
const bugReportingSchema = Schema({

    customer_id:{type:ObjectId},
    taxi_id:{type:ObjectId},
    user_type:{
        type:String,
        enum: ['driver', 'customer']


    },
    type:{
        type:String,
        enum: ['exception']


    },
    line:{
        type:Number
    },
    device_model:{type:String},
    method_name:{type:String},
    os_version:{type:String},
    platform:{type:String},
    error:{type:String},
    class_error:{type:String},
    message:{type:String},
    version_number:{type:String},
    version_code:{type:String},
    build_number:{type:String}

});


const customerTemplateMessageSchema = Schema({

    customer_id: ObjectId,
    customer_phone_number: {type: String, default: ""},
    template_message_title: {type: String, default: ""},
    explanation: {type: String, default: ""},
    template_message_id: ObjectId,
    date: String,
    time: String,
    support_comment:{type: String, default: ""},
    support_id:ObjectId

});

const activeSystemSchema = Schema({

    is_active: {type: Boolean, default: true},
    message: String

});

const driverBannerSchema = Schema({

    first_title: {type: String, default: ""},
    first_body: {type: String, default: ""},
    second_title: {type: String, default: ""},
    second_body: {type: String, default: ""}

});

const supportPhoneSchema = Schema({

    driver_support: {type: String, default: ""},
    driver_support2: {type: String, default: ""},
    passenger_support: {type: String, default: ""},
    passenger_support2: {type: String, default: ""},
    city_id:{type:ObjectId,ref:"City"}


});


const driverTelegramLinkSchema = Schema({

    telegram_link: {type: String, default: ""}

});

const googleMapApiKeysSchema = Schema({

    customer_api_key: {type: String, default: ""},
    taxi_api_key: {type: String, default: ""}

});

const PushSchema = Schema({
    title: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        default: ""
    },
    device: {
        type: String,
        default: ""
    },
    response: {
        type: String,
        default: ""
    },
    is_success: {
        type: Boolean,
        default: false
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
    }
}, {timestamps: true});

const ticketSchema = Schema({
    api_key: {
        type: String,
        default: ""
    }
});

const callerIdLogSchema = Schema({
    operator_id: {
        type: ObjectId,
        default: null,
        ref: "Accounts"
    },
    city_id: {
        type: ObjectId,
        default: null
    },
    operator_username: {
        type: String,
        default: ""
    },
    operator_name: {
        type: String,
        default: ""
    },
    operator_account_type: {
        type: String,
        default: ""
    },
    caller_id_number: {
        type: String,
        default: ""
    },
    project: {
        type: ObjectId,
        default: null,
        ref: "Project"
    },
    project_name: {
        type: String,
        default: ""
    },
    full_date: {
        type: String,
        default: ""
    },
    initial_call_id: {
        type: ObjectId,
        default: null
    },
    initial_call_date: {
        type: String,
        default: ""
    },
    event_type: {
        type: String,
        enum: ['initial', 'operator_clicked'],
        default: "initial"
    }
})
var FaqSchema = Schema({
    title: String,
    explanation: String,
    lng: String,

});
PushSchema.plugin(mongoosePaginate);
PushSchema.query.checkUserAccountType = checkUserAccountType;

module.exports = {
    activeSystemSchema,
    appVersionScheme,
    customerMessageSchema,
    customerTemplateMessageSchema,
    driverBannerSchema,
    PushSchema,
    ticketSchema,
    templateMessageSchema,
    googleMapApiKeysSchema,
    driverTelegramLinkSchema,
    supportPhoneSchema,
    DriverIosVersionScheme,
    DriverVersionScheme,
    IosVersionScheme,
    socketScheme,
    nofitySchema,
    bugReportingSchema,
    callerIdLogSchema,
    FaqSchema
};
