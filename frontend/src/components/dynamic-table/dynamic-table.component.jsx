import React, {useState} from 'react'
import DynamicTableDefaultRow from "./dynamic-table-default-row.component"
import "./dynamic-table.styles.scss"

/*
    props:
    className,
    rowComponent,
    tableSettings

*/
// control state of dynamic table
export const useDynamicTable = (items, settings={}, onUpdate=null) => {


    const onTableChange = (e) => {

    }

    const dynamicTableProps = {

    }

    return {
        dynamicTableProps
    }
}

/*

    const {} = useDynamicTable({}, shoudl)
*/

const DynamicTable = ({className, rowComponent, items, children}) => {


    const renderTableColumns = () => {
        
    }

    return (
        <div className="dynamic-table">
            <div className="dynamic-table__header">

            </div>
            <div className="dynamic-table__body">
                {items && items.length > 0 ? 
                    null
                    :
                    <div>No items found</div>
                }
            </div>
        </div>
    )
}


DynamicTable.defaultProps = {
    className: "dynamic-table",
    rowComponent: DynamicTableDefaultRow,
    items: []
}

export default DynamicTable