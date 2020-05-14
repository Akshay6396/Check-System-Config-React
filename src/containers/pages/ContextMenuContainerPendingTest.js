import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerPendingTest = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      <MenuItem onClick={onContextMenuClick} data={{ action: "complete_test" }}>
        <i className="simple-icon-docs" /> <span>Complete Test</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainerPendingTest;
