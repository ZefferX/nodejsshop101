"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // estos son ESModules
const diaries_1 = __importDefault(require("./routes/diaries"));
const UserRoutesRoutes_1 = __importDefault(require("./routes/UserRoutesRoutes"));
const TicketRoutes_1 = __importDefault(require("./routes/TicketRoutes"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const UseCasesRoutes_1 = __importDefault(require("./routes/UseCasesRoutes"));
const CashRegisterRoutes_1 = __importDefault(require("./routes/CashRegisterRoutes"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforla la req body a un json
app.get('/ping', (_req, res) => {
    console.log('some pinged here!! ' + new Date().toLocaleDateString());
    res.send('pong');
});
app.use('/api/diaries', diaries_1.default);
app.use('/api/users', UserRoutesRoutes_1.default);
app.use('/api/tickets', TicketRoutes_1.default);
app.use('/api/products', ProductRoutes_1.default);
app.use('/api/useCases', UseCasesRoutes_1.default);
app.use('/api/cashRegister', CashRegisterRoutes_1.default);
app.listen(config_1.PORT, () => {
    console.log(`server Running on port ${config_1.PORT}`);
});
