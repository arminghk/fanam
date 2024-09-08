const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const AccountSchema = new Schema({
  name: { type: String },
  city_array: [ObjectId],
  roles: { type: ObjectId, ref: "Roles" },
  data_access: Boolean,
  is_block: { type: Boolean, default: false },
  ignored: { type: Boolean, default: false },

  organization: {
    organization_id: String,
    organization_name: String,
  },
  city_name: { type: String },
  city_id: { type: ObjectId, default: null, ref: "City" },
  username: { type: String, unique: true },
  password: String,
  account_type: { type: String }, // [admin, operator, station , organization , dispatcher]
  station_id: { type: ObjectId, default: null },
  project: {
    type: ObjectId,
    ref: "Project",
    default: null,
  },
  date: String,
  Organization: {
    logo: String,
    company_name: String,
    email: String,
    company_phone: String,
    phone: String,
    wallet: {
      type: Number,
      default: 0,
    },
  },
  agency: {
    type: ObjectId,
    default: null,
    ref: "Agency",
  },
  code: {
    type: String,
    default: "",
  },
});
const userSchema = new Schema({
  name: { type: String },
  family: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
  phone: { type: String },
  salt: { type: String },
});
const PermissionSchema = new Schema({
  en_classification: { type: String },
  fa_classification: { type: String },
  type: { type: String },
  flow: { type: Object },
  permissions: [
    {
      parent_permissions: [
        {
          url: { type: String },
          method: Array,
        },
      ],
      en_name: { type: String },
      menu_element: { type: Boolean },
      fa_name: { type: String },
      user_depended: Boolean,
      child_permissions: [
        {
          url: { type: String },
          en_name: { type: String },
          fa_name: { type: String },
          user_depended: Boolean,
        },
      ],
    },
  ],
});
const RolesSchema = new Schema({
  fa_name: { type: String, unique: true },
  en_name: { type: String, unique: true },
  type: { type: String },
  explanation: { type: String },
  permissions: { type: Object },
  layout_menu: { type: Object },
});
const MapSchema = new Schema({
  title: { type: String, unique: true },
  name: { type: String, unique: true },
  url: { type: String },
});
const SocialMediaSchema = new Schema(
  {
    name: { type: String },
    title: { type: String },
  },
  { timestamps: true }
);

AccountSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        // console.log('err', err);

        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

AccountSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};
//todo complete server side marker

const ProjectSchema = new Schema(
  {
    owner_name: {
      type: String,
    },
    en_name: {
      type: String,
      unique: true,
    },
    fa_name: {
      type: String,
      unique: true,
    },
    package_name: {
      android: {
        passenger: String,
        driver: String,
      },
      ios: {
        passenger: String,
        driver: String,
      },
    },
    phone: {
      type: String,
    },
    onesignal: {
      rest_api: {
        android: {
          passenger: String,
          driver: String,
        },
        ios: {
          passenger: String,
          driver: String,
        },
      },
      app_id: {
        android: {
          passenger: String,
          driver: String,
        },
        ios: {
          passenger: String,
          driver: String,
        },
      },
      channel_id: {
        android: {
          passenger: { type: String, default: "" },
          driver: String,
        },
        ios: {
          passenger: String,
          driver: String,
        },
      },
    },
    zarinpal_mid: {
      type: String,
    },

    kavenegar_token: {
      type: String,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    payment: {
      gateway: {
        type: "String",
        default: "zarinpal",
        enum: [
          "zarinpal",
          "saman",
          "parsian",
          "mabna",
          "mellat",
          "fan_ava",
          "iranKish",
          "payir",
        ],
      },
      merchant_id: {
        type: String,
        default: "",
      },
      customerPayment: {
        type: Boolean,
        default: true,
      },
      driverPayment: {
        type: Boolean,
        default: true,
      },
      pin: {
        type: String,
        default: "",
      },
      terminal_id: {
        type: String,
        default: "",
      },
      userName: {
        type: String,
        default: "",
      },
      userPassword: {
        type: String,
        default: "",
      },
      publicKey: {
        type: String,
        default: "",
      },
      acceptorId: {
        type: String,
        default: "",
      },
    },
    website: {
      type: String,
      default: "",
    },
    colors: {
      primary: String,
      primary_light: String,
      secondary: String,
      primary_text_color: String,
      secondary_text_color: String,
    },
    google_map: {
      api_key: {
        ios: {
          driver: String,
          passenger: String,
        },
        android: {
          driver: String,
          passenger: String,
        },
      },
    },
    sibapp_url: {
      driver: String,
      passenger: String,
    },
    hockey: {
      android: {
        driver: String,
        passenger: String,
      },
      ios: {
        driver: String,
        passenger: String,
      },
    },
    qmap_apikey: {
      type: String,
      default: "",
    },
    about_us: {
      text: {
        type: String,
        default: "",
      },
      default_text: {
        type: String,
        default: "",
      },
      primary_link: {
        type: String,
        default: "",
      },
      secondary_link: {
        type: String,
        default: "",
      },
      mtext: {
        type: Mixed,
        default: { en: "", ar: "" },
      },
      default_mtext: {
        type: Mixed,
        default: { en: "", ar: "" },
      },
    },
    social_media: [
      {
        title: {
          type: String,
          default: "",
          unique: true,
        }, //telegram,net,instagram
        address: String,
        logo: String,
        explanation: { type: String, default: "" },
        priority: Number,
      },
    ],
    caller_promotion_gift: {
      type: Number,
      default: 2500,
    },
    fcm: {
      server_key: {
        ios: {
          driver: String,
          passenger: String,
        },
        android: {
          driver: String,
          passenger: String,
        },
      },
    },
    multicity: { type: Boolean, default: false },
    someone_else: { type: Boolean, default: false },
    block_expired_driver: { type: Boolean, default: false },
    multimap: { type: Boolean, default: false },
    has_dispatcher: { type: Boolean, default: true },
    include_qbrand_in_about_us: { type: Boolean, default: true },
    taxi_notification_inbox: { type: Boolean, default: false },
    has_over_load: { type: Boolean, default: false },
    customer_notification_inbox: { type: Boolean, default: false },
    call_dispatcher: { type: Boolean, default: false },
    customer_cancellation_reason: { type: Boolean, default: false },
    taxi_cancellation_reason: { type: Boolean, default: false },
    taxi_sos_request: { type: Boolean, default: false },
    taxi_rate_travel: { type: Boolean, default: false },
    customer_sos_request: { type: Boolean, default: false },
    reservation: { type: Boolean, default: false },
    taxi_heat_map: { type: Boolean, default: false },
    taxi_navigation: { type: Boolean, default: false },
    logo_type: {
      type: String,
      default: "",
    },
    logo_url: {
      type: String,
      default: "",
    },
    passenger_logo_type: {
      type: String,
      default: "",
    },
    markers: {
      android: {
        passenger: {
          origin: String,
          destination: String,
          second_destination: String,
          chosen: String,
        },
        driver: {
          origin: String,
          destination: String,
          second_destination: String,
          chosen: String,
        },
      },
      ios: {
        passenger: {
          origin: String,
          destination: String,
          second_destination: String,
          chosen: String,
        },
        driver: {
          origin: String,
          destination: String,
          second_destination: String,
          chosen: String,
        },
      },
    },
    map_service: {
      name: {
        type: String,
        enum: ["qmap", "google", "map.ir", "openstreetmap", "neshan"],
      },
      apikey: String,
    },
    terms_link: {
      type: String,
      default: "",
    },
    service_types: [
      {
        name: String,
      },
    ],
    taxi_fees_type: [
      {
        en_name: String,
        fa_name: String,
        enum: ["commission", "subscription", "contract"],
      },
    ],
    client_map: {
      name: {
        type: String,
        enum: ["openstreetmap", "google"],
      },
      url: String,
    },
    secure_call: { type: Boolean, default: false },
    servicetypes: { type: Object, default: {} },
    secure_call_service: {
      name: {
        type: String,
        enum: ["avanak", "nasim"],
      },
      avanak: {
        base_url: { type: String, default: "https://portal.avanak.ir" },
        username: String,
        password: String,
        hold_message_id: Number,
        server_id: Number,
      },
      nasim: {
        base_url: { type: String, default: "" },
        port: { type: Number, default: 80 },
        url_path: { type: String, default: "" },
        caller_id: { type: Number },
        trunk_name: { type: String },
        time_out: { type: Number, default: 30 },
        context: { type: String, default: "main_routing" },
        username: { type: String },
        password: { type: String },
      },
    },

    dispatcher_advertisement_message: {
      type: String,
      default: "",
    },
    domain: {
      tracking: {
        type: String,
      },
      paymentCallBack: {
        type: String,
      },
      travelFactor: {
        type: String,
      },
      dispatcherPanel: {
        type: String,
      },
    },

    urbanPricingAlgorithm: [
      {
        type: Mixed,
      },
    ],

    intercityPricingAlgorithm: [
      {
        type: Mixed,
      },
    ],

    ad_gif: {
      type: String,
    },
    findTaxiType: {
      type: String,
      default: "sequential", // hamzamani or sequential
    },
    taxi_accept_mode: {
      type: String,
      default: "long", // long or short
    },
    taxi_accept_time: {
      type: Number,
      default: 2, // long or short
    },
    normal_travel_count_permit: {
      type: Number,
      default: 1, // long or short
    },
    delivery_travel_count_permit: {
      type: Number,
      default: 1, // long or short
    },
    shop_travel_count_permit: {
      type: Number,
      default: 1, // long or short
    },
    is_active_delivery: { type: Boolean, default: false },

    is_active_shop: { type: Boolean, default: false },

    is_active_normal: { type: Boolean, default: false },
    is_active_message: { type: Boolean, default: true },
    search_in_country: {
      type: String,
      default: "IR",
    },
  },
  { timestamps: true }
);

const GlobalTransactionSchema = new Schema(
  {
    project_name: {
      type: String,
      default: "",
    },
    gateway: {
      type: String,
      default: "zarinpal",
      enum: [
        "zarinpal",
        "saman",
        "parsian",
        "mabna",
        "mellat",
        "payir",
        "fan_ava",
        "iranKish",
      ],
    },
    state: {
      type: String,
      default: "",
    },
    stateCode: {
      type: String,
      default: 0,
    },
    resnum: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: 100,
    },
    customer_id: {
      type: ObjectId,
      default: null,
      ref: "Customer",
    },
    taxi_id: {
      type: ObjectId,
      default: null,
      ref: "Taxi",
    },
    source: {
      type: String,
      enum: ["customer", "driver", "organization", "agency"],
    },
    client: {
      type: String,
      default: "",
    },
    wallet_id: {
      type: ObjectId,
      default: null,
      ref: "Wallet",
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: "",
    },
    readable_date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    merchant_id: {
      type: String,
      default: "",
    },
    refnum: {
      type: String,
      default: "",
    },
    cid: {
      type: String,
      default: "",
    },
    traceno: {
      type: String,
      default: "",
    },
    rrn: {
      type: String,
      default: "",
    },
    securepan: {
      type: String,
      default: "",
    },
    authority: {
      type: String,
      default: "",
    },
    transactionId: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
    cardnumbermasked: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    terminalno: {
      type: String,
      default: "",
    },
    hashcardnumber: {
      type: String,
      default: "",
    },
    organization_id: {
      type: ObjectId,
      default: null,
      ref: "Account",
    },
    agency_id: {
      type: ObjectId,
      default: null,
      ref: "Agency",
    },
    date_paid: {
      type: String,
      default: "",
    },
    order_id: {
      type: String,
      default: "",
    },
    ref_id: {
      type: String,
      default: "",
    },
    terminal_id: {
      type: String,
      default: "",
    },
    res_code: {
      type: String,
      default: "",
    },
    res_description: {
      type: String,
      default: "",
    },
    SaleReferenceId: { type: String, default: null },
    CardHolderInfo: { type: String, default: null },
    CardHolderPan: { type: String, default: null },
    subscription: { type: Object, default: {} },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);
const thirdPartyWebAppSchema = Schema(
  {
    name: {
      type: Mixed,
      default: { fa: "", ar: "", en: "" },
    },
    apiKey: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
      required: true,
    },
    projectId: {
      type: ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  AccountSchema,
  ProjectSchema,
  GlobalTransactionSchema,
  SocialMediaSchema,
  PermissionSchema,
  RolesSchema,
  MapSchema,
  userSchema,
  thirdPartyWebAppSchema,
};
