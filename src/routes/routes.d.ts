import { ComponentType } from 'react';
import { RouteProps, RouteComponentProps } from 'react-router-dom';
export interface IRouteConfig extends RouteProps {
    redirect?: string;
    routes?: IRouteConfig[];
    layout?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    layoutMiddleware?: ComponentType<any>;
    [key: string]: any;
}
declare const _default: IRouteConfig[];
export default _default;
