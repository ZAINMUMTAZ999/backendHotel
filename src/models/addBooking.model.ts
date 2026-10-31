// import mongoose from "mongoose";
// export type AddBookingTypes = {
//   userId: string;
//   _id: string;
//   name: string;
//   phoneNumber: string;
//   Amount: string;
//   time: string;
  
//   createdAt: Date;
// };
// const AddBookingSchema = new mongoose.Schema<AddBookingTypes>(
//   {
//     userId: {
//       type: String,
//     },
//     // imageUrl: {
//     //   type:File,
//     //   required: true,
//     // },
//     name: {
//       type: String
//       // required: true,
//     },
//     phoneNumber: {
//       type: String
//       // required: true,
//     },
//     Amount: {
//       type: String
//       // required: true,
//     },
//     time: {
//       type: String
//       // required: true,
//     },
//   },
//   { timestamps: true }
// );
// export const AddBooking = mongoose.model<AddBookingTypes>(
//   "AddBooking",
//   AddBookingSchema
// );


import mongoose from "mongoose";

export type AddBookingTypes = {
  userId: string;
  _id: string;

  // Optional fields for admin-created bookings
  name?: string;
  phoneNumber?: string;
  time?: string;

  // Booking information
  hotelId?: string;
  Amount: string;

  // Stripe payment information
  paymentStatus?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  stripeSessionId?: string;
  stripePaymentIntentId?: string;

  createdAt: Date;
  updatedAt: Date;
};

const AddBookingSchema = new mongoose.Schema<AddBookingTypes>(
  {
    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    hotelId: {
      type: String,
    },

    Amount: {
      type: String,
      required: true,
    },

    time: {
      type: String,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    stripePaymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const AddBooking = mongoose.model<AddBookingTypes>(
  "AddBooking",
  AddBookingSchema
);
