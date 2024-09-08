const mongoose = require('mongoose');
const Schema            = mongoose.Schema;
const ObjectId          = Schema.Types.ObjectId;


const walletSchema = Schema({
    customer_id: {type : ObjectId , index : true },
    money: Number,
    alt_currency_money: Number

});

const samanBankTransactionSchema = Schema({

    customer_id: ObjectId,
    wallet_id: ObjectId,
    payment_link: {type: String, default: ""},
    amount: {type: Number, default: 0},
    description: {type: String, default: ""},
    is_paid: {type: Boolean, default: false},
    date: {type: String, default: ""},
    readable_date: {type: String, default: ""},
    time: {type: String, default: ""},
    time_stamp: {type: String, default: ""},
    ref_num: {type: String, default: ""},
    res_num: {type: String, default: ""},
    secure_pan: {type: String, default: ""},
    state: {type: String, default: ""}

});

var nextPayTransactionSchema = Schema({

    customer_id: ObjectId,
    wallet_id: ObjectId,
    payment_link: {type: String, default: ""},
    amount: {type: Number, default: 0},
    description: {type: String, default: ""},
    description_long: {type: String, default: ""},
    is_paid: {type: Boolean, default: false},
    date: {type: String, default: ""},
    readable_date: {type: String, default: ""},
    time: {type: String, default: ""},
    time_stamp: {type: String, default: ""},
    trans_id: {type: String, default: ""},
    order_id: {type: String, default: ""},
    secure_pan: {type: String, default: ""},
    state: {type: String, default: ""}

});

const mellatTransactionSchema = Schema({

    customer_id: ObjectId,
    wallet_id: ObjectId,
    order_id: String,
    ref_id: String,
    amount: {type: Number},
    res_code: {type: Number, default: null},
    res_description: {type: String, default: null},
    description: String,
    is_paid: {type: Boolean, default: false},
    date: String,
    readable_date: {type: String, default: ""},
    time: String,
    time_stamp: String,
    SaleReferenceId: {type: String, default: null},
    CardHolderInfo: {type: String, default: null},
    CardHolderPan: {type: String, default: null}

});

const TransactionSchema = new Schema({
    project_name: {
        type: String,
        default: ''
    },
    gateway: {
        type: String,
        default: 'zarinpal',
        enum: ['zarinpal', 'saman','parsian', 'mabna','mellat','payir','fan_ava','iranKish']
    },
    state: {
        type: String,
        default: ''
    },
    stateCode: {
        type: String,
        default: 0
    },
    resnum: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 1000
    },
    customer_id: {
        type: ObjectId,
        default: null,
        ref: 'Customer'
    },
    taxi_id: {
        type: ObjectId,
        default: null,
        ref: 'Taxi'
    },
    source: {
        type: String,
        enum: ['customer', 'driver' , 'organization','agency']
    },
    wallet_id: {
        type: ObjectId,
        default: null,
        ref: "Wallet"
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: ''
    },
    readable_date: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    merchant_id: {
        type: String,
        default: ''
    },
    transactionId: {
        type: String,
        default: ''
    },
    refnum: {
        type: String,
        default: ''
    },
    authority: {
        type: String,
        default: ''
    },
    cid: {
        type: String,
        default: ''
    },
    traceno: {
        type: String,
        default: ''
    },
    rrn: {
        type: String,
        default: ''
    },
    securepan: {
        type: String,
        default: ''
    },
    station_id: {
        type: ObjectId,
        default: null
    },
    token: {
        type: String,
        default: ""
    },
    cardnumbermasked: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
    terminalno: {
        type: String,
        default: ""
    },
    hashcardnumber: {
        type: String,
        default: ""
    },
    organization_id : {
        type : ObjectId ,
        default: null,
        ref : 'Account'
    },
    agency_id : {
        type : ObjectId ,
        default: null,
        ref : 'Agency'
    },
    date_paid: {
        type: String,
        default: ""
    },
    order_id: {
        type: String,
        default: ""
    },
    ref_id: {
        type: String,
        default: ""
    },
    terminal_id: {
        type: String,
        default: ""
    },
    res_code: {
        type: String,
        default: ""
    },
    res_description: {
        type: String,
        default: ""
    },
    SaleReferenceId: {type: String, default: null},
    CardHolderInfo: {type: String, default: null},
    CardHolderPan: {type: String, default: null},
    subscription:{type: Object, default: {}},
    client: {
        type: String,
        default:"",
    },    type:{
        type:String,


    }
}, {timestamps: true});


module.exports = {
    TransactionSchema,
    mellatTransactionSchema,
    nextPayTransactionSchema,
    samanBankTransactionSchema,
    walletSchema,
};
