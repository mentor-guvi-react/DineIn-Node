const { RegistrationModel, BookingModel } = require("./Schema");
const { ObjectId } = require("mongodb");

const handleRegistration = async (apiReq, apiRes) => {
  console.log(apiReq.body);

  const { username, password, phonenumber, emailaddress } = apiReq.body;

  if (
    username?.length &&
    password?.length &&
    phonenumber?.length &&
    emailaddress?.length
  ) {
    const dbResponse = await RegistrationModel.create({
      username: username,
      password: password,
      phonenumber: phonenumber,
      emailaddress: emailaddress,
    });

    if (dbResponse?._id) {
      apiRes.send(dbResponse);
      return;
    }
  }

  apiRes.send("In Correct Data");
};

const handleLogin = async (apiReq, apiRes) => {
  console.log(apiReq.params, "apiReq.params");
  const { username, password } = apiReq.params;

  const dbResponse = await RegistrationModel.findOne({
    username: username,
    password: password,
  });

  if (dbResponse?._id) {
    apiRes.send(dbResponse.username);
    return;
  }
  apiRes.send("Login Failed");
};

const handleCreateBooking = async (apiReq, apiRes) => {
  const { selectedTime, selectedSeats, selectedDate, username, restaurentId } =
    apiReq.body;

  if (
    selectedTime?.length &&
    selectedSeats &&
    selectedDate?.length &&
    username?.length &&
    restaurentId?.length
  ) {
    const dbResponse = await BookingModel.create({
      selectedTime,
      selectedSeats,
      selectedDate,
      username,
      restaurentId,
      isCancelled: false,
    });
    if (dbResponse?._id) {
      apiRes.send(dbResponse);
    }
    return;
  }

  apiRes.send("Invalid data for booking");
};

const handleMyBookings = async (apiReq, apiRes) => {
  const { username } = apiReq.params;

  if (username?.length) {
    const dbResponse = await BookingModel.find({
      username,
    });

    if (dbResponse) {
      apiRes.send(dbResponse);
      return;
    }
  }

  apiRes.send("cant fetch details");
};

const handleCancelBooking = async (apiReq, apiRes) => {
  const { username, bookingId } = apiReq.params;

  if (username?.length && bookingId?.length) {
    const filter = {
      _id: new ObjectId(bookingId),
    };
    const update = { isCancelled: true };
    const dbResponse = await BookingModel.findOneAndUpdate(filter, update);

    if (dbResponse) {
      apiRes.send("Cancelled Success");
      return;
    }
  }
  apiRes.send("Cancelled Failed");
};

module.exports = {
  handleRegistration,
  handleLogin,
  handleCreateBooking,
  handleMyBookings,
  handleCancelBooking,
};
