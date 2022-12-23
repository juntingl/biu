import NiceModal from "@/components/nice-modal";
import { Form, Input, message } from "antd";

import { withQuerySuspense } from "@/components/query-suspense";
import { IUsersItem, useUserDetail, useUserUpdate } from "./apis/user";
import { USER_EDIT_DETAIL_MODAL_ID } from "./helper";

const EditModal = NiceModal.create<{
  modalId: string;
  data: {
    id: number;
  };
  refetch: () => void;
}>(
  USER_EDIT_DETAIL_MODAL_ID, // modal 唯一标识
  // modal 承载内容
  ({ data: { id }, refetch }) => {
    const [form] = Form.useForm();
    const modal = NiceModal.useModal(USER_EDIT_DETAIL_MODAL_ID);

    const { data: detail } = useUserDetail({
      variables: { id },
      suspense: true,
      enabled: !!id,
    });

    const { mutate: executeUpdate, isLoading } = useUserUpdate({});

    const handleSubmit = () => {
      const params = form.getFieldsValue();

      form
        .validateFields()
        .then(() => {
          executeUpdate(
            {
              id,
              ...params,
            },
            {
              onSuccess: ({ msg }) => {
                message.success(msg || "更新用户信息成功");
                modal.hide();
                refetch();
              },
            }
          );
        })
        .catch(() => {
          console.log("error: ", "编辑失败");
        });
    };

    return (
      <NiceModal
        title="编辑用户信息"
        id={USER_EDIT_DETAIL_MODAL_ID}
        onOk={handleSubmit}
        confirmLoading={isLoading}
        maskCloseable={false}
      >
        <Form form={form} initialValues={detail} scrollToFirstError>
          <Form.Item label="用户名称" name="username">
            <Input type="text" disabled />
          </Form.Item>
          <Form.Item label="用户昵称" name="name">
            <Input type="text" placeholder="昵称" />
          </Form.Item>
          <Form.Item label="用户邮箱" name="email">
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="手机号码" name="phone">
            <Input type="text" placeholder="手机号码" />
          </Form.Item>
          <Form.Item label="个人站点" name="website">
            <Input type="text" placeholder="个人站点" />
          </Form.Item>
        </Form>
      </NiceModal>
    );
  }
);

export default withQuerySuspense(EditModal, { loading: null });
