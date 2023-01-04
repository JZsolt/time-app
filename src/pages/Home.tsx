import { GuardedRoute } from "../router/GuardedRoute";
import ListMembers from "./ListMembers";

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
