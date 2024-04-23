const { RegistrationModel, BookingModel } = require("./Schema");

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
    });
    if (dbResponse?._id) {
      apiRes.send(dbResponse);
    }
    return;
  }

  apiRes.send("Invalid data for booking");
};

module.exports = {
  handleRegistration,
  handleLogin,
  handleCreateBooking,
};
