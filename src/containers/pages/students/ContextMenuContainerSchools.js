import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerSchools = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu id="menu_id" onShow={e => onContextMenu(e, e.detail.data)}>
      <MenuItem onClick={onContextMenuClick} data={{ action: "align_mentor" }}>
        <i className="simple-icon-user" /> <span>Align Mentor</span>
      </MenuItem>
      <MenuItem
        onClick={onContextMenuClick}
        data={{ action: "submit_application" }}
      >
        <i className="simple-icon-check" /> <span>Submit Application</span>
      </MenuItem>
      {/* <MenuItem onClick={onContextMenuClick} data={{ action: "delete" }}>
        <i className="simple-icon-trash" /> <span>Delete</span>
      </MenuItem> */}
    </ContextMenu>
  );
};

export default ContextMenuContainerSchools;
