import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerPendingAnalysis = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      <MenuItem onClick={onContextMenuClick} data={{ action: "complete_analysis" }}>
        <i className="simple-icon-docs" /> <span>Complete Analysis</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainerPendingAnalysis;
