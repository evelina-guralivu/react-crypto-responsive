import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

class SidebarCategories extends React.Component {
  // User roles: 1 - admin, 2 - user, 3 - publisher
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Card className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Categories</h6>
        </CardHeader>
        <CardBody className="p-0">
    {/* 
          <ListGroup flush>
            <ListGroupItem className="px-3 pb-2">
              <FormCheckbox className="mb-1" value="design" defaultChecked>
                Altcoins
          </FormCheckbox>
              <FormCheckbox className="mb-1" value="development">
                Bitcoin
          </FormCheckbox>
              <FormCheckbox className="mb-1" value="writing">
                Technical Analysis
          </FormCheckbox>
              <FormCheckbox className="mb-1" value="books">
                Trading
          </FormCheckbox>
            </ListGroupItem>

            <ListGroupItem className="d-flex px-3">
              <InputGroup className="ml-auto">
                <FormInput placeholder="New category" />
                <InputGroupAddon type="append">
                  <Button theme="white" className="px-2">
                    <i className="material-icons">add</i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </ListGroupItem>
          </ListGroup>*/}
        </CardBody>
      </Card>
    )
  }
};

export default SidebarCategories;
