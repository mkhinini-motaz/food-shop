import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

export default (
	<BrowserRouter>
		<Route path="/" />
		<Route path="/category" />
		<Route path="/cart"></Route>
		<Route path="/profile"></Route>
		<Route path="/login"></Route>
	</BrowserRouter>
);
