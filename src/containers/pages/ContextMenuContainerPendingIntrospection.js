import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerPendingIntrospection = ({ onContextMenu, onContextMenuClick, selectedTypeOption }) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      {selectedTypeOption.column === "New" ? (<MenuItem onClick={onContextMenuClick} data={{ action: "align_kam" }}>
        <i className="simple-icon-docs" /> <span>Add Introspection Document</span>
      </MenuItem>)
        :
        (<MenuItem onClick={onContextMenuClick} data={{ action: "align_kam" }}>
          <i className="simple-icon-docs" /> <span>Complete Introspection</span>
        </MenuItem>)
      }

    </ContextMenu>
  );
};

export default ContextMenuContainerPendingIntrospection;
