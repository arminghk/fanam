const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const checkUserAccountType  = require('../Connection/tools').checkUserAccountType;

const {defaultLanguage} = require('../Connection/config');
const Schema                = mongoose.Schema;
const ObjectId              = Schema.Types.ObjectId;


const MarketerSchema = Schema({
	username :{
		type: String,	
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	project : {
		type : ObjectId,
		ref : 'Project',
		default : null
	},
	full_name : String ,
	national_code : String , 
	phone_number : String ,
	address : {
		type : String , 
		default : ''
	},
	iran_bank_account_ID : {
		type : String , 
		default : ''
	},
	card_number : {
		type : String , 
		default : ''
	}, 
	account_number :  {
		type : String , 
		default : ''
	},
	money_amount : {
		type : Number ,
		default : 0
	} ,
	driver_time_limit : {
		type : Number , 
		default : 1
	},
	profit_per_driver : {
		type : Number
	},
	number_of_driver_trips : {
		type : Number ,
		default : 1
	},
	max_drivers_rigister : {
		type : Number ,
		default : undefined 
	},
	passenger_time_imit : {
		type : Number ,
		default : 1
	},
	number_of_passenger_trips : {
		type : Number ,
		default : 1
	},
	max_passenger_rigister : {
		type : Number ,
		default : undefined 
	},
	profit_per_passenger : {
		type : Number
	},
	invitation_code : {
		type : String 
	},
	roles:{type: ObjectId ,ref:'Role'},

	date : {
		type : String ,
		// default : moment().format('YYYY/MM/DD  HH:mm')
	},
	language : {
		type : String ,
		default : defaultLanguage 
	},
    agency_id : {
        type : ObjectId ,
        default:null,
        ref  : 'Agency'
    },
	city : [{ type : ObjectId ,   ref : 'City'}] ,  
	station : [{type : ObjectId , ref : 'Station'}],
	serviceType : [{type : ObjectId , ref : 'ServiceType'}],
	list_taxis_invited : [{ type : ObjectId  , ref : 'Taxi'}] ,
	is_block: {type: Boolean, default: false},
    
} , {timestamps: true});

MarketerSchema.query.checkUserAccountType = checkUserAccountType;

MarketerSchema.pre('save', function (next) {
	const marketer = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			} else
				bcrypt.hash(marketer.password, salt, function (err, hash) {
					if (err) {
						return next(err);
					}
					marketer.password = hash;
					next();
				});
		});
	} else {
		return next();
	}
});

module.exports = { MarketerSchema };
