const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require("mongoosastic");
const mongoosePaginate = require("mongoose-paginate");
const checkUserAccountType =
  require("../Connection/tools").checkUserAccountType;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const Option = {
  _id: {
    type: ObjectId,
    required: true,
  },
  data_id: {
    type: ObjectId,
    default: null,
  },
  type: {
    type: String,
    enum: ["boolean", "list"],
  },
  data_text: {
    type: String,
    default: null,
  },
  value: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  en_title: {
    type: String,
    required: true,
  },
  panel_placeholder: {
    type: String,
    required: true,
  },
  active_icon_path: {
    type: String,
    default: "",
  },
  mtitle: {
    type: Mixed,
    default: { fa: "", ar: "", en: "" },
  },
  data_mtext: {
    type: Mixed,
    default: { fa: "", ar: "", en: "" },
  },
};
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

const travelSchema = Schema(
  {
    customer_name: String,
    customer_id: { type: ObjectId, ref: "Customer", index: true },
    customer_phone_number: String,
    source_address: String,
    travel_code: { type: String, es_indexed: true },
    destination_address: String,
    source_place: String,
    destination_place: String,
    source_place_id: String,
    destination_place_id: String,
    source_lat: Number,
    source_lan: Number,
    destination_lat: Number,
    destination_lan: Number,
    customer_lat: { type: Number, default: 0 },
    customer_lan: { type: Number, default: 0 },
    state: { type: String, index: true },
    cost: Number,
    lbp_cost: Number,
    lbp_rate: Number,
    alternative_cost: Number,
    alternative_rate: Number,
    offered_cost: Number,
    dispatch_fee: {
      type: Number,
      default: 0,
    },
    deliveries: [{ type: ObjectId, ref: "Deliveries" }],

    schedule: {
      scheduled: Boolean,
      pick_up_date: String,
      cancellation_date: String,
      hijri_pick_up_date : String
    },
    hurry: {
      active: { type: Boolean, default: false },
      selectedValue: { type: Number, default: 0 },
      // selectedTitle:{type:String,default:""},
      // selectedValueId:{type:ObjectId,default:null},
    },
    customer_get_travel: { type: Boolean, default: false },
    has_over_load: { type: Boolean, default: false },
    exact_cost: Number,
    payment_type: String,
    is_paid: { type: Boolean, default: false },
    discount_code: { type: String, default: "" },
    discount_amount: { type: Number, default: 0 },
    lbp_discount_amount: { type: Number, default: 0 },
    alternative_discount_amount: { type: Number, default: 0 },
    date: String,
    taxi_id: { type: ObjectId, ref: "Taxi", index: 1 },
    discount_id: { type: ObjectId, default: null, index: 1 },
    time_travel: { type: String, default: 0 },
    is_active: { type: Number, default: 0, index: true },
    refused_taxis: [ObjectId],
    stand_by_taxis: [ObjectId],
    missed_reservation_taxis: [ObjectId],
    canceled_scheduled_travel_taxis: [ObjectId],
    travel_flow: [
      {
        state: { type: String },
        taxi_id: { type: ObjectId },
        date: { type: String },
      },
    ],
    is_taxi_near: Number,
    full_date: { type: String, default: "", index: true },
    readable_date: { type: String, default: "" },
    hijri_date: { type: String, default: "" },
    time: { type: String, default: "" },
    taxi_timer_time: { type: Number, default: 0 },
    taxi_found_date: { type: String, default: "" },
    massage_to_show: {
      befor_travel_start: { type: String, default: " " },
      during_the_travel_first: { type: String, default: " " },
      during_the_travel_first_lbp: { type: String, default: " " },
      during_the_travel_second: { type: String, default: " " },
      receiving_factor_first: { type: String, default: " " },
      receiving_factor_first_lbp: { type: String, default: " " },
      receiving_factor_second: { type: String, default: " " },
    },
    rate_id: { type: ObjectId },
    travel_rate: { type: Number, default: 5 },
    taxi_rate_travel: { type: Number, default: 72 },
    stations: [
      {
        station_id: { type: ObjectId, default: null },
        station_title: { type: String, default: "" },
      },
    ],
    station_id: { type: ObjectId, default: null },
    organization_id: { type: ObjectId, default: null, ref: "Account" },
    thirdPartyWebAppId: { type: ObjectId, default: null },
    receiver: {
      full_name: { type: String, default: "" },
      phone_number: { type: String, default: "" },
      address: { type: String, default: "" },
      info: { type: String, default: "" },
      afterpay: { type: Boolean, default: false },
      plaque: { type: String, default: "" },
      unit: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    plaque: { type: String, default: "" },
    unit: { type: String, default: "" },

    cancellation_reason: {
      _id: {
        type: ObjectId,
        default: null,
      },
      text: {
        type: String,
        default: "",
      },
      source: {
        type: String,
        enum: ["customer", "driver"],
      },
    },
    agency_id: {
      type: ObjectId,
      default: null,
      ref: "Agency",
    },
    emergency_request: {
      count: { type: Number, default: 5 },
      taxi_sos: { type: Boolean, default: false },
      customer_sos: { type: Boolean, default: false },
      timestamp: Number,
      loc: [Number],
      description: { type: String, default: "" },
    },

    driver_id: { type: String, default: "" },
    source_exact_address: { type: String, default: "" },
    distance: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    second_destination_distance: { type: Number, default: 0 },
    second_destination_duration: { type: Number, default: 0 },
    estimated_distance: { type: Number, default: 0 },
    estimated_duration: { type: Number, default: 0 },
    estimated_duration_to_source: { type: Number, default: 0 },
    service_type: { type: String, default: "normal" },
    service_type_id: { type: ObjectId },
    share_link: { type: String, default: "" },
    driver_rate: { type: Number, default: 5 },
    second_destination_place: { type: String, default: "" },
    second_destination_place_id: { type: String, default: null },
    second_destination_lat: { type: Number, default: 0 },
    second_destination_lan: { type: Number, default: 0 },
    is_two_way: { type: Boolean, default: false },
    one_additional_person: { type: Boolean, default: false },
    passenger_baggage: { type: Boolean, default: false },
    stop_time: { type: String, default: "" },
    stop_time_value: { type: Number, default: 0 },
    is_get_travel: { type: Boolean, default: false },
    customer_confirm_timestamp: { type: Number },
    taxi_confirm_timestamp: { type: Number },
    taxi_start_travel_timestamp: { type: Number },
    service_info: {
      _id: { type: ObjectId },
      name: { type: String },
      service_title: { type: String },
      type: { type: String },
      mname: { type: Mixed, default: { fa: "", ar: "", en: "" } },
      hurry: {
        active: { type: Boolean, default: false },
        values: [Number],
      },
      legacy: {
        type: Boolean, default: false 
      },
    },
    taxi_finish_travel_timestamp: { type: Number },
    taxi_start_travel_location: { type: Array },
    taxi_finish_travel_location: { type: Array },
    is_arrived: { type: Boolean, default: false },

    taxi_gift_ratio: { type: Number, default: 0 },
    taxi_gift_amount: { type: Number, default: 0 },
    city_id: { type: ObjectId, default: null, ref: "City" },
    dispatcher: {
      type: Object,
      default: {
        is_from: false,
        operator_info: {
          user_id: { type: ObjectId, default: null },
          username: { type: String, default: "" },
          name: { type: String, default: "" },
          account_type: { type: String, default: "" },
          station_id: { type: ObjectId, default: null },
          is_from_station: { type: Boolean, default: false },
        },
      },
    },
    air_conditioner_on: { type: Boolean, default: false },
    secure_call: { type: Boolean, default: false },
    secure_call_history: [
      { type: ObjectId, default: null, ref: "CallHistory" },
    ],
    options: [Option],
    route: {
      type: Array,
    },
    route_counter: {
      type: Number,
      default: 0,
    },
    customer_waiting_timestamp: {
      type: Number,
      default: 0,
    },
    customer_family: {
      type: String,
      default: "",
    },
    customer_cancel_timestamp: {
      type: Number,
      default: 0,
    },
    canceled_in_search_page: {
      type: Boolean,
      default: false,
    },
    customer_sex: {
      type: String,
      default: "",
    },
    caller_id_number: {
      type: String,
      default: "",
    },
    is_automatic: {
      type: Boolean,
      default: true,
    },
    is_dispatcher_panel: {
      type: Boolean,
      default: false,
    },
    is_caller_id: {
      type: Boolean,
      default: false,
    },
    someone_else: {
      type: Object,
      default: {
        is_active: false,
        name: "",
        phone_number: "",
      },
    },

    repeated_travel_link: {
      type: ObjectId,
      default: null,
    },
    old_travel_link: {
      type: ObjectId,
      default: null,
    },
    ignored: { type: Boolean, default: false },
    supportNoteForDriver: {
      type: String,
      default: "",
    },
    taxi_arrived_first_dest: {
      type: Boolean,
      default: false,
    },
    second_destination_distance: { type: Number, default: 0 },
    second_destination_duration:{ type: Number, default: 0 },
    order_id: { type: ObjectId, ref: "Order" , index:1 },
    second_destination_change_count: {
      type: Number,
      default: 0,
    },
    destination_change_count: {
      type: Number,
      default: 0,
    },
    payment_type_changed_by_user: {
      type: Boolean,
      default: false,
    },
    stop_on_the_way_change_count: {
      type: Number,
      default: 0,
    },
    one_additional_person_change_count: {
      type: Number,
      default: 0,
    },
    has_over_load_change_count: {
      type: Number,
      default: 0,
    },
    air_conditioner_on_change_count: {
      type: Number,
      default: 0,
    },
    is_two_way_change_count: {
      type: Number,
      default: 0,
    },
    search_in_country :{
      type: String,
      default: "IR",
    },
    twilio_sid : {
      type : String , 
      default: "" , 
      index :true
  },

  },
  { timestamps: true }
);

const deliveriesSchema = Schema(
  {
    full_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    info: { type: String, default: "" },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    step: { type: Number, required: true },
    desc: String,
    destination_address: String,
    destination_place: String,
    destination_place_id: String,
    destination_lat: Number,
    destination_lan: Number,
    images: { type: [String], default: [] },
    state: { type: String, index: true, default: "free" }, // active || done || not_delivered
    date: String,
    message: String,
    date_activate: String,
    date_finished: String,
    plaque: String,
    unit: String,
    description: String,
    full_date: { type: String, default: "", index: true },
    readable_date: { type: String, default: "" },
    time: { type: String, default: "" },
    distance: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    weight_unit : { type: String, default: "kg" },
    size_unit : { type: String, default: "cm" }
  },
  { timestamps: true }
);

const imageSchema = Schema(
  {
    travel_id: { type: ObjectId, ref: "Customer", index: true },
    path: { type: String, index: true },
    time: { type: String, default: "" },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: String,
    label :String , 
    description: String,
    description2: String,
    price: Number,
    full_date: { type: String, default: "", index: true },
    readable_date: { type: String, default: "" },
    images: { type: [String], default: [] },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    // tags: [{ type: ObjectId, ref: "Tags" }],
    count: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);
const sliderSchema = new Schema(
  {
    name: String,
    label :String , 
    label :String , 
    type :{ type: String, default: "home" ,required: true}, 
    full_date: { type: String, default: "", index: true },
    readable_date: { type: String, default: "" },
    image: { type: String, default: "" },
    periority:{
      type: Number,
      required: true
   },
  },
  { timestamps: true }
);
// Define the Category Schema
const categorySchema = new Schema(
  {
    name: String,
    label :String , 
    description: String,
    full_date: { type: String, default: "", index: true },
    readable_date: { type: String, default: "" },
    images: { type: String, default: "" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Define the Category Schema
const tagSchema = new Schema(
  {
    name: String,
    description: String,
    full_date: { type: String, default: "", index: true },
    readable_date: { type: String, default: "" },
  },
  { timestamps: true }
);

travelSchema.plugin(mongoosastic, {
  hosts: ["127.0.0.1:9200"],
});

const orderSchema = new Schema({
  items: [{
      product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
      },
      quantity: {
          type: Number,
          required: true
      },
      name: String,
      label :String , 
      description: String,
      description2: String,
      price: Number,
      images: { type: [String], default: [] },
  }],
  price: Number,
  full_date: { type: String, default: "", index: true },
  readable_date: { type: String, default: "" },
  manual_items: { type: [{
    name :String,
    desc : String , 
    quantity : Number
  }], default: [] },
  manual_price : { type: Number, default: 0 },
  status: {
      type: String,
      enum :  ['Pending', 'ToStore' , 'InStore', 'Ongoing',  "Arrived" , 'Completed', 'Cancelled' ],
      default: 'Pending'
  } , 
  weight_unit : { type: String, default: "kg" },
  distance_unit : { type: String, default: "cm" }
},  
{ timestamps: true });

 
const preSubmitTravelSchema = Schema(
  {
    travel_id: { type: ObjectId, ref: "Travel", index: true },
    driver_applied: {
      type: Boolean,
      default: false,
    },
    passenger_applied: {
      type: Boolean,
      default: false,
    },
    source_address: String,
    destination_address: String,
    source_place: String,
    destination_place: String,
    source_place_id: String,
    destination_place_id: String,
    source_lat: Number,
    source_lan: Number,
    destination_lat: Number,
    destination_lan: Number,
    cost: Number,
    lbp_cost: Number,
    lbp_rate: Number,
    offered_cost: Number,
    hurry: {
      active: { type: Boolean, default: false },
      selectedValue: { type: Number, default: 0 },
    },
    discount_code: { type: String, default: "" },
    discount_amount: { type: Number, default: 0 },
    lbp_discount_amount: { type: Number, default: 0 },
    full_date: { type: String, default: "", index: true },
    source_exact_address: { type: String, default: "" },
    service_type: { type: String, default: "normal" },
    service_type_id: { type: ObjectId },
    second_destination_place: { type: String, default: "" },
    second_destination_place_id: { type: String, default: null },
    second_destination_lat: { type: Number, default: 0 },
    second_destination_lan: { type: Number, default: 0 },
    is_two_way: { type: Boolean, default: false },
    stop_time: { type: String, default: "" },
    stop_time_value: { type: Number, default: 0 },
    options: [Option],
    has_over_load: { type: Boolean, default: false },
    passenger_baggage: { type: Boolean, default: false },
    one_additional_person: { type: Boolean, default: false },
    distance: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    second_destination_distance: { type: Number, default: 0 },
    second_destination_duration: { type: Number, default: 0 },
  },
  { timestamps: true }
);

travelSchema.plugin(mongoosastic, {
  hosts: ["127.0.0.1:9200"],
});
const travelNumberSchema = Schema({
  order_number: { type: Number, default: 1 },
});

travelSchema.index(
  { state: 1, taxi_id: 1, date: -1, full_date: -1 },
  { unique: true }
);
travelSchema.plugin(mongoosePaginate);
travelSchema.query.checkUserAccountType = checkUserAccountType;
travelSchema.statics.checkUserAccountType = checkUserAccountType;

module.exports = {
  travelSchema,
  deliveriesSchema,
  imageSchema,
  travelNumberSchema,
  preSubmitTravelSchema,
  tagSchema,
  categorySchema,
  productSchema,
  orderSchema,
  sliderSchema
};
