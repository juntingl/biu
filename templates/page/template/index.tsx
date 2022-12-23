import type { IUsersArgs } from "./apis/user";

import ProTable from "@/components/pro-table";
import { Button, Form, message } from "antd";

// 页面相关配置
import { usePersistValues } from "@/utils/use-persist-values";
import { useUserList } from "./apis/user";
import { searchSchema, useColumns } from "./helper";
import EditModal from "./edit-modal";

// 初始化查询数据，重置时使用
const initialState: IUsersArgs = {
  freedom: { key: undefined, value: undefined },
  page_no: 1,
  page_size: 2,
};

const Page = () => {
  const [form] = Form.useForm();
  const [submitValues, setSubmitValues] = usePersistValues(initialState);

  const {
    data: users,
    isPreviousData,
    isFetching,
    refetch,
  } = useUserList({
    variables: submitValues,
    suspense: true,
    keepPreviousData: true,
    useErrorBoundary: false,
  });

  const columns = useColumns({ refetch });

  return (
    <>
      <ProTable
        form={form}
        search={searchSchema}
        tableProps={{
          rowKey: "id",
          loading: isPreviousData && isFetching,
          columns
        }}
        initialValues={initialState}
        submitValues={submitValues}
        setSubmitValues={setSubmitValues}
        responseResult={users}
        refetch={refetch}
      >
        <div className="flex justify-end mb-4 operation-bar">
          <Button type="primary" onClick={() => message.info("新增用户")}>
            新增用户
          </Button>
        </div>
      </ProTable>

      {/* Edit modal */}
      <EditModal />
    </>
  );
};

export default Page;
