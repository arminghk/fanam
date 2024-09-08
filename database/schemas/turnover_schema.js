const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const checkUserAccountType =
  require("../Connection/tools").checkUserAccountType;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const customerTurnOverSchema = Schema({
  date: { type: String },
  full_date: { type: String, index: true },
  time: { type: String },
  amount: { type: Number },
  alternative_amount: { type: Number },
  description: { type: String, default: "" },
  description_long: { type: String, default: "" },
  turnover_type: { type: String, default: "", index: true }, // increase, decrease
  customer_id: { type: ObjectId, ref: "Customer" },
  source: { type: String, default: "", index: true }, // travel | support | caller | invited | payment |reservation
  travel_id: { type: ObjectId, default: null, index: true, ref: "Travel" },
  transaction_id: { type: ObjectId, default: null, ref: "Transaction" },
  reserve_cancellation_factor: Number,
  customer_percent_per_reserve_cancellation: Number,
  readable_date: { type: String, default: "" },
  caller_id: { type: ObjectId, default: null },
  city_id: { type: ObjectId, default: null },
  support: {
    _id: { type: ObjectId, default: null },
    name: { type: String, default: "" },
    username: { type: String, default: "" },
    roles: { type: String, default: "" },
    station_id: { type: ObjectId, default: null },
    city_id: { type: ObjectId, default: null },
  },
  hijri_date: { type: String, default: "" },
  mdescription: { type: Mixed, default: { fa: "" } },
  mdescription_long: { type: Mixed, default: { fa: "" } },
});

const taxiTurnOverSchema = Schema(
  {
    travel_id: { type: ObjectId, default: null, index: 1 },
    transaction_id: { type: ObjectId, default: null, ref: "Transaction" },
    date: { type: String },
    full_date: { type: String, default: "" },
    readable_date: { type: String, default: "" },
    time: { type: String, default: "" },
    amount: { type: Number },
    alternative_amount: { type: Number },
    commission_amount: { type: Number, default: 0 },
    explanation: { type: String, default: "" },
    description_long: { type: String, default: "" },
    turnover_type: { type: String, default: "" }, // debtor, creditor
    taxi_id: { type: ObjectId, ref: "Taxi" },
    is_paid: { type: Boolean, default: false },
    paid_at: { type: String },
    gift_amount: { type: Number, default: 0 },
    travel_cost: { type: Number, default: 0 },
    discount_amount: { type: Number, default: 0 },
    station_id: { type: ObjectId, default: null },
    commission_rate: { type: Number, default: 0 },
    agency_id: { type: ObjectId, default: null },
    agency_commission_amount: { type: Number, default: 0 },
    agency_subscription_share: { type: Number, default: 0 },
    contract_amount: { type: Number, default: 0 },
    contract: { type: ObjectId, default: null },
    agency_contract_share: { type: Number, default: 0 },
    agency_subscription_share_amount: { type: Number, default: 0 },
    agency_contract_share_amount: { type: Number, default: 0 },
    company_subscription_share_amount: { type: Number, default: 0 },
    company_contract_share_amount: { type: Number, default: 0 },
    station_subscription_share: { type: Number, default: 0 },
    station_contract_share: { type: Number, default: 0 },
    station_subscription_share_amount: { type: Number, default: 0 },
    station_contract_share_amount: { type: Number, default: 0 },
    agency_commission_rate: { type: Number, default: 0 },
    station_commission_amount: { type: Number, default: 0 },
    station_commission_rate: { type: Number, default: 0 },
    company_commission_amount: { type: Number, default: 0 },
    company_commission_rate: { type: Number, default: 0 },
    payment_type: { type: String, default: "" },
    reserve_cancellation_factor: { type: Number, default: 0 },
    taxi_pprc_factor: { type: Number, default: 0 },
    source: { type: String, default: "" },
    subscription: { type: Object, default: {} },
    city_id: { type: ObjectId, default: null },
    support: {
      _id: { type: ObjectId, default: null },
      name: { type: String, default: "" },
      username: { type: String, default: "" },
      roles: { type: String, default: "" },
      station_id: { type: ObjectId, default: null },
      city_id: { type: ObjectId, default: null },
      agency: {
        type: ObjectId,
        ref: "Agency",
        default: null,
      },
    },
    supplier_station_commission_rate: { type: Number, default: 0 },
    dispatcher_station_commission_rate: { type: Number, default: 0 },
    dispatcher_station_commission_amount: { type: Number, default: 0 },
    supplier_station_commission_amount: { type: Number, default: 0 },
    dispatcher_station_id: { type: ObjectId, default: null },
    mexplanation: { type: Mixed, default: { fa: "" } },
    mdescription_long: { type: Mixed, default: { fa: "" } },
    support_description: { type: Mixed, default: { fa: "" } },
    hijri_date: { type: String, default: "" },
    // travel | taxi_pony | support | station_pony | income |reservation
  },
  { timestamps: true }
);

taxiTurnOverSchema.plugin(mongoosePaginate);

var taxiPonySchema = Schema({
  date: { type: String },
  full_date: { type: String, default: "" },
  readable_date: { type: String, default: "" },
  time: { type: String, default: "" },
  pony_type: { type: String, default: "" }, // debt, credit
  amount: { type: Number },
  explanation: { type: String, default: "" },
  city_id: { type: ObjectId, default: null },
  taxi_id: { type: ObjectId },
});

const MarketerTurnOverSchema = Schema({
  marketer_id: {
    type: ObjectId,
    ref: "marketer",
  },
  marketer_details: {
    username: {
      type: String,
    },
    full_name: {
      type: String,
    },
    driver_time_limit: {
      type: Number,
    },
    number_of_driver_trips: {
      type: Number,
    },
    passenger_time_imit: {
      type: Number,
    },
    number_of_passenger_trips: {
      type: Number,
    },
  },
  DateTime: {
    date: {
      type: String,
    },
    full_date: {
      type: String,
    },
    time: {
      type: String,
    },
    readable_date: {
      type: String,
    },
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
    default: "",
  },
  description_long: {
    type: String,
    default: "",
  },
  turnover_type: {
    type: String,
    default: "",
    enum: ["debtor", "creditor"],
  },
  customer_id: {
    type: ObjectId,
    ref: "Customer",
    default: null,
  },
  customer_details: {
    name: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
    },
  },
  source: {
    type: String,
    default: "",
    enum: ["forTaxi", "forCustomer", "payment"],
  },
  taxi_id: {
    type: ObjectId,
    ref: "Taxi",
    default: null,
  },
  driver_details: {
    username: {
      type: String,
    },
    model: {
      type: String,
    },
    driver_name: {
      type: String,
    },
    driver_phone_number: {
      type: String,
    },
  },
  support: {
    id: {
      type: ObjectId,
      ref: "Account",
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    roles: {
      type: ObjectId,
      ref: "Roles",
    },
    station_id: {
      type: ObjectId,
      ref: "Station",
    },
    city_id: {
      type: ObjectId,
      ref: "City",
    },
  },
});
const AgencyTurnOverSchema = Schema({
  agency_info: {
    agency_id: {
      type: ObjectId,
      ref: "agency",
    },
    username: {
      type: String,
    },
    full_name: {
      type: String,
    },
  },
  date: {
    date: {
      type: String,
    },
    full_date: {
      type: String,
    },
    time: {
      type: String,
    },
    readable_date: {
      type: String,
    },
  },

  turnover_info: {
    travel_id: {
      type: ObjectId,
      ref: "Travel",
    },
    discount_id: {
      type: ObjectId,
      ref: "Discount",
    },
    turnover_id: {
      type: ObjectId,
      ref: "TaxiTurnOver",
    },
    source: {
      type: String,
      default: "",
      enum: [
        "agency_pony",
        "bank_payment",
        "support_payment",
        "discount",
        "taxi_gift",
        "taxi_credit",
      ],
    },
    turnover_type: {
      type: String,
      default: "",
      enum: ["debtor", "creditor"],
    },
    description: {
      type: String,
      default: "",
    },
    description_long: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
    },
  },
  support: {
    _id: { type: ObjectId, default: null },
    name: { type: String, default: "" },
    username: { type: String, default: "" },
    roles: { type: String, default: "" },
    station_id: { type: ObjectId, default: null },
    city_id: { type: ObjectId, default: null },
    city_array: { type: [ObjectId], default: null },
  },
});

const OrganizationTurnOverSchema = Schema({
  organization_id: {
    type: ObjectId,
    ref: "Account",
  },
  organization_details: {
    username: {
      type: String,
    },
    company_name: {
      type: String,
    },
    company_phone: {
      type: String,
    },
    name: {
      type: String,
    },
    wallet: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  DateTime: {
    date: {
      type: String,
    },
    full_date: {
      type: String,
    },
    time: {
      type: String,
    },
    readable_date: {
      type: String,
    },
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
    default: "",
  },
  description_long: {
    type: String,
    default: "",
  },
  turnover_type: {
    type: String,
    default: "",
    enum: ["debtor", "creditor"],
  },
  travel_id: {
    type: ObjectId,
    ref: "Travel",
  },
  customer_id: {
    type: ObjectId,
    ref: "Customer",
    default: null,
  },
  customer_details: {
    name: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
    },
  },
  source: {
    type: String,
    default: "",
    enum: ["charge_code", "forCustomer", "payOnline"],
  },
  taxi_id: {
    type: ObjectId,
    ref: "Taxi",
    default: null,
  },
  driver_details: {
    username: {
      type: String,
    },
    model: {
      type: String,
    },
    driver_name: {
      type: String,
    },
    driver_phone_number: {
      type: String,
    },
  },
  support: {
    id: {
      type: ObjectId,
      ref: "Account",
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    roles: {
      type: ObjectId,
      ref: "Roles",
    },
    station_id: {
      type: ObjectId,
      ref: "Station",
    },
    city_id: {
      type: ObjectId,
      ref: "City",
    },
  },
  charge_code: { type: String, default: "" },
  transaction_id: { type: ObjectId, default: null },
});

const CallHistorySchema = new Schema({
  travel_id: {
    type: ObjectId,
    ref: "Travel",
  },
  caller: {
    type: String,
    enum: ["driverToCustomer", "customerToDriver"],
  },
  driver_id: {
    type: ObjectId,
    ref: "Taxi",
    default: null,
  },
  driver_details: {
    username: {
      type: String,
    },
    model: {
      type: String,
    },
    driver_name: {
      type: String,
    },
    driver_phone_number: {
      type: String,
    },
  },
  customer_id: {
    type: ObjectId,
    ref: "Customer",
    default: null,
  },
  customer_details: {
    name: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
    },
  },
  DateTime: {
    date: {
      type: String,
    },
    full_date: {
      type: String,
    },
    time: {
      type: String,
    },
    readable_date: {
      type: String,
    },
  },
  call_status: {
    type: String,
  },
  description: String,
  error_Stack: {
    type: Schema.Types.Mixed,
  },
});

taxiTurnOverSchema.statics.checkUserAccountType = checkUserAccountType;

taxiTurnOverSchema.index({ source: 1 });
taxiTurnOverSchema.index({ turnover_type: 1 });
taxiTurnOverSchema.index({ taxi_id: 1 });
taxiTurnOverSchema.index({ travel_id: 1 });

customerTurnOverSchema.index({ turnover_type: 1 });
customerTurnOverSchema.index({ amount: 1 });
const UsdToLbpSchema = Schema(
  {
    price: String,
    date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    main_currency: {
      type: Mixed,
      default: {
        en: "",
		fa : "",
		tr : "",
		ar: ""
      },
    },
    alternative_currency: {
      type: Mixed,
      default: {
        en: "",
		fa : "",
		tr : "",
		ar:""
      },
    },
  },
  { timestamps: true }
);
module.exports = {
  customerTurnOverSchema,
  taxiTurnOverSchema,
  taxiPonySchema,
  MarketerTurnOverSchema,
  OrganizationTurnOverSchema,
  CallHistorySchema,
  AgencyTurnOverSchema,
  UsdToLbpSchema,
};
