import type { ColumnsType } from "antd/es/table";
import type { ISearchSchema } from "@/components/pro-table";
import type { IUsersItem } from "./apis/user";

import { Button, message, Space, Tooltip } from "antd";
import { useNiceModal } from "@/components/nice-modal";

export const USER_EDIT_DETAIL_MODAL_ID = "user-edit-detail";

export const columnsFn = (): ColumnsType<IUsersItem> => {
  return [
    {
      title: "用户 ID",
      dataIndex: "id",
      width: 100,
      fixed: "left",
    },
    {
      title: "用户名称",
      dataIndex: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "用户昵称",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "地址",
      dataIndex: "address",
      width: 300,
      render: (address) => {
        const { city, street, suite } = address;
        return [city, street, suite].filter(Boolean).join("-");
      },
    },
    {
      title: "所在公司",
      dataIndex: "company",
      width: 200,
      render: (company) => {
        return company?.name;
      },
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      ellipsis: {
        showTitle: false, // 默认 title 样式关闭
      },
      render: (phone) => (
        <Tooltip placement="topLeft" title={phone}>
          {phone}
        </Tooltip>
      ),
    },
    {
      title: "网站",
      dataIndex: "website",
      width: 150,
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 200,
      fixed: "right",
      render: (_: any, record: IUsersItem) => {
        return (
          <Space size={0} wrap>
            <Button type="link" size="small">
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];
};

export const useColumns = ({
  refetch,
}: {
  refetch: () => void;
}): ColumnsType<IUsersItem> => {
  const userEditModal = useNiceModal(USER_EDIT_DETAIL_MODAL_ID);

  return [
    {
      title: "用户 ID",
      dataIndex: "id",
      width: 100,
      fixed: "left",
    },
    {
      title: "用户名称",
      dataIndex: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "用户昵称",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "地址",
      dataIndex: "address",
      width: 300,
      render: (address) => {
        const { city, street, suite } = address;
        return [city, street, suite].filter(Boolean).join("-");
      },
    },
    {
      title: "所在公司",
      dataIndex: "company",
      width: 200,
      render: (company) => {
        return company?.name;
      },
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      ellipsis: {
        showTitle: false, // 默认 title 样式关闭
      },
      render: (phone) => (
        <Tooltip placement="topLeft" title={phone}>
          {phone}
        </Tooltip>
      ),
    },
    {
      title: "网站",
      dataIndex: "website",
      width: 150,
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 200,
      fixed: "right",
      render: (_: any, record: IUsersItem) => {
        const { id, name } = record;
        return (
          <Space size={0} wrap>
            <Button
              type="link"
              size="small"
              onClick={() => {
                if (!id) return;

                userEditModal.show({
                  data: { id },
                  refetch,
                });
              }}
            >
              编辑
            </Button>

            <Button
              type="link"
              size="small"
              onClick={() => {
                if (!id) return;
                message.error(`删除用户：${id}-${name}`);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
};

export const searchSchema: ISearchSchema[] = [
  {
    type: "SelectCompactInput",
    label: "",
    name: "",
    value: [
      {
        label: "用户 ID",
        value: "id",
      },
      {
        label: "用户名称",
        value: "name",
      },
      {
        label: "用户昵称",
        value: "nicknames",
      },
    ],
  },
  // {
  //   type: "RangePicker",
  //   label: "开始日期",
  //   name: "order_date",
  // },
  // {
  //   type: "RangePicker",
  //   label: "结束日期",
  //   name: "send_date",
  // },
  // {
  //   type: "Select",
  //   label: "状态",
  //   name: "send_status",
  //   value: [
  //     {
  //       label: "开启",
  //       value: 1,
  //     },
  //     {
  //       label: "禁用",
  //       value: 2,
  //     },
  //   ],
  // props: {
  //   // style: { width: 120 },
  // },
  // },
];
