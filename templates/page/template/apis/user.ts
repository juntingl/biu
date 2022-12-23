import type { PageData } from "@/apis/config/types";

import { createMutation, createQuery } from "react-query-kit";
import { GET, POST } from "@/apis/config/api-fn";

/**
 * API 相关类型定义贴近请求 API
 */
export interface IUsersItem {
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
  username: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 地址
   */
  address: IAddress;
  /**
   * 公司信息
   */
  company: ICompany;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 网站
   */
  website: string;
}

export interface IAddress {
  /**
   * 街道
   */
  street: string;
  /**
   *
   */
  suite: string;
  /**
   * 城市
   */
  city: string;
  /**
   * 邮政编码
   */
  zipcode: string;
  /**
   * 经纬度
   */
  geo: IGeo;
}

/**
 * 经纬度
 */
export interface IGeo {
  lat: string;
  lng: string;
}

/**
 * 公司信息
 */
export interface ICompany {
  /**
   * 公司名称
   */
  name: string;
  /**
   * 名言
   */
  catchPhrase: string;
  bs: string;
}

/**
 * 用户 - 用户列表请求参数
 * @param {string} q 查询关键字
 * @param {number} _page 当前页
 * @param {number} _limit 每页条数
 * @param {string} _sort 要排序的字段
 * @param {string} _order 排序方式，desc => 降序、asc => 升序
 *
 */
export interface IUsersArgs {
  id?: number;
  name?: string;
  nicknames?: string;
  /**
   * 页码，默认1
   */
  page_no: number;
  /**
   * 每页数量，默认20
   */
  page_size: number;
  freedom?: Record<string, any>;
}

export const useUserList = createQuery<PageData<IUsersItem[]>, IUsersArgs>(
  "/mock-api/users",
  ({ queryKey: [url, args], signal }) => {
    // 处理下 mock api 需要的请求参数
    const newArgs = JSON.parse(JSON.stringify(args));
    Reflect.deleteProperty(newArgs, "freedom");

    return GET(
      url,
      {
        _page: newArgs.page_no,
        _limit: newArgs.page_size,
        [args?.freedom?.key]: args?.freedom?.value,
      },
      {
        signal,
        // 基于我们业务接口返回格式需要额外处理下
        transformResponse: (data) => {
          const totalCount = 10;
          const totalPage = Math.ceil(totalCount / args.page_size) || 1;
          return {
            ret: 0,
            msg: "",
            data: {
              total_count: totalCount,
              total_page: totalPage,
              page_no: args.page_no,
              page_size: args.page_size,
              datalist: JSON.parse(data),
            },
          };
        },
      }
    );
  }
);

export interface IUserDetailArgs {
  /**
   * 用户 ID
   */
  id: number;
}

export const useUserDetail = createQuery<IUsersItem, IUserDetailArgs>(
  "/mock-api/users",
  ({ queryKey: [url, args] }) =>
    GET(url, args, {
      transformResponse: (data) => {
        const newData = JSON.parse(data);
        const result = newData.length ? newData[0] : {};
        const msg = newData.length === 0 ? "查询无此用户" : "";

        return {
          ret: 0,
          msg,
          data: result,
        };
      },
    })
);

export const useUserUpdate = createMutation<any, IUserDetailArgs>((args) =>
  POST("/mock-api/users", args, {
    transformResponse: (data) => {
      return {
        ret: 0,
        msg: "更新用户信息成功",
        data,
      };
    },
  })
);
