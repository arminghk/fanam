const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const mongoosastic = require("mongoosastic");
const checkUserAccountType =
  require("../Connection/tools").checkUserAccountType;
const mongoosePaginate = require("mongoose-paginate");
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const taxiSchema = Schema(
  {
    username: {
      type: String,
      es_indexed: true,
      unique: true,
    },
    password: String,
    model: { type: String, es_indexed: true, default: "" },
    car_color: {
      type: String,
      default: "",
      es_indexed: true,
    },
    driver_name: {
      type: String,
      es_indexed: true,
      default: "",
    },
    first_name: {
      type: String,
      es_indexed: true,
      default: "",
    },
    last_name: {
      type: String,
      es_indexed: true,
      default: "",
    },
    driver_phone_number: { type: String, es_indexed: true },
    driver_avatar: { type: String, default: "" },
    location_lat: Number,
    is_standby: { type: Boolean, default: false },
    groupPony: { type: Boolean, default: true },
    location_lan: Number,
    year: String,
    is_online: String,
    last_online_time: String,
    state: String,
    socket_id: String,
    ignored: { type: Boolean, default: false },
    system: { type: String, es_indexed: true },
    car_code: { type: String, es_indexed: true },
    car_code_base: { type: String, es_indexed: true },
    car_plate_type: { type: String, es_indexed: true },
    taxi_code: { type: String, es_indexed: true, unique: true },
    is_block: Boolean,
    activation: {
      active: { type: Boolean },
      date: { type: String },
    },
    last_free_time: String,
    loc: { type: [Number], index: "2dsphere" },
    station_id: { type: ObjectId, default: null },
    station_title: {
      type: String,
      default: "ecabplus",
      es_indexed: true,
    },
    station_code: { type: String, es_indexed: true },
    is_apple: { type: Boolean, default: false },
    device_id: { type: String, default: "" },
    account_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    account_name: {
      type: String,
      default: "",
      es_indexed: true,
    },
    account_bank: {
      type: String,
      default: "",
      es_indexed: true,
    },
    passenger_invite_code: {
      type: String,
      default: "",
      es_indexed: true,
    },
    driver_invite_code: {
      type: String,
      default: "",
      es_indexed: true,
    },
    email: { type: String, default: "", es_indexed: true },
    credit: { type: Number, default: 0, es_indexed: true },
    service_type: { type: String, default: "normal" },
    service_type_id: [{ type: ObjectId, ref: "ServiceType", default: [] }],
    rate: { type: Number, default: 5 },
    motor_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    shasi_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    vin_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    vin: {
      type: String,
      default: "",
      es_indexed: true,
    },
    trim: {
      type: String,
      default: "",
      es_indexed: true,
    },
    certificate_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    certificate_exp_date: {
      type: String,
      default: "",
      es_indexed: true,
    },
    endurance_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    licenseNumber: {
      type: String,
      default: "",
      es_indexed: true,
    },
    licenseValidityDate: {
      type: String,
      default: "",
      es_indexed: true,
    },
    reportCardValidityDate: {
      type: String,
      default: "",
      es_indexed: true,
    },
    company: {
      type: String,
      default: "",
      es_indexed: true,
    },
    unique_endurance_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    endurance_exp_date: {
      type: String,
      default: "",
      es_indexed: true,
    },
    crime_photo: {
      type: String,
      default: "",
      es_indexed: true,
    },
    fuel_type: {
      type: String,
      default: "",
      es_indexed: true,
    },
    birth_day: {
      type: String,
      default: "",
      es_indexed: true,
    },
    addiction_photo: {
      type: String,
      default: "",
      es_indexed: true,
    },
    home_phone: {
      type: String,
      default: "",
      es_indexed: true,
    },
    second_phone_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    sheba_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    account_id: {
      type: String,
      default: "",
      es_indexed: true,
    },
    agency_id: {
      type: ObjectId,
      default: null,
      ref: "Agency",
    },
    fee_type: {
      type: String,
    },
    contract: {
      id: {
        type: ObjectId,
        ref: "Fee",
      },
      start_date: {
        type: String,
        default: "",
      },
    },
    commission: {
      type: ObjectId,
      ref: "Fee",
    },
    subscription: {
      _id: {
        type: ObjectId,
        ref: "Fee",
      },
      type: {
        type: String,
      },
      title: {
        type: Mixed,
        default: {
          en: "",
        },
      },

      description: {
        type: Mixed,
        default: {
          en: "",
        },
      },

      city_id: {
        type: ObjectId,
        ref: "City",
        default: null,
      },
      subscription_price: {
        type: Number,
      },
      time_scale: {
        type: Number,
      },
      start_date: {
        type: String,
        default: "",
      },
      end_date: {
        type: String,
        default: "",
      },
      is_active: {
        type: Boolean,
        default: false,
      },
      support_id: {
        type: ObjectId,
        default: null,
      },
      turnover_id: {
        type: ObjectId,
        default: null,
      },
    },
    available_subscription_plans: [{ type: ObjectId, ref: "Fee", default: [] }],
    is_login: { type: Boolean, default: false },
    city_id: { type: ObjectId, default: null, ref: "City" },
    block_description: { type: String, default: "" },
    national_code: {
      type: String,
      default: "",
      es_indexed: true,
    },
    birth_certificate_number: {
      type: String,
      default: "",
      es_indexed: true,
    },
    father_name: {
      type: String,
      default: "",
      es_indexed: true,
    },
    onesignal_player_id: { type: String, default: "" },
    marketer: {
      _id: { type: ObjectId, default: null },
      name: { type: String, default: "" },
      username: { type: String, default: "" },
      account_type: { type: String, default: "" },
      station_id: { type: ObjectId, default: null },
      city_id: { type: ObjectId, default: null, ref: "City" },
    },
    home_address: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "fa",
    },
    onesignal_id: {
      type: String,
      default: "",
    },
    fcm_id: {
      type: String,
      default: "",
    },
    car_code: {
      type: String,
      default: "",
    },
    car_ownership: {
      type: String,
      default: "",
    },
    car_city: {
      type: String,
      default: "",
    },
    congestion_zone: {
      type: Boolean,
      default: false,
    },
    car_odd_even_plate: {
      type: Boolean,
      default: false,
    },
    national_document_front_photo: {
      type: String,
      default: "",
    },
    national_document_back_photo: {
      type: String,
      default: "",
    },
    identity_document_front_photo: {
      type: String,
      default: "",
    },
    identity_document_back_photo: {
      type: String,
      default: "",
    },
    driver_license_front_photo: {
      type: String,
      default: "",
    },
    driver_license_back_photo: {
      type: String,
      default: "",
    },
    vehicle_card_front_photo: {
      type: String,
      default: "",
    },
    vehicle_card_back_photo: {
      type: String,
      default: "",
    },
    housing_card_front_photo: {
      type: String,
      default: "",
    },
    housing_card_back_photo: {
      type: String,
      default: "",
    },
    vehicle_diagnosis_card_photo: {
      type: String,
      default: "",
    },
    is_driver_activation: {
      type: Boolean,
      default: true,
    },
    is_marketer_added: {
      // ایا توسط بازاریاب اضافه شده
      type: Boolean,
      default: false,
    },
    is_paid_marketer_share: {
      // ایا حق زحمه بازایاب برای این تاکسی به بازاریاب پراداخت شده است
      type: Boolean,
      default: false,
    },
    marketer_expiration_deadline: {
      // مهلت زمانی که میتوان پول را به بازاریاب داد . که زمان فعال سازی ثبت میشود
      type: String,
    },
    is_marketer_deadline_expired: {
      // آیا مهلت منقضی شده
      type: Boolean,
      default: false,
    },
    marketer_id: {
      type: ObjectId,
      ref: "marketer",
    },
    last_pushed_message: {
      type: ObjectId,
      default: null,
    },
    acceptable_gender: {
      type: String,
      default: "all",
    },
    bearing: {
      type: Number,
      default: 0,
    },
    sid: {type: String, default: ""},
    account_sid: {type: String, default: ""},
    conversation_sid: {type: String, default: ""},
    chat_service_sid : {type: String, default: ""},
  },
  { timestamps: true }
);

taxiSchema.plugin(mongoosePaginate);
taxiSchema.query.checkUserAccountType = checkUserAccountType;
taxiSchema.statics.checkUserAccountType = checkUserAccountType;
const FeeSchema = Schema(
  {
    type: {
      type: String,
      enum: ["commission", "subscription", "contract"],
    },
    title: {
      type: Mixed,
      default: {
        en: "",
      },
    },

    description: {
      type: Mixed,
      default: {
        en: "",
      },
    },
    city_id: {
      type: ObjectId,
      ref: "City",
      default: null,
      index: true,
    },
    service_id: {
      type: ObjectId,
      ref: "ServiceType",
      default: null,
      index: true,
    },
    mobile_shown: {
      type: Boolean,
      default: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    }, //for visual use case
    ignored: {
      type: Boolean,
      default: false,
    }, //for visual use case
    min_taxi_credit: {
      type: Number,
    },
    commission_rate: {
      type: Number,
    },

    subscription_price: {
      type: Number,
    },
    time_scale: {
      type: Number,
    },
    time_period: {
      type: Number,
    },
    contract_price: {
      type: Number,
    },
  },
  { createdAt: true, updatedAt: true }
);
const TravelOptionChildDataSchema = Schema({
  _id: ObjectId,
  text: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: 1,
  },
  mtext: {
    type: Mixed,
    default: {
      en: "",
    },
  },
});
const DriversMessageBoxSchema = Schema(
  {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "global",
      enum: ["global", "individual", "city"],
    },
    taxi_id: {
      type: ObjectId,
      default: null,
    },
    language: {
      type: String,
      default: "ar",
    },
    driver_name: {
      type: String,
      default: "",
    },
    driver_phone: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    full_date: {
      type: String,
      default: "",
    },
    city_id: {
      type: ObjectId,
      default: null,
      ref: "City",
    },
    device: {
      type: String,
      default: "",
      enum: ["android", "ios"],
    },
  },
  { timestamps: true }
);
DriversMessageBoxSchema.plugin(mongoosePaginate);

const TravelOptionSchema = Schema({
  title: {
    type: String,
    default: "",
  },
  en_title: {
    type: String,
    default: "",
  },
  panel_placeholder: {
    type: String,
    default: "",
  },
  active_icon_path: {
    type: String,
    default: "",
  },
  inactive_icon_path: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["boolean", "list"],
  },
  data: [TravelOptionChildDataSchema],
  mtitle: {
    type: Mixed,
    default: "",
  },
  is_editable: {
    type: Boolean,
    default: true,
  },
  default_factor: {
    type: Number,
    default: 0,
  },
});
const hurryValues = {
  _id: {
    type: ObjectId,
    required: true,
  },
  value: {
    type: Number,
    default: null,
  },
  title: {
    type: Mixed,
    default: { fa: "", ar: "", en: "" },
  },
};

const serviceTypeSchema = Schema(
  {
    service_title: { type: String, default: "" },
    commission_rate: { type: Number, default: 13 },
    explanation: { type: String, default: "" },
    city_id: { type: ObjectId, ref: "City" },
    name: { type: String, default: "" },
    mname: { type: Mixed, required: true },
    type: { type: String, default: "" },
    is_active: { type: Boolean, default: true },
    image_url: { type: String, default: "" },
    enable_color: { type: String, default: "" },
    disable_color: { type: String, default: "" },
    ignored: { type: Boolean, default: false },
    travel_options: [ObjectId],
    hurry: {
      active: { type: Boolean, default: false },
      values: [Number],
    },
    legacy: {
      type: Boolean,
      default: false,
    },
    lbp_hurry: {
      active: { type: Boolean, default: false },
      values: [Number],
    },
    options: [
      {
        title: {
          type: String,
          default: "",
        },
        en_title: {
          type: String,
          default: "",
        },
        panel_placeholder: {
          type: String,
          default: "",
        },
        active_icon_path: {
          type: String,
          default: "",
        },
        inactive_icon_path: {
          type: String,
          default: "",
        },
        type: {
          type: String,
          enum: ["boolean", "list"],
        },
        data: [TravelOptionChildDataSchema],
        factor: { type: Number, default: 1 },
        mtitle: {
          type: Mixed,
          default: { fa: "", ar: "" ,en:"" , tr:""},
        },
      },
    ],
    priority: {
      type: Number,
      default: 1,
    },
    area_input: {
      default: 500,
      type: Number,
    },
    area_factor: {
      default: 1,
      type: Number,
    },
    distance_input: {
      default: 500,
      type: Number,
    },
    distance_factor: {
      default: 100,
      type: Number,
    },
    stop_time_factor: {
      default: 100,
      type: Number,
    },
    taxi_search_radius: {
      default: 2000,
      type: Number,
    },
    has_reservation: { type: Boolean, default: false },
    least_customer_reservation_time_boundary: { type: Number, default: 0 },
    least_customer_reservation_credit: { type: Number, default: 0 },
    customer_cancellation_time: { type: Number, default: 60 },
    customer_cancellation_factor: { type: Number, default: 0 },
    taxi_cancellation_factor: { type: Number, default: 10 },
    last_online_time_tolerance: { type: Number, default: 10 },
    taxi_cancellation_time: { type: Number, default: 10 },
    taxi_min_start_time: { type: Number, default: 10 },
    min_taxi_reservation_time_boundary: { type: Number, default: 2 },

    taxi_shift_time: { type: Number, default: 5 },
    customer_reserve_restriction: { type: Number, default: 0 },
    reservation_factor: { type: Number, default: 2 },
    air_conditioner_factor: { type: Number, default: 1 },
    time_to_remind_driver: { type: Number, default: 20000 },
    max_reservation_date_boundary: { type: Number, default: 7 },
    min_reservation_date_boundary: { type: Number, default: 0 },
    min_reservation_time_boundary: { type: Number, default: 2 },
    taxi_percent_per_reserve_cancellation: { type: Number, default: 10 }, // taxi percent per reserve cancellation
    customer_percent_per_reserve_cancellation: { type: Number, default: 10 }, // customer percent per reserve cancellation
    gift_ratio: { type: Number, default: 0 },
    static_gift_min_cost: { type: Number, default: 0 },
    relational_gift_max_cost: { type: Number, default: 0 },
    static_taxi_gift: { type: Number, default: 0 },
    urbanPricingAlgorithm: {
      type: String,
      default: "",
    },
    intercityPricingAlgorithm: {
      type: String,
      default: "",
    },
    //transportationAssociation
    baseCost: {
      type: Number,
      default: 0,
    },
    intercityBaseCost: {
      type: Number,
      default: 0,
    },
    upToTwoKmPrice: {
      type: Number,
      default: 0,
    },
    moreThenTwoKmPrice: {
      type: Number,
      default: 0,
    },
    perMinusPrice: {
      type: Number,
      default: 0,
    },
    intercityPerMinusPrice: {
      type: Number,
      default: 0,
    },
    trafficPerMinusPrice: {
      type: Number,
      default: 0,
    },

    intercityPerKmPrice: {
      type: Number,
      default: 0,
    },
    serviceCoefficient: {
      type: Number,
      default: 0,
    },
    //advancedPricingAlgorithm
    leastRequestCost: {
      type: Number,
      default: 0,
    },
    constToOrigin: {
      type: Number,
      default: 0,
    },
    urbanPerKmPrice: {
      type: Number,
      default: 0,
    },
    widthPerKm: {
      type: Number,
      default: 0,
    },
    heightPerKm: {
      type: Number,
      default: 0,
    },
    lengthPerKm: {
      type: Number,
      default: 0,
    },
    weightPerKm: {
      type: Number,
      default: 0,
    },
    approximatePricePerKm: {
      type: Number,
      default: 0,
    },
    validsize: [{ type: ObjectId, ref: "boxsize" }],
    validweight: [{ type: ObjectId, ref: "boxweight" }],
    travel_count: {
      type: Number,
      default: 1,
    },
    special_area_per_km: {
      type: Number,
      default: 0,
    },
    special_area_base_cost: {
      type: Number,
      default: 0,
    },
    special_area_is_active: {
      type: Boolean,
      default: false,
    },
    coords: { type: Object },
    change_destination: {
      type: Boolean,
      default: false,
    },
    change_second_destination: {
      type: Boolean,
      default: false,
    },
    add_second_destination_before_trip: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const boxsizeSchema = Schema(
  {
    height: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    label: String,
    value: String,
    desc: String,
  },
  { timestamps: true }
);
const boxweightSchema = Schema(
  {
    weight: { type: Number, required: true },
    label: String,
    value: String,
    desc: String,
  },
  { timestamps: true }
);
const taxiOnlineSchema = Schema(
  {
    taxi_id: { type: ObjectId },
    start_time: { type: Number, default: 0 },
    finish_time: { type: Number, default: 0 },
    date: { type: String, default: "" },
  },
  { timestamps: true }
);
const advancedMixFactorSchema = Schema(
  {
    startDate: { type: String },
    endDate: { type: String },
    weekDays: { type: Array },
    startHour: { type: String },
    endHour: { type: String },
    serviceTypeId: {
      type: ObjectId,
      ref: "ServiceType",
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
    },
    leastRequestCost: {
      type: Number,
      default: 0,
    },
    constToOrigin: {
      type: Number,
      default: 0,
    },
    serviceCoefficient: {
      type: Number,
      default: 0,
    },
    reservationCoefficient: {
      type: Number,
      default: 0,
    },
    factors: [{ start: { type: Number }, PerKmPrice: { type: Number } }],
  },
  { timestamps: true }
);

taxiSchema.plugin(mongoosastic, {
  hosts: ["127.0.0.1:9200"],
});

let taxiCounterSchema = Schema({
  currentNumber: {
    type: Number,
    default: 1000,
  },
  startNumber: {
    type: Number,
    default: 1000,
  },
  counter: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 10,
  },
});
var taxiOnlineTimeSchema = Schema({
  taxi_id: { type: ObjectId },
  duration: { type: Number },
  location: { type: Array },
  date: { type: String, default: "" },
  short_date: { type: String, default: "" },
});
const serviceCountSchema = Schema({
  count: Number,
  service_type_id: { type: ObjectId, ref: "ServiceType", index: true },
  date: { type: String, default: "" },
});
const optionChangeAcceptance = Schema({
  service_id: {
    type: ObjectId,
    ref: "ServiceType",
    default: null,
    index: true,
  },
  air_conditioner_on: { type: Boolean, default: false },
  discount_code: { type: String, default: "" },
  has_over_load: { type: Boolean, default: false },
  is_two_way:{ type: Boolean, default: false },
  destination_change: { type: Boolean, default: false },
  add_second_destination: { type: Boolean, default: false },
  edit_second_destination: { type: Boolean, default: false },
  remove_second_destination: { type: Boolean, default: false },
  passenger_baggage: { type: Boolean, default: false },
  one_additional_person: { type: Boolean, default: false },
  stop_on_the_way: { type: Boolean, default: false },
  destination_change_permit:{type:Number , default: 3},
  second_destination_change_permit:{type:Number , default: 3} ,
  is_two_way_change_permit :{type:Number , default: 3} ,
  has_over_load_change_permit :{type:Number , default: 3} ,
  air_conditioner_on_change_permit :{type:Number , default: 3} ,
  stop_on_the_way_change_permit :{type:Number , default: 3} ,
  one_additional_person_change_permit :{type:Number , default: 3} ,
})
serviceTypeSchema.query.checkUserAccountType = checkUserAccountType;
module.exports = {
  taxiSchema,
  serviceTypeSchema,
  taxiOnlineSchema,
  taxiCounterSchema,
  DriversMessageBoxSchema,
  TravelOptionSchema,
  taxiOnlineTimeSchema,
  advancedMixFactorSchema,
  boxsizeSchema,
  boxweightSchema,
  FeeSchema,
  serviceCountSchema,
  optionChangeAcceptance
};
