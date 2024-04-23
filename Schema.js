const { mongoose } = require("./db");

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
  username: { type: String },
  password: { type: String },
  phonenumber: { type: String },
  emailaddress: { type: String },
});

const BookingSchema = new Schema({
  username: { type: String },
  restaurentId: { type: String },
  selectedTime: { type: String },
  selectedSeats: { type: Number ,},
  selectedDate: { type: String },
  isCancelled: { type: Boolean },
});

const RegistrationModel = mongoose.model("registrations", RegistrationSchema);
const BookingModel = mongoose.model("bookings", BookingSchema);

module.exports = {
  RegistrationModel,
  BookingModel,
};
