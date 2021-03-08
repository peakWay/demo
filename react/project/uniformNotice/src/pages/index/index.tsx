
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from './index.scss';

interface IProps {
    name: string;
}

const IndexPage: React.FC<RouteComponentProps> = () => {
    return <div>这是首页</div>
};

export default IndexPage;