import React, { Fragment } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";

const Specifications = ({ specifications = [], description }) => (
  <div className="spec-holder">
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Dodatne informacije">
        {specifications.length === 0 && (
          <p className="text-center">Za proizvod nema dodatnih informacija.</p>
        )}
        <Table striped hover>
          <tbody>
            {(specifications ?? []).map((data) => (
              <Fragment key={data?.set?.id}>
                {(Object.values(data.groups) ?? []).map((item) => (
                  <Fragment key={item?.group?.id}>
                    {(Object.values(item.attributes) ?? []).map((attribute) => (
                      <tr key={attribute?.attribute?.id}>
                        <td>{attribute?.attribute?.name}</td>
                        <td>
                          {(attribute?.values ?? []).map((value, i) => {
                            if (i + 1 < attribute?.values.length) {
                              return `${value.name},`;
                            }
                            return value.name;
                          })}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Tab>
      {description?.description ? (
        <Tab eventKey="profile" title="Opis">
          <div className="descwidth">
            <div
              id="description"
              dangerouslySetInnerHTML={{ __html: description?.description }}
            ></div>
          </div>
        </Tab>
      ) : null}

      {/*
        <Tab eventKey='contact' title='Pitanja i odgovori'>
          /
            </Tab> */}
    </Tabs>
  </div>
);

export default Specifications;
