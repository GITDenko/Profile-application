import { fetchTags } from "../../components/methods";
import Tags from "./Tags";
import "../../index.css";
import { useMsal } from "@azure/msal-react";
import { fetchToken } from "../../components/methods";

const Roles = () => {
  const { instance, accounts } = useMsal();
  const token = fetchToken(instance, accounts);
  const roles = fetchTags("/api/role/", token).sort((x, y) => x.id - y.id);
  return (
    <div>
      <Tags type={"Role"} title={"Roles"} tags={roles} url={"/api/Role/"} />
    </div>
  );
};

export default Roles;
