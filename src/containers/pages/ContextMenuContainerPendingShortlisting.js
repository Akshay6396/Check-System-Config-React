import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainerPendingShortlisting = ({ onContextMenu, onContextMenuClick, selectedTypeOption }) => {
  return (
    <ContextMenu
      id="menu_id"
      onShow={e => onContextMenu(e, e.detail.data)}
    >
      {selectedTypeOption.column === "Complete" ? (<MenuItem onClick={onContextMenuClick} data={{ action: "add_shortlisting_school" }}>
        <i className="simple-icon-docs" /> <span>Add Shortlisting Schools</span>
      </MenuItem>)
        :
        (<MenuItem onClick={onContextMenuClick} data={{ action: "add_shortlisting_document" }}>
          <i className="simple-icon-docs" /> <span>Add Shortlisting Document</span>
        </MenuItem>)
      }

    </ContextMenu>
  );
};

export default ContextMenuContainerPendingShortlisting;
