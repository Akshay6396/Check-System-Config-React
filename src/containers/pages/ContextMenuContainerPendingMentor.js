import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerPendingMentor = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      <MenuItem onClick={onContextMenuClick} data={{ action: "align_mentor" }}>
        <i className="simple-icon-docs" /> <span>Align Mentor</span>
      </MenuItem>

    </ContextMenu>
  );
};

export default ContextMenuContainerPendingMentor;
