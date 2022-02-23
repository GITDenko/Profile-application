import { Link } from 'react-router-dom';
import './Profile.css';
import { Button, Row, Col } from 'react-bootstrap';

const Print = (props) => {
  return (
    <div className="workSection">
      <Row md={4}>
        <Col>
          <Link
            to="/Print/"
            state={{
              selectedProfile: props.profile,
            }}
          >
            <Button variant="dark">Print Profile</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
export default Print;
