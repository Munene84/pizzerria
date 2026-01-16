npm init -y
npm install express axios body-parser dotenv   
        MPESA_CONSUMER_KEY=4iNaLSMxWxAtIj6gujoqKkLA1ZdajwoMpzYEkRUoYBSMMnpD
MPESA_CONSUMER_SECRET=QgcEGh6Nd2uPnzQ47YHgdT3YrpESXQ4H8NyvSBGBMbEt0erDSRnAySHqdWC8a1CU
MPESA_SHORTCODE=your_paybill_or_buygoods
MPESA_PASSKEY=your_passkey
CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
        require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  CALLBACK_URL
} = process.env;

// Function to generate OAuth access token
async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const { data } = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` }
  });
  return data.access_token;
}

// Initiate STK Push
app.post("/api/mpesa/stkpush", async (req, res) => {
  const { amount, phone } = req.body;

  try {
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: CALLBACK_URL,
      AccountReference: "Order123",
      TransactionDesc: "Payment"
    };

    const result = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(result.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate STK Push" });
  }
});

// Callback endpoint (to receive payment result)
app.post("/api/mpesa/callback", (req, res) => {
  console.log("M-Pesa Callback:", req.body);
  // Save transaction status to your DB
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));



    });




});
