import { fetchTags } from "../../components/methods";
import Tags from "./Tags";
import "../../index.css";
import { useMsal } from "@azure/msal-react";
import { fetchToken } from "../../components/methods/";

const Skills = () => {
  const { instance, accounts } = useMsal();
  const token = fetchToken(instance, accounts);
  const skills = fetchTags("/api/skill/", token).sort((x, y) => x.id - y.id);
  return (
    <div>
      <Tags type={"Skill"} title={"Skills"} tags={skills} url={"/api/skill/"} />
    </div>
  );
};

export default Skills;
