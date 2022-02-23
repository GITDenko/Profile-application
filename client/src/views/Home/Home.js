import { Button, Card, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import '../../index.css';
import { Link } from 'react-router-dom';
import * as methodService from '../../components/methods/';
import HomeFilter from './Filter/HomeFilter';
import { useFilterGlobalState } from './Filter/FilterGlobalStates';
import { useMsal } from '@azure/msal-react';
import { fetchToken } from '../../components/methods/';

const Home = () => {
  const { instance, accounts } = useMsal();
  const token = fetchToken(instance, accounts);
  const profiles = methodService.fetchProfiles('/api/profile/', token);
  const [skillFilter] = useFilterGlobalState('skillFilter');
  const [roleFilter] = useFilterGlobalState('roleFilter');
  const [nameFilter] = useFilterGlobalState('nameFilter');
  const [assignmentFilter] = useFilterGlobalState('assignmentFilter');
  return (
    <div className="HomeContainer">
      <div className="Library">
        <HomeFilter
          skillFilter={skillFilter}
          roleFilter={roleFilter}
          nameFilter={nameFilter}
          assignmentFilter={assignmentFilter}
        />
        <div>
          {profiles
            .filter((s) => methodService.filterSkills(s, 'skill', skillFilter))
            .filter((r) => methodService.filterRoles(r, 'role', roleFilter))
            .filter((n) => methodService.filterName(n, 'name', nameFilter))
            .filter((a) =>
              methodService.filterAssignment(a, 'assignment', assignmentFilter)
            )
            .sort((x, y) => x.modifiedDate - y.modifiedDate)
            .map((profile, i) => (
              <Card className="Card" key={i}>
                <div className="LibraryProfileImg">
                  <p className="LibraryProfileText">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </p>
                </div>
                <Card.Body>
                  <Card.Title>
                    {profile.firstName} {profile.lastName}
                  </Card.Title>
                  <Card.Text className="CardText">
                    {(() => {
                      try {
                        return profile.roles[0].name;
                      } catch (e) {}
                    })()}
                  </Card.Text>
                  <Stack
                    direction="horizontal"
                    className="justify-content-center"
                    gap={3}
                  >
                    <Link
                      to="/Profile/"
                      state={{
                        selectedProfile: profile,
                      }}
                    >
                      <Button variant="dark">Edit </Button>
                    </Link>
                    <Link
                      to="/Print/"
                      state={{
                        selectedProfile: profile,
                      }}
                    >
                      <Button variant="dark">View </Button>
                    </Link>
                  </Stack>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
