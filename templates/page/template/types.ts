export interface ICRUDItem {
  /**
   * 用户 ID
   */
  id: number;
  /**
   * 用户名称
   */
  name: string;
  /**
   * 用户昵称
   */
  nicknames: string;
  /**
   * 所在部门
   */
  department: number;
  /**
   * 手机号
   */
  phone_no: string;
  /**
   * 状态
   */
  status: number;
}
