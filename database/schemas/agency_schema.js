const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;
const checkUserAccountType =
  require("../Connection/tools").checkUserAccountType;

const AgencySchema = Schema(
  {
    pii: {
      full_name: {
        type: String,
      },
      national_code: {
        type: String,
        unique: true,
      },
    }, // immutable data / personal identity information
    contact: {
      phone: {
        type: String,
      },
      emergency_phone: {
        type: String,
      },
      email: {
        type: String,
        default: "",
      },
      location: {
        type: [Number],
        index: "2dsphere", //[lan,lat]
      },
      address: {
        type: String,
      },
    },
    bank: {
      name: {
        type: String,
      },
      account: {
        type: String,
        default: "",
        es_indexed: true,
      },
      sheba: {
        type: String,
        default: "",
        es_indexed: true,
      }, // iran bank account ID
      card: {
        type: String,
        default: "",
        es_indexed: true,
      },
    },
    agents: [
      {
        city_id: {
          type: ObjectId,
        }, // immutable data
        commission: {
          type: Number,
        },
        subscription_share: {
          type: Number,
          default: 0,
        },
        contract_share: {
          type: Number,
          default: 0,
        },
        city_name: {
          type: String,
        },
        max_travels: {
          type: Number,
        },
        max_taxis: {
          type: Number,
        },
      },
    ],

    systemic_info: {
      username: {
        type: String,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        lowercase: true,
        trim: true,
      },
      balance: {
        type: Number,
        default: 0,
      },
      register_date: {
        type: String,
      },
      language: {
        type: String,
      },
      min_balance: {
        type: Number,
      },
      roles: {
        type: ObjectId,
      },
      city_array: {
        type: [ObjectId],
        required: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
    project: {
      about_us: {
        type: String,
      },
    },
    support: {
      _id: { type: ObjectId, default: null },
      name: { type: String, default: "" },
      username: { type: String, default: "" },
      roles: { type: String, default: "" },
      city_id: { type: ObjectId, default: null },
    },
  },
  { createdAt: true, updatedAt: true }
);

AgencySchema.query.checkUserAccountType = checkUserAccountType;

module.exports = {
  AgencySchema,
};
