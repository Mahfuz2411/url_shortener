import { Schema, model, Document } from "mongoose";
import { UrlInterface } from "./url.interface";

const UrlSchema: Schema = new Schema(
    {
        originalUrl: {
            type: String,
            required: true,
            trim: true,
        },

        shortCode: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        clicks: {
            type: Number,
            default: 0,
        },

        email: {
            type: String,
            required: true,
            index: true,
        },

        status: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

export default model<UrlInterface>('Url', UrlSchema);
