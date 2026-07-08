"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const PORT = process.env.port || 8000;
const client_1 = __importDefault(require("./prisma/client"));
async function connectDB() {
    try {
        await client_1.default.$connect();
        console.log("✅ Prisma DB has been connected");
    }
    catch (error) {
        console.log(`❌ Error: ${error}`);
    }
}
connectDB();
app_1.default.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});
