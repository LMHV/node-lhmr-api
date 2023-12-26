"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// Config
const app = (0, express_1.default)();
app.set('port', process.env.PORT);
// Midleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
//origin: "*",
//methods: ["GET", "POST", "DELETE", "PUT"]
}));
// Routes
app.use('/api/users', user_routes_1.default);
// Static Files
// Running..
app.listen(app.get('port'), () => console.log(`Server on: ${app.get('port')}`));
