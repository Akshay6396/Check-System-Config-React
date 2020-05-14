import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerNoKam = ({onContextMenu,onContextMenuClick}) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      <MenuItem onClick={onContextMenuClick} data={{ action: "align_kam" }}>
        <i className="simple-icon-docs" /> <span>Align Kam</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainerNoKam;
