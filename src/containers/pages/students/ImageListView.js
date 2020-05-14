import React from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
const color = {
  0: 'primary',
  1: 'secondary'
}
const ImageListView = ({ product, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={product.user_id}>
      <ContextMenuTrigger id="menu_id" data={product.user_id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, product.user_id)}
          className={classnames({
            active: isSelect
          })}
        >
          <div className="image_list_image position-relative">
            <NavLink to={`/app/students/details/?p=${product.user_id}`} className="w-40 w-sm-100">
              <CardImg top alt={product.user_fname} src={product.photo
                ? product.photo                      // Use object with 'uri'
                : "https://postsales.s3.ap-south-1.amazonaws.com/default_image.png"} />
            </NavLink>
            {product.products
              && product.products
                .length > 0 &&
              product.products
                .map((b, index) => {
                  return (
                    <span
                      key={index}
                      className={`badge badge-pill badge-${
                        color[index % 2]
                        } position-absolute ${
                        index === 0
                          ? "badge-top-left"
                          : "badge-top-left-" + (index + 1)
                        }`}
                    >
                      {b.product_type}
                    </span>
                  );
                })}
            {/* <Badge
              color={product.statusColor}
              pill
              className="position-absolute badge-top-left"
            >
              {product.product_type}

            </Badge> */}
          </div>
          <CardBody>
            <Row>
              {/* <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${product.user_id}`}
                  checked={isSelect}
                  onChange={() => { }}
                  label="" />
              </Colxx> */}
              <Colxx xxs="12" className="mb-3">
                <CardSubtitle>{product.user_fname + " " + product.user_lname}
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {product.mobile}
                </CardText>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {product.email}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
