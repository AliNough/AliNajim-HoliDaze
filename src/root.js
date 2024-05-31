import { Router, Route, RootRoute } from "@tanstack/react-router";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import ProfilesPage from "./pages/Profiles";
import ProfilePage from "./pages/Profile";
import AddNewVenue from "./pages/AddVenue";
import SingleVenuePage from "./pages/SingleVenue";
import PeerProfilePage from "./pages/PeerProfile";
import BookVenue from "./pages/BookVenue";

import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

// NOTE: @see https://tanstack.com/router/v1/docs/guide/routes

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const profilesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profiles",
  component: ProfilesPage,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profiles/$profileId",
  component: ProfilesPage,
});

const myProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const addListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/addlisting",
  component: AddNewVenue,
});

const singleListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/SingleVenue/$id",
  component: SingleVenuePage,
});

const PeerProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/PeerProfile/$name",
  component: PeerProfilePage,
});

const bookVenueRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/BookVenue/$id",
  component: BookVenue,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  profilesRoute,
  myProfileRoute,
  profileRoute,
  registerRoute,
  addListingRoute,
  singleListingRoute,
  PeerProfileRoute,
  bookVenueRoute,
]);

export const router = new Router({ routeTree });

export default router;
