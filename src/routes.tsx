import React from "react";
import { Route, Routes as Switch } from 'react-router-dom';

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import TransactionsList from "./pages/TransactionsList";
import Account from "./pages/Account";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import Deposit from "./pages/Deposit";
import Purchase from "./pages/Purchase";

const Routes: React.FC = () => {
    return <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/transactions" element={<RequireAuth typeAccess="admin"><TransactionsList /></RequireAuth>} />
                <Route path="/account" element={<RequireAuth typeAccess="customer"><Account /></RequireAuth>} />
                <Route path="/deposit" element={<RequireAuth typeAccess="customer"><Deposit /></RequireAuth>} />
                <Route path="/purchase" element={<RequireAuth typeAccess="customer"><Purchase /></RequireAuth>} />
            </Switch>;
}

export default Routes;