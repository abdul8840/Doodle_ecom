import Address from "../models/addressModel.js";

export const createaddress = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      mobile,
      pincode,
      city,
      state,
      country,
      address1,
      address2,
    } = req.body;
    const userId = req.user?._id;

    const existingAddresses = await Address.find({ userId });

    let insertaddress;
    if (existingAddresses.length === 0) {
      // If no existing addresses, set defaultaddress to true for the first address
      insertaddress = new Address({
        firstname,
        lastname,
        email,
        mobile,
        pincode,
        city,
        state,
        country,
        address1,
        address2,
        userId,
        defaultaddress: true,
      });
    } else {
      insertaddress = new Address({
        firstname,
        lastname,
        email,
        mobile,
        pincode,
        city,
        state,
        country,
        address1,
        address2,
        userId,
        defaultaddress: false,
      });
    }

    const response = await insertaddress.save();

    res.send({ status: "successful", data: response });
  } catch (errors) {
    res.send({ status: "failed", errors: errors });
    console.log("failed", errors);
  }
};

export const addressForUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    const addresslist = await Address.find({ userId:userId });
    res.send({ status: "successfully", data: addresslist });
  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err.errors });
  }
};

export const addressList = async (req, res) => {
  try {
    const addresslist = await Address.find();
    res.send({ status: "successfully", data: addresslist });
  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err.errors });
  }
};

export const addressSingle = async (req, res) => {
  const addressId = req.params.id;
  try {
    const addressdetail = await Address.findById(addressId);
    if (!addressdetail) {
      return res.status(404).send({ error: "address detail not found" });
    }

    res.status(200).send({ status: "successfully", data: addressdetail });
  } catch (err) {
    res
      .status(500)
      .send({
        error: "An error occurred while fetching addressdetail ",
        servererror: err,
      });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const addressdlt = await Address.findByIdAndDelete(req.params.id);
    console.log("addressdlt", addressdlt);
    res.send({
      status: "successfully delete",
      data: addressdlt,
    });
  } catch (err) {
    res.status(500).send({ error: "An error occurred while deleting User" });
  }
};

export const updateAddress = async (req, res) => {
  const addressId = req.params.id;
  try {
    const updatedaddress = await Address.findByIdAndUpdate(addressId, req.body, {
      new: true,
    });

    if (!updatedaddress) {
      return res
        .status(404)
        .json({ status: "failed", message: "Address not found" });
    }

    res.json({ status: "successfully update", data: updatedaddress });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ status: "failed", errors: err.message });
  }
};


