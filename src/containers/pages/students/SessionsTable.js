import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactTable from "react-table";
import classnames from "classnames";
import moment from "moment";




const CustomTbodyComponent = props => (
  <div {...props} className={classnames("rt-tbody", props.className || [])}>
    <PerfectScrollbar options={{ suppressScrollX: true }}>
      {props.children}
    </PerfectScrollbar>
  </div>
);

const dataTableColumns = [
  {
    Header: "Topic",
    accessor: "session_topic",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },

  {
    Header: "Duration",
    accessor: "duration",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Date",
    accessor: "session_date",
    Cell: props => <p className="text-muted">{moment(props.value).utc().format('DD MMM YYYY')}</p>
  }
  ,
  {
    Header: "Time",
    accessor: "session_time",
    Cell: props => <p className="text-muted">{moment(props.value, "HH:mm:ss").format('hh:mm:ss A')}</p>
  }
  ,
  {
    Header: "Description",
    accessor: "session_description",
    Cell: props => <p className="text-muted w-50">{props.value}</p>
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];

export const SessionsTable = props => {
  const { Sessions } = props
  return (
    <Card className="">
      <CardBody>
        <CardTitle>
          Sessions
          </CardTitle>
        <ReactTable
          data={Sessions}
          TbodyComponent={CustomTbodyComponent}
          columns={dataTableColumns}
          defaultPageSize={10}
          showPageJump={false}
          showPageSizeOptions={false}
          showPagination={false}
          className={"react-table-fixed-height"}
        />
      </CardBody>
    </Card>
  );
};
// export const ReactTableAdvancedCard = props => {
//   return (
//     <Card className="mb-4">
//       <CardBody>
//         <CardTitle>
//           <IntlMessages id="table.react-advanced" />
//         </CardTitle>
//         <ReactTable
//           data={data}
//           columns={dataTableColumns}
//           defaultPageSize={5}
//           filterable={true}
//           showPageJump={true}
//           PaginationComponent={DataTablePagination}
//           showPageSizeOptions={true}
//         />
//       </CardBody>
//     </Card>
//   );
// };
