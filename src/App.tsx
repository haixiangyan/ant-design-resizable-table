import React, {useState} from 'react';
import {Resizable} from 'react-resizable';
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {TableComponents} from "rc-table/lib/interface";

import './styles.css';

const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} style={{ minWidth: 100 }} />;
  }

  return (
    <Resizable
      minConstraints={[200, 0]}
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-left-right-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} style={{ minWidth: 200 }} />
    </Resizable>
  );
};

const ResizableRow = (props: any) => {
  const { onResize, ...restProps } = props;

  const [height, setHeight] = useState(56);

  return (
    <Resizable
      width={0}
      height={height}
      handle={
        <span
          className="react-resizable-top-bottom-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={(e, data) => {
        setHeight(data.size.height);
      }}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <tr {...restProps} style={{ height }} />
    </Resizable >
  );
};

const App = () => {
  const [columns, setColumns] = useState<ColumnsType>([
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
      fixed: 'left',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
      render: (amount) => <span style={{ display: 'inline-flex', overflow: 'auto', wordBreak: 'break-all' }}>{amount}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <a>Delete</a>,
    },
  ]);

  const components: TableComponents<any> = {
    header: {
      cell: ResizableTitle,
    },
    body: {
      row: ResizableRow,
    },
  };

  const data = [
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 'asjdflajsdlkfjalskdjfalsdkfjalsdkjfskldfjsklsdsdddddddddssssssssssssssssssssssssssssssssssssssssssssssssfja;lsdjflajsdlfjaklsdjflajsdfjlajsdjf',
      type: 'income',
      note: 'transfer',
    },
  ];

  const handleResize = (index : number) => (e: Event, { size }: { size: any }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  const displayColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: any) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <div>
      <h1>react-resizable + Table</h1>

      <Table bordered components={components} columns={displayColumns} dataSource={data} />;
    </div>
  );
}

export default App;
