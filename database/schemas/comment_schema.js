const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const commentSchema = Schema({

  text: String,
  mtext: Mixed,
  star: Number,
  date: String,
  source: {
    type: String,
    enum: ["driver", "customer"]
  },
  time: String

});
const CancellationReasonsSchema = Schema({
  text: String,
  mtext: Mixed,
  source: {
    type: String,
    enum: ["driver", "customer"]
  },

}, {timestamps: true});
const rateTravelSchema = Schema({

  travel_id: {type : ObjectId , index : true } ,
  taxi_id: { type :  ObjectId, ref : "Taxi" , index : true } ,
  customer_id: {type : ObjectId , index : true } ,
  date: String,
  rate: Number,
  time: String,
  source: {
    type: String,
    enum: ["driver", "customer"]
  },
  rate_text: String,
  rate_text_array: Array,
  rate_text_ids: Array

}, {timestamps: true});

rateTravelSchema.index()

module.exports = {
  commentSchema,
  rateTravelSchema,
  CancellationReasonsSchema
};