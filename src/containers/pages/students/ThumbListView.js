import React from "react";
import { Card } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";
const color = {
  0: 'primary',
  1: 'secondary'
}
const ThumbListView = ({ product, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, product.id)}
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >

          <NavLink to={`/app/students/details/?p=${product.user_id}`} className="d-flex">
            <img

              alt={product.user_fname}
              src={product.photo
                ? product.photo                      // Use object with 'uri'
                : "https://postsales.s3.ap-south-1.amazonaws.com/default_image.png"}
              // className="list-thumbnail responsive border-0 card-img-left student_thum_list"
              className="list-thumbnail responsive border-0 card-img-left student_thum_list"

            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink
                to={`/app/students/details/?p=${product.user_id}`} className="w-15 w-sm-100">
                <p className="list-item-heading text-center mb-1 truncate">
                  {product.user_fname + " " + product.user_lname}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small text-center w-15 w-sm-100">
                {product.mobile}
              </p>
              <p className="mb-1 text-muted text-small text-center w-20 w-sm-100">
                {product.email}
              </p>
              {/* <p className="mb-1 text-muted text-small text-center w-15 w-sm-100">
                {product.products && product.products.length > 0 &&
                  product.products.map((product, index) => {
                    return (
                      <p
                        key={index}
                      >
                        {(product.purchase_date) ? moment(product.purchase_date).format('DD MMM YYYY') : ""}
                      </p>
                    );
                  })}
              </p> */}
              <div className="w-15 w-sm-100 text-center">

                {product.products && product.products.length > 0 &&
                  product.products.map((product, index) => {
                    return (
                      <span
                        key={index}
                        className={`badge badge-pill badge-${
                          color[index % 2]
                          } position-absolute ${
                          index === 0
                            ? "badge-top-right"
                            : "badge-top-right-" + (index + 1)
                          }`}
                      >
                        <span className="student_list_heading">{product.product_type +" | "+ moment(product.purchase_date).format('DD MMM YYYY') }</span>
                        <span className="not_student_list_heading">{product.product_type}</span>
                      </span>
                    );
                  })}
                {/* <Badge color="outline-primary" pill>
                  {product.product_type}
                </Badge> */}
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
