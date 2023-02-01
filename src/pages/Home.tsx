import { GuardedRoute } from "../router/GuardedRoute";
import ListMembers from "./layout/List/ListMembers";

const Home = () => {
  return (
    <>
      <GuardedRoute>
        <ListMembers />
      </GuardedRoute>
    </>
  );
};

export default Home;
