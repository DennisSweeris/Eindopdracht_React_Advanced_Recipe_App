import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import { EventProvider } from "./context/EventContext";
import { Provider } from "./components/ui/provider";
import { Root } from "./components/Root";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { AboutPage } from "./pages/AboutPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <EventsPage />,
			},
			{
				path: "/events",
				element: <EventsPage />,
			},
			{
				path: "/event/:eventId",
				element: <EventPage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider>
			<EventProvider>
				<UserProvider>
					<RouterProvider router={router} />
				</UserProvider>
			</EventProvider>
		</Provider>
	</React.StrictMode>,
);
