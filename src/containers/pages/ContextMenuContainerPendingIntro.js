import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerPendingIntro = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      <MenuItem onClick={onContextMenuClick} data={{ action: "add_log" }}>
        <i className="simple-icon-docs" /> <span>Add logs</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainerPendingIntro;
